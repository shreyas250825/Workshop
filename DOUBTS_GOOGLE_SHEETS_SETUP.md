# Doubts Section - Google Sheets Setup Guide

## Overview
The doubts section allows students to submit questions about case studies and instructors to manage them through Google Sheets.

## Step 1: Create Google Sheet

1. Open your existing Google Sheet or create a new one
2. Create a new sheet tab named **"Doubts"** (exact name, case-sensitive)
3. Add the following headers in Row 1:
   - Column A: `ID`
   - Column B: `Case Study`
   - Column C: `Question`
   - Column D: `Name`
   - Column E: `Anonymous`
   - Column F: `Timestamp`

## Step 2: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy the entire code from `GOOGLE_APPS_SCRIPT_DOUBTS.js`
4. Paste it into the Apps Script editor
5. **Important**: Change the passcode on line 56:
   ```javascript
   const VALID_PASSCODE = '181818'; // Change this to your desired passcode
   ```
6. Click **Save** (disk icon)
7. Click **Deploy** → **New deployment**
8. Click the gear icon ⚙️ next to "Select type"
9. Choose **Web app**
10. Configure:
    - Description: "Doubts Management API"
    - Execute as: **Me**
    - Who has access: **Anyone**
11. Click **Deploy**
12. Click **Authorize access**
13. Choose your Google account
14. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
15. Click **Allow**
16. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 3: Update Environment Variables

### Local Development (.env.local)
1. Open `workshop/.env.local`
2. Add the URL you copied:
   ```
   NEXT_PUBLIC_DOUBTS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### Vercel Deployment
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - Name: `NEXT_PUBLIC_DOUBTS_SCRIPT_URL`
   - Value: Your Google Apps Script URL
   - Environment: Select all (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application

## Step 4: Test the Integration

### Test Locally
1. Restart your dev server: `npm run dev`
2. Navigate to `/doubts`
3. Submit a test question
4. Check your Google Sheet - the question should appear in the "Doubts" tab
5. Try deleting with the passcode you set

### Test on Vercel
1. After redeployment, visit your Vercel URL
2. Navigate to `/doubts`
3. Submit a test question
4. Verify it appears in Google Sheets

## Features

### For Students:
- Select case study from dropdown
- Enter their name (or submit anonymously)
- Write their question
- Submit to Google Sheets
- View all submitted questions
- Auto-refresh every 10 seconds

### For Instructors:
- View all questions in Google Sheets
- Delete questions using passcode (default: 181818)
- Questions are stored with timestamp
- Can see if question was submitted anonymously

## Google Sheet Structure

Example data in the "Doubts" sheet:

| ID | Case Study | Question | Name | Anonymous | Timestamp |
|----|------------|----------|------|-----------|-----------|
| doubt-1234567890 | House Price Prediction | How do I handle missing values? | John Doe | No | Jan 15, 2026, 10:30 AM |
| doubt-1234567891 | Credit Risk Classification | What is the best algorithm? | Anonymous | Yes | Jan 15, 2026, 11:45 AM |

## Security Notes

1. **Passcode Protection**: Only instructors with the passcode can delete questions
2. **Default Passcode**: 181818 (change this in the Apps Script)
3. **Anonymous Submissions**: Students can choose to submit anonymously
4. **Public Access**: Anyone can view and submit questions (no login required)

## Troubleshooting

### Questions not appearing in Google Sheets
- Check that the sheet tab is named exactly "Doubts"
- Verify the Apps Script is deployed with "Anyone" access
- Check browser console for errors

### Delete not working
- Verify you're using the correct passcode
- Check that the passcode in Apps Script matches what you're entering

### Environment variable not working
- Restart dev server after changing .env.local
- For Vercel, make sure to redeploy after adding the variable
- Check that the variable name is exactly `NEXT_PUBLIC_DOUBTS_SCRIPT_URL`

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify the Google Apps Script URL is correct
3. Ensure the "Doubts" sheet exists with correct headers
4. Test the Apps Script URL directly in your browser
