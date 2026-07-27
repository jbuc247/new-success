const fs = require('fs');
const path = 'c:\\Softly built updates\\MpesaListenerApp\\app\\src\\main\\java\\com\\softbuild\\mpesalistener\\MainActivity.kt';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove validPins completely and inject LICENSE_API_URL
content = content.replace(/private val validPins = arrayOf\([\s\S]*?\)/, 'private val LICENSE_API_URL = "https://softlybuilt-license-server.netlify.app/.netlify/functions/verify-license"');

// 2. Fix post() and body() in btnUnlock block
content = content.replace(
    /okhttp3\.RequestBody\.create\(okhttp3\.MediaType\.parse\("application\/json"\), payload\.toString\(\)\)/g,
    'payload.toString().toRequestBody("application/json".toMediaType())'
);
content = content.replace(
    /response\.body\(\)\?\.string\(\)/g,
    'response.body?.string()'
);

// 3. Remove resetInactivityTimer() from unlockApp()
content = content.replace(/private fun unlockApp\(\) \{\s*lockContainer\?\.visibility = View\.GONE\s*mainContainer\?\.visibility = View\.VISIBLE\s*resetInactivityTimer\(\)\s*\}/, 
    'private fun unlockApp() {\n        lockContainer?.visibility = View.GONE\n        mainContainer?.visibility = View.VISIBLE\n    }');

fs.writeFileSync(path, content, 'utf8');
console.log("Fixes applied");
