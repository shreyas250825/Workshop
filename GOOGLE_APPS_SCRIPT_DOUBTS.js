// Google Apps Script for Doubts Management
// Deploy this as a Web App with "Anyone" access

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Doubts');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Doubts sheet not found',
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getDataRange().getValues();
    
    // Skip header row and map data
    const doubts = data.slice(1).map(row => ({
      id: row[0] || '',
      caseStudyTitle: row[1] || '',
      question: row[2] || '',
      userName: row[3] || '',
      isAnonymous: row[4] === 'Yes',
      timestamp: row[5] || ''
    })).filter(doubt => doubt.id); // Filter out empty rows

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: doubts
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      data: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Doubts');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Doubts sheet not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'submit') {
      // Add new doubt
      const id = 'doubt-' + new Date().getTime();
      const timestamp = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      sheet.appendRow([
        id,
        data.caseStudyTitle,
        data.question,
        data.userName,
        data.isAnonymous ? 'Yes' : 'No',
        timestamp
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Doubt submitted successfully'
      })).setMimeType(ContentService.MimeType.JSON);
      
    } else if (data.action === 'delete') {
      // Delete doubt with passcode validation
      const VALID_PASSCODE = '181818'; // Change this to your desired passcode
      
      if (data.passcode !== VALID_PASSCODE) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid passcode'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const allData = sheet.getDataRange().getValues();
      for (let i = 1; i < allData.length; i++) {
        if (allData[i][0] === data.doubtId) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: 'Doubt deleted successfully'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Doubt not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
