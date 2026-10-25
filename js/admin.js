const API = 'https://api.github.com';
const REPO = JURYAM_CONFIG.GITHUB_REPO;
const BRANCH = JURYAM_CONFIG.GITHUB_BRANCH;
const TOKEN_KEY = 'juryam_admin_token';
const ID_PREFIX = { necklaces: 'neck', rings: 'ring', earrings: 'ear', bracelets: 'brac' };
const CATEGORIES = Object.keys(ID_PREFIX);

let products = {};
let editingId = null;

const $ = id => document.getElementById(id);

function getToken() {
    try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function setToken(token) {
    try {
        if (token) sessionStorage.setItem(TOKEN_KEY, token);
        else sessionStorage.removeItem(TOKEN_KEY);
    } catch { /* storage blocked: stay signed in for this page load only */ }
}

async function gh(path, options = {}, token = getToken()) {
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            ...(options.body ? { 'Content-Type': 'application/json' } : {})
        }
    });
    if (!res.ok) {
        const err = new Error((await res.json().catch(() => ({}))).message || res.statusText);
        err.status = res.status;
        throw err;
    }
    return res.json();
}

function toBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin);
}

function fromBase64(b64) {
    const bin = atob(b64.replace(/\n/g, ''));
    return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function slugify(text) {
    return text.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

let statusTimer;
function showStatus(message, isError) {
    const el = $('status');
    el.textContent = message;
    el.className = isError ? 'error' : '';
    el.style.display = 'block';
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { el.style.display = 'none'; }, isError ? 6000 : 2500);
}

async function readProductsFile() {
    const file = await gh(`/repos/${REPO}/contents/products.json?ref=${BRANCH}`);
    return { data: JSON.parse(fromBase64(file.content)), sha: file.sha };
}

function writeProductsFile(data, sha, message) {
    return gh(`/repos/${REPO}/contents/products.json`, {
        method: 'PUT',
        body: JSON.stringify({ message, content: toBase64(JSON.stringify(data, null, 2) + '\n'), sha, branch: BRANCH })
    });
}

async function login(token) {
    const user = await gh('/user', {}, token);
    const repo = await gh(`/repos/${REPO}`, {}, token);
    if (!repo.permissions || !repo.permissions.push) {
        throw new Error(`${user.login} has no write access to ${REPO}`);
    }
    setToken(token);
    $('userName').textContent = `@${user.login}`;
}

function showApp() {
    $('loginView').classList.add('hidden');
    $('appView').classList.remove('hidden');
    $('logoutBtn').classList.remove('hidden');
}

function showLogin() {
    $('loginView').classList.remove('hidden');
    $('appView').classList.add('hidden');
    $('formCard').classList.add('hidden');
    $('logoutBtn').classList.add('hidden');
    $('userName').textContent = '';
}

async function refreshProducts() {
    products = (await readProductsFile()).data;
    renderTable();
}

function renderTable() {
    const rows = [];
    CATEGORIES.forEach(cat => {
        const list = products[cat] || [];
        if (!list.length) return;
        rows.push(`<tr class="cat-title"><td colspan="5">${cat}</td></tr>`);
        list.forEach(p => rows.push(`
            <tr>
                <td><img src="${escapeHtml(p.image)}" alt=""></td>
                <td>${escapeHtml(p.name)}${p.badge ? ` <span class="muted">· ${escapeHtml(p.badge)}</span>` : ''}</td>
                <td>${Number(p.price)} DA</td>
                <td class="col-desc muted">${p.variants ? p.variants.length : '—'}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-ghost" type="button" data-edit="${escapeHtml(p.id)}">EDIT</button>
                        <button class="btn btn-danger" type="button" data-delete="${escapeHtml(p.id)}">DELETE</button>
                    </div>
                </td>
            </tr>`));
    });
    $('productRows').innerHTML = rows.join('') || '<tr><td colspan="5" class="muted">No products yet.</td></tr>';
}

function findProduct(id) {
    for (const cat of CATEGORIES) {
        const p = (products[cat] || []).find(item => item.id === id);
        if (p) return p;
    }
    return null;
}

function openForm(product) {
    editingId = product ? product.id : null;
    $('formTitle').textContent = product ? 'Edit product' : 'Add product';
    $('fName').value = product ? product.name : '';
    $('fPrice').value = product ? product.price : '';
    $('fCategory').value = product ? product.category : 'necklaces';
    $('fBadge').value = product && product.badge ? product.badge : '';
    $('fDesc').value = product ? product.description || '' : '';
    $('fVariants').value = product && product.variants ? product.variants.map(v => v.label).join('\n') : '';
    $('fImage').value = '';
    $('fImage').required = !product;
    const preview = $('preview');
    preview.style.display = product ? 'block' : 'none';
    preview.src = product ? product.image : '';
    $('formCard').classList.remove('hidden');
    $('formCard').scrollIntoView({ behavior: 'smooth' });
}

function closeForm() {
    $('formCard').classList.add('hidden');
    editingId = null;
}

function nextId(data, category) {
    const prefix = ID_PREFIX[category];
    let max = 0;
    CATEGORIES.forEach(cat => (data[cat] || []).forEach(p => {
        const match = p.id.match(new RegExp(`^${prefix}_(\\d+)$`));
        if (match) max = Math.max(max, Number(match[1]));
    }));
    return `${prefix}_${max + 1}`;
}

function parseVariants() {
    const seen = new Set();
    return $('fVariants').value.split('\n').map(l => l.trim()).filter(Boolean).reduce((acc, label) => {
        const id = slugify(label);
        if (id && !seen.has(id)) {
            seen.add(id);
            acc.push({ id, label });
        }
        return acc;
    }, []);
}

async function uploadImage(file, name) {
    const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
    const path = `assets/${slugify(name) || 'product'}-${Date.now()}.${ext}`;
    await gh(`/repos/${REPO}/contents/${path}`, {
        method: 'PUT',
        body: JSON.stringify({ message: `Add image for ${name}`, content: await fileToBase64(file), branch: BRANCH })
    });
    return path;
}

async function saveProduct(event) {
    event.preventDefault();
    const btn = $('saveBtn');
    btn.disabled = true;
    btn.textContent = 'SAVING...';

    try {
        const name = $('fName').value.trim();
        const price = Number($('fPrice').value);
        if (!name || !Number.isFinite(price) || price < 0) throw new Error('Enter a name and a valid price');

        const { data, sha } = await readProductsFile();
        const category = $('fCategory').value;
        const file = $('fImage').files[0];

        let existing = null;
        if (editingId) {
            CATEGORIES.forEach(cat => {
                const found = (data[cat] || []).find(p => p.id === editingId);
                if (found) {
                    existing = found;
                    data[cat] = data[cat].filter(p => p.id !== editingId);
                }
            });
            if (!existing) throw new Error('Product no longer exists. Reloading.');
        }

        if (!file && !existing) throw new Error('Choose an image');

        const product = {
            id: existing ? existing.id : nextId(data, category),
            name,
            price,
            image: file ? await uploadImage(file, name) : existing.image,
            description: $('fDesc').value.trim(),
            category,
            badge: $('fBadge').value || null
        };
        const variants = parseVariants();
        if (variants.length) product.variants = variants;

        data[category] = data[category] || [];
        data[category].push(product);
        await writeProductsFile(data, sha, `${existing ? 'Edit' : 'Add'} product: ${name}`);

        products = data;
        renderTable();
        closeForm();
        showStatus('Saved. The store updates after the next deploy.');
    } catch (err) {
        showStatus(err.status === 409 ? 'Someone else changed the products. Reloaded, try again.' : err.message, true);
        refreshProducts().catch(() => {});
    } finally {
        btn.disabled = false;
        btn.textContent = 'SAVE';
    }
}

async function deleteProduct(id) {
    const product = findProduct(id);
    if (!product || !confirm(`Delete "${product.name}"? This cannot be undone from the dashboard.`)) return;

    try {
        const { data, sha } = await readProductsFile();
        CATEGORIES.forEach(cat => { data[cat] = (data[cat] || []).filter(p => p.id !== id); });
        await writeProductsFile(data, sha, `Delete product: ${product.name}`);
        products = data;
        renderTable();
        showStatus('Deleted. The store updates after the next deploy.');
    } catch (err) {
        showStatus(err.message, true);
        refreshProducts().catch(() => {});
    }
}

async function enterApp() {
    showApp();
    await refreshProducts();
}

document.addEventListener('DOMContentLoaded', async () => {
    $('repoName').textContent = REPO;

    $('loginForm').addEventListener('submit', async event => {
        event.preventDefault();
        const btn = $('loginBtn');
        btn.disabled = true;
        try {
            await login($('token').value.trim());
            $('token').value = '';
            await enterApp();
        } catch (err) {
            showStatus(err.status === 401 ? 'Invalid GitHub token' : err.message, true);
        } finally {
            btn.disabled = false;
        }
    });

    $('logoutBtn').addEventListener('click', () => {
        setToken(null);
        showLogin();
    });

    $('newBtn').addEventListener('click', () => openForm(null));
    $('cancelBtn').addEventListener('click', closeForm);
    $('productForm').addEventListener('submit', saveProduct);

    $('productRows').addEventListener('click', event => {
        const edit = event.target.closest('[data-edit]');
        const del = event.target.closest('[data-delete]');
        if (edit) openForm(findProduct(edit.dataset.edit));
        if (del) deleteProduct(del.dataset.delete);
    });

    $('fImage').addEventListener('change', () => {
        const file = $('fImage').files[0];
        if (!file) return;
        $('preview').src = URL.createObjectURL(file);
        $('preview').style.display = 'block';
    });

    if (getToken()) {
        try {
            await login(getToken());
            await enterApp();
        } catch {
            setToken(null);
            showLogin();
        }
    }
});
