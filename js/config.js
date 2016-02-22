// HTML ELEMENT IDS //
var SCORE_PANEL_BLUE = "blueScore";
var SCORE_PANEL_RED = "redScore";

// SCREEN //
var SCREEN_WIDTH = 1920;
var SCREEN_HEIGHT = 1080;

// GAME //
var GAME_TEAM_RED = "red";
var GAME_TEAM_BLUE = "blue";
var GAME_AFTER_GOAL_TIME = 2000;
var GAME_PLAYER_KICKOFF_DISTANCE = 100;

// FIELD //
var FIELD_WIDTH = 1700;
var FIELD_HEIGHT = 950;

var FIELD_LINE_RESTITUTION = 0.7;
var FIELD_OUTER_RESTITUTION = 0;

var FIELD_GOAL_SIZE = 200;
var FIELD_GOAL_RESTITUTION = 3;

var FIELD_NET_DEPTH = 50;
var FIELD_NET_WIDTH = 180;
var FIELD_NET_RESTITUTION = 0;
var FIELD_NET_RENDER_FILLSTYLE = "grey";

var FIELD_CIRCLE_SIZE = 250;
var FIELD_CIRCLE_PARTS = 20;


// PLAYER //
// PLAYER RENDER
var PLAYER_RENDER_STROKESTYLE_IDLE = "black";
var PLAYER_RENDER_STROKESTYLE_KICKING = "white";
var PLAYER_RENDER_LINEWIDTH = 4;
// PLAYER PHYSICS
var PLAYER_MASS = 2;
var PLAYER_FRICTION = 0;
var PLAYER_INERTIA = Number.POSITIVE_INFINITY;
var PLAYER_RESTITUTION = 0.0;
var PLAYER_FRICTION_AIR = 0.02;
var PLAYER_FRICTION_AIR_KICKING = 0.04;
var PLAYER_MOVE_FORCE = 0.001;
var PLAYER_MOVE_FORCE_KICKING = 0.0005;
// PLAYER INPUT
var PLAYER_KICK_FORCE = 0.035;
var PLAYER_INPUT_DEAD_ZONE = 0.2;
var PLAYER_INPUT_OPTIONS = [
  {
    axesX: 0,
    axesY: 1,
    kickers: [0,4,6]
  },
  {
    axesX: 2,
    axesY: 3,
    kickers: [5,7]
  }
]

// BALL //
// BALL RENDER
var BALL_RENDER_FILLSTYLE = "white";
var BALL_RENDER_STROKESTYLE = "black";
var BALL_RENDER_LINEWIDTH = 4;
// BALL PHYSICS
var BALL_RADIUS = 15;
var BALL_RESTITUTION = 0;
var BALL_MASS = 1;
var BALL_FRICTION = 0;
var BALL_INERTIA = Number.POSITIVE_INFINITY;

// COLLISION CATEGORIES //
var CATEGORY = {
  BALL: 1,
  PLAYER: 2,
  RESTRICT_BALL: 4
}

// GAME STATES //
var GAME_STATE = {
  RUNNING: 0,
  PAUSED: 1,
  WARMUP: 2,
  AFTER_GOAL: 3
}

// MY LITTLE CONSOLE HELPERS

//for (var i = 0; i < navigator.getGamepads()[1].buttons.length; i++) { console.log(i + ": " + navigator.getGamepads()[1].buttons[i].pressed); }
