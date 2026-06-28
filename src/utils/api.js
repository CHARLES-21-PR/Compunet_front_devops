export const apiBaseUrl = import.meta.env.DEV
    ? ''
    : import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;

export function getProductImageUrl(image) {
    const placeholder = '/img/placeholder.png';
    if (!image || typeof image !== 'string') return placeholder;
    if (image.startsWith('http') || image.startsWith('data:')) return image;

    const normalized = image.replace(/^\/+/, '');
    const relativePath = normalized.startsWith('storage/')
        ? `/${normalized}`
        : normalized.startsWith('products/')
            ? `/storage/${normalized}`
            : `/storage/products/${normalized}`;

    if (!apiBaseUrl) {
        return relativePath;
    }

    return `${apiBaseUrl}${relativePath}`;
}

export default async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    // Ensure JSON accept header
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    // Add Authorization if token exists
    if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
    // Skip ngrok browser warning (accepted by ngrok interstitial)
    headers.set('ngrok-skip-browser-warning', '1');

    const opts = { ...options, headers };
    return fetch(url, opts);
}
