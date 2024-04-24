# MFGUA - Make FlowGPT useable again
A Tempermonkey script that brings back a few features from the classic FlowGPT WebUI.
## Features
- Full access to the classic UI<sup>☥</sup>
- Improve usability on tablets by always showing a send button on the new chat page

<sup>☥</sup> This is possible because that page is still accesible for some devices. **Backup your important chats now**

# Installation
1. Install [Firefox](https://www.mozilla.org/firefox/new/) or another modern browser on your device
2. Install the [Tampermonkey](https://www.tampermonkey.net) plugin for your browser
3. Open the *mfgua.user.js* file in the [raw view](https://github.com/brink182/mfgua/raw/main/mfgua.user.js). Tampermonkey should detect the script and open the installation page.

If step 3 does not do anything usefull see [Tampermonkey FAQ](https://www.tampermonkey.net/faq.php#Q102) for alternative installation methods. The scripts full URL is https://github.com/brink182/mfgua/raw/main/mfgua.user.js

# Usage
Open [flowGPT](https://flowgpt.com) normaly and login. In the user menu (three dots right to your username on new UI or your avatar on classic UI) should appear the option "Toggle UI". The option loads the other UI variant.

# Known issues
- New chats do not show up on the classic chat page and vice versa
- The script's method for monitoring changes is not optimized. Performance might take a small hit.

# Unknown issues
The script is developed and tested on Firefox with Tempermonkey for Windows and Android. Other browsers/OSs/userscript plugins might or might not work. Patches welcome.
