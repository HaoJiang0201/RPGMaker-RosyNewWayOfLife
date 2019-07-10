//=============================================================================

// VIPArcher_SkipTitle.js

//=============================================================================

 
/*:
 * @plugindesc Skip Title.
 * @author taroxd
 *
 * @param Test Only
 * @desc Whether to skip title only in playtest. true/false
 * @default true
 *
 * @help This plugin does not provide plugin commands.
 */

 

void function() {

    var parameters = PluginManager.parameters('VIPArcher_SkipTitle');

    var testOnly = parameters['Test Only'] !== 'false';

    if (!testOnly || location.search === '?test') {

        Scene_Title.prototype.start = function() {

            Stage.prototype.initialize.call(this);

            SceneManager.goto(Scene_Map);

        };

    }

}();

Scene_Title.prototype = Object.create(Scene_Map.prototype);