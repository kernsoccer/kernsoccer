var Player = function (engine, gamePadIndex, team, pawnCount) {
  var bodies = [];
  function createBody(position) {
    return Matter.Bodies.circle(position.x, position.y, PLAYER_RADIUS, {
      restitution: PLAYER_RESTITUTION,
      mass: PLAYER_MASS,
      friction: PLAYER_FRICTION,
      inertia: PLAYER_INERTIA,
      frictionAir: PLAYER_FRICTION_AIR,
      render: {
        fillStyle: team,
        strokeStyle: PLAYER_RENDER_STROKESTYLE_IDLE,
        lineWidth: PLAYER_RENDER_LINEWIDTH_IDLE
      },
      collisionFilter: {
        category: CATEGORY.PLAYER,
        mask: CATEGORY.BALL | CATEGORY.PLAYER
      },
      isPlayer: true,
      isKicking: false
    });
  }

  function clear() {
    for (var i = 0; i < bodies.length; i++) {
      Matter.World.remove(engine.world, bodies[i]);
    }
  }

  function reset(positions) {
    clear();
    bodies = [];
    for (var i = 0; i < positions.length; i++) {
      var body = createBody(positions[i]);
      bodies.push(body);
      Matter.World.add(engine.world, body);
    }
  }

  function updateBody(gamePadState, prevButtonState, body, inputOptions) {
    var x = gamePadState.axes[inputOptions.axesX];
    var y = gamePadState.axes[inputOptions.axesY];
    var currentButtonState = [];
    var newButtonPressed = false, anyButtonPressed = false;
    for (var i = 0; i < inputOptions.kickers.length; i++) {
      currentButtonState[inputOptions.kickers[i]] =
        gamePadState.buttons[inputOptions.kickers[i]].pressed;

      if (gamePadState.buttons[inputOptions.kickers[i]].pressed) {
        anyButtonPressed = true;
        if (!prevButtonState[inputOptions.kickers[i]]) {
          newButtonPressed = true;
        }
      }
    }

    body.isKicking = (newButtonPressed || (anyButtonPressed && body.isKicking));

    var vect = Matter.Vector.create(x,y);
    // Apply force to body if stick is out of dead zone.
    if (Matter.Vector.magnitude(vect) > PLAYER_INPUT_DEAD_ZONE) {
      Matter.Body.applyForce(body, body.position,Matter.Vector.mult(
          vect, body.isKicking?PLAYER_MOVE_FORCE_KICKING:PLAYER_MOVE_FORCE));
    }

    body.render.strokeStyle = (body.isKicking) ?
      PLAYER_RENDER_STROKESTYLE_KICKING : PLAYER_RENDER_STROKESTYLE_IDLE;

    body.render.lineWidth = body.isKicking ?
      PLAYER_RENDER_LINEWIDTH_KICKING : PLAYER_RENDER_LINEWIDTH_IDLE;

    body.frictionAir = (body.isKicking) ?
      PLAYER_FRICTION_AIR_KICKING : PLAYER_FRICTION_AIR;

    return currentButtonState;
  }

  var prevButtonStates = [[],[]];
  function update(gamePadState) {
    if (gamePadState !== undefined) {
      for (var i = 0; i < bodies.length; i++) {
        prevButtonStates[i] = updateBody(
          gamePadState, prevButtonStates[i],
          bodies[i], PLAYER_INPUT_OPTIONS[i]);
      }
    }
  }

  return {
    clear: clear,
    reset: reset,
    update: update,
    team: team,
    pawnCount: pawnCount,
    gamePadIndex: gamePadIndex
  }
};
