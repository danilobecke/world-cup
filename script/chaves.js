function init_brackets() {  
    render_round_16();
    render_quarters();
    render_semi();
    render_final();
}

function render_round_16() {
    let cards = extract_cards("#round-16")
    let matches = round_16["matches"]
    render_data(matches, cards)
}

function render_quarters() {
    let cards = extract_cards("#quarters")
    let matches = quarters["matches"]
    render_data(matches, cards)
}

function render_semi() {
    let cards = extract_cards("#semi")
    let matches = semi["matches"]
    render_data(matches, cards)
}

function render_final() {
    let cards = extract_cards("#final")
    let matches = final["matches"]
    render_data(matches, cards)
}

function extract_cards(id) {
    return $(id).children().filter(function(index, element) { return $(element).hasClass("card")  })
}

function render_data(matches, cards) {
    matches.forEach(function(match, index) {
        let date = match["date"]
        let first_team = match["first_team"]
        let second_team = match["second_team"]
        if(!first_team) {
            first_team = {"name": "A definir", "acronym": "unknown", "score": null, "winner": false}
        }
        if(!second_team) {
            second_team = {"name": "A definir", "acronym": "unknown", "score": null, "winner": false}
        }
        render_game(date, first_team, second_team, cards[index])
    });
}

function render_game(date, first_team, second_team, card) {
    $(card).children().each(function(index, row) {
        switch(index) {
            case 0:
                // date
                $(row).html(date);
                break;
            case 1:
            case 2:
                // teams
                let team;
                if(index == 1) {
                    team = first_team
                } else {
                    team = second_team
                }
                $(row).children().each(function(colum_index, column) {
                    switch(colum_index) {
                        case 0:
                            // name & image
                            let children = $(column).children()
                            $(children[1]).html(team["name"])
                            if(team["acronym"] == "unknown") {
                                $(children[0]).removeAttr("src");
                            } else {
                                $(children[0]).attr("src", "https://countryflagsapi.com/png/" + team["acronym"]);
                            }
                            break
                        case 1:
                            // result & winner
                            let children_r = $(column).children()
                            $(children_r[0]).html(team["score"])
                            if(!team["winner"]) {
                                $(children_r[1]).css("visibility", "hidden")
                            } else {
                                $(children_r[1]).css("visibility", "visible")
                            }
                            break
                    }
                })
                break;
        }
    })
}