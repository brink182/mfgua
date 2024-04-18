// ==UserScript==
// @name         MFGUA
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  make flowGPT usable again
// @author       You
// @match        https://flowgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flowgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const last = { send: [] };
    var oldSend = [];
    const marker = window.crypto.randomUUID().toLowerCase().replaceAll('-','');

    function initMenu() {
        const explore = document.querySelector("a[href='/explore']");
        if (explore === null) {
            console.log("menu not found");
        }

        const chat = document.createElement("a");
        chat.dataset[marker] = 'true';
        chat.href = "/chat";
        chat.innerHTML = '<div class="flex cursor-pointer items-center gap-4 transition-all duration-200 ease-in-out hover:text-fgMain-0 text-fgMain-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" class="xl:w-[8%] xl:h-[8%] w-[10%] h-[10%]"><path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path></svg><div class="text-1.5xs xl:text-2sm 2xl:text-[17px] font-semibold">Chat</div></div>';

        explore.parentNode.insertBefore(chat, explore);
    }

    function updateSidebar() {
        for (const aside of document.getElementsByTagName("aside")) {
            aside.parentNode.style.display = window.location.pathname === "/chat" ? "none" : null;
        }
    }

    function addSendButton(ref) {
        const text = ref.parentNode.firstElementChild;
        while (oldSend.length > 0) {
            const old = oldSend.pop();
            old.parentNode.removeChild(old);
        }
        if (text instanceof HTMLTextAreaElement === false) {
            console.log(["Textarea expected", text]);
            return;
        }

        const send = document.createElement("button");
        send.ariaLabel = "Send";
        send.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" focusable="false" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 13.0001H9V11.0001H3V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V13.0001Z"></path></svg>';
        send.className = ref.className;
        send.addEventListener('click', () => text.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true, cancelable: true, code: 'Enter', keyCode: 13})));

        ref.parentNode.insertBefore(send, ref);

        oldSend.push(send);
    }

    window.addEventListener('popstate', (ev) => console.log(ev));

    new MutationObserver(() => {
        if (document.querySelector("a[href='/chat'][data-" + marker + "='true']") === null) {
            initMenu();
        }
        updateSidebar();
        const chatMenu = document.querySelector("button[id^='menu-button-:r'].chakra-button.chakra-menu__menu-button");
        if (chatMenu !== null && !Object.is(last.chatMenu, chatMenu)) {
            last.chatMenu = chatMenu;
            addSendButton(chatMenu);
        }
    }).observe(document, {childList: true, subtree: true });
})();