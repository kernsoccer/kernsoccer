var Menu = function (controllers, startFunction)
{
    var optionsMenu;
    var menuPanel = document.getElementById("menu");

    var noTeamPanel = document.getElementById("noTeam");
    var blueTeamPanel = document.getElementById("blueTeam");
    var redTeamPanel = document.getElementById("redTeam");

    var redTeam = [];
    var blueTeam = [];
    var noTeam = [];
    
    var gamepads = [
        {
            index: 0,
            team: "none",
            connected: true,
            double: false,
            panel: document.getElementById("gamepad0"),
            idPanel: document.getElementById("controllerIdPanel0")
        },
        {
            index: 1,
            team: "none",
            connected: true,
            double: false,
            panel: document.getElementById("gamepad1"),
            idPanel: document.getElementById("controllerIdPanel1")
        },
        {
            index: 2,
            team: "none",
            connected: true,
            double: false,
            panel: document.getElementById("gamepad2"),
            idPanel: document.getElementById("controllerIdPanel2")
        },
        {
            index: 3,
            team: "none",
            connected: true,
            double: false,
            panel: document.getElementById("gamepad3"),
            idPanel: document.getElementById("controllerIdPanel3")
        }
    ];

    function hide()
    {
        menuPanel.style.display = "none";
        document.body.style.cursor = "none";
    }

    function show()
    {
        setMappings();
        menuPanel.style.display = "inherit";
        document.body.style.cursor = "auto";
    }

    function updateGamepad(gamepad, controller)
    {
        gamepad.idPanel.innerText = controller.getId();
        if (!controller.isConnected())
        {
            if (gamepad.connected)
            {
                gamepad.connected = false;
                removeGamepad(gamepad);
            }
            return;
        }
        if (!gamepad.connected)
        {
            gamepad.connected = true;
            addGamepad(gamepad);
        }

        if (controller.get("menuRight"))
        {
            if (gamepad.team == GAME_TEAM_RED)
            {
                switchPanel(gamepad.panel, noTeamPanel);
                gamepad.team = "none";
            } else if (gamepad.team == "none")
            {
                switchPanel(gamepad.panel, blueTeamPanel);
                gamepad.team = GAME_TEAM_BLUE;
            }
        }
        else if (controller.get("menuLeft"))
        {
            if (gamepad.team == GAME_TEAM_BLUE)
            {
                switchPanel(gamepad.panel, noTeamPanel);
                gamepad.team = "none";
            } else if (gamepad.team == "none")
            {
                switchPanel(gamepad.panel, redTeamPanel);
                gamepad.team = GAME_TEAM_RED;
            }
        }

        if (controller.get("double"))
        {
            gamepad.double = !gamepad.double;
            if (gamepad.double)
            {
                gamepad.panel.classList.add("double");
            }
            else
            {
                gamepad.panel.classList.remove("double");
            }
        }
    }

    function update()
    {
        for (var i = 0; i < controllers.length; i++)
        {
            updateGamepad(gamepads[i], controllers[i]);
            if (controllers[i].get("start"))
            {
                startGame();
                return;
            }
        }
    }

    function switchPanel(panel, container)
    {
        panel.parentNode.removeChild(panel);
        container.appendChild(panel);
    }

    function addGamepad(gamepad)
    {
        gamepad.panel.style.display = "inherit";
    }

    function removeGamepad(gamepad)
    {
        gamepad.panel.style.display = "none";
    }
    
    function startGame()
    {
        var players = [];
        for (var i = 0; i < gamepads.length; i++)
        {
            if (gamepads[i].connected && gamepads[i].team != "none")
            {
                players.push({
                    gamePadIndex: i,
                    team: gamepads[i].team,
                    pawnCount: gamepads[i].double ? 2 : 1
                });
            }
        }
        if (players.length == 0)
        {
            return;
        }

        hide();

        var gameOptions = optionsMenu.getGameOptions();
        gameOptions.players = players;
        
        startFunction(gameOptions);
    }

    function setMappings() {
        for (var i = 0; i < 4; i++) {
            controllers[i].setMapping(
                PLAYER_INPUT_MAPPINGS["menu"]);
        }
    }

    function init()
    {
        setMappings();
        optionsMenu = OptionsMenu(this);
        optionsMenu.init();
    }

    return {
        hide: hide,
        show: show,
        update: update,
        init: init
    };
}