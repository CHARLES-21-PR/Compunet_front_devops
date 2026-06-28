import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import apiFetch, { apiBaseUrl, getProductImageUrl } from '../utils/api';

function ProductImage({ image, alt = '', placeholder = '/img/placeholder.png', sx, className, ...props }) {
    const [src, setSrc] = useState(placeholder);

    useEffect(() => {
        let active = true;
        let objectUrl;

        const load = async () => {
            if (!image) {
                setSrc(placeholder);
                return;
            }

            if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('data:'))) {
                setSrc(image);
                return;
            }

            const url = getProductImageUrl(image);
            if (!url) {
                setSrc(placeholder);
                return;
            }

            try {
                const response = await apiFetch(url, {
                    headers: {
                        Accept: 'image/*'
                    }
                });

                if (!active) return;

                if (!response.ok) {
                    throw new Error(`Error cargando imagen: ${response.status}`);
                }

                const contentType = response.headers.get('content-type') || '';
                if (!contentType.startsWith('image/')) {
                    throw new Error(`Tipo de contenido inválido: ${contentType}`);
                }

                const blob = await response.blob();
                if (!active) return;

                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
            } catch (err) {
                if (!active) return;
                console.warn('ProductImage load failed:', err);
                setSrc(placeholder);
            }
        };

        load();

        return () => {
            active = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [image, placeholder]);

    return <Box component="img" src={src} alt={alt} className={className} sx={sx} {...props} />;
}

export default ProductImage;
