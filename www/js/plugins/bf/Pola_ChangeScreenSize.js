/*:
 * @plugindesc 修改游戏窗口大小的插件（飞鼠的JS练习）
 * @author: Polatouche（飞鼠）
 * 
 * @param Screen width
 * @desc 游戏启动时游戏屏幕的宽度
 * 默认值：972
 * @default 972
 * 
 * @param Screen height
 * @desc 游戏启动时游戏屏幕的高度
 * 默认值：540
 * @default 540
 *
 * @help
 * 插件命令:
 *  ChangeScreenSize 1024 768 #修改分辨率为1024x768
 *  RestoreScreenSize #恢复为默认分辨率
 *  Fullscreen true #全屏
 */

// 1. 给用户提供填写参数的位置
 
var params = PluginManager.parameters("MND_ChangeScreenSize");
var isFullScreen = String(params["Full Screen on startup"] || false);
var screenWidth = Number(params["Screen width"]) || 972;
var screenHeight = Number(params["Screen height"]) || 540;

// 2. 是否已经全屏/如果没有则进行窗口大小设置
if(isFullScreen != "false" && isFullScreen) Graphics._switchFullScreen();
else setScreenSize(screenWidth, screenHeight);

// 3. 插件指令（方便在游戏中可以使用）
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    _Game_Interpreter_pluginCommand.call(this, command, args);

    switch(command){
        case "ChangeScreenSize"://修改分辨率，插件命令格式：ChangeScreenSize [width] [height]
            var _screenWidth = Number(args[0]) || 816;
            var _screenHeight = Number(args[1]) || 624;
            setScreenSize(_screenWidth, _screenHeight);
            break;
        case "RestoreScreenSize"://恢复为默认分辨率，插件命令格式：RestoreScreenSize
            setScreenSize(816, 624);
            break;
        case "Fullscreen"://进入或退出全屏，插件命令格式：Fullscreen true/false
            if(args[0] != "false" && args[0]) Graphics._requestFullScreen();
            else Graphics._cancelFullScreen();
            break;
        default: break;
    }
}

// 4. 设置窗口大小的函数的定义
function setScreenSize(screenWidth, screenHeight){
    var deltaWidth = screenWidth - window.innerWidth;
    var deltaHeight = screenHeight - window.innerHeight;  
    window.moveBy(- deltaWidth / 2, - deltaHeight / 2);
    window.resizeBy(deltaWidth, deltaHeight);
}

