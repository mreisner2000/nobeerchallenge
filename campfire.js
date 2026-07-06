function updateCampfireMode(percent) {

    if (!CONFIG.effects.campfireMode) {
        return;
    }

    document.body.classList.remove(
        "week1",
        "week2",
        "week3",
        "week4"
    );

    if (percent >= 75) {
        document.body.classList.add("week4");
    }
    else if (percent >= 50) {
        document.body.classList.add("week3");
    }
    else if (percent >= 25) {
        document.body.classList.add("week2");
    }
    else {
        document.body.classList.add("week1");
    }

}