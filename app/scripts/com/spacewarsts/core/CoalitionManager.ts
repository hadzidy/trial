/**
 * Created by had on 2/6/15.
 */

/// <reference path="./../display/SpaceShip.ts" />
/// <reference path="./../rockZones/SpaceRocks.ts" />
/// <reference path="../utils/math/getDistance.ts" />
/// <reference path="../SpaceWarsGame.ts" />

module com.spacewarsts.core {

    import Spaceship = display.Spaceship;
    import SpaceRocks = rockZones.SpaceRocks;
    import getDistance = utils.math.getDistance;
    //import SpaceWarsGame = spacewarsts.SpaceWarsGame;

    export class CoalitionManager extends createjs.EventDispatcher {

        private _shipHitArea:createjs.Shape;

        static ROCK_SHIP_COALITION_EVENT = "CoalitionManager.RockShipCoalitionEvent"

        constructor (private game:SpaceWarsGame) {
            super();
            this._shipHitArea = new createjs.Shape();


            this._shipHitArea.graphics.beginStroke("red")
                .setStrokeStyle(2)
                .drawCircle(0,0,game.ship.radius)
                .closePath();


            game.stage.addChild(this._shipHitArea);
        }

        update():void {
            this._shipHitArea.x = this.game.ship.x;
            this._shipHitArea.y = this.game.ship.y;
            //this.findeBulletsRocksCoalition();
            this.findRocksShipCoalition();
        }

        private findRocksShipCoalition():void {
            var radio_ship = this.game.ship.radius;
            var radio_roca;

            var allRocks = this.game.spaceRockManager.allRocks;
            var ship = this.game.ship;

            for(var index in allRocks){
                radio_roca= allRocks[index]["radius"];
                var a = {x:ship.x, y:ship.y};
                var b = {x:allRocks[index]['x'], y:allRocks[index]['y']};
                var distance = getDistance(a,b);
                if(distance < (radio_ship+radio_roca)){
                    this.dispatchEvent(new createjs.Event(CoalitionManager.ROCK_SHIP_COALITION_EVENT, false, false));
                }

            }
        }

        private findBulletRockCoalition():void{

        }


    }
}