import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../client/dist');

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'eBay price finder API is running.' });
});

function normalizeItem(item) {
  const priceValue = Number(
    item?.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ ??
      item?.sellingStatus?.[0]?.currentPrice?.[0]?.value ??
      0
  );

  const shippingCostValue = Number(
    item?.shippingInfo?.[0]?.shippingServiceCost?.[0]?.__value__ ??
      item?.shippingInfo?.[0]?.shippingServiceCost?.[0]?.value ??
      0
  );

  const viewItemUrl = item?.viewItemURL?.[0] ?? item?.viewItemURL ?? '';
  const image = item?.galleryURL?.[0] ?? item?.galleryURL ?? '';
  const condition = item?.condition?.[0]?.conditionDisplayName?.[0] ?? item?.condition?.[0]?.conditionDisplayName ?? 'Unknown';

  return {
    itemId: item?.itemId?.[0] ?? item?.itemId ?? '',
    title: item?.title?.[0] ?? item?.title ?? 'Untitled item',
    price: Number.isFinite(priceValue) ? priceValue : 0,
    shippingCost: Number.isFinite(shippingCostValue) ? shippingCostValue : 0,
    totalPrice: Number.isFinite(priceValue + shippingCostValue) ? priceValue + shippingCostValue : priceValue,
    url: Array.isArray(viewItemUrl) ? viewItemUrl[0] : viewItemUrl,
    image: Array.isArray(image) ? image[0] : image,
    condition,
    location: item?.location?.[0] ?? item?.location ?? 'Unknown location',
    seller: item?.sellerInfo?.[0]?.sellerUserName?.[0] ?? item?.sellerInfo?.[0]?.sellerUserName ?? 'Unknown seller',
    listingType: item?.listingInfo?.[0]?.listingType?.[0] ?? item?.listingInfo?.[0]?.listingType ?? 'Unknown',
    endTime: item?.listingInfo?.[0]?.endTime?.[0] ?? item?.listingInfo?.[0]?.endTime ?? null,
  };
}

app.get('/api/search', async (req, res) => {
  const query = (req.query.query || req.query.q || '').toString().trim();

  if (!query) {
    return res.status(400).json({ error: 'Please provide a search query.' });
  }

  const appId = process.env.EBAY_APP_ID;

  if (!appId || appId === 'your_ebay_app_id_here') {
    return res.status(500).json({
      error: 'Missing or invalid eBay App ID. Add your eBay Finding API App ID to server/.env.',
    });
  }

  try {
    const eBayUrl = new URL('https://svcs.ebay.com/services/search/FindingService/v1');
    eBayUrl.searchParams.set('OPERATION-NAME', 'findItemsByKeywords');
    eBayUrl.searchParams.set('SERVICE-VERSION', '1.0.0');
    eBayUrl.searchParams.set('SECURITY-APPNAME', appId);
    eBayUrl.searchParams.set('RESPONSE-DATA-FORMAT', 'JSON');
    eBayUrl.searchParams.set('keywords', query);
    eBayUrl.searchParams.set('paginationInput.entriesPerPage', '12');
    eBayUrl.searchParams.set('sortOrder', 'PricePlusShippingLowest');

    const response = await fetch(eBayUrl.toString());

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`eBay API request failed: ${response.status} ${text}`);
    }

    const json = await response.json();
    const responseData = json?.findItemsByKeywordsResponse?.[0];
    const items = responseData?.searchResult?.[0]?.item ?? [];

    const normalized = items
      .map(normalizeItem)
      .filter((item) => item.price > 0)
      .sort((a, b) => a.totalPrice - b.totalPrice);

    const cheapest = normalized[0] ?? null;

    return res.json({
      query,
      count: normalized.length,
      cheapest,
      items: normalized,
    });
  } catch (error) {
    console.error('Search request error:', error);
    return res.status(500).json({
      error: 'Unable to search eBay right now. Please check your app credentials and try again.',
    });
  }
});

app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
