process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 4000;
app.use(cors());

// Google Sheets publish to web URL (HTML output)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRN_mGCJ4Rl04kfjjUbGOwnpq8aVt5icEw90O_44dWi7yiqFwnt4v494SdE4VFiFv9zJipl6UPtJ_ph/pubhtml?gid=0&single=true&output=html';

app.get('/api/sheet', async (req, res) => {
  try {
    const response = await fetch(SHEET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html'
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const table = $('table').first();
    if (!table.length) throw new Error('No table found in the HTML');

    const trs = table.find('tr');

    // Map Google Sheets columns to the expected frontend format
    const rows = [];
    
    // Start from third row (index 2) to skip header and potential empty rows
    trs.slice(2).each((i, row) => {
      const cells = $(row).find('td').map((j, cell) => $(cell).text().trim()).get();
      
      // Skip empty rows
      if (cells.length === 0 || cells.every(cell => cell === '')) return;
      
      // Create row object in the format expected by frontend
      const rowData = {
        name: cells[0] || '',        // Make sure this is the date column
        date: cells[1] || '',        // Make sure this is the name column
        type: cells[2] || '',             
        from: cells[3] || '',
        to: cells[4] || '',        
        // description: cells[5] || '',          
        availability: cells[6] || '', 
        time: cells[7] || '',
        price: cells[9] || ''      
      };
      
      rows.push(rowData);
    });

    res.json(rows); // Return just the array of objects without wrapper

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      troubleshooting: [
        '1. Verify the sheet is published correctly (File > Share > Publish to web)',
        '2. Check the URL includes ?gid=0&single=true&output=html',
        '3. Make sure the sheet has data in the expected columns',
        '4. Check console logs for HTML structure'
      ]
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});