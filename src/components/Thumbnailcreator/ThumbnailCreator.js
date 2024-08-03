import React, { useState } from 'react';
import config from "../configuration/ApiConfig";

// Base URL and endpoints
const ThumbnailFetcher = () => {
    const baseUrl = config.baseURL;
    const [thumbnailUrls, setThumbnailUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const productIdsUrl = `${baseUrl}/sazgt/products/get-all`;
    const thumbnailBaseUrl = `${baseUrl}/sazgt/public/images/thumbnail/create`;

    const fetchProductIds = async () => {
        try {
            const response = await fetch(productIdsUrl);
            if (response.ok) {
                const data = await response.json();
                return data.map(product => product.id);
            } else {
                console.error(`Failed to fetch product IDs. Status code: ${response.status}`);
                return [];
            }
        } catch (error) {
            console.error(`An error occurred while fetching product IDs: ${error}`);
            return [];
        }
    };

    const createThumbnails = async (productIds) => {
        const url = `${thumbnailBaseUrl}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productIds }),
            });
            if (response.ok) {
                const data = await response.json();
                return data.thumbnailUrls || []; // Adjust based on actual response structure
            } else {
                console.error(`Failed to create thumbnails for product IDs ${productIds}. Status code: ${response.status}`);
                return [];
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
            return [];
        }
    };

    const processProductIds = async () => {
        setLoading(true);
        const productIds = await fetchProductIds();
        console.log(productIds);
        const urls = [];
        
        for (let i = 0; i < productIds.length; i += 10) {
            const batch = productIds.slice(i, i + 10);
            const thumbnailUrls = await createThumbnails(batch);
            urls.push(...thumbnailUrls);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        }
        
        setThumbnailUrls(urls);
        setLoading(false);
    };

    return (
        <div>
            <button onClick={processProductIds} disabled={loading}>
                {loading ? 'Processing...' : 'Start'}
            </button>
            <div id="thumbnailUrls">
                {thumbnailUrls.map((url, index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ThumbnailFetcher;
