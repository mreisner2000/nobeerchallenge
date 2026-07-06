function triggerHeartbeat() {
    if (!CONFIG.effects.heartbeat) {
        return;
    }

    if (!document.body.classList.contains("endspurt")) {
        return;
    }

    document.body.classList.add("heartbeat");

    setTimeout(() => {
        document.body.classList.remove("heartbeat");
    }, 900);
}

setInterval(triggerHeartbeat, CONFIG.timing.heartbeatInterval);