//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.47;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.47] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x52866a=_0x1098;function _0x1499(){const _0x59e3b1=['hide','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','WASD','colSpacing','INOUTBACK','StatusBgType','initialBattleSystem','setMute','catchException','isWindowMaskingEnabled','PLAY','INOUTELASTIC','Scene_Skill_create','Abbreviation','MAXHP','NewGameCommonEventAll','HdrIv','KuvUm','bOQzb','STB','repositionEnemiesByResolution','UcDLX','anzCK','buttonAssistOk','subject','ConvertNumberToString','_lastX','processKeyboardHandling','updatePositionCoreEngineShakeOriginal','addEventListener','isMenuButtonAssistEnabled','statusEquipWindowRect','font-smooth','playCursor','text%1','textSizeEx','keyMapper','Padding','hyGEL','_backgroundSprite','_statusParamsWindow','SEPARATOR','CommandRect','OpenURL','_shakeSpeed','ParseEnemyNotetags','toFixed','Window_Base_update','inputWindowRect','_itemWindow','2703LEhELu','keypress','outlineColor','buttonAssistText%1','xparamFlatJS','Window_StatusBase_drawActorSimpleStatus','_index','Window','itemHit','Game_Picture_updateMove','drawCurrentParam','CVwIE','SEOTa','GRD','getColorDataFromPluginParameters','_effectsContainer','paramPlus','KANA','itypeId','battleSystem','adjustBoxSize','cursorPagedown','aPJTk','processFauxAnimationRequests','buttonAssistText5','HANJA','isAnimationOffsetXMirrored','eLSEC','riDLV','DashToggleR','Wait','drawIcon','QdVTH','_cacheScaleY','storeMapData','top','faces','Ukygt','ColorMaxLvGauge1','Sprite_Picture_updateOrigin','czZum','Window_NameInput_processHandling','SParamVocab6','AnimationID','setHandler','YDmyo','members','Sprite_Battler_startMove','rightArrowWidth','CTRL','ButtonHeight','Rate','setAttack','_skillTypeWindow','MEV','command105','SwitchToggleRange','isGamepadTriggered','Game_Map_setup','boxHeight','SEMICOLON','_tempActor','statusParamsWindowRect','contents','setupNewGame','XIrSz','keyRepeatWait','height','OPEN_BRACKET','_fauxAnimationSprites','Scene_Shop_create','blendFunc','skIfG','iJPYU','makeActionList','renderNoMask','isAnimationPlaying','setHome','visible','sAgFK','INOUTCUBIC','xXVPI','shift','getInputMultiButtonStrings','_statusEquipWindow','vertical','onKeyDown','_movementDuration','SellRect','tQNaK','stringKeyMap','BuyBgType','CoreEngine','ghNAM','Scene_Boot_updateDocumentTitle','SkillMenu','get','INEXPO','removeAllFauxAnimations','Enable','update','yQpsp','setup','playLoad','OuXrM','StatusRect','_screenY','SceneManager_initialize','drawGameTitle','F12','trim','CNT','toLocaleString','skillTypeWindowRect','_clientArea','evaluate','dZPpV','_goldWindow','DteEJ','makeInputButtonString','meVolume','isEnabled','Scene_MenuBase_mainAreaTop','expGaugeColor1','setSkill','option','fillText','prototype','F19','KQvSn','Window_NameInput_cursorDown','valueOutlineWidth','mainAreaTop','rRGla','FUNC','_stored_powerDownColor','ADD','backOpacity','createPointAnimationQueue','PxYDP','_forcedBattleSys','xkAFr','setBackgroundOpacity','pictureButtons','GoldFontSize','NUMPAD1','centerSprite','EVScu','areButtonsOutsideMainUI','ShowJS','buttonAssistKey3','onXhrError','Game_Interpreter_PluginCommand','removeChild','Window_Selectable_itemRect','_windowskin','_buttonType','Scene_Status_create','META','Sprite_Picture_loadBitmap','outlineColorGauge','SnapshotOpacity','isRepeated','isFauxAnimationPlaying','_menuButton','#%1','clamp','rowSpacing','DBCjx','reserveNewGameCommonEvent','battlebacks2','kwjtf','clone','numActions','processTimingData','nxvXr','_setupEventHandlers','([\x5c+\x5c-]\x5cd+)([%％])>','ExportCurMapText','_muteSound','TRG','boxWidth','TCR','drawActorExpGauge','fillStyle','_colorTone','RPGMAKER_VERSION','pendingColor','IconSParam0','checkCacheKey','INOUTQUAD','_inputString','xparamPlusJS','_refreshPauseSign','buttonAssistKey2','Y:\x20%1','3059259uyurTo','Input_shouldPreventDefault','_cache','maxLvGaugeColor1','CreateBattleSystemID','OptionsRect','battlebacks1','enemies','displayX','LShOe','F16','makeCommandList','INCIRC','xdg-open','ZzEFD','Bitmap_strokeRect','currentClass','EuiDP','AIwtB','pictureId','tilesets','DummyBgType','processBack','add','optionsWindowRect','cursorRight','makeCoreEngineCommandList','pnldC','_shouldPreventDefault','drawGauge','drawCurrencyValue','XPlpq','Sprite_Gauge_gaugeRate','updatePositionCoreEngineShakeRand','createCustomBackgroundImages','SRDxx','skillTypes','nmuzd','processDigitChange','constructor','UyPwz','_offsetY','Scene_Equip_create','OUTBACK','loadSystem','Spriteset_Base_updatePosition','integer','select','processKeyboardEnd','buttonAssistOffset1','sellWindowRect','doesNameContainBannedWords','setGuard','UWzGU','initCoreEngineScreenShake','TrVIz','%1〘Choice\x20Cancel〙%1','setBattleSystem','targetX','application/json','initMembersCoreEngine','CLOSE_CURLY_BRACKET','win32','MRF','Game_Interpreter_command355','toLowerCase','IconParam4','itemHitImprovedAccuracy','GoldOverlap','helpAreaTop','ParseItemNotetags','gxbEH','isActor','bitmap','applyForcedGameTroopSettingsCoreEngine','Upper\x20Left','PositionY','adjustSprite','Scene_Map_updateMainMultiply','Flat2','_stored_normalColor','_coreEngineShakeStyle','blockWidth','gaugeBackColor','initCoreEngine','ExportString','EpAeZ','menu','HOME','CategoryBgType','key%1','Window_NameInput_cursorUp','setCoreEngineScreenShakeStyle','iKJvz','Subtitle','PERCENT','printError','sFcKv','gVLHs','BlLsQ','Scene_Unlisted','uHHGk','iconWidth','INQUINT','processSoundTimings','vxFrz','stencilFunc','QoL','DamageColor','cos','drawActorLevel','MRG','right','onInputOk','Conditional\x20Branch\x20Script\x20Error','_lastPluginCommandInterpreter','BottomHelp','GhZzS','Spriteset_Base_update','ApplyEasing','_stored_mpGaugeColor1','filters','gainItem','zkxEv','ColorManager_loadWindowskin','EditBgType','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','Window_NameInput_initialize','addCommand','Manual','_drawTextOutline','attackSkillId','UEprH','xeePR','bBVPN','Bitmap_resize','_backSprite1','Control\x20Variables\x20Script\x20Error','responseText','ONE','scale','img/%1/','Game_Event_isCollidedWithEvents','advanced','reserveCommonEvent','updatePositionCoreEngineShakeHorz','_realScale','eventsXyNt','IconSParam9','processCursorMove','blt','areButtonsHidden','qplNp','isGamepadButtonPressed','process_VisuMZ_CoreEngine_Settings','Scene_Base_terminateAnimationClearBugFix','EZspm','retreat','pagedownShowButton','DATABASE','EVAL','wYYvl','match','WbuMG','dgqRf','_stored_deathColor','_baseSprite','pYwmd','itemBackColor1','_timerSprite','background','setupButtonImage','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','setViewportCoreEngineFix','ExportAllTroopText','ScaleY','refresh','Sprite_destroy','CommandBgType','Game_Picture_show','SwitchRandomizeRange','MultiKeyFmt','Window_NameInput_processTouch','IconSParam3','active','WDMeY','vzsSw','WIN_OEM_PA3','ZERO','EndingID','_slotWindow','kQkwS','BuyRect','isNormalPriority','backspace','onVGp','Game_Actor_paramBase','move','_battleField','isUseModernControls','oDsPr','isBusy','VisuMZ_2_BattleSystemBTB','PERIOD','WIN_OEM_ATTN','InputRect','_pagedownButton','Symbol','AnLwH','processCursorMoveModernControls','pixelated','gLkbO','DECIMAL','ColorCTGauge1','_stored_pendingColor','iGheZ','_gamepadWait','updateMotion','processTouchModernControls','sv_actors','PictureID','WIN_ICO_00','paramBaseAboveLevel99','CLEAR','WIN_OEM_COPY','opacity','loadBitmap','IconParam0','center','Scene_MenuBase_mainAreaHeight','ForceNoPlayTest','END','_commonEventLayers','Plus1','pqzYJ','createFauxAnimation','moveRelativeToResolutionChange','RegExp','StatusEquipRect','includes','call','BannedWords','CTB','ColorTPGauge2','traitObjects','tpGaugeColor2','initButtonHidden','imageSmoothingEnabled','setAction','ExtractStrFromList','isExpGaugeDrawn','BoxMargin','PRINTSCREEN','process_VisuMZ_CoreEngine_CustomParameters','_stored_tpCostColor','_sellWindow','getColor','Renderer','isEnemy','NUMPAD4','titleCommandWindow','buyWindowRect','buttonAssistKey1','_coreEasing','paramFlatJS','abs','terms','gAPtt','fXlto','DisplayedParams','kPomT','createJsQuickFunction','_stored_maxLvGaugeColor1','sSYyn','Scene_MenuBase_helpAreaTop','IOUzw','RightMenus','WIN_ICO_CLEAR','SystemLoadAudio','reduce','setTargetAnchor','Flat1','ParseArmorNotetags','BUQXW','_storedStack','buttons','runCombinedScrollingTextAsCode','Chance','WIN_OEM_RESET','_stored_gaugeBackColor','show','sparamFlat1','exportAllMapStrings','isItemStyle','setSize','title','BACK_QUOTE','measureText','enter','enemy','parseForcedGameTroopSettingsCoreEngine','paramName','SUBTRACT','COLON','transform','zFgve','contentsBack','end','AGKWI','erasePicture','Window_NameInput_cursorPagedown','buttonAssistWindowButtonRect','original','STRUCT','Rate2','Script\x20Call\x20Error','wait','usbAg','_movementWholeDuration','ZFqiw','description','PHA','PA1','maxBattleMembers','MainMenu','CommandList','save','ffzKQ','IconXParam0','setClickHandler','AeaWF','SyvAD','SJCCQ','indexOf','ItemHeight','getPointAnimationLayer','189016JHcycX','loadMapData','SELECT','_context','deselect','drawBackgroundRect','updatePictureAntiZoom','Game_Actor_changeClass','F18','Scene_MenuBase_createPageButtons','Scene_Name_onInputOk','eLwzi','MULTIPLY','StatusMenu','AwWVF','Window_Base_drawText','INyhn','uiAreaWidth','_onKeyPress','gOCMa','toUpperCase','kPUcm','updatePointAnimations','style','initDigitGrouping','mainCommandWidth','kqzzj','MzzBe','isSceneBattle','zZzkF','tlgaV','GoldMax','szpVr','normalColor','ilSig','YFtkJ','isCollidedWithEvents','_windowLayer','targetY','playCancel','animations','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SHIFT','Window_Selectable_drawBackgroundRect','areTileShadowsHidden','platform','animationBaseDelay','ColorTPCost','rqEDq','PQXFG','ColorExpGauge1','_dimmerSprite','_mode','LKMtS','KQcgF','TAB','OpenSpeed','_mirror','XParamVocab7','nsbBk','IconIndex','_number','isBottomButtonMode','RCWTQ','updateCoreEasing','%1:\x20Exit\x20','DefaultMode','ShowItemBackground','ATTN','status','exportAllTroopStrings','inBattle','snapForBackground','titles1','isSpecialCode','NqLvc','Title','ActorBgType','_pictureContainer','setupBattleTestItems','Bitmap_blt','catchUnknownError','fontSize','width','onEscapeSuccess','isPointAnimationPlaying','anchor','_maxDigits','PRINT','ColorMPGauge1','profileWindowRect','fillRect','targetScaleX','refreshDimmerBitmap','yScrollLinkedOffset','WIN_OEM_FJ_MASSHOU','_createInternalTextures','Mute','SystemSetBattleSystem','EnableMasking','missed','buttonAssistSwitch','randomJS','KeySHIFT','exp','KEEP','consumeItem','NUMPAD7','params','Game_Interpreter_command111','HAbZT','startShake','4fBTfyl','Window_StatusBase_drawActorLevel','_inputSpecialKeyCode','_shakePower','HzohX','IconParam1','alpha','ImgLoad','itemRect','subjectHitRate','_bitmap','paramRateJS','STENCIL_TEST','updateData','dashToggle','processKeyboardDigitChange','isPhysical','mUVVo','exit','powerDownColor','allowShiftScrolling','WIN_OEM_ENLW','BTestItems','URL','createMenuButton','sRrjM','Scene_Menu_create','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','drawGoldItemStyle','ColorExpGauge2','JMONc','batch','INELASTIC','en-US','left','ColSpacing','buttonAssistOffset3','startAnimation','Scene_Base_createWindowLayer','pointY','tJYjL','6957WsNPxp','》Comment《\x0a%1\x0a','dimColor2','measureTextWidthNoRounding','INBOUNCE','sceneTerminationClearEffects','NRikv','command111','Unnamed','TPB\x20WAIT','LLzFw','avrxR','updateBackOpacity','AtKko','TextManager_param','processKeyboardDelete','_opacity','isSceneMap','RowSpacing','NUMPAD9','F7key','onload','Bitmap_fillRect','_upArrowSprite','clearCachedKeys','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','categoryWindowRect','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Game_Troop_setup','Scene_GameEnd_createBackground','isBottomHelpMode','_commandWindow','addChildToBack','ExportStrFromAllTroops','startNormalGame','markCoreEngineModified','Graphics_defaultStretchMode','InputBgType','isNwjs','_cacheScaleX','ColorMPCost','setupCoreEasing','HIT','buttonAssistText2','performMiss','SCALE_MODES','darwin','openURL','paramMax','CjHBR','AccuracyBoost','list','fromCharCode','_backSprite2','ijWwh','isNumpadPressed','_stored_tpGaugeColor2','Plus2','sparamRateJS','jUwlc','buttonAssistCancel','onDatabaseLoaded','updateOpen','RIGHT','%1〘End\x20Choice\x20Selection〙%1','playMiss','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_hideButtons','dlnLN','gJDtz','_stored_mpGaugeColor2','Game_Actor_levelUp','nah','xparamPlus','resetTextColor','ItemMenu','VisuMZ_2_BattleSystemPTB','EQUAL','picture','_active','FwXlO','ExtractStrFromMap','gradientFillRect','createFauxAnimationQueue','setBackgroundType','_categoryWindow','Flat','gqcJj','setActorHome','playEscape','normal','destroy','createButtonAssistWindow','statusWindowRect','helpAreaTopSideButtonLayout','numberWindowRect','DimColor2','_scene','_pageupButton','isOpen','FontSmoothing','createPointAnimationSprite','_currentMap','_closing','hdnoR','_colorCache','0.00','Spriteset_Battle_createEnemies','WIN_OEM_FJ_LOYA','FontSize','Bitmap_drawTextOutline','_digitGroupingEx','IconParam7','aPgjK','YXVGb','CallHandlerJS','ParamArrow','fhwof','kBolh','useFontWidthFix','_numberWindow','applyCoreEasing','Window_NumberInput_start','Keyboard','helpWindowRect','render','Bitmap_clearRect','Param','HelpBgType','ColorMaxLvGauge2','rPVDM','NameInputMessage','DTB','eva','displayY','process_VisuMZ_CoreEngine_jsQuickFunctions','xcxOj','F6key','bgmVolume','VisuMZ_2_BattleSystemETB','determineSideButtonLayoutValid','_stored_powerUpColor','BgFilename1','zizfr','WIN_OEM_PA1','hPUkC','layoutSettings','Window_Base_drawCharacter','goto','Game_Party_consumeItem','_coreEasingType','windowOpacity','ParseActorNotetags','WindowLayer_render','OutlineColorDmg','tKsBj','ModernControls','(\x5cd+)>','bitmapWidth','OUTQUINT','DigitGroupingGaugeSprites','OUTELASTIC','_backgroundFilter','_CoreEngineSettings','lEEaX','PictureCoordinatesMode','altKey','MODECHANGE','Smooth','characters','EISU','outlineColorDmg','isHandled','addLoadListener','_listWindow','SceneManager_onKeyDown','drawItem','anchorCoreEasing','UNDERSCORE','log','currencyUnit','processKeyboardBackspace','F13','mute','DimColor1','aqcnH','AntiZoomPictures','GHKXp','ktFsY','Game_Screen_initialize','disable','maxLevel','ShowButtons','removeFauxAnimation','KeyItemProtect','processKeyboardHome','IconSParam2','PictureEasingType','SParamVocab1','_duration','Sprite_Actor_setActorHome','Key%1','XkTok','makeDocumentTitle','PUgao','AllTroops','STENCIL_BUFFER_BIT','Version','F14','updateShadow','send','aFKWk','PvoVI','_isWindow','seVolume','SellBgType','SceneManager_isGameActive','paramWidth','xGFQj','yGWba','GoldRect','VOLUME_DOWN','addWindow','getLastPluginCommandInterpreter','SParamVocab2','BlendMode','commandWindowRows','getButtonAssistLocation','DefaultStyle','OnLoadJS','buttonAssistKey%1','stypeId','iYjDk','loadTitle1','F11','CEV','SideView','tileWidth','_optionsWindow','resetBattleSystem','loadIconBitmap','Spriteset_Base_destroy','playTestF6','createCustomParameter','tGBmn','_moveEasingType','openingSpeed','VOJjs','Game_Picture_x','process_VisuMZ_CoreEngine_Functions','_makeFontNameText','level','origin','titles2','PTB','targets','flush','Scene_Boot_onDatabaseLoaded','Total','_paramPlus','ConvertParams','_digitGrouping','RaIWX','Pxaqz','Spriteset_Base_initialize','_defaultStretchMode','F20','faceHeight','Sprite_Button_updateOpacity','setValue','OUTCIRC','concat','_targetOffsetY','AKWvU','showDevTools','UGIyp','DEF','paramValueByName','home','coreEngineRepositionEnemies','Game_Interpreter_command122','round','changeClass','LfxgI','_pictureCoordinatesWindow','_stored_systemColor','TranslucentOpacity','tpGaugeColor1','isPressed','NUMPAD5','scaleMode','originalJS','WCtIG','viewport','IRTOj','gainGold','isTouchedInsideFrame','ColorMPGauge2','itemLineRect','clearForcedGameTroopSettingsCoreEngine','scaleSprite','sVlPe','OkWOO','PDctP','updateMain','NUM_LOCK','ParamName','stop','MAT','LATIN1','keyboard','setFrame','needsUpdate','_addShadow','TitleCommandList','KeyUnlisted','SPjiA','XmQDL','rgba(0,\x200,\x200,\x201.0)','playTestF7','psgFP','exec','removeAllPointAnimations','onNameOk','Scene_Battle_createCancelButton','create','mainAreaHeight','PpmrJ','hQZYe','_tilemap','asin','SystemLoadImages','nhEJX','text','Map%1','yaavO','DrawItemBackgroundJS','isActiveTpb','EXR','ItemRect','DummyRect','calcEasing','SwitchToggleOne','Game_Action_itemHit','BgFilename2','ListRect','_margin','_forcedTroopView','hAkXF','Game_BattlerBase_initMembers','iconHeight','drawText','TextStr','forceOutOfPlaytest','min','_spriteset','cancel','PictureEraseAll','FunctionName','defineProperty','FDR','smoothSelect','isGameActive','CIRCUMFLEX','gaugeRate','Graphics_printError','fadeSpeed','ParamChange','_animationQueue','isItem','showPointAnimations','mainAreaHeightSideButtonLayout','qNxJh','_fauxAnimationQueue','QlUAf','Page','context','isSmartEventCollisionOn','CRI','canEquip','blGWG','defaultInputMode','OS_KEY','getCustomBackgroundSettings','Window_ShopSell_isEnabled','writeFile','Input_setupEventHandlers','QUESTION_MARK','ONE_MINUS_SRC_ALPHA','updatePadding','_statusWindow','CategoryRect','showPicture','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','inbounce','subtitle','processHandling','bgm','DigitGroupingExText','Color','CustomParamIcons','resetFontSettings','setSideView','bxxKo','xparamFlat2','loadTitle2','expRate','updateEffekseer','jVzQY','updatePlayTestF7','bgsVolume','PictureShowIcon','Sprite_Animation_processSoundTimings','mpCostColor','NeFDc','split','GsErK','start','paramRate2','_targetOffsetX','buttonAssistOffset%1','ParseTilesetNotetags','loadGameImagesCoreEngine','DocumentTitleFmt','onLoad','paramY','optSideView','mapId','buttonAreaHeight','Scene_Item_create','Troop%1','xparamRateJS','EquipMenu','dummyWindowRect','UghKy','setMoveEasingType','IconParam6','WIN_ICO_HELP','INOUTEXPO','StatusParamsBgType','textColor','duration','GoldIcon','QTfNJ','Scene_MenuBase_createCancelButton','sparamFlat2','LevelUpFullHp','StatusEquipBgType','loadPicture','_anchor','Layer','listWindowRect','WMmlt','MCR','uHZDF','push','Basic','maxGold','TextJS','odCbl','SlotBgType','ceil','PXuUK','CRSEL','NumberBgType','updateMove','isAlive','YrFUq','setLastPluginCommandInterpreter','encounterStepsMinimum','lineHeight','ButtonAssist','result','StartID','itemHeight','showFauxAnimations','BOtCC','ETB','_repositioned','pupyb','Origin','targetScaleY','_downArrowSprite','drawGameSubtitle','_dummyWindow','ctGaugeColor1','makeDeepCopy','isNextScene','UBczL','oHDuf','FTB','TNVxX','dJvjz','ExportAllMapText','_mapNameWindow','lpwMn','volume','ClIzL','_drawTextShadow','EVA','drawCharacter','buttonAssistOffset5','_destroyInternalTextures','levelUpRecovery','_hovered','code','hSlsh','itemBackColor2','VisuMZ_2_BattleSystemFTB','performEscape','Gold','OTB','ImprovedAccuracySystem','ShowDevTools','WIN_OEM_FINISH','onKeyDownKeysF6F7','MdpNx','lqVIv','gWOui','Bitmap_drawText','LvExpGauge','MwMyL','join','FadeSpeed','ZoOLP','hpGaugeColor1','hpGaugeColor2','ITPai','MDF','horzJS','system','mpGaugeColor1','apply','powerUpColor','Game_Temp_initialize','INOUTQUART','DOLLAR','XParamVocab5','SystemSetSideView','catchLoadError','shake','pDHil','filter','font','drawIconBySize','ipHKq','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','updateWaitMode','OwZOI','Scene_Map_initialize','oWSAh','hpColor','EXECUTE','Window_NameInput_cursorPageup','IconXParam3','setMainFontSize','Scene_Battle_createSpriteset','actorWindowRect','Window_NameInput_cursorLeft','isGamepadConnected','_refreshArrows','BackOpacity','HaBOn','onClick','createPageButtons','removePointAnimation','QbDtI','createPointAnimationTargets','MAXMP','encounterStep','processPointAnimationRequests','StatusParamsRect','gameTitle','DrawIcons','vVkjr','createTroopNote','dzKnv','moveCancelButtonSideButtonLayout','animationId','QTxmE','IconXParam5','FDRIB','Scene_Map_updateScene','EXCLAMATION','NewGameBoot','mpColor','TextCodeClassNames','Nojim','string','ARRAYJSON','createCancelButton','EncounterRateMinimum','setActorHomeRepositioned','_pressed','hfibk','ListBgType','helpAreaBottom','elgMz','BACKSPACE','isCancelled','IconSParam7','DilMV','TPB\x20ACTIVE','deMrU','Center','ActorRect','xparamFlat1','F22','getInputButtonString','charCode','mhp','xparam','ButtonFadeSpeed','dUHyD','_sideButtonLayout','setupCoreEngine','XGJus','VOLUME_MUTE','processMoveCommand','isMVAnimation','XPxoU','_onKeyDown','rEOmN','_mp','paramX','setEasingType','Game_Picture_y','bHugs','qNvZx','pDfEp','updateScene','Type','isKeyItem','xparamRate2','vrlXc','gainSilentTp','number','Scene_Map_createMenuButton','parse','commandWindowRect','ParseClassNotetags','_lastOrigin','addChild','sparamFlatBonus','randomInt','Scene_Name_create','_offsetX','ARRAYNUM','tFocL','Window_Selectable_cursorDown','updateOpacity','applyEasing','pointX','_targetOpacity','_pollGamepads','uLRDr','ProfileRect','createPointAnimation','setSideButtonLayout','ColorCTGauge2','BattleManager_processEscape','targetSpritePosition','Scene_Boot_startNormalGame','test','itemSuccessRate','GoldChange','Rate1','Window_Gold_refresh','MOzhZ','onButtonImageLoad','vTWFT','skills','ARRAYSTRUCT','X:\x20%1','requestPointAnimation','isTriggered','XParamVocab0','hTOvt','pop','events','EnableJS','DigitGroupingDamageSprites','BgType','ExtJS','〘Common\x20Event\x20%1:\x20%2〙\x20End','_pointAnimationQueue','mainAreaBottom','tfYTa','skipBranch','Linear','LaZKD','ctrlKey','padZero','BaseTexture','initBasic','_balloonQueue','F21','MIN_SAFE_INTEGER','openness','IconParam3','IconXParam7','useDigitGrouping','isMagical','ProfileBgType','ExportStrFromAllMaps','PositionJS','pbner','MenuLayout','WVWSj','%2%1%3','_origin','_lastY','_actor','requestFauxAnimation','RevertPreserveNumbers','CustomParam','IconXParam9','CommandWidth','xNoHV','loadSystemImages','createChildSprite','_storedMapText','REPLACE','isPlaytest','OptionsBgType','WIN_OEM_WSCTRL','zEFwU','ParseWeaponNotetags','SlotRect','uiAreaHeight','DOWN','ParseAllNotetags','_inputWindow','initVisuMZCoreEngine','drawFace','param','OUTQUART','IconXParam6','ReenR','isCursorMovable','setActionState','ColorCrisis','Game_Picture_calcEasing','isOptionValid','remove','buttonAssistKey4','ItemBgType','cursorDown','worldTransform','child_process','isArrowPressed','Actor','RequireFocus','_playTestFastMode','INOUTQUINT','drawAllParams','Location','windowRect','INOUTCIRC','textWidth','KeyboardInput','Power','Max','max','updatePictureCoordinates','SzFGA','paramPlusJS','adjustPictureAntiZoom','sparamFlatJS','RepositionEnemies','AKZKJ','makeAutoBattleActions','veObf','CLOSE_PAREN','vvubM','PAUSE','maxItems','ColorPowerDown','isInputting','getBattleSystem','processCursorHomeEndTrigger','yLsnR','TimeProgress','button','tIJWo','NUMPAD2','Bitmap_drawCircle','%1〘Choice\x20%2〙\x20%3%1','updateFauxAnimations','vPbsx','btyRW','Window_Base_createTextState','ARRAYSTR','updateDocumentTitle','tab','mirror','type','_targetScaleX','Window_NumberInput_processDigitChange','process_VisuMZ_CoreEngine_RegExp','raMhQ','OutlineColor','itemPadding','mBguH','getBackgroundOpacity','uEYDi','moveMenuButtonSideButtonLayout','drawValue','reservePlayTestNewGameCommonEvent','WIN_OEM_PA2','smooth','_buyWindow','wjrqU','nIGSj','switchModes','Game_Action_itemEva','framebuffer','parameters','INSINE','<%1\x20%2:[\x20]','editWindowRect','TGR','charAt','item','smallParamFontSize','playCursorSound','expGaugeColor2','updateTransform','NewGameCommonEvent','_battlerName','INOUTSINE','ASTERISK','_isPlaytest','_isButtonHidden','_viewportSize','getLevel','PictureFilename','F24','skillId','getCoreEngineScreenShakeStyle','CLOSE_BRACKET','random','process_VisuMZ_CoreEngine_Notetags','_customModified','MDR','padding','animationShouldMirror','rEFyj','LyoHR','2729405PXVdbe','traitsPi','targetObjects','pOThi','name','Window_Base_drawIcon','createEnemies','toString','LuuvZ','Bitmap_measureTextWidth','_targetX','PreserveNumbers','_buttonAssistWindow','_targetAnchor','stretch','SLASH','_encounterCount','zVhDn','isMaskingEnabled','KeyTAB','sjYtb','cursorLeft','clearStencil','ALT','CancelText','Game_Interpreter_updateWaitMode','MeFnZ','XcBVa','vOLXb','_pointAnimationSprites','SParamVocab3','xparamPlus1','mainFontSize','Window_Selectable_processTouch','innerHeight','sparamRate1','canUse','OMWXL','itemWindowRect','equips','eIDZC','VOLUME_UP','updateLastTarget','CustomParamAbb','_helpWindow','playTestCtrlT','pagedown','TRGNu','_opening','Game_Character_processMoveCommand','alwaysDash','SkillTypeRect','ItemBackColor2','Speed','_updateFilterArea','useDigitGroupingEx','_targetY','checkSmartEventCollision','MAX_SAFE_INTEGER','playBuzzer','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','drawActorSimpleStatus','OptionsMenu','Plus','sparam','ScreenShake','clear','_mainSprite','DigitGroupingLocale','ActorMPColor','Input_clear','clearRect','paramBase','createBuffer','_commandList','repeat','_profileWindow','actor','createCommandWindow','setCoreEngineUpdateWindowBg','_clickHandler','maxLvGaugeColor2','_scaleY','XParamVocab9','ValueJS','endAnimation','paramchangeTextColor','_centerElement','CZMtJ','Scene_Map_createSpriteset','_stored_tpGaugeColor1','Mirror','ctrl','catchNormalError','eAcuN','buttonAssistOffset2','_stored_maxLvGaugeColor2','WnGjQ','initialLevel','map','CodeJS','command355','getGamepads','IconSParam6','EscapeAlways','dimColor1','atbActive','Sprite_Button_initialize','wholeDuration','updateAnchor','wPNkP','targetBackOpacity','setWindowPadding','GREATER_THAN','retrieveFauxAnimation','nextLevelExp','down2','REC','_stored_hpGaugeColor2','isAnimationForEach','movePageButtonSideButtonLayout','filterArea','BlurFilter','8526378DTQIbO','Scene_Battle_update','fdQlu','createBackground','itemEva','STR','GetParamIcon','QLMOY','BTB','CustomParamType','outbounce','PDR','DBZub','_list','length','WPNnb','ZrStW','buttonAssistWindowSideRect','EXSEL','repositionCancelButtonSideButtonLayout','terminate','resize','GoldBgType','ALTGR','〘Show\x20Text〙\x0a','calcCoreEasing','SmartEventCollisionPriority','measureTextWidth','GroupDigits','_refreshBack','JUNJA','IconSParam4','GCFkH','EQUALS','command122','NEAREST','nXwCH','setColorTone','sin','OUTCUBIC','ALWAYS','playOk','helpAreaHeight','stencilOp','WIN_OEM_AUTO','Settings','textHeight','ParseStateNotetags','ItemBackColor1','Game_Action_updateLastTarget','hit','Exported_Script_%1.txt','tpColor','buttonAssistText1','isSideView','AMPERSAND','destroyCoreEngineMarkedBitmaps','bind','isClosed','_centerElementCoreEngine','LINEAR','LevelUpFullMp','ATK','xparamPlus2','isMapScrollLinked','return\x200','ymxQy','replace','UdKMu','createSpriteset','5051322CFmJPC','Input_onKeyDown','_hp','Window_Base_drawFace','NameMenu','mainAreaTopSideButtonLayout','registerCommand','_pictureCoordinatesMode','DOUBLE_QUOTE','processTouch','data/','maxTp','version','Window_EquipItem_isEnabled','IconSet','F17','asaRb','ACCEPT','damageColor','processAlwaysEscape','mmp','updateClose','_shakeDuration','crisisColor','ScreenResolution','CIFsp','ENbtQ','CONTEXT_MENU','zpJJy','OkText','onMoveEnd','_pauseSignSprite','bgs','targetEvaRate','createTextState','yRSjE','_data','ZHkcp','XParamVocab8','tJZzA','currentExp','enableDigitGrouping','drawGameVersion','TextFmt','learnings','JobeA','eizgN','guardSkillId','Window_Selectable_processCursorMove','Spriteset_Base_isAnimationPlaying','IDs','none','MAX_GL_TEXTURES','MBDkE','SwitchRandomizeOne','AllMaps','_animation','NUVdW','ExportCurTroopText','eHkJb','drawActorClass','_stored_ctGaugeColor1','updateMainMultiply','children','HRG','GameEnd','format','setAnchor','connected','contains','AGI','_actorWindow','HelpRect','tileHeight','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','NUMPAD3','ExtractStrFromTroop','ibMkL','drawCircle','AlFtw','_internalTextures','EnableNameInput','NUMPAD8','Evyhi','keyCode','Window_NameInput_cursorRight','Window_NameInput_refresh','%1\x0a','UpdatePictureCoordinates','qivlr','DataManager_setupNewGame','numberShowButton','Input_update','LineHeight','_registerKeyInput','LUK','ColorSystem','ColorPowerUp','_baseTexture','QwertyLayout','initMembers','5512gEqsNg','_stored_crisisColor','touchUI','ParseSkillNotetags','startAutoNewGame','(\x5cd+)([%％])>','WIN_OEM_CLEAR','Game_System_initialize','IconXParam4','ColorHPGauge1','changeTextColor','createFauxAnimationSprite','innerWidth','image-rendering','floor','ZkWgG','isPlaying','createTitleButtons','WIN_OEM_JUMP','systemColor','yXPAH','Sprite_Animation_setViewport','_hideTileShadows','NdMZB','nickname','VisuMZ_1_OptionsCore','RzVgI','FJKoz','wGvZv','drawParamText','VisuMZ_2_BattleSystemCTB','retrievePointAnimation','pdIFl','createWindowLayer','down','RepositionActors','_height','faceWidth','vertJS','WIN_OEM_CUSEL','isFullDocumentTitle','restore','loadWindowskin','updatePosition','updateDashToggle','value','SideButtons','XParamVocab2','drawNewParam','IconParam2','Scene_Options_create','SaveMenu','currentLevelExp','LxtzO','BTestWeapons','JSON','Sprite_AnimationMV_processTimingData','currentValue','cursorPageup','enableDigitGroupingEx','VSEcf','note','ScaleX','TitlePicButtons','_cancelButton','Bitmap_gradientFillRect','open','initCoreEasing','maxCols','pageup','WIN_OEM_BACKTAB','Scene_Boot_loadSystemImages','initialize','sv_enemies','VcfNq','_width','BattleSystem','PixelateImageRendering','DigitGroupingStandardText','pictures','createDimmerSprite','Graphics_centerElement','FINAL','gaugeLineHeight','DKqao','SParamVocab4','Window_Base_initialize','command357','buttonAssistWindowRect','\x0a\x0a\x0a\x0a\x0a','onInputBannedWords','targetOpacity','zSWzl','xScrollLinkedOffset','isSideButtonLayout','VisuMZ_2_BattleSystemSTB','PGDN','index','VisuMZ_2_BattleSystemOTB','zVxOJ','zMXEV','getCombinedScrollingText','FkhGm','isRightInputMode','<JS\x20%1\x20%2:[\x20](.*)>','startMove','buttonAssistKey5','1.3.0','([\x5c+\x5c-]\x5cd+)>','MDDZX','Otkfj','cursorUp','eFIIT','_playtestF7Looping','ctGaugeColor2','sqrt','Game_Picture_move','gold','default','AnimationMirrorOffset','pages','ESC','goldWindowRect','Untitled','ColorNormal','DELETE','contentsOpacity','pow','CustomParamNames','Game_Interpreter_command105','sparamPlusJS','drawTextEx','_editWindow','evaded'];_0x1499=function(){return _0x59e3b1;};return _0x1499();}(function(_0x1bcaf9,_0x2a41d4){const _0x15132d=_0x1098,_0x2366b8=_0x1bcaf9();while(!![]){try{const _0x46ff1b=-parseInt(_0x15132d(0x85d))/0x1+parseInt(_0x15132d(0x295))/0x2+-parseInt(_0x15132d(0x921))/0x3*(-parseInt(_0x15132d(0x305))/0x4)+-parseInt(_0x15132d(0x67f))/0x5+parseInt(_0x15132d(0x740))/0x6+-parseInt(_0x15132d(0x6fa))/0x7+-parseInt(_0x15132d(0x7a5))/0x8*(-parseInt(_0x15132d(0x32e))/0x9);if(_0x46ff1b===_0x2a41d4)break;else _0x2366b8['push'](_0x2366b8['shift']());}catch(_0x447c31){_0x2366b8['push'](_0x2366b8['shift']());}}}(_0x1499,0xb04bb));var label=_0x52866a(0x8b9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x52866a(0x54c)](function(_0x22bd68){const _0x294b6a=_0x52866a;return _0x22bd68[_0x294b6a(0x2da)]&&_0x22bd68[_0x294b6a(0x285)][_0x294b6a(0x234)]('['+label+']');})[0x0];VisuMZ[label][_0x52866a(0x727)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x52866a(0x432)]=function(_0xbc8642,_0x3ba102){const _0x8a5a3e=_0x52866a;for(const _0x1097de in _0x3ba102){if(_0x1097de[_0x8a5a3e(0x1e7)](/(.*):(.*)/i)){const _0xff36f9=String(RegExp['$1']),_0x3acd02=String(RegExp['$2'])[_0x8a5a3e(0x2a9)]()[_0x8a5a3e(0x8cb)]();let _0x4a9759,_0x5910ea,_0x208ec1;switch(_0x3acd02){case'NUM':_0x4a9759=_0x3ba102[_0x1097de]!==''?Number(_0x3ba102[_0x1097de]):0x0;break;case _0x8a5a3e(0x5b5):_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea[_0x8a5a3e(0x6e2)](_0x4083fe=>Number(_0x4083fe));break;case _0x8a5a3e(0x1e5):_0x4a9759=_0x3ba102[_0x1097de]!==''?eval(_0x3ba102[_0x1097de]):null;break;case'ARRAYEVAL':_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea['map'](_0x5b74ee=>eval(_0x5b74ee));break;case _0x8a5a3e(0x7dc):_0x4a9759=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):'';break;case _0x8a5a3e(0x57b):_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea[_0x8a5a3e(0x6e2)](_0x543ff3=>JSON[_0x8a5a3e(0x5ac)](_0x543ff3));break;case _0x8a5a3e(0x8e3):_0x4a9759=_0x3ba102[_0x1097de]!==''?new Function(JSON['parse'](_0x3ba102[_0x1097de])):new Function(_0x8a5a3e(0x73b));break;case'ARRAYFUNC':_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea[_0x8a5a3e(0x6e2)](_0xc547fd=>new Function(JSON[_0x8a5a3e(0x5ac)](_0xc547fd)));break;case _0x8a5a3e(0x6ff):_0x4a9759=_0x3ba102[_0x1097de]!==''?String(_0x3ba102[_0x1097de]):'';break;case _0x8a5a3e(0x646):_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea[_0x8a5a3e(0x6e2)](_0x4867aa=>String(_0x4867aa));break;case _0x8a5a3e(0x27e):_0x208ec1=_0x3ba102[_0x1097de]!==''?JSON[_0x8a5a3e(0x5ac)](_0x3ba102[_0x1097de]):{},_0xbc8642[_0xff36f9]={},VisuMZ['ConvertParams'](_0xbc8642[_0xff36f9],_0x208ec1);continue;case _0x8a5a3e(0x5ce):_0x5910ea=_0x3ba102[_0x1097de]!==''?JSON['parse'](_0x3ba102[_0x1097de]):[],_0x4a9759=_0x5910ea[_0x8a5a3e(0x6e2)](_0xea001f=>VisuMZ[_0x8a5a3e(0x432)]({},JSON[_0x8a5a3e(0x5ac)](_0xea001f)));break;default:continue;}_0xbc8642[_0xff36f9]=_0x4a9759;}}return _0xbc8642;},(_0x252414=>{const _0x5e2dff=_0x52866a,_0x457504=_0x252414[_0x5e2dff(0x683)];for(const _0x2e29a6 of dependencies){if(!Imported[_0x2e29a6]){if(_0x5e2dff(0x8ae)===_0x5e2dff(0x75c))this[_0x5e2dff(0x8e9)]=_0x5e2dff(0x42c);else{alert(_0x5e2dff(0x2be)['format'](_0x457504,_0x2e29a6)),SceneManager[_0x5e2dff(0x317)]();break;}}}const _0x5406e2=_0x252414[_0x5e2dff(0x285)];if(_0x5406e2[_0x5e2dff(0x1e7)](/\[Version[ ](.*?)\]/i)){const _0xd2687d=Number(RegExp['$1']);if(_0xd2687d!==VisuMZ[label][_0x5e2dff(0x74c)]){if(_0x5e2dff(0x76e)!=='IlRLb')alert(_0x5e2dff(0x370)[_0x5e2dff(0x782)](_0x457504,_0xd2687d)),SceneManager['exit']();else{try{_0x365509['CoreEngine'][_0x5e2dff(0x446)][_0x5e2dff(0x235)](this,_0x250cbb);}catch(_0x309e78){_0xaf387a[_0x5e2dff(0x601)]()&&(_0x4aae73[_0x5e2dff(0x3e1)]('Control\x20Variables\x20Script\x20Error'),_0xed3665[_0x5e2dff(0x3e1)](_0x309e78));}return!![];}}}if(_0x5406e2[_0x5e2dff(0x1e7)](/\[Tier[ ](\d+)\]/i)){if(_0x5e2dff(0x1fe)===_0x5e2dff(0x46a)){const _0x3c4317=this[_0x5e2dff(0x407)](),_0xad137e=this[_0x5e2dff(0x89a)]['paramValueByName'](_0x10614a),_0x12753d=_0xad137e-this[_0x5e2dff(0x5f6)]['paramValueByName'](_0x446130);this[_0x5e2dff(0x7af)](_0x38e202[_0x5e2dff(0x6d5)](_0x12753d)),this['drawText'](this[_0x5e2dff(0x89a)]['paramValueByName'](_0x23551e,!![]),_0x28c9a6,_0x5cb6c3,_0x3c4317,_0x5e2dff(0x991));}else{const _0x27aa5b=Number(RegExp['$1']);_0x27aa5b<tier?(alert(_0x5e2dff(0x4b7)['format'](_0x457504,_0x27aa5b,tier)),SceneManager['exit']()):_0x5e2dff(0x3b0)===_0x5e2dff(0x3b0)?tier=Math[_0x5e2dff(0x629)](_0x27aa5b,tier):this[_0x5e2dff(0x65c)](_0x5e2dff(0x464));}}VisuMZ[_0x5e2dff(0x432)](VisuMZ[label]['Settings'],_0x252414[_0x5e2dff(0x65f)]);})(pluginData),PluginManager[_0x52866a(0x746)](pluginData['name'],'AnimationPoint',_0xb161f6=>{const _0x3123e5=_0x52866a;if(!SceneManager[_0x3123e5(0x38f)])return;if(!SceneManager[_0x3123e5(0x38f)][_0x3123e5(0x491)])return;VisuMZ[_0x3123e5(0x432)](_0xb161f6,_0xb161f6);const _0x40b05b=Math[_0x3123e5(0x447)](_0xb161f6[_0x3123e5(0x5ba)]),_0x281e2f=Math['round'](_0xb161f6[_0x3123e5(0x32c)]);$gameTemp[_0x3123e5(0x5d0)](_0x40b05b,_0x281e2f,_0xb161f6[_0x3123e5(0x888)],_0xb161f6[_0x3123e5(0x6da)],_0xb161f6[_0x3123e5(0x2f6)]);}),PluginManager[_0x52866a(0x746)](pluginData['name'],_0x52866a(0x51b),_0x22fabb=>{const _0x4ccf1d=_0x52866a;if(!$gameTemp[_0x4ccf1d(0x601)]())return;if(!Utils[_0x4ccf1d(0x354)]())return;SceneManager[_0x4ccf1d(0x38f)][_0x4ccf1d(0x37d)]=![],VisuMZ[_0x4ccf1d(0x8b9)][_0x4ccf1d(0x5ee)]();}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x1f3),_0x1077ee=>{const _0xc05b38=_0x52866a;if(!$gameTemp[_0xc05b38(0x601)]())return;if(!Utils['isNwjs']())return;SceneManager[_0xc05b38(0x38f)][_0xc05b38(0x37d)]=![],VisuMZ['CoreEngine'][_0xc05b38(0x34f)]();}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x90f),_0x2919b3=>{const _0x29cc0b=_0x52866a;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x29cc0b(0x4d9)]()<=0x0)return;VisuMZ[_0x29cc0b(0x432)](_0x2919b3,_0x2919b3);const _0x59a106=_0x29cc0b(0x47c)[_0x29cc0b(0x782)]($gameMap[_0x29cc0b(0x4d9)]()['padZero'](0x3)),_0x2d3735=VisuMZ[_0x29cc0b(0x8b9)][_0x29cc0b(0x37f)]($gameMap[_0x29cc0b(0x4d9)]());VisuMZ[_0x29cc0b(0x8b9)]['ExportString'](_0x2d3735,_0x59a106,!![]);}),PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x77a),_0x2b6de1=>{const _0x46ab61=_0x52866a;if(!$gameTemp[_0x46ab61(0x601)]())return;if(!Utils[_0x46ab61(0x354)]())return;if(!$gameParty[_0x46ab61(0x2dc)]())return;VisuMZ[_0x46ab61(0x432)](_0x2b6de1,_0x2b6de1);const _0x214542=_0x46ab61(0x4dc)['format']($gameTroop['_troopId'][_0x46ab61(0x5e2)](0x4)),_0x4d57d6=VisuMZ[_0x46ab61(0x8b9)]['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ[_0x46ab61(0x8b9)]['ExportString'](_0x4d57d6,_0x214542,!![]);}),VisuMZ['CoreEngine'][_0x52866a(0x976)]=function(_0x5ba60a,_0x5c5b4a,_0x525922){const _0x4bc486=_0x52866a,_0x5c9542=require('fs');let _0xc45580=_0x4bc486(0x72d)[_0x4bc486(0x782)](_0x5c5b4a||'0');_0x5c9542[_0x4bc486(0x4af)](_0xc45580,_0x5ba60a,_0x298040=>{const _0x534eac=_0x4bc486;if(_0x534eac(0x2c6)===_0x534eac(0x2c6)){if(_0x298040)throw err;else _0x525922&&alert(_0x534eac(0x1c3)[_0x534eac(0x782)](_0xc45580));}else return _0x55ce21;});},VisuMZ[_0x52866a(0x8b9)]['ExportStrFromAllMaps']=function(){const _0x458e9f=_0x52866a,_0x44f18d=[];for(const _0x3a4083 of $dataMapInfos){if(!_0x3a4083)continue;_0x44f18d[_0x458e9f(0x4f5)](_0x3a4083['id']);}const _0x327575=_0x44f18d[_0x458e9f(0x708)]*0x64+Math[_0x458e9f(0x5b2)](0x64);alert(_0x458e9f(0x550)[_0x458e9f(0x782)](_0x327575)),this['_storedMapText']=[],this['_currentMap']=$dataMap;for(const _0x2845f9 of _0x44f18d){VisuMZ['CoreEngine']['loadMapData'](_0x2845f9);}setTimeout(VisuMZ[_0x458e9f(0x8b9)]['exportAllMapStrings']['bind'](this),_0x327575);},VisuMZ['CoreEngine'][_0x52866a(0x296)]=function(_0x38af06){const _0x22fc05=_0x52866a,_0xade298='Map%1.json'[_0x22fc05(0x782)](_0x38af06[_0x22fc05(0x5e2)](0x3)),_0x2f941c=new XMLHttpRequest(),_0x4080da=_0x22fc05(0x74a)+_0xade298;_0x2f941c[_0x22fc05(0x7e7)]('GET',_0x4080da),_0x2f941c['overrideMimeType'](_0x22fc05(0x95c)),_0x2f941c[_0x22fc05(0x343)]=()=>this[_0x22fc05(0x87f)](_0x2f941c,_0x38af06,_0xade298,_0x4080da),_0x2f941c['onerror']=()=>DataManager[_0x22fc05(0x8f4)]('$dataMap',_0xade298,_0x4080da),_0x2f941c[_0x22fc05(0x400)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x87f)]=function(_0x9dc037,_0x415e39,_0x5b76bf,_0x388369){const _0xdbf895=_0x52866a;$dataMap=JSON[_0xdbf895(0x5ac)](_0x9dc037[_0xdbf895(0x1cf)]),DataManager[_0xdbf895(0x4d6)]($dataMap),this['_storedMapText'][_0x415e39]=VisuMZ[_0xdbf895(0x8b9)]['ExtractStrFromMap'](_0x415e39),$dataMap=this[_0xdbf895(0x394)];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x269)]=function(){const _0x874047=_0x52866a,_0x1c61bf=_0x874047(0x777);this[_0x874047(0x5ff)][_0x874047(0x616)](undefined)[_0x874047(0x616)]('')['remove'](null);const _0x4e06db=this['_storedMapText'][_0x874047(0x538)](_0x874047(0x7fe))[_0x874047(0x8cb)]();VisuMZ[_0x874047(0x8b9)][_0x874047(0x976)](_0x4e06db,_0x1c61bf,!![]),SceneManager[_0x874047(0x38f)][_0x874047(0x37d)]=!![];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x37f)]=function(_0x1423e1){const _0x4885c6=_0x52866a;if(!$dataMap)return'';let _0x5150ab='█'['repeat'](0x46)+'\x0a\x0a',_0x1da8c8='═'[_0x4885c6(0x6ca)](0x46)+'\x0a\x0a',_0x5b88b7='';this[_0x4885c6(0x22d)]=0x0;for(const _0x53e213 of $dataMap[_0x4885c6(0x5d5)]){if(!_0x53e213)continue;let _0xdd435=_0x53e213['id'],_0x573b66=_0x53e213['name'],_0x3e803b=_0x53e213[_0x4885c6(0x81d)];for(const _0x308588 of _0x3e803b){if(_0x4885c6(0x6a7)!=='TXnKO'){const _0x7758ab=_0x3e803b[_0x4885c6(0x292)](_0x308588)+0x1;let _0x2943b1=_0x1da8c8+_0x4885c6(0x347),_0x2cba01=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x308588[_0x4885c6(0x361)]);if(_0x2cba01[_0x4885c6(0x708)]>0x0){if(_0x4885c6(0x70a)===_0x4885c6(0x70a)){if(_0x5b88b7[_0x4885c6(0x708)]>0x0){if(_0x4885c6(0x5ca)!==_0x4885c6(0x4e0))_0x5b88b7+=_0x1da8c8+_0x4885c6(0x7fe);else return _0x51f812['CoreEngine']['Settings'][_0x4885c6(0x864)][_0x4885c6(0x328)];}else{if('gJDtz'===_0x4885c6(0x373)){const _0x3eb1e2=$dataMapInfos[_0x1423e1][_0x4885c6(0x683)];_0x5b88b7+=_0x5150ab+_0x4885c6(0x82c)[_0x4885c6(0x782)](_0x1423e1,_0x3eb1e2||_0x4885c6(0x336))+_0x5150ab;}else return _0x28a075[_0x4885c6(0x52b)](),_0x4c249e['playEscape'](),this[_0x4885c6(0x2e9)](),!![];}_0x5b88b7+=_0x2943b1[_0x4885c6(0x782)](_0xdd435,_0x573b66,_0x7758ab,_0x2cba01);}else _0x571b79['stencilFunc'](_0xd17a37[_0x4885c6(0x37b)],0x0,~0x0),_0x2b37f0[_0x4885c6(0x725)](_0x479a2f[_0x4885c6(0x2fe)],_0x44978e[_0x4885c6(0x2fe)],_0x44abd1['KEEP']),_0x53a6d3['render'](_0x1833fc),_0x223abb['batch'][_0x4885c6(0x42e)](),_0x5d23e3[_0x4885c6(0x6c1)](),_0x2f78bf['stencilFunc'](_0x37922a['ALWAYS'],0x1,~0x0),_0x28ab1d['stencilOp'](_0x390151['REPLACE'],_0x211a0e[_0x4885c6(0x600)],_0xe21256[_0x4885c6(0x600)]),_0x339ad1['blendFunc'](_0x49f691[_0x4885c6(0x201)],_0x1ab824[_0x4885c6(0x1d0)]),_0x70c9d3[_0x4885c6(0x3ab)](_0x3efb48),_0x25129d['batch'][_0x4885c6(0x42e)](),_0x5d6e7d['blendFunc'](_0x46ac2e[_0x4885c6(0x1d0)],_0x14c93d[_0x4885c6(0x4b2)]);}}else throw _0x26b2ae;}}return _0x5b88b7[_0x4885c6(0x708)]>0x0&&(_0x4885c6(0x77b)===_0x4885c6(0x31e)?_0x1e44da[_0x4885c6(0x6e9)]=![]:_0x5b88b7+=_0x1da8c8),_0x5b88b7;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x34f)]=function(){const _0x22198a=_0x52866a,_0x524ebb=$dataTroops['length']*0xa+Math['randomInt'](0xa);alert(_0x22198a(0x78a)['format'](_0x524ebb));const _0x510f=[];for(const _0x324787 of $dataTroops){if(!_0x324787)continue;const _0x15f2bb=_0x324787['id'];_0x510f[_0x15f2bb]=VisuMZ[_0x22198a(0x8b9)]['ExtractStrFromTroop'](_0x15f2bb);}setTimeout(VisuMZ[_0x22198a(0x8b9)][_0x22198a(0x2db)][_0x22198a(0x733)](this,_0x510f),_0x524ebb);},VisuMZ['CoreEngine'][_0x52866a(0x78c)]=function(_0x23968c){const _0x4eab61=_0x52866a;if(!$dataTroops[_0x23968c])return'';let _0x4c2ec4='█'['repeat'](0x46)+'\x0a\x0a',_0x4d0769='═'[_0x4eab61(0x6ca)](0x46)+'\x0a\x0a',_0x145a4c='';this[_0x4eab61(0x22d)]=0x0;const _0x523f48=$dataTroops[_0x23968c];let _0x571deb=_0x523f48[_0x4eab61(0x81d)];for(const _0x8f1f68 of _0x571deb){const _0x18ad63=_0x571deb['indexOf'](_0x8f1f68)+0x1;let _0x3efd06=_0x4d0769+_0x4eab61(0x1f1),_0x272cbf=VisuMZ[_0x4eab61(0x8b9)][_0x4eab61(0x23e)](_0x8f1f68[_0x4eab61(0x361)]);if(_0x272cbf[_0x4eab61(0x708)]>0x0){if(_0x145a4c[_0x4eab61(0x708)]>0x0)_0x145a4c+=_0x4d0769+_0x4eab61(0x7fe);else{if(_0x4eab61(0x933)!==_0x4eab61(0x851))_0x145a4c+=_0x4c2ec4+_0x4eab61(0x320)[_0x4eab61(0x782)](_0x23968c,_0x523f48[_0x4eab61(0x683)]||_0x4eab61(0x336))+_0x4c2ec4;else return this[_0x4eab61(0x671)]();}_0x145a4c+=_0x3efd06[_0x4eab61(0x782)](_0x18ad63,_0x272cbf);}}if(_0x145a4c[_0x4eab61(0x708)]>0x0){if(_0x4eab61(0x5d3)===_0x4eab61(0x516)){_0x16f2ca[_0x4eab61(0x432)](_0x49c95c,_0x3eed63);const _0x2ac15f=_0x3d8a8f[_0x4eab61(0x8da)]||0x1;_0x5be3ec['setWindowPadding'](_0x2ac15f);}else _0x145a4c+=_0x4d0769;}return _0x145a4c;},VisuMZ['CoreEngine'][_0x52866a(0x2db)]=function(_0x2b371b){const _0x4d2866=_0x52866a,_0x29b897=_0x4d2866(0x3fb);_0x2b371b['remove'](undefined)[_0x4d2866(0x616)]('')['remove'](null);const _0x3d0dbc=_0x2b371b[_0x4d2866(0x538)](_0x4d2866(0x7fe))['trim']();VisuMZ[_0x4d2866(0x8b9)][_0x4d2866(0x976)](_0x3d0dbc,_0x29b897,!![]),SceneManager[_0x4d2866(0x38f)][_0x4d2866(0x37d)]=!![];},VisuMZ['CoreEngine'][_0x52866a(0x23e)]=function(_0x595645){const _0x4b099b=_0x52866a;let _0x28a0f0='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x567f36='\x0a'+'┄'[_0x4b099b(0x6ca)](0x46)+'\x0a',_0x539df1='';for(const _0x4be952 of _0x595645){if(_0x4b099b(0x54b)===_0x4b099b(0x454))_0x3a83d5[_0x4b099b(0x8b9)][_0x4b099b(0x3eb)][_0x4b099b(0x235)](this),this[_0x4b099b(0x957)]();else{if(!_0x4be952)continue;if(_0x4be952['code']===0x65){_0x539df1+=_0x28a0f0+'\x0a',_0x539df1+=_0x4b099b(0x712);if(_0x4be952[_0x4b099b(0x65f)][0x4]!==''&&_0x4be952[_0x4b099b(0x65f)][0x4]!==undefined){if('XkTok'!==_0x4b099b(0x3f8)){_0x18e492[_0x4b099b(0x8b9)]['Settings'][_0x4b099b(0x98c)]['FontSmoothing']&&(_0xb17868[_0x4b099b(0x2ac)][_0x4b099b(0x84b)]=_0x4b099b(0x773));_0x11a554[_0x4b099b(0x8b9)]['Settings'][_0x4b099b(0x98c)][_0x4b099b(0x7f2)]&&(_0x5b32bb[_0x4b099b(0x2ac)]['image-rendering']=_0x4b099b(0x217));const _0x50f2a0=_0x44df6d[_0x4b099b(0x629)](0x0,_0x2fe60b[_0x4b099b(0x7b3)](_0x1c7640[_0x4b099b(0x2e8)]*this[_0x4b099b(0x1d7)])),_0x3cb32d=_0x3f89c7[_0x4b099b(0x629)](0x0,_0x2c7870[_0x4b099b(0x7b3)](_0x1e9aae[_0x4b099b(0x8a0)]*this['_realScale']));_0x33a706[_0x4b099b(0x2ac)][_0x4b099b(0x2e8)]=_0x50f2a0+'px',_0x27ccc3['style'][_0x4b099b(0x8a0)]=_0x3cb32d+'px';}else _0x539df1+='【%1】\x0a'[_0x4b099b(0x782)](_0x4be952[_0x4b099b(0x65f)][0x4]);}}else{if(_0x4be952[_0x4b099b(0x527)]===0x191){if(_0x4b099b(0x533)!=='feluc')_0x539df1+=_0x4b099b(0x797)['format'](_0x4be952[_0x4b099b(0x65f)][0x0]);else{var _0x380956=_0x3cb627(_0x477408['$1'])/0x64;_0x1f7d19*=_0x380956;}}else{if(_0x4be952[_0x4b099b(0x527)]===0x192)_0x539df1+=_0x28a0f0,_0x539df1+=_0x4b099b(0x641)[_0x4b099b(0x782)](_0x567f36,_0x4be952[_0x4b099b(0x65f)][0x0]+0x1,_0x4be952[_0x4b099b(0x65f)][0x1]);else{if(_0x4be952[_0x4b099b(0x527)]===0x193)_0x539df1+=_0x28a0f0,_0x539df1+=_0x4b099b(0x959)[_0x4b099b(0x782)](_0x567f36);else{if(_0x4be952[_0x4b099b(0x527)]===0x194){if(_0x4b099b(0x517)!==_0x4b099b(0x815))_0x539df1+=_0x28a0f0,_0x539df1+=_0x4b099b(0x36e)['format'](_0x567f36);else{if(this['_mode']===_0x4b099b(0x464)&&!_0x2e974b[_0x4b099b(0x61c)]())return;if(_0x5ce23d['isNumpadPressed']())return;_0x1535b1['CoreEngine']['Window_NameInput_cursorDown'][_0x4b099b(0x235)](this,_0x1d09f6),this[_0x4b099b(0x65c)]('default');}}else{if(_0x4be952[_0x4b099b(0x527)]===0x69)_0x4b099b(0x39f)!==_0x4b099b(0x39f)?this['_opening']=![]:(_0x539df1+=_0x28a0f0+'\x0a',_0x539df1+='〘Scrolling\x20Text〙\x0a');else{if(_0x4be952[_0x4b099b(0x527)]===0x6c)_0x539df1+=_0x28a0f0+'\x0a',_0x539df1+=_0x4b099b(0x32f)[_0x4b099b(0x782)](_0x4be952[_0x4b099b(0x65f)][0x0]);else{if(_0x4be952[_0x4b099b(0x527)]===0x198){if(_0x4b099b(0x5a3)!=='pDfEp')return _0xba44b0[_0x4b099b(0x68a)](_0x29a456,'','');else _0x539df1+=_0x4b099b(0x797)[_0x4b099b(0x782)](_0x4be952[_0x4b099b(0x65f)][0x0]);}else{if(_0x4be952[_0x4b099b(0x527)]===0x75){if('Otkfj'===_0x4b099b(0x813)){const _0xd0db24=$dataCommonEvents[_0x4be952['parameters'][0x0]];if(_0xd0db24&&this['_commonEventLayers']<=0xa){this[_0x4b099b(0x22d)]++;let _0x3a9a1d=VisuMZ[_0x4b099b(0x8b9)][_0x4b099b(0x23e)](_0xd0db24[_0x4b099b(0x361)]);_0x3a9a1d[_0x4b099b(0x708)]>0x0&&(_0x539df1+=_0x28a0f0,_0x539df1+=_0x567f36,_0x539df1+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x4b099b(0x782)](_0xd0db24['id'],_0xd0db24[_0x4b099b(0x683)]),_0x539df1+=_0x567f36,_0x539df1+=_0x3a9a1d,_0x539df1+=_0x567f36,_0x539df1+=_0x4b099b(0x5da)['format'](_0xd0db24['id'],_0xd0db24['name']),_0x539df1+=_0x567f36),this[_0x4b099b(0x22d)]--;}}else return _0x40a59d['CoreEngine'][_0x4b099b(0x727)]['MenuLayout'][_0x4b099b(0x2e1)]['CommandRect']['call'](this);}}}}}}}}}}}return _0x539df1[_0x4b099b(0x708)]>0x0&&(_0x539df1+=_0x28a0f0),_0x539df1;},PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x856),_0x319620=>{const _0x19fc14=_0x52866a;VisuMZ['ConvertParams'](_0x319620,_0x319620);const _0x2eb041=_0x319620[_0x19fc14(0x31c)];VisuMZ[_0x19fc14(0x35d)](_0x2eb041);}),PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x5c7),_0x43df3c=>{const _0x403f77=_0x52866a;VisuMZ[_0x403f77(0x432)](_0x43df3c,_0x43df3c);const _0x3c8a0d=_0x43df3c[_0x403f77(0x7d2)]||0x0;$gameParty[_0x403f77(0x455)](_0x3c8a0d);}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x3d3),_0x1bcb61=>{const _0x208f2a=_0x52866a;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;VisuMZ['ConvertParams'](_0x1bcb61,_0x1bcb61);const _0x45515e=_0x1bcb61[_0x208f2a(0x221)]||0x1;$gameTemp[_0x208f2a(0x747)]=_0x45515e;}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x3f3),_0x161d72=>{const _0x30d862=_0x52866a;VisuMZ[_0x30d862(0x432)](_0x161d72,_0x161d72);const _0x3d0c60=_0x161d72[_0x30d862(0x934)]||0x1,_0x1981bd=_0x161d72['easingType']||_0x30d862(0x5df),_0x25648e=$gameScreen[_0x30d862(0x37c)](_0x3d0c60);_0x25648e&&_0x25648e[_0x30d862(0x59f)](_0x1981bd);}),PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x493),_0x452af5=>{for(let _0x283262=0x1;_0x283262<=0x64;_0x283262++){$gameScreen['erasePicture'](_0x283262);}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],'PictureEraseRange',_0x2ced0c=>{const _0x5556c9=_0x52866a;VisuMZ[_0x5556c9(0x432)](_0x2ced0c,_0x2ced0c);const _0xa91f0f=Math[_0x5556c9(0x490)](_0x2ced0c[_0x5556c9(0x507)],_0x2ced0c['EndingID']),_0x2b4639=Math[_0x5556c9(0x629)](_0x2ced0c[_0x5556c9(0x507)],_0x2ced0c['EndingID']);for(let _0x22e5a1=_0xa91f0f;_0x22e5a1<=_0x2b4639;_0x22e5a1++){if(_0x5556c9(0x71a)===_0x5556c9(0x71a))$gameScreen['erasePicture'](_0x22e5a1);else for(let _0x3dc77f=0x1;_0x3dc77f<=0x64;_0x3dc77f++){_0x2348ad[_0x5556c9(0x27a)](_0x3dc77f);}}}),PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x4c9),_0x10617b=>{const _0x5ac091=_0x52866a;VisuMZ[_0x5ac091(0x432)](_0x10617b,_0x10617b);const _0x4de066=Math[_0x5ac091(0x447)](_0x10617b[_0x5ac091(0x221)])['clamp'](0x1,0x64),_0x1ee228=_0x10617b[_0x5ac091(0x727)],_0xfe9c52=_0x1ee228[_0x5ac091(0x50e)][_0x5ac091(0x903)](0x0,0x1),_0x104331=Math[_0x5ac091(0x447)](_0x1ee228['PositionX']||0x0),_0x3dccd7=Math[_0x5ac091(0x447)](_0x1ee228[_0x5ac091(0x96d)]||0x0),_0x187c2d=Math[_0x5ac091(0x447)](_0x1ee228[_0x5ac091(0x7e3)]||0x0),_0x383f88=Math[_0x5ac091(0x447)](_0x1ee228[_0x5ac091(0x1f4)]||0x0),_0x1fd429=Math[_0x5ac091(0x447)](_0x1ee228['Opacity'])[_0x5ac091(0x903)](0x0,0xff),_0xbfe08d=_0x1ee228[_0x5ac091(0x40f)],_0x313b5b='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x51c9aa=_0x10617b[_0x5ac091(0x3d6)]?_0x5ac091(0x3d6):'Pixelated',_0x244f7d=_0x313b5b[_0x5ac091(0x782)](_0x10617b[_0x5ac091(0x2d1)],_0x51c9aa);$gameScreen[_0x5ac091(0x4b6)](_0x4de066,_0x244f7d,_0xfe9c52,_0x104331,_0x3dccd7,_0x187c2d,_0x383f88,_0x1fd429,_0xbfe08d);}),PluginManager[_0x52866a(0x746)](pluginData['name'],_0x52866a(0x6c0),_0x4b20af=>{const _0x2fd391=_0x52866a;VisuMZ['ConvertParams'](_0x4b20af,_0x4b20af);const _0x197341=_0x4b20af['Type']||'random',_0x817b0d=_0x4b20af['Power'][_0x2fd391(0x903)](0x1,0x9),_0x198726=_0x4b20af[_0x2fd391(0x6b4)]['clamp'](0x1,0x9),_0x29d827=_0x4b20af['Duration']||0x1,_0x5083ff=_0x4b20af[_0x2fd391(0x87b)];$gameScreen[_0x2fd391(0x97d)](_0x197341),$gameScreen[_0x2fd391(0x304)](_0x817b0d,_0x198726,_0x29d827);if(_0x5083ff){const _0x284919=$gameTemp[_0x2fd391(0x40d)]();if(_0x284919)_0x284919[_0x2fd391(0x281)](_0x29d827);}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],'SystemSetFontSize',_0x467cdb=>{const _0x3ef1de=_0x52866a;VisuMZ[_0x3ef1de(0x432)](_0x467cdb,_0x467cdb);const _0x4a79e5=_0x467cdb['option']||0x1;$gameSystem[_0x3ef1de(0x559)](_0x4a79e5);}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x548),_0x45b825=>{const _0x23c43c=_0x52866a;if($gameParty[_0x23c43c(0x2dc)]())return;VisuMZ[_0x23c43c(0x432)](_0x45b825,_0x45b825);const _0x169c8d=_0x45b825[_0x23c43c(0x8da)];if(_0x169c8d[_0x23c43c(0x1e7)](/Front/i))_0x23c43c(0x644)===_0x23c43c(0x7e1)?(_0x40e4eb+=this[_0x23c43c(0x707)][_0x24cb99][_0x23c43c(0x65f)][0x0]+'\x0a',_0x656bb9++):$gameSystem[_0x23c43c(0x4c0)](![]);else{if(_0x169c8d['match'](/Side/i))_0x23c43c(0x944)==='iAeFI'?_0x35d7d3[_0x23c43c(0x27a)](_0x274f8f):$gameSystem['setSideView'](!![]);else{if(_0x23c43c(0x215)!==_0x23c43c(0x215))return _0x23c43c(0x902)[_0x23c43c(0x782)](_0x512f7d(_0x27a3f0['$1']));else $gameSystem[_0x23c43c(0x4c0)](!$gameSystem[_0x23c43c(0x730)]());}}}),PluginManager['registerCommand'](pluginData[_0x52866a(0x683)],_0x52866a(0x25b),_0x21540c=>{const _0xcd0eaa=_0x52866a;if($gameParty[_0xcd0eaa(0x2dc)]())return;VisuMZ[_0xcd0eaa(0x432)](_0x21540c,_0x21540c);const _0x4e5fee=[_0xcd0eaa(0x4bb),_0xcd0eaa(0x760),'me','se'];for(const _0xedfaae of _0x4e5fee){const _0x33878f=_0x21540c[_0xedfaae],_0x505f96='%1/'[_0xcd0eaa(0x782)](_0xedfaae);for(const _0xacd64b of _0x33878f){_0xcd0eaa(0x996)!=='rcIZP'?AudioManager[_0xcd0eaa(0x6c8)](_0x505f96,_0xacd64b):(this['x']=_0x199b9c[_0xcd0eaa(0x2e8)],this['y']=_0x41942e['height'],this['visible']=![],this[_0xcd0eaa(0x1f0)]());}}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x479),_0x928c87=>{const _0x13438a=_0x52866a;if($gameParty[_0x13438a(0x2dc)]())return;VisuMZ[_0x13438a(0x432)](_0x928c87,_0x928c87);const _0x3bdfec=[_0x13438a(0x2bd),'battlebacks1',_0x13438a(0x907),'characters',_0x13438a(0x928),_0x13438a(0x881),'parallaxes',_0x13438a(0x7f4),_0x13438a(0x220),_0x13438a(0x7ee),_0x13438a(0x540),_0x13438a(0x935),_0x13438a(0x2de),_0x13438a(0x42b)];for(const _0x1a411c of _0x3bdfec){if(_0x13438a(0x7c5)!==_0x13438a(0x2e0)){const _0x39a2c4=_0x928c87[_0x1a411c],_0x12fe57=_0x13438a(0x1d2)[_0x13438a(0x782)](_0x1a411c);for(const _0x5490e5 of _0x39a2c4){if(_0x13438a(0x841)!==_0x13438a(0x958))ImageManager['loadBitmap'](_0x12fe57,_0x5490e5);else return _0x421806[_0x13438a(0x1c6)]||_0x13438a(0x1c6);}}else return _0x54ce47[_0x13438a(0x502)](this),_0x402de7['CoreEngine'][_0x13438a(0x8f5)][_0x13438a(0x235)](this,_0x1aa0dd);}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x776),_0x58eaa7=>{const _0x21d7cb=_0x52866a;if($gameParty[_0x21d7cb(0x2dc)]())return;VisuMZ[_0x21d7cb(0x432)](_0x58eaa7,_0x58eaa7);const _0x3b05a4=_0x58eaa7[_0x21d7cb(0x772)],_0x38d46c=(_0x58eaa7['Chance']||0x0)/0x64;for(const _0x389aee of _0x3b05a4){if('UcDLX'!==_0x21d7cb(0x840)){const _0x483a24=(_0x25e854[_0x21d7cb(0x8b9)][_0x21d7cb(0x727)][_0x21d7cb(0x7f1)]||_0x21d7cb(0x1e4))['toUpperCase']()['trim']();return _0x115e20[_0x21d7cb(0x8b9)][_0x21d7cb(0x925)](_0x483a24);}else{const _0x36e1eb=Math[_0x21d7cb(0x677)]()<=_0x38d46c;$gameSwitches[_0x21d7cb(0x43b)](_0x389aee,_0x36e1eb);}}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x1f9),_0x3eb227=>{const _0x2678b1=_0x52866a;if($gameParty[_0x2678b1(0x2dc)]())return;VisuMZ[_0x2678b1(0x432)](_0x3eb227,_0x3eb227);const _0x2c360a=Math[_0x2678b1(0x490)](_0x3eb227[_0x2678b1(0x507)],_0x3eb227[_0x2678b1(0x202)]),_0x4f3eca=Math['max'](_0x3eb227[_0x2678b1(0x507)],_0x3eb227[_0x2678b1(0x202)]),_0x3307f9=(_0x3eb227[_0x2678b1(0x264)]||0x0)/0x64;for(let _0x30582c=_0x2c360a;_0x30582c<=_0x4f3eca;_0x30582c++){const _0xb06fde=Math[_0x2678b1(0x677)]()<=_0x3307f9;$gameSwitches['setValue'](_0x30582c,_0xb06fde);}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x484),_0xaeb5ed=>{if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0xaeb5ed,_0xaeb5ed);const _0x46f497=_0xaeb5ed['IDs'];for(const _0x383799 of _0x46f497){const _0x577136=$gameSwitches['value'](_0x383799);$gameSwitches['setValue'](_0x383799,!_0x577136);}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x895),_0x7641a6=>{const _0x5e6776=_0x52866a;if($gameParty[_0x5e6776(0x2dc)]())return;VisuMZ['ConvertParams'](_0x7641a6,_0x7641a6);const _0x4d1c05=Math['min'](_0x7641a6[_0x5e6776(0x507)],_0x7641a6[_0x5e6776(0x202)]),_0x66d4b0=Math[_0x5e6776(0x629)](_0x7641a6[_0x5e6776(0x507)],_0x7641a6[_0x5e6776(0x202)]);for(let _0x74c14b=_0x4d1c05;_0x74c14b<=_0x66d4b0;_0x74c14b++){if(_0x5e6776(0x801)==='XHrpR')this[_0x5e6776(0x33d)]();else{const _0x4c0105=$gameSwitches[_0x5e6776(0x7d2)](_0x74c14b);$gameSwitches[_0x5e6776(0x43b)](_0x74c14b,!_0x4c0105);}}}),PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],_0x52866a(0x2f7),_0x1297b6=>{const _0x2203f3=_0x52866a;if($gameParty[_0x2203f3(0x2dc)]())return;VisuMZ[_0x2203f3(0x432)](_0x1297b6,_0x1297b6);const _0x3b0668=_0x1297b6[_0x2203f3(0x8da)][_0x2203f3(0x2a9)]()[_0x2203f3(0x8cb)](),_0x5eaa56=VisuMZ[_0x2203f3(0x8b9)][_0x2203f3(0x925)](_0x3b0668);$gameSystem[_0x2203f3(0x95a)](_0x5eaa56);}),VisuMZ[_0x52866a(0x8b9)]['CreateBattleSystemID']=function(_0xf54f9d){const _0x5ed562=_0x52866a;_0xf54f9d=_0xf54f9d||'DATABASE',_0xf54f9d=String(_0xf54f9d)['toUpperCase']()[_0x5ed562(0x8cb)]();switch(_0xf54f9d){case _0x5ed562(0x3b2):return 0x0;case _0x5ed562(0x588):Imported[_0x5ed562(0x7be)]&&(ConfigManager[_0x5ed562(0x6e9)]=!![]);return 0x1;case _0x5ed562(0x337):Imported[_0x5ed562(0x7be)]&&(ConfigManager[_0x5ed562(0x6e9)]=![]);return 0x2;case _0x5ed562(0x237):if(Imported[_0x5ed562(0x7c3)])return _0x5ed562(0x237);break;case'STB':if(Imported[_0x5ed562(0x804)])return _0x5ed562(0x7c0)==='FJKoz'?'STB':_0x5afb4d[_0x5ed562(0x8b9)][_0x5ed562(0x771)][_0x5ed562(0x235)](this)||this[_0x5ed562(0x2ea)]();break;case'BTB':if(Imported['VisuMZ_2_BattleSystemBTB']){if('SaPQe'===_0x5ed562(0x564))this[_0x5ed562(0x8d2)][_0x5ed562(0x382)](_0xec634d[_0x5ed562(0x3c0)][_0x5ed562(0x710)]);else return'BTB';}break;case _0x5ed562(0x518):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x5ed562(0x518);break;case _0x5ed562(0x52d):if(Imported[_0x5ed562(0x807)])return _0x5ed562(0x52d);break;case'ETB':if(Imported[_0x5ed562(0x3b9)])return _0x5ed562(0x949)==='nPEFa'?_0x5ed562(0x518):'ETB';break;case _0x5ed562(0x42c):if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x5ed562(0x6d7)===_0x5ed562(0x6fc))this[_0x5ed562(0x226)]=0xff;else return _0x5ed562(0x42c);}break;}return $dataSystem[_0x5ed562(0x870)];},PluginManager[_0x52866a(0x746)](pluginData[_0x52866a(0x683)],'SystemSetWindowPadding',_0x484d53=>{const _0x352495=_0x52866a;VisuMZ[_0x352495(0x432)](_0x484d53,_0x484d53);const _0x9e1aa0=_0x484d53[_0x352495(0x8da)]||0x1;$gameSystem[_0x352495(0x6ef)](_0x9e1aa0);}),VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x42f)]=Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x36b)],Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x36b)]=function(){const _0x315c3e=_0x52866a;VisuMZ[_0x315c3e(0x8b9)][_0x315c3e(0x42f)][_0x315c3e(0x235)](this),this[_0x315c3e(0x64d)](),this[_0x315c3e(0x678)](),this[_0x315c3e(0x1df)](),this[_0x315c3e(0x427)](),this[_0x315c3e(0x242)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x232)]={},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x64d)]=function(){const _0x153905=_0x52866a,_0x1a94d1=[_0x153905(0x839),_0x153905(0x566),'ATK',_0x153905(0x442),'MAT',_0x153905(0x53e),_0x153905(0x786),_0x153905(0x79f)],_0x401c33=[_0x153905(0x358),_0x153905(0x521),_0x153905(0x4a8),_0x153905(0x419),_0x153905(0x893),'MRF',_0x153905(0x8cc),_0x153905(0x780),'MRG',_0x153905(0x911)],_0x4967b5=[_0x153905(0x663),'GRD','REC',_0x153905(0x286),_0x153905(0x4f3),_0x153905(0x913),_0x153905(0x705),'MDR',_0x153905(0x496),'EXR'],_0x16fb8f=[_0x1a94d1,_0x401c33,_0x4967b5],_0x188225=[_0x153905(0x6be),_0x153905(0x22e),_0x153905(0x367),_0x153905(0x628),_0x153905(0x890),_0x153905(0x5c8),_0x153905(0x27f),_0x153905(0x384),_0x153905(0x25e),'Flat2'];for(const _0x4151b9 of _0x16fb8f){let _0x7fa070='';if(_0x4151b9===_0x1a94d1)_0x7fa070=_0x153905(0x60d);if(_0x4151b9===_0x401c33)_0x7fa070=_0x153905(0x591);if(_0x4151b9===_0x4967b5)_0x7fa070=_0x153905(0x6bf);for(const _0x4fd5c1 of _0x188225){let _0x57d7de='%1%2'[_0x153905(0x782)](_0x7fa070,_0x4fd5c1);VisuMZ['CoreEngine'][_0x153905(0x232)][_0x57d7de]=[],VisuMZ[_0x153905(0x8b9)][_0x153905(0x232)][_0x57d7de+'JS']=[];let _0x182ba5=_0x153905(0x661);if([_0x153905(0x6be),_0x153905(0x384)][_0x153905(0x234)](_0x4fd5c1)){if(_0x153905(0x3b6)!==_0x153905(0x33b))_0x182ba5+=_0x153905(0x811);else{const _0x154cce=_0xdb74e5[_0x153905(0x3b4)]()*_0x3b9a7d['tileHeight']();return this['_y']-_0x154cce;}}else{if([_0x153905(0x22e),_0x153905(0x25e)][_0x153905(0x234)](_0x4fd5c1)){if(_0x153905(0x69b)===_0x153905(0x51a))return 0x0;else _0x182ba5+=_0x153905(0x90e);}else{if([_0x153905(0x367),_0x153905(0x970)][_0x153905(0x234)](_0x4fd5c1))_0x153905(0x812)!==_0x153905(0x767)?_0x182ba5+=_0x153905(0x349):(this[_0x153905(0x2e3)]['scale']['x']=0x1/this[_0x153905(0x1d1)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x153905(0x1d1)]['x']));else{if(_0x4fd5c1===_0x153905(0x628))_0x182ba5+=_0x153905(0x3cb);else{if(_0x4fd5c1===_0x153905(0x5c8))_0x182ba5+=_0x153905(0x7aa);else _0x4fd5c1==='Rate2'&&(_0x182ba5+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x20d17c of _0x4151b9){if(_0x153905(0x409)!==_0x153905(0x1ff)){let _0x496d6d=_0x4fd5c1[_0x153905(0x73d)](/[\d+]/g,'')[_0x153905(0x2a9)]();const _0x19a926=_0x182ba5[_0x153905(0x782)](_0x20d17c,_0x496d6d);VisuMZ['CoreEngine'][_0x153905(0x232)][_0x57d7de]['push'](new RegExp(_0x19a926,'i'));const _0x56bdca=_0x153905(0x80d)[_0x153905(0x782)](_0x20d17c,_0x496d6d);VisuMZ[_0x153905(0x8b9)]['RegExp'][_0x57d7de+'JS'][_0x153905(0x4f5)](new RegExp(_0x56bdca,'i'));}else this[_0x153905(0x34d)]&&this[_0x153905(0x34d)][_0x153905(0x382)](_0x4190f8['layoutSettings'][_0x153905(0x1f7)]),this[_0x153905(0x8d2)]&&this[_0x153905(0x8d2)][_0x153905(0x382)](_0xe63715[_0x153905(0x3c0)][_0x153905(0x710)]),this[_0x153905(0x4b4)]&&this[_0x153905(0x4b4)][_0x153905(0x382)](_0x402a9e[_0x153905(0x3c0)][_0x153905(0x830)]);}}}},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x4e1f3b=_0x52866a;if(VisuMZ[_0x4e1f3b(0x609)])return;},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x1df)]=function(){const _0x28cb54=_0x52866a;VisuMZ['CoreEngine'][_0x28cb54(0x727)][_0x28cb54(0x98c)]['OpenConsole']&&VisuMZ['ShowDevTools'](!![]);VisuMZ['CoreEngine']['Settings'][_0x28cb54(0x98c)][_0x28cb54(0x3ca)]&&(_0x28cb54(0x35f)!=='CjHBR'?this[_0x28cb54(0x901)]['x']=_0x48a3e3[_0x28cb54(0x912)]+0x4:(Input[_0x28cb54(0x84f)][0x23]=_0x28cb54(0x278),Input[_0x28cb54(0x84f)][0x24]=_0x28cb54(0x444)));if(VisuMZ[_0x28cb54(0x8b9)][_0x28cb54(0x727)][_0x28cb54(0x505)]){const _0x103f6d=VisuMZ[_0x28cb54(0x8b9)][_0x28cb54(0x727)][_0x28cb54(0x505)];_0x103f6d[_0x28cb54(0x2fc)]=_0x103f6d['KeySHIFT']||'\x5c}❪SHIFT❫\x5c{',_0x103f6d['KeyTAB']=_0x103f6d[_0x28cb54(0x692)]||'\x5c}❪TAB❫\x5c{';}VisuMZ[_0x28cb54(0x8b9)]['Settings'][_0x28cb54(0x626)][_0x28cb54(0x82d)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x28cb54(0x327),Input[_0x28cb54(0x84f)][0x53]=_0x28cb54(0x7c7),Input[_0x28cb54(0x84f)][0x44]=_0x28cb54(0x991),Input['keyMapper'][0x45]=_0x28cb54(0x6ad)),VisuMZ[_0x28cb54(0x8b9)][_0x28cb54(0x727)]['KeyboardInput'][_0x28cb54(0x87a)]&&(Input[_0x28cb54(0x84f)][0x52]=_0x28cb54(0x313));},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x427)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x3b5)]=function(){const _0x523dda=_0x52866a,_0xd16ccb=VisuMZ[_0x523dda(0x8b9)][_0x523dda(0x727)]['jsQuickFunc'];for(const _0x3ed884 of _0xd16ccb){if(_0x523dda(0x6ae)!==_0x523dda(0x4c6)){const _0x1fb944=_0x3ed884[_0x523dda(0x494)][_0x523dda(0x73d)](/[ ]/g,''),_0x55bef2=_0x3ed884[_0x523dda(0x6e3)];VisuMZ[_0x523dda(0x8b9)][_0x523dda(0x254)](_0x1fb944,_0x55bef2);}else this['clear']();}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x254)]=function(_0x2aa738,_0x4b0a0c){const _0x26e096=_0x52866a;if(!!window[_0x2aa738]){if('NsAqU'!==_0x26e096(0x253)){if($gameTemp[_0x26e096(0x601)]())console[_0x26e096(0x3e1)](_0x26e096(0x6bb)[_0x26e096(0x782)](_0x2aa738));}else{if(_0x757a06[_0x31b6be]['pressed'])return!![];}}const _0x5b6f4b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x26e096(0x782)](_0x2aa738,_0x4b0a0c);window[_0x2aa738]=new Function(_0x5b6f4b);},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x242)]=function(){const _0x39e414=_0x52866a,_0x248805=VisuMZ['CoreEngine'][_0x39e414(0x727)][_0x39e414(0x5f9)];if(!_0x248805)return;for(const _0xfc275a of _0x248805){if('ARevH'!==_0x39e414(0x1e9)){if(!_0xfc275a)continue;VisuMZ['CoreEngine'][_0x39e414(0x421)](_0xfc275a);}else return!![];}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x825)]={},VisuMZ['CoreEngine'][_0x52866a(0x4be)]={},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x703)]={},VisuMZ['CoreEngine'][_0x52866a(0x6aa)]={},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x421)]=function(_0x41da0c){const _0x2ae96e=_0x52866a,_0x67ffb2=_0x41da0c[_0x2ae96e(0x838)],_0x59ac51=_0x41da0c[_0x2ae96e(0x460)],_0x18707f=_0x41da0c['Icon'],_0x273a12=_0x41da0c[_0x2ae96e(0x5a5)],_0xc73fc6=new Function(_0x41da0c[_0x2ae96e(0x6d3)]);VisuMZ[_0x2ae96e(0x8b9)][_0x2ae96e(0x825)][_0x67ffb2[_0x2ae96e(0x2a9)]()['trim']()]=_0x59ac51,VisuMZ[_0x2ae96e(0x8b9)][_0x2ae96e(0x4be)][_0x67ffb2['toUpperCase']()[_0x2ae96e(0x8cb)]()]=_0x18707f,VisuMZ[_0x2ae96e(0x8b9)][_0x2ae96e(0x703)][_0x67ffb2[_0x2ae96e(0x2a9)]()[_0x2ae96e(0x8cb)]()]=_0x273a12,VisuMZ[_0x2ae96e(0x8b9)][_0x2ae96e(0x6aa)][_0x67ffb2[_0x2ae96e(0x2a9)]()[_0x2ae96e(0x8cb)]()]=_0x67ffb2,Object[_0x2ae96e(0x495)](Game_BattlerBase[_0x2ae96e(0x8dc)],_0x67ffb2,{'get'(){const _0x4504ea=_0x2ae96e;if(_0x4504ea(0x554)===_0x4504ea(0x554)){const _0x558d30=_0xc73fc6['call'](this);return _0x273a12==='integer'?Math[_0x4504ea(0x447)](_0x558d30):_0x558d30;}else return _0x3c1e5c[_0x4504ea(0x3c0)][_0x4504ea(0x855)][_0x4504ea(0x235)](this);}});},VisuMZ['ParseAllNotetags']=function(){const _0x45ae40=_0x52866a;for(const _0x157ff6 of $dataActors){if(_0x157ff6)VisuMZ[_0x45ae40(0x3c6)](_0x157ff6);}for(const _0xc03fbf of $dataClasses){if(_0xc03fbf)VisuMZ[_0x45ae40(0x5ae)](_0xc03fbf);}for(const _0x57a4a6 of $dataSkills){if(_0x57a4a6)VisuMZ['ParseSkillNotetags'](_0x57a4a6);}for(const _0x11edaa of $dataItems){if(_0x11edaa)VisuMZ[_0x45ae40(0x967)](_0x11edaa);}for(const _0x5e5bb4 of $dataWeapons){if(_0x5e5bb4)VisuMZ[_0x45ae40(0x605)](_0x5e5bb4);}for(const _0x140026 of $dataArmors){if(_0x140026)VisuMZ[_0x45ae40(0x25f)](_0x140026);}for(const _0x26f067 of $dataEnemies){if(_0x45ae40(0x1c9)===_0x45ae40(0x1c9)){if(_0x26f067)VisuMZ['ParseEnemyNotetags'](_0x26f067);}else return _0x397423['layoutSettings'][_0x45ae40(0x58b)][_0x45ae40(0x235)](this);}for(const _0x28cbaa of $dataStates){if(_0x28cbaa)VisuMZ[_0x45ae40(0x729)](_0x28cbaa);}for(const _0x5c7254 of $dataTilesets){if(_0x5c7254)VisuMZ[_0x45ae40(0x4d3)](_0x5c7254);}},VisuMZ[_0x52866a(0x3c6)]=function(_0x334684){},VisuMZ[_0x52866a(0x5ae)]=function(_0x131e72){},VisuMZ[_0x52866a(0x7a8)]=function(_0x3237b4){},VisuMZ[_0x52866a(0x967)]=function(_0xc7e7fe){},VisuMZ[_0x52866a(0x605)]=function(_0x2b5076){},VisuMZ['ParseArmorNotetags']=function(_0x21e4f3){},VisuMZ['ParseEnemyNotetags']=function(_0x12a901){},VisuMZ[_0x52866a(0x729)]=function(_0x204e07){},VisuMZ[_0x52866a(0x4d3)]=function(_0x2ac0b7){},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x3c6)]=VisuMZ[_0x52866a(0x3c6)],VisuMZ[_0x52866a(0x3c6)]=function(_0x25ec26){const _0x3dcd35=_0x52866a;VisuMZ[_0x3dcd35(0x8b9)][_0x3dcd35(0x3c6)][_0x3dcd35(0x235)](this,_0x25ec26);const _0x44125e=_0x25ec26[_0x3dcd35(0x7e2)];if(_0x44125e[_0x3dcd35(0x1e7)](/<MAX LEVEL:[ ](\d+)>/i)){_0x25ec26['maxLevel']=Number(RegExp['$1']);if(_0x25ec26[_0x3dcd35(0x3ed)]===0x0)_0x25ec26[_0x3dcd35(0x3ed)]=Number[_0x3dcd35(0x6b9)];}if(_0x44125e[_0x3dcd35(0x1e7)](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x3dcd35(0x528)!==_0x3dcd35(0x284))_0x25ec26[_0x3dcd35(0x6e1)]=Math['min'](Number(RegExp['$1']),_0x25ec26[_0x3dcd35(0x3ed)]);else{if(!this['isNormalPriority']())return![];else{const _0x344f19=_0x45b9f9[_0x3dcd35(0x1d8)](_0xaac276,_0x3bfe7e)[_0x3dcd35(0x54c)](_0x226f58=>_0x226f58[_0x3dcd35(0x206)]());return _0x344f19[_0x3dcd35(0x708)]>0x0;}}}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x5ae)]=VisuMZ[_0x52866a(0x5ae)],VisuMZ[_0x52866a(0x5ae)]=function(_0x325bdf){const _0x14ccda=_0x52866a;VisuMZ[_0x14ccda(0x8b9)][_0x14ccda(0x5ae)][_0x14ccda(0x235)](this,_0x325bdf);if(_0x325bdf[_0x14ccda(0x76c)]){if('XPxoU'===_0x14ccda(0x59a))for(const _0x435fbf of _0x325bdf[_0x14ccda(0x76c)]){_0x435fbf[_0x14ccda(0x7e2)][_0x14ccda(0x1e7)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x435fbf['level']=Math[_0x14ccda(0x629)](Number(RegExp['$1']),0x1));}else return _0x105f4c[_0x14ccda(0x8b9)][_0x14ccda(0x727)][_0x14ccda(0x5f1)][_0x14ccda(0x2e1)][_0x14ccda(0x592)];}},VisuMZ[_0x52866a(0x8b9)]['ParseEnemyNotetags']=VisuMZ[_0x52866a(0x858)],VisuMZ['ParseEnemyNotetags']=function(_0x13fb1a){const _0x28b740=_0x52866a;VisuMZ[_0x28b740(0x8b9)][_0x28b740(0x858)]['call'](this,_0x13fb1a),_0x13fb1a[_0x28b740(0x429)]=0x1;const _0x1bff10=_0x13fb1a[_0x28b740(0x7e2)];if(_0x1bff10['match'](/<LEVEL:[ ](\d+)>/i))_0x13fb1a['level']=Number(RegExp['$1']);if(_0x1bff10['match'](/<MAXHP:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x0]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<MAXMP:[ ](\d+)>/i))_0x13fb1a['params'][0x1]=Number(RegExp['$1']);if(_0x1bff10['match'](/<ATK:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x2]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<DEF:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x3]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<MAT:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x4]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<MDF:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x5]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<AGI:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x6]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<LUK:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x301)][0x7]=Number(RegExp['$1']);if(_0x1bff10['match'](/<EXP:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x2fd)]=Number(RegExp['$1']);if(_0x1bff10[_0x28b740(0x1e7)](/<GOLD:[ ](\d+)>/i))_0x13fb1a[_0x28b740(0x81a)]=Number(RegExp['$1']);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x352)]=Graphics[_0x52866a(0x437)],Graphics['_defaultStretchMode']=function(){const _0x1bdb68=_0x52866a;switch(VisuMZ[_0x1bdb68(0x8b9)]['Settings']['QoL']['AutoStretch']){case _0x1bdb68(0x68d):return!![];case _0x1bdb68(0x388):return![];default:return VisuMZ['CoreEngine'][_0x1bdb68(0x352)][_0x1bdb68(0x235)](this);}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x49b)]=Graphics[_0x52866a(0x981)],Graphics[_0x52866a(0x981)]=function(_0x55221b,_0x37c0c5,_0x4a922f=null){const _0x5860d3=_0x52866a;VisuMZ[_0x5860d3(0x8b9)][_0x5860d3(0x49b)][_0x5860d3(0x235)](this,_0x55221b,_0x37c0c5,_0x4a922f),VisuMZ[_0x5860d3(0x52f)](![]);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x7f6)]=Graphics[_0x52866a(0x6d6)],Graphics[_0x52866a(0x6d6)]=function(_0x279ac8){const _0xc8e247=_0x52866a;VisuMZ[_0xc8e247(0x8b9)][_0xc8e247(0x7f6)][_0xc8e247(0x235)](this,_0x279ac8),this[_0xc8e247(0x735)](_0x279ac8);},Graphics['_centerElementCoreEngine']=function(_0x1b11e7){const _0x4b9dbf=_0x52866a;VisuMZ['CoreEngine'][_0x4b9dbf(0x727)][_0x4b9dbf(0x98c)][_0x4b9dbf(0x392)]&&('FPtFe'==='vSJhx'?_0x4d1fc0=_0x59f489[_0x4b9dbf(0x898)]-_0x23151f:_0x1b11e7[_0x4b9dbf(0x2ac)][_0x4b9dbf(0x84b)]='none');VisuMZ[_0x4b9dbf(0x8b9)][_0x4b9dbf(0x727)][_0x4b9dbf(0x98c)][_0x4b9dbf(0x7f2)]&&('WVWSj'!==_0x4b9dbf(0x5f2)?this['_dummyWindow'][_0x4b9dbf(0x382)](_0x453585[_0x4b9dbf(0x3c0)][_0x4b9dbf(0x936)]):_0x1b11e7[_0x4b9dbf(0x2ac)][_0x4b9dbf(0x7b2)]=_0x4b9dbf(0x217));const _0x5686ca=Math[_0x4b9dbf(0x629)](0x0,Math['floor'](_0x1b11e7[_0x4b9dbf(0x2e8)]*this['_realScale'])),_0x9bd1c3=Math[_0x4b9dbf(0x629)](0x0,Math[_0x4b9dbf(0x7b3)](_0x1b11e7[_0x4b9dbf(0x8a0)]*this[_0x4b9dbf(0x1d7)]));_0x1b11e7['style'][_0x4b9dbf(0x2e8)]=_0x5686ca+'px',_0x1b11e7[_0x4b9dbf(0x2ac)]['height']=_0x9bd1c3+'px';},Bitmap[_0x52866a(0x8dc)][_0x52866a(0x351)]=function(){const _0x34f421=_0x52866a;this[_0x34f421(0x679)]=!![];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x1f6)]=Sprite[_0x52866a(0x8dc)][_0x52866a(0x389)],Sprite[_0x52866a(0x8dc)][_0x52866a(0x389)]=function(){const _0x4ebd66=_0x52866a;VisuMZ[_0x4ebd66(0x8b9)]['Sprite_destroy'][_0x4ebd66(0x235)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x52866a(0x8dc)][_0x52866a(0x732)]=function(){const _0x39ae74=_0x52866a;if(!this[_0x39ae74(0x96a)])return;if(!this[_0x39ae74(0x96a)]['_customModified'])return;this['bitmap'][_0x39ae74(0x7a2)]&&!this[_0x39ae74(0x30f)][_0x39ae74(0x7a2)]['destroyed']&&this[_0x39ae74(0x96a)][_0x39ae74(0x389)]();},VisuMZ['CoreEngine'][_0x52866a(0x1cc)]=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x70f)],Bitmap[_0x52866a(0x8dc)][_0x52866a(0x70f)]=function(_0x18a53f,_0x5ecf6a){const _0x580315=_0x52866a;VisuMZ[_0x580315(0x8b9)][_0x580315(0x1cc)][_0x580315(0x235)](this,_0x18a53f,_0x5ecf6a),this[_0x580315(0x351)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x2e5)]=Bitmap['prototype']['blt'],Bitmap['prototype'][_0x52866a(0x1db)]=function(_0x544ec0,_0x543fb8,_0x457d3d,_0x4faed2,_0x252183,_0x53ec3c,_0x7dcdb2,_0x2e84b0,_0xaa5187){const _0x55ba63=_0x52866a;VisuMZ[_0x55ba63(0x8b9)][_0x55ba63(0x2e5)][_0x55ba63(0x235)](this,_0x544ec0,_0x543fb8,_0x457d3d,_0x4faed2,_0x252183,_0x53ec3c,_0x7dcdb2,_0x2e84b0,_0xaa5187),this[_0x55ba63(0x351)]();},VisuMZ[_0x52866a(0x8b9)]['Bitmap_clearRect']=Bitmap['prototype'][_0x52866a(0x6c6)],Bitmap[_0x52866a(0x8dc)][_0x52866a(0x6c6)]=function(_0x3d4a84,_0x2151db,_0x3ad911,_0x129558){const _0x458cf2=_0x52866a;VisuMZ[_0x458cf2(0x8b9)][_0x458cf2(0x3ac)][_0x458cf2(0x235)](this,_0x3d4a84,_0x2151db,_0x3ad911,_0x129558),this['markCoreEngineModified']();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x344)]=Bitmap[_0x52866a(0x8dc)]['fillRect'],Bitmap[_0x52866a(0x8dc)][_0x52866a(0x2f0)]=function(_0xa33eec,_0x1a66c0,_0x1f211a,_0x5ab76d,_0x4ec999){const _0x2bcf3a=_0x52866a;VisuMZ[_0x2bcf3a(0x8b9)][_0x2bcf3a(0x344)][_0x2bcf3a(0x235)](this,_0xa33eec,_0x1a66c0,_0x1f211a,_0x5ab76d,_0x4ec999),this[_0x2bcf3a(0x351)]();},VisuMZ['CoreEngine'][_0x52866a(0x930)]=Bitmap[_0x52866a(0x8dc)]['strokeRect'],Bitmap[_0x52866a(0x8dc)]['strokeRect']=function(_0x670763,_0x5c1cf2,_0x51bdad,_0xb19355,_0x91ff1c){const _0xc3604c=_0x52866a;VisuMZ[_0xc3604c(0x8b9)][_0xc3604c(0x930)]['call'](this,_0x670763,_0x5c1cf2,_0x51bdad,_0xb19355,_0x91ff1c),this[_0xc3604c(0x351)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x7e6)]=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x380)],Bitmap['prototype']['gradientFillRect']=function(_0x29bbae,_0x127f62,_0x9da046,_0x7de8e9,_0x1dbd4e,_0x4fd71a,_0x26d8c9){const _0x6b22d2=_0x52866a;VisuMZ['CoreEngine'][_0x6b22d2(0x7e6)][_0x6b22d2(0x235)](this,_0x29bbae,_0x127f62,_0x9da046,_0x7de8e9,_0x1dbd4e,_0x4fd71a,_0x26d8c9),this[_0x6b22d2(0x351)]();},VisuMZ['CoreEngine'][_0x52866a(0x640)]=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x78e)],Bitmap['prototype'][_0x52866a(0x78e)]=function(_0x232ab,_0x376753,_0x1ff5ef,_0x2cf907){const _0x318ac3=_0x52866a;_0x232ab=Math[_0x318ac3(0x447)](_0x232ab),_0x376753=Math[_0x318ac3(0x447)](_0x376753),_0x1ff5ef=Math[_0x318ac3(0x447)](_0x1ff5ef),VisuMZ['CoreEngine'][_0x318ac3(0x640)][_0x318ac3(0x235)](this,_0x232ab,_0x376753,_0x1ff5ef,_0x2cf907),this[_0x318ac3(0x351)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x688)]=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x715)],Bitmap['prototype'][_0x52866a(0x715)]=function(_0x2ca706){const _0x38b19c=_0x52866a;return Math[_0x38b19c(0x447)](VisuMZ['CoreEngine'][_0x38b19c(0x688)][_0x38b19c(0x235)](this,_0x2ca706));},VisuMZ[_0x52866a(0x8b9)]['Bitmap_drawText']=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x48d)],Bitmap['prototype'][_0x52866a(0x48d)]=function(_0x3e1f9f,_0x54299f,_0x178c79,_0x3bda55,_0x9cb1d7,_0x70e3f2){const _0x42004f=_0x52866a;_0x54299f=Math['round'](_0x54299f),_0x178c79=Math[_0x42004f(0x447)](_0x178c79),_0x3bda55=Math[_0x42004f(0x447)](_0x3bda55),_0x9cb1d7=Math[_0x42004f(0x447)](_0x9cb1d7),VisuMZ[_0x42004f(0x8b9)][_0x42004f(0x535)][_0x42004f(0x235)](this,_0x3e1f9f,_0x54299f,_0x178c79,_0x3bda55,_0x9cb1d7,_0x70e3f2),this[_0x42004f(0x351)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x39c)]=Bitmap[_0x52866a(0x8dc)][_0x52866a(0x1c7)],Bitmap['prototype']['_drawTextOutline']=function(_0x595136,_0x4506b6,_0x543adc,_0x13ebb7){const _0x2e5e98=_0x52866a;if(VisuMZ[_0x2e5e98(0x8b9)]['Settings'][_0x2e5e98(0x98c)]['FontShadows']){if('LmDAW'!==_0x2e5e98(0x303))this[_0x2e5e98(0x520)](_0x595136,_0x4506b6,_0x543adc,_0x13ebb7);else{const _0x1cb3a6=_0x40c902['nickname']()[_0x2e5e98(0x73d)](/\\I\[(\d+)\]/gi,'');this[_0x2e5e98(0x48d)](_0xd01eef[_0x2e5e98(0x7bd)](),_0x6c4b17,_0x36212c,_0x49029d);}}else VisuMZ[_0x2e5e98(0x8b9)]['Bitmap_drawTextOutline'][_0x2e5e98(0x235)](this,_0x595136,_0x4506b6,_0x543adc,_0x13ebb7);},Bitmap[_0x52866a(0x8dc)][_0x52866a(0x520)]=function(_0x444c68,_0x11f819,_0x2dbf51,_0x114e22){const _0x346af7=_0x52866a,_0x4a4a02=this[_0x346af7(0x4a6)];_0x4a4a02[_0x346af7(0x915)]=this[_0x346af7(0x85f)],_0x4a4a02[_0x346af7(0x8db)](_0x444c68,_0x11f819+0x2,_0x2dbf51+0x2,_0x114e22);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x6c5)]=Input[_0x52866a(0x6c1)],Input['clear']=function(){const _0x3b1444=_0x52866a;VisuMZ[_0x3b1444(0x8b9)]['Input_clear'][_0x3b1444(0x235)](this),this[_0x3b1444(0x91c)]=undefined,this[_0x3b1444(0x307)]=undefined,this[_0x3b1444(0x21d)]=Input[_0x3b1444(0x89f)];},VisuMZ[_0x52866a(0x8b9)]['Input_update']=Input[_0x52866a(0x8c1)],Input['update']=function(){const _0x12c1f1=_0x52866a;VisuMZ[_0x12c1f1(0x8b9)][_0x12c1f1(0x79c)][_0x12c1f1(0x235)](this);if(this['_gamepadWait'])this[_0x12c1f1(0x21d)]--;},VisuMZ[_0x52866a(0x8b9)]['Input_pollGamepads']=Input[_0x52866a(0x5bc)],Input['_pollGamepads']=function(){const _0x5d956b=_0x52866a;if(this[_0x5d956b(0x21d)])return;VisuMZ['CoreEngine']['Input_pollGamepads'][_0x5d956b(0x235)](this);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x4b0)]=Input[_0x52866a(0x90d)],Input[_0x52866a(0x90d)]=function(){const _0x37fa9e=_0x52866a;VisuMZ['CoreEngine'][_0x37fa9e(0x4b0)]['call'](this),document[_0x37fa9e(0x848)](_0x37fa9e(0x85e),this[_0x37fa9e(0x2a7)][_0x37fa9e(0x733)](this));},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x741)]=Input[_0x52866a(0x59b)],Input[_0x52866a(0x59b)]=function(_0x2e0c0f){const _0x5ae900=_0x52866a;this[_0x5ae900(0x307)]=_0x2e0c0f[_0x5ae900(0x794)],VisuMZ[_0x5ae900(0x8b9)]['Input_onKeyDown']['call'](this,_0x2e0c0f);},Input[_0x52866a(0x2a7)]=function(_0x617d3){const _0x505cb2=_0x52866a;this[_0x505cb2(0x79e)](_0x617d3);},Input[_0x52866a(0x79e)]=function(_0x247dd7){const _0x20ac99=_0x52866a;this[_0x20ac99(0x307)]=_0x247dd7['keyCode'];let _0x247411=String[_0x20ac99(0x362)](_0x247dd7[_0x20ac99(0x58f)]);this[_0x20ac99(0x91c)]===undefined?this['_inputString']=_0x247411:_0x20ac99(0x763)!==_0x20ac99(0x408)?this[_0x20ac99(0x91c)]+=_0x247411:(this['_anchor']['x']=this[_0x20ac99(0x5b9)](this[_0x20ac99(0x4ef)]['x'],this[_0x20ac99(0x68c)]['x']),this[_0x20ac99(0x4ef)]['y']=this[_0x20ac99(0x5b9)](this[_0x20ac99(0x4ef)]['y'],this[_0x20ac99(0x68c)]['y']));},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x922)]=Input[_0x52866a(0x93d)],Input[_0x52866a(0x93d)]=function(_0x3c38d9){const _0x10ce03=_0x52866a;if(_0x3c38d9===0x8)return![];return VisuMZ['CoreEngine'][_0x10ce03(0x922)]['call'](this,_0x3c38d9);},Input[_0x52866a(0x2df)]=function(_0x56d5d8){const _0x295555=_0x52866a;if(_0x56d5d8['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x56d5d8['match'](/enter/i))return this[_0x295555(0x307)]===0xd;if(_0x56d5d8[_0x295555(0x1e7)](/escape/i))return this[_0x295555(0x307)]===0x1b;},Input[_0x52866a(0x365)]=function(){const _0x45cd4d=_0x52866a;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x45cd4d(0x785)](this[_0x45cd4d(0x307)]);},Input[_0x52866a(0x61c)]=function(){const _0x18abfa=_0x52866a;return[0x25,0x26,0x27,0x28][_0x18abfa(0x785)](this[_0x18abfa(0x307)]);},Input['isGamepadConnected']=function(){const _0x1636f6=_0x52866a;if(navigator[_0x1636f6(0x6e5)]){const _0x40832b=navigator[_0x1636f6(0x6e5)]();if(_0x40832b){if('pgVNG'!==_0x1636f6(0x3ea))for(const _0x4dfc74 of _0x40832b){if(_0x1636f6(0x8ac)!==_0x1636f6(0x8ac)){_0x51acb6[_0x1636f6(0x432)](_0x5d8687,_0x588747);const _0x1009f8=_0x5561c0[_0x1636f6(0x5a5)]||_0x1636f6(0x677),_0x37da88=_0x5a769e[_0x1636f6(0x627)]['clamp'](0x1,0x9),_0x2a6caf=_0x275790[_0x1636f6(0x6b4)]['clamp'](0x1,0x9),_0x406935=_0x32c35b['Duration']||0x1,_0x2df515=_0x46a9f4[_0x1636f6(0x87b)];_0x1354e5[_0x1636f6(0x97d)](_0x1009f8),_0x80ce98['startShake'](_0x37da88,_0x2a6caf,_0x406935);if(_0x2df515){const _0xeae97b=_0x1229ac[_0x1636f6(0x40d)]();if(_0xeae97b)_0xeae97b['wait'](_0x406935);}}else{if(_0x4dfc74&&_0x4dfc74[_0x1636f6(0x784)]){if(_0x1636f6(0x73e)===_0x1636f6(0x93c))this[_0x1636f6(0x271)](_0x3a2a63['note']);else return!![];}}}else _0x25588b+=_0x1dc806,_0x442ecc+=_0x1636f6(0x641)['format'](_0x4f5245,_0x4dafbb['parameters'][0x0]+0x1,_0x3f42fa[_0x1636f6(0x65f)][0x1]);}}return![];},Input[_0x52866a(0x896)]=function(){const _0x3907ba=_0x52866a;if(navigator[_0x3907ba(0x6e5)]){const _0xcfba5f=navigator[_0x3907ba(0x6e5)]();if(_0xcfba5f)for(const _0x22b262 of _0xcfba5f){if(_0x3907ba(0x501)==='YrFUq'){if(_0x22b262&&_0x22b262[_0x3907ba(0x784)]){if(this[_0x3907ba(0x1de)](_0x22b262))return!![];}}else{var _0x3684f1=_0x2328a1(_0x7db485['$1']);_0x121d37+=_0x3684f1;}}}return![];},Input['isGamepadButtonPressed']=function(_0xe8f820){const _0x3e1b54=_0x52866a,_0x310590=_0xe8f820[_0x3e1b54(0x262)];for(let _0x3ccb66=0x0;_0x3ccb66<_0x310590[_0x3e1b54(0x708)];_0x3ccb66++){if(_0x3e1b54(0x80b)!=='FkhGm')this['_forcedBattleSys']=_0x3e1b54(0x52d);else{if(_0x310590[_0x3ccb66]['pressed'])return!![];}}return![];},VisuMZ[_0x52866a(0x8b9)]['Tilemap_addShadow']=Tilemap['prototype'][_0x52866a(0x467)],Tilemap[_0x52866a(0x8dc)][_0x52866a(0x467)]=function(_0x2d5bf1,_0x136b72,_0x4aae35,_0x442bdd){const _0x46b020=_0x52866a;if($gameMap&&$gameMap[_0x46b020(0x2c1)]())return;VisuMZ[_0x46b020(0x8b9)]['Tilemap_addShadow'][_0x46b020(0x235)](this,_0x2d5bf1,_0x136b72,_0x4aae35,_0x442bdd);},Tilemap[_0x52866a(0x246)][_0x52866a(0x8dc)][_0x52866a(0x2f5)]=function(){const _0x5415e0=_0x52866a;this[_0x5415e0(0x524)]();for(let _0x16dcf4=0x0;_0x16dcf4<Tilemap[_0x5415e0(0x4f0)][_0x5415e0(0x774)];_0x16dcf4++){const _0x546b11=new PIXI[(_0x5415e0(0x5e3))]();_0x546b11[_0x5415e0(0x26b)](0x800,0x800),VisuMZ[_0x5415e0(0x8b9)][_0x5415e0(0x727)]['QoL'][_0x5415e0(0x7f2)]&&(_0x546b11[_0x5415e0(0x450)]=PIXI[_0x5415e0(0x35b)][_0x5415e0(0x71d)]),this[_0x5415e0(0x790)][_0x5415e0(0x4f5)](_0x546b11);}},WindowLayer[_0x52866a(0x8dc)][_0x52866a(0x691)]=function(){const _0x5e06a4=_0x52866a;return SceneManager&&SceneManager[_0x5e06a4(0x38f)]?SceneManager[_0x5e06a4(0x38f)][_0x5e06a4(0x834)]():!![];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x3c7)]=WindowLayer[_0x52866a(0x8dc)][_0x52866a(0x3ab)],WindowLayer[_0x52866a(0x8dc)][_0x52866a(0x3ab)]=function render(_0x33360a){const _0x73662a=_0x52866a;this[_0x73662a(0x691)]()?VisuMZ[_0x73662a(0x8b9)][_0x73662a(0x3c7)][_0x73662a(0x235)](this,_0x33360a):this['renderNoMask'](_0x33360a);},WindowLayer[_0x52866a(0x8dc)][_0x52866a(0x8a8)]=function render(_0x2db8f4){const _0x1fb59f=_0x52866a;if(!this[_0x1fb59f(0x8ab)])return;const _0xcb14ad=new PIXI['Graphics'](),_0x23677a=_0x2db8f4['gl'],_0x34e7f5=this[_0x1fb59f(0x77f)][_0x1fb59f(0x909)]();_0x2db8f4[_0x1fb59f(0x65e)]['forceStencil'](),_0xcb14ad['transform']=this[_0x1fb59f(0x275)],_0x2db8f4[_0x1fb59f(0x324)]['flush'](),_0x23677a['enable'](_0x23677a[_0x1fb59f(0x311)]);while(_0x34e7f5['length']>0x0){const _0x25287d=_0x34e7f5['shift']();_0x25287d[_0x1fb59f(0x403)]&&_0x25287d['visible']&&_0x25287d[_0x1fb59f(0x5e8)]>0x0&&(_0x23677a[_0x1fb59f(0x98b)](_0x23677a[_0x1fb59f(0x37b)],0x0,~0x0),_0x23677a[_0x1fb59f(0x725)](_0x23677a['KEEP'],_0x23677a[_0x1fb59f(0x2fe)],_0x23677a[_0x1fb59f(0x2fe)]),_0x25287d[_0x1fb59f(0x3ab)](_0x2db8f4),_0x2db8f4[_0x1fb59f(0x324)][_0x1fb59f(0x42e)](),_0xcb14ad[_0x1fb59f(0x6c1)](),_0x23677a[_0x1fb59f(0x98b)](_0x23677a[_0x1fb59f(0x722)],0x1,~0x0),_0x23677a['stencilOp'](_0x23677a[_0x1fb59f(0x600)],_0x23677a['REPLACE'],_0x23677a['REPLACE']),_0x23677a[_0x1fb59f(0x8a4)](_0x23677a[_0x1fb59f(0x201)],_0x23677a[_0x1fb59f(0x1d0)]),_0xcb14ad[_0x1fb59f(0x3ab)](_0x2db8f4),_0x2db8f4['batch'][_0x1fb59f(0x42e)](),_0x23677a[_0x1fb59f(0x8a4)](_0x23677a[_0x1fb59f(0x1d0)],_0x23677a[_0x1fb59f(0x4b2)]));}_0x23677a[_0x1fb59f(0x3ec)](_0x23677a[_0x1fb59f(0x311)]),_0x23677a[_0x1fb59f(0x6c1)](_0x23677a[_0x1fb59f(0x3fc)]),_0x23677a[_0x1fb59f(0x695)](0x0),_0x2db8f4[_0x1fb59f(0x324)][_0x1fb59f(0x42e)]();for(const _0x1bb4b3 of this[_0x1fb59f(0x77f)]){if(_0x1fb59f(0x250)!=='gAPtt')return _0x4a0ba7[_0x1fb59f(0x8b9)][_0x1fb59f(0x727)]['Window'][_0x1fb59f(0x2f8)];else!_0x1bb4b3[_0x1fb59f(0x403)]&&_0x1bb4b3['visible']&&_0x1bb4b3[_0x1fb59f(0x3ab)](_0x2db8f4);}_0x2db8f4[_0x1fb59f(0x324)][_0x1fb59f(0x42e)]();},DataManager['isKeyItem']=function(_0x3d87e3){const _0xaef0a9=_0x52866a;return this[_0xaef0a9(0x49f)](_0x3d87e3)&&_0x3d87e3[_0xaef0a9(0x86f)]===0x2;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x79a)]=DataManager[_0x52866a(0x89d)],DataManager['setupNewGame']=function(){const _0x4647d1=_0x52866a;VisuMZ[_0x4647d1(0x8b9)][_0x4647d1(0x79a)][_0x4647d1(0x235)](this),this[_0x4647d1(0x656)](),this[_0x4647d1(0x906)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x66f386=_0x52866a;if($gameTemp['isPlaytest']()){const _0x156220=VisuMZ[_0x66f386(0x8b9)][_0x66f386(0x727)][_0x66f386(0x98c)][_0x66f386(0x66a)];if(_0x156220>0x0)$gameTemp[_0x66f386(0x1d5)](_0x156220);}},DataManager[_0x52866a(0x906)]=function(){const _0x3fa196=_0x52866a,_0xfe4982=VisuMZ[_0x3fa196(0x8b9)][_0x3fa196(0x727)][_0x3fa196(0x98c)][_0x3fa196(0x83a)]||0x0;if(_0xfe4982>0x0)$gameTemp[_0x3fa196(0x1d5)](_0xfe4982);},DataManager[_0x52866a(0x56d)]=function(_0x52b108){const _0x266364=_0x52866a,_0x443abb=$dataTroops[_0x52b108];if(!_0x443abb)return'';let _0x4723f3='';_0x4723f3+=_0x443abb[_0x266364(0x683)];for(const _0x4a399b of _0x443abb[_0x266364(0x81d)]){for(const _0x3a3fd5 of _0x4a399b[_0x266364(0x361)]){[0x6c,0x198]['includes'](_0x3a3fd5[_0x266364(0x527)])&&(_0x4723f3+='\x0a',_0x4723f3+=_0x3a3fd5[_0x266364(0x65f)][0x0]);}}return _0x4723f3;},TextManager[_0x52866a(0x8b7)]=['','','','CANCEL','','','HELP','',_0x52866a(0x584),_0x52866a(0x2cc),'','',_0x52866a(0x224),'ENTER','ENTER_SPECIAL','',_0x52866a(0x2bf),_0x52866a(0x88e),_0x52866a(0x696),_0x52866a(0x635),'CAPSLOCK',_0x52866a(0x86e),_0x52866a(0x3d8),_0x52866a(0x718),_0x52866a(0x7f7),_0x52866a(0x876),'',_0x52866a(0x81e),'CONVERT','NONCONVERT',_0x52866a(0x751),_0x52866a(0x3d5),'SPACE','PGUP',_0x52866a(0x805),_0x52866a(0x22c),_0x52866a(0x979),'LEFT','UP',_0x52866a(0x36d),_0x52866a(0x608),_0x52866a(0x297),_0x52866a(0x2ed),_0x52866a(0x556),_0x52866a(0x241),'INSERT',_0x52866a(0x822),'','0','1','2','3','4','5','6','7','8','9',_0x52866a(0x274),'SEMICOLON','LESS_THAN',_0x52866a(0x71b),_0x52866a(0x6f0),_0x52866a(0x4b1),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x52866a(0x4ac),'',_0x52866a(0x75b),'','SLEEP','NUMPAD0',_0x52866a(0x8ee),_0x52866a(0x63f),_0x52866a(0x78b),_0x52866a(0x248),_0x52866a(0x44f),'NUMPAD6',_0x52866a(0x300),_0x52866a(0x792),_0x52866a(0x341),_0x52866a(0x2a1),_0x52866a(0x8e5),_0x52866a(0x854),_0x52866a(0x273),_0x52866a(0x219),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x52866a(0x418),_0x52866a(0x8ca),_0x52866a(0x3e4),_0x52866a(0x3fe),'F15',_0x52866a(0x92b),_0x52866a(0x74f),_0x52866a(0x29d),_0x52866a(0x8dd),_0x52866a(0x438),_0x52866a(0x5e6),_0x52866a(0x58d),'F23',_0x52866a(0x673),'','','','','','','','',_0x52866a(0x45f),'SCROLL_LOCK','WIN_OEM_FJ_JISHO',_0x52866a(0x2f4),'WIN_OEM_FJ_TOUROKU',_0x52866a(0x39a),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x52866a(0x499),_0x52866a(0x575),_0x52866a(0x748),'HASH',_0x52866a(0x546),_0x52866a(0x980),_0x52866a(0x731),_0x52866a(0x3e0),'OPEN_PAREN',_0x52866a(0x633),_0x52866a(0x66d),'PLUS','PIPE','HYPHEN_MINUS','OPEN_CURLY_BRACKET',_0x52866a(0x95e),'TILDE','','','','',_0x52866a(0x597),_0x52866a(0x40b),_0x52866a(0x6a8),'','',_0x52866a(0x899),_0x52866a(0x71b),'COMMA','MINUS',_0x52866a(0x210),_0x52866a(0x68e),_0x52866a(0x26d),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x52866a(0x8a1),'BACK_SLASH',_0x52866a(0x676),'QUOTE','',_0x52866a(0x8fb),_0x52866a(0x711),'',_0x52866a(0x4e3),_0x52866a(0x222),'',_0x52866a(0x25a),'','',_0x52866a(0x265),_0x52866a(0x7b7),_0x52866a(0x3be),_0x52866a(0x657),_0x52866a(0x200),_0x52866a(0x603),_0x52866a(0x7cc),_0x52866a(0x211),_0x52866a(0x530),_0x52866a(0x225),_0x52866a(0x726),_0x52866a(0x31a),_0x52866a(0x7eb),_0x52866a(0x2d9),_0x52866a(0x4fd),_0x52866a(0x70c),'EREOF',_0x52866a(0x835),'ZOOM','',_0x52866a(0x287),_0x52866a(0x7ab),''],TextManager['buttonAssistOk']=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x505)][_0x52866a(0x75d)],TextManager['buttonAssistCancel']=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x505)][_0x52866a(0x697)],TextManager[_0x52866a(0x2fa)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)]['ButtonAssist']['SwitchActorText'],VisuMZ['CoreEngine'][_0x52866a(0x33c)]=TextManager[_0x52866a(0x60d)],TextManager[_0x52866a(0x60d)]=function(_0x76a1dc){const _0x367c07=_0x52866a;return typeof _0x76a1dc===_0x367c07(0x5aa)?VisuMZ[_0x367c07(0x8b9)][_0x367c07(0x33c)]['call'](this,_0x76a1dc):this[_0x367c07(0x272)](_0x76a1dc);},TextManager[_0x52866a(0x272)]=function(_0xcbc68f){const _0x2053bb=_0x52866a;_0xcbc68f=String(_0xcbc68f||'')['toUpperCase']();const _0x300b3f=VisuMZ['CoreEngine'][_0x2053bb(0x727)][_0x2053bb(0x3ad)];if(_0xcbc68f===_0x2053bb(0x839))return $dataSystem[_0x2053bb(0x24f)][_0x2053bb(0x301)][0x0];if(_0xcbc68f===_0x2053bb(0x566))return $dataSystem['terms'][_0x2053bb(0x301)][0x1];if(_0xcbc68f==='ATK')return $dataSystem['terms'][_0x2053bb(0x301)][0x2];if(_0xcbc68f===_0x2053bb(0x442))return $dataSystem[_0x2053bb(0x24f)]['params'][0x3];if(_0xcbc68f===_0x2053bb(0x462))return $dataSystem[_0x2053bb(0x24f)][_0x2053bb(0x301)][0x4];if(_0xcbc68f==='MDF')return $dataSystem[_0x2053bb(0x24f)][_0x2053bb(0x301)][0x5];if(_0xcbc68f===_0x2053bb(0x786))return $dataSystem[_0x2053bb(0x24f)][_0x2053bb(0x301)][0x6];if(_0xcbc68f===_0x2053bb(0x79f))return $dataSystem[_0x2053bb(0x24f)]['params'][0x7];if(_0xcbc68f===_0x2053bb(0x358))return _0x300b3f[_0x2053bb(0x5d2)];if(_0xcbc68f===_0x2053bb(0x521))return _0x300b3f['XParamVocab1'];if(_0xcbc68f===_0x2053bb(0x4a8))return _0x300b3f[_0x2053bb(0x7d4)];if(_0xcbc68f===_0x2053bb(0x419))return _0x300b3f['XParamVocab3'];if(_0xcbc68f===_0x2053bb(0x893))return _0x300b3f['XParamVocab4'];if(_0xcbc68f==='MRF')return _0x300b3f[_0x2053bb(0x547)];if(_0xcbc68f===_0x2053bb(0x8cc))return _0x300b3f['XParamVocab6'];if(_0xcbc68f==='HRG')return _0x300b3f[_0x2053bb(0x2cf)];if(_0xcbc68f==='MRG')return _0x300b3f[_0x2053bb(0x766)];if(_0xcbc68f==='TRG')return _0x300b3f[_0x2053bb(0x6d2)];if(_0xcbc68f===_0x2053bb(0x663))return _0x300b3f['SParamVocab0'];if(_0xcbc68f==='GRD')return _0x300b3f[_0x2053bb(0x3f4)];if(_0xcbc68f===_0x2053bb(0x6f4))return _0x300b3f[_0x2053bb(0x40e)];if(_0xcbc68f===_0x2053bb(0x286))return _0x300b3f[_0x2053bb(0x69d)];if(_0xcbc68f===_0x2053bb(0x4f3))return _0x300b3f[_0x2053bb(0x7fa)];if(_0xcbc68f===_0x2053bb(0x913))return _0x300b3f['SParamVocab5'];if(_0xcbc68f===_0x2053bb(0x705))return _0x300b3f[_0x2053bb(0x887)];if(_0xcbc68f==='MDR')return _0x300b3f['SParamVocab7'];if(_0xcbc68f===_0x2053bb(0x496))return _0x300b3f['SParamVocab8'];if(_0xcbc68f===_0x2053bb(0x480))return _0x300b3f['SParamVocab9'];if(VisuMZ[_0x2053bb(0x8b9)]['CustomParamNames'][_0xcbc68f])return VisuMZ[_0x2053bb(0x8b9)][_0x2053bb(0x825)][_0xcbc68f];return'';},TextManager[_0x52866a(0x58e)]=function(_0x9eeda5){const _0x201507=_0x52866a;if(_0x9eeda5===_0x201507(0x492))_0x9eeda5='escape';let _0x4b22ce=[];for(let _0x56fe7b in Input['keyMapper']){_0x56fe7b=Number(_0x56fe7b);if(_0x56fe7b>=0x60&&_0x56fe7b<=0x69)continue;if([0x12,0x20][_0x201507(0x234)](_0x56fe7b))continue;_0x9eeda5===Input[_0x201507(0x84f)][_0x56fe7b]&&_0x4b22ce[_0x201507(0x4f5)](_0x56fe7b);}for(let _0x259054=0x0;_0x259054<_0x4b22ce['length'];_0x259054++){if('nJSHY'!==_0x201507(0x4f2))_0x4b22ce[_0x259054]=TextManager['stringKeyMap'][_0x4b22ce[_0x259054]];else return _0x361bd1[_0x201507(0x2da)]&&_0x2f4e17[_0x201507(0x285)][_0x201507(0x234)]('['+_0x24fb3d+']');}return this['makeInputButtonString'](_0x4b22ce);},TextManager[_0x52866a(0x8d4)]=function(_0x435318){const _0x37f55c=_0x52866a,_0x4a3dc1=VisuMZ[_0x37f55c(0x8b9)][_0x37f55c(0x727)]['ButtonAssist'],_0x50f0cc=_0x4a3dc1[_0x37f55c(0x469)],_0x4688be=_0x435318[_0x37f55c(0x5d4)](),_0x304ab5=_0x37f55c(0x3f7)[_0x37f55c(0x782)](_0x4688be);return _0x4a3dc1[_0x304ab5]?_0x4a3dc1[_0x304ab5]:_0x50f0cc['format'](_0x4688be);},TextManager[_0x52866a(0x8b0)]=function(_0x41b2d9,_0x517e49){const _0xb47ae9=_0x52866a,_0x15f078=VisuMZ['CoreEngine'][_0xb47ae9(0x727)][_0xb47ae9(0x505)],_0x182f12=_0x15f078[_0xb47ae9(0x1fa)],_0x45204f=this['getInputButtonString'](_0x41b2d9),_0x4061c1=this[_0xb47ae9(0x58e)](_0x517e49);return _0x182f12['format'](_0x45204f,_0x4061c1);},VisuMZ['CoreEngine'][_0x52866a(0x1c1)]=ColorManager[_0x52866a(0x7cf)],ColorManager[_0x52866a(0x7cf)]=function(){const _0x4cd14=_0x52866a;VisuMZ[_0x4cd14(0x8b9)][_0x4cd14(0x1c1)][_0x4cd14(0x235)](this),this[_0x4cd14(0x397)]=this['_colorCache']||{};},ColorManager[_0x52866a(0x86b)]=function(_0x7da616,_0x3d3383){const _0x270bb5=_0x52866a;return _0x3d3383=String(_0x3d3383),this[_0x270bb5(0x397)]=this['_colorCache']||{},_0x3d3383[_0x270bb5(0x1e7)](/#(.*)/i)?this[_0x270bb5(0x397)][_0x7da616]=_0x270bb5(0x902)[_0x270bb5(0x782)](String(RegExp['$1'])):this[_0x270bb5(0x397)][_0x7da616]=this['textColor'](Number(_0x3d3383)),this['_colorCache'][_0x7da616];},ColorManager[_0x52866a(0x245)]=function(_0x3a8af2){const _0x30ce4d=_0x52866a;return _0x3a8af2=String(_0x3a8af2),_0x3a8af2[_0x30ce4d(0x1e7)](/#(.*)/i)?_0x30ce4d(0x256)===_0x30ce4d(0x256)?_0x30ce4d(0x902)[_0x30ce4d(0x782)](String(RegExp['$1'])):_0x384489[_0x30ce4d(0x8b9)][_0x30ce4d(0x727)]['Color'][_0x30ce4d(0x3e6)]:this[_0x30ce4d(0x4e6)](Number(_0x3a8af2));},ColorManager[_0x52866a(0x346)]=function(){const _0x47b0ab=_0x52866a;this[_0x47b0ab(0x397)]={};},ColorManager[_0x52866a(0x2b6)]=function(){const _0xa916f2=_0x52866a,_0xd80445=_0xa916f2(0x971);this['_colorCache']=this[_0xa916f2(0x397)]||{};if(this['_colorCache'][_0xd80445])return this[_0xa916f2(0x397)][_0xd80445];const _0x269268=VisuMZ[_0xa916f2(0x8b9)][_0xa916f2(0x727)][_0xa916f2(0x4bd)][_0xa916f2(0x821)];return this['getColorDataFromPluginParameters'](_0xd80445,_0x269268);},ColorManager['systemColor']=function(){const _0x207b1a=_0x52866a,_0x2bd5af=_0x207b1a(0x44b);this[_0x207b1a(0x397)]=this[_0x207b1a(0x397)]||{};if(this['_colorCache'][_0x2bd5af])return this[_0x207b1a(0x397)][_0x2bd5af];const _0x5af31f=VisuMZ[_0x207b1a(0x8b9)][_0x207b1a(0x727)][_0x207b1a(0x4bd)][_0x207b1a(0x7a0)];return this['getColorDataFromPluginParameters'](_0x2bd5af,_0x5af31f);},ColorManager[_0x52866a(0x757)]=function(){const _0x3335be=_0x52866a,_0x25e3f3=_0x3335be(0x7a6);this[_0x3335be(0x397)]=this[_0x3335be(0x397)]||{};if(this['_colorCache'][_0x25e3f3])return this[_0x3335be(0x397)][_0x25e3f3];const _0x44cba6=VisuMZ[_0x3335be(0x8b9)][_0x3335be(0x727)][_0x3335be(0x4bd)][_0x3335be(0x613)];return this[_0x3335be(0x86b)](_0x25e3f3,_0x44cba6);},ColorManager['deathColor']=function(){const _0x571d87=_0x52866a,_0x2cd4b8=_0x571d87(0x1ea);this[_0x571d87(0x397)]=this[_0x571d87(0x397)]||{};if(this[_0x571d87(0x397)][_0x2cd4b8])return this[_0x571d87(0x397)][_0x2cd4b8];const _0x21ed23=VisuMZ['CoreEngine'][_0x571d87(0x727)][_0x571d87(0x4bd)]['ColorDeath'];return this[_0x571d87(0x86b)](_0x2cd4b8,_0x21ed23);},ColorManager[_0x52866a(0x974)]=function(){const _0x93edd2=_0x52866a,_0x48f335=_0x93edd2(0x266);this[_0x93edd2(0x397)]=this['_colorCache']||{};if(this['_colorCache'][_0x48f335])return this[_0x93edd2(0x397)][_0x48f335];const _0x11f37d=VisuMZ[_0x93edd2(0x8b9)]['Settings'][_0x93edd2(0x4bd)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x48f335,_0x11f37d);},ColorManager[_0x52866a(0x53b)]=function(){const _0xf1d19e=_0x52866a,_0x1f9e92='_stored_hpGaugeColor1';this[_0xf1d19e(0x397)]=this[_0xf1d19e(0x397)]||{};if(this[_0xf1d19e(0x397)][_0x1f9e92])return this[_0xf1d19e(0x397)][_0x1f9e92];const _0x40f4d3=VisuMZ['CoreEngine'][_0xf1d19e(0x727)][_0xf1d19e(0x4bd)][_0xf1d19e(0x7ae)];return this['getColorDataFromPluginParameters'](_0x1f9e92,_0x40f4d3);},ColorManager[_0x52866a(0x53c)]=function(){const _0x1d8eeb=_0x52866a,_0x455631=_0x1d8eeb(0x6f5);this[_0x1d8eeb(0x397)]=this['_colorCache']||{};if(this[_0x1d8eeb(0x397)][_0x455631])return this['_colorCache'][_0x455631];const _0x563d0d=VisuMZ[_0x1d8eeb(0x8b9)][_0x1d8eeb(0x727)][_0x1d8eeb(0x4bd)]['ColorHPGauge2'];return this[_0x1d8eeb(0x86b)](_0x455631,_0x563d0d);},ColorManager[_0x52866a(0x541)]=function(){const _0x22c795=_0x52866a,_0x4f179a=_0x22c795(0x1bd);this[_0x22c795(0x397)]=this[_0x22c795(0x397)]||{};if(this[_0x22c795(0x397)][_0x4f179a])return this[_0x22c795(0x397)][_0x4f179a];const _0x21ee4c=VisuMZ[_0x22c795(0x8b9)]['Settings'][_0x22c795(0x4bd)][_0x22c795(0x2ee)];return this[_0x22c795(0x86b)](_0x4f179a,_0x21ee4c);},ColorManager['mpGaugeColor2']=function(){const _0x51620d=_0x52866a,_0x5a0678=_0x51620d(0x374);this[_0x51620d(0x397)]=this[_0x51620d(0x397)]||{};if(this['_colorCache'][_0x5a0678])return this[_0x51620d(0x397)][_0x5a0678];const _0x385759=VisuMZ[_0x51620d(0x8b9)][_0x51620d(0x727)][_0x51620d(0x4bd)][_0x51620d(0x457)];return this[_0x51620d(0x86b)](_0x5a0678,_0x385759);},ColorManager[_0x52866a(0x4cb)]=function(){const _0x258cba=_0x52866a,_0x25a7f1='_stored_mpCostColor';this[_0x258cba(0x397)]=this[_0x258cba(0x397)]||{};if(this['_colorCache'][_0x25a7f1])return this[_0x258cba(0x397)][_0x25a7f1];const _0x2ab055=VisuMZ['CoreEngine'][_0x258cba(0x727)][_0x258cba(0x4bd)][_0x258cba(0x356)];return this['getColorDataFromPluginParameters'](_0x25a7f1,_0x2ab055);},ColorManager[_0x52866a(0x543)]=function(){const _0x2821ec=_0x52866a,_0x17aef5=_0x2821ec(0x3bb);this[_0x2821ec(0x397)]=this[_0x2821ec(0x397)]||{};if(this[_0x2821ec(0x397)][_0x17aef5])return this[_0x2821ec(0x397)][_0x17aef5];const _0x7b9a4a=VisuMZ[_0x2821ec(0x8b9)][_0x2821ec(0x727)]['Color'][_0x2821ec(0x7a1)];return this['getColorDataFromPluginParameters'](_0x17aef5,_0x7b9a4a);},ColorManager[_0x52866a(0x318)]=function(){const _0x4e6017=_0x52866a,_0x239662=_0x4e6017(0x8e4);this[_0x4e6017(0x397)]=this[_0x4e6017(0x397)]||{};if(this[_0x4e6017(0x397)][_0x239662])return this['_colorCache'][_0x239662];const _0x5740cf=VisuMZ['CoreEngine'][_0x4e6017(0x727)]['Color'][_0x4e6017(0x637)];return this['getColorDataFromPluginParameters'](_0x239662,_0x5740cf);},ColorManager[_0x52866a(0x513)]=function(){const _0xd8613=_0x52866a,_0x38d139=_0xd8613(0x77d);this[_0xd8613(0x397)]=this[_0xd8613(0x397)]||{};if(this[_0xd8613(0x397)][_0x38d139])return this[_0xd8613(0x397)][_0x38d139];const _0x28ef69=VisuMZ['CoreEngine'][_0xd8613(0x727)]['Color'][_0xd8613(0x21a)];return this[_0xd8613(0x86b)](_0x38d139,_0x28ef69);},ColorManager[_0x52866a(0x817)]=function(){const _0x1d4a1c=_0x52866a,_0x44498d='_stored_ctGaugeColor2';this[_0x1d4a1c(0x397)]=this[_0x1d4a1c(0x397)]||{};if(this[_0x1d4a1c(0x397)][_0x44498d])return this[_0x1d4a1c(0x397)][_0x44498d];const _0x140b93=VisuMZ[_0x1d4a1c(0x8b9)][_0x1d4a1c(0x727)][_0x1d4a1c(0x4bd)][_0x1d4a1c(0x5c1)];return this[_0x1d4a1c(0x86b)](_0x44498d,_0x140b93);},ColorManager[_0x52866a(0x44d)]=function(){const _0x454a2d=_0x52866a,_0x3acb9a=_0x454a2d(0x6d9);this[_0x454a2d(0x397)]=this['_colorCache']||{};if(this[_0x454a2d(0x397)][_0x3acb9a])return this[_0x454a2d(0x397)][_0x3acb9a];const _0x2b0adc=VisuMZ['CoreEngine'][_0x454a2d(0x727)][_0x454a2d(0x4bd)]['ColorTPGauge1'];return this[_0x454a2d(0x86b)](_0x3acb9a,_0x2b0adc);},ColorManager[_0x52866a(0x23a)]=function(){const _0x102144=_0x52866a,_0x5a4002=_0x102144(0x366);this[_0x102144(0x397)]=this[_0x102144(0x397)]||{};if(this[_0x102144(0x397)][_0x5a4002])return this['_colorCache'][_0x5a4002];const _0x5b2a4f=VisuMZ[_0x102144(0x8b9)][_0x102144(0x727)][_0x102144(0x4bd)][_0x102144(0x238)];return this[_0x102144(0x86b)](_0x5a4002,_0x5b2a4f);},ColorManager['tpCostColor']=function(){const _0x30a265=_0x52866a,_0xc62475=_0x30a265(0x243);this[_0x30a265(0x397)]=this[_0x30a265(0x397)]||{};if(this[_0x30a265(0x397)][_0xc62475])return this[_0x30a265(0x397)][_0xc62475];const _0x341e5d=VisuMZ[_0x30a265(0x8b9)]['Settings']['Color'][_0x30a265(0x2c4)];return this['getColorDataFromPluginParameters'](_0xc62475,_0x341e5d);},ColorManager[_0x52866a(0x918)]=function(){const _0x1c35e0=_0x52866a,_0x23343e=_0x1c35e0(0x21b);this[_0x1c35e0(0x397)]=this[_0x1c35e0(0x397)]||{};if(this[_0x1c35e0(0x397)][_0x23343e])return this[_0x1c35e0(0x397)][_0x23343e];const _0x5e57cd=VisuMZ[_0x1c35e0(0x8b9)][_0x1c35e0(0x727)][_0x1c35e0(0x4bd)][_0x1c35e0(0x2c4)];return this['getColorDataFromPluginParameters'](_0x23343e,_0x5e57cd);},ColorManager[_0x52866a(0x8d8)]=function(){const _0x4fa0a4=_0x52866a,_0x1248ea='_stored_expGaugeColor1';this[_0x4fa0a4(0x397)]=this[_0x4fa0a4(0x397)]||{};if(this['_colorCache'][_0x1248ea])return this[_0x4fa0a4(0x397)][_0x1248ea];const _0x2e5801=VisuMZ[_0x4fa0a4(0x8b9)][_0x4fa0a4(0x727)][_0x4fa0a4(0x4bd)][_0x4fa0a4(0x2c7)];return this[_0x4fa0a4(0x86b)](_0x1248ea,_0x2e5801);},ColorManager['expGaugeColor2']=function(){const _0x1222d7=_0x52866a,_0x1d06cc='_stored_expGaugeColor2';this[_0x1222d7(0x397)]=this['_colorCache']||{};if(this[_0x1222d7(0x397)][_0x1d06cc])return this[_0x1222d7(0x397)][_0x1d06cc];const _0xe34e6a=VisuMZ[_0x1222d7(0x8b9)]['Settings'][_0x1222d7(0x4bd)][_0x1222d7(0x322)];return this[_0x1222d7(0x86b)](_0x1d06cc,_0xe34e6a);},ColorManager[_0x52866a(0x924)]=function(){const _0x585f94=_0x52866a,_0x2998d8=_0x585f94(0x255);this[_0x585f94(0x397)]=this['_colorCache']||{};if(this['_colorCache'][_0x2998d8])return this[_0x585f94(0x397)][_0x2998d8];const _0x5c5ad8=VisuMZ[_0x585f94(0x8b9)][_0x585f94(0x727)]['Color'][_0x585f94(0x883)];return this[_0x585f94(0x86b)](_0x2998d8,_0x5c5ad8);},ColorManager['maxLvGaugeColor2']=function(){const _0x3060d7=_0x52866a,_0x2ef9d3=_0x3060d7(0x6df);this['_colorCache']=this[_0x3060d7(0x397)]||{};if(this[_0x3060d7(0x397)][_0x2ef9d3])return this[_0x3060d7(0x397)][_0x2ef9d3];const _0x915e1=VisuMZ['CoreEngine']['Settings']['Color'][_0x3060d7(0x3af)];return this[_0x3060d7(0x86b)](_0x2ef9d3,_0x915e1);},ColorManager[_0x52866a(0x555)]=function(_0x59b451){const _0x3ec1de=_0x52866a;return VisuMZ[_0x3ec1de(0x8b9)]['Settings'][_0x3ec1de(0x4bd)]['ActorHPColor'][_0x3ec1de(0x235)](this,_0x59b451);},ColorManager[_0x52866a(0x577)]=function(_0x5d16b1){const _0x14d250=_0x52866a;return VisuMZ[_0x14d250(0x8b9)][_0x14d250(0x727)][_0x14d250(0x4bd)][_0x14d250(0x6c4)][_0x14d250(0x235)](this,_0x5d16b1);},ColorManager[_0x52866a(0x72e)]=function(_0x257fa0){const _0x251e9c=_0x52866a;return VisuMZ['CoreEngine'][_0x251e9c(0x727)]['Color']['ActorTPColor']['call'](this,_0x257fa0);},ColorManager[_0x52866a(0x6d5)]=function(_0x360e1f){const _0x5b3cd7=_0x52866a;return VisuMZ['CoreEngine'][_0x5b3cd7(0x727)]['Color'][_0x5b3cd7(0x49d)][_0x5b3cd7(0x235)](this,_0x360e1f);},ColorManager[_0x52866a(0x752)]=function(_0x320f02){const _0x98b2=_0x52866a;return VisuMZ['CoreEngine']['Settings']['Color'][_0x98b2(0x98d)]['call'](this,_0x320f02);},ColorManager[_0x52866a(0x85f)]=function(){const _0x2ea11c=_0x52866a;return VisuMZ[_0x2ea11c(0x8b9)][_0x2ea11c(0x727)]['Color'][_0x2ea11c(0x64f)];},ColorManager[_0x52866a(0x3d9)]=function(){const _0x4c07e2=_0x52866a;return VisuMZ[_0x4c07e2(0x8b9)][_0x4c07e2(0x727)][_0x4c07e2(0x4bd)][_0x4c07e2(0x3c8)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x52866a(0x8fd)]=function(){const _0x12337a=_0x52866a;return VisuMZ[_0x12337a(0x8b9)][_0x12337a(0x727)]['Color']['OutlineColorGauge']||_0x12337a(0x46c);},ColorManager[_0x52866a(0x6e8)]=function(){const _0x3ed319=_0x52866a;return VisuMZ[_0x3ed319(0x8b9)][_0x3ed319(0x727)][_0x3ed319(0x4bd)][_0x3ed319(0x3e6)];},ColorManager[_0x52866a(0x330)]=function(){const _0x398dd6=_0x52866a;return VisuMZ[_0x398dd6(0x8b9)][_0x398dd6(0x727)][_0x398dd6(0x4bd)][_0x398dd6(0x38e)];},ColorManager[_0x52866a(0x1ed)]=function(){const _0x23558c=_0x52866a;return VisuMZ[_0x23558c(0x8b9)][_0x23558c(0x727)]['Color'][_0x23558c(0x72a)];},ColorManager[_0x52866a(0x529)]=function(){const _0x24a39b=_0x52866a;return VisuMZ[_0x24a39b(0x8b9)][_0x24a39b(0x727)][_0x24a39b(0x4bd)][_0x24a39b(0x6b3)];},SceneManager[_0x52866a(0x261)]=[],SceneManager[_0x52866a(0x2b1)]=function(){const _0x1e3fdc=_0x52866a;return this['_scene']&&this['_scene'][_0x1e3fdc(0x948)]===Scene_Battle;},SceneManager[_0x52866a(0x33f)]=function(){const _0x5802bc=_0x52866a;return this[_0x5802bc(0x38f)]&&this['_scene'][_0x5802bc(0x948)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x11313f=_0x52866a;return this[_0x11313f(0x38f)]&&this[_0x11313f(0x38f)]instanceof Scene_Map;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8c8)]=SceneManager[_0x52866a(0x7ed)],SceneManager['initialize']=function(){const _0x12c5b4=_0x52866a;VisuMZ['CoreEngine']['SceneManager_initialize'][_0x12c5b4(0x235)](this),this[_0x12c5b4(0x60b)]();},VisuMZ['CoreEngine'][_0x52866a(0x3dd)]=SceneManager['onKeyDown'],SceneManager[_0x52866a(0x8b3)]=function(_0x2ef1a7){const _0x303457=_0x52866a;if($gameTemp)this[_0x303457(0x531)](_0x2ef1a7);VisuMZ[_0x303457(0x8b9)][_0x303457(0x3dd)][_0x303457(0x235)](this,_0x2ef1a7);},SceneManager['onKeyDownKeysF6F7']=function(_0x414c6f){const _0x35368c=_0x52866a;if(!_0x414c6f[_0x35368c(0x5e1)]&&!_0x414c6f[_0x35368c(0x3d4)])switch(_0x414c6f[_0x35368c(0x794)]){case 0x54:this[_0x35368c(0x6ac)]();break;case 0x75:this[_0x35368c(0x420)]();break;case 0x76:if(Input[_0x35368c(0x44e)]('shift')||Input['isPressed'](_0x35368c(0x6db)))return;this['playTestF7']();break;}},SceneManager[_0x52866a(0x420)]=function(){const _0x5d4d49=_0x52866a;if($gameTemp[_0x5d4d49(0x601)]()&&VisuMZ[_0x5d4d49(0x8b9)][_0x5d4d49(0x727)]['QoL'][_0x5d4d49(0x3b7)]){if(_0x5d4d49(0x8d1)!==_0x5d4d49(0x946)){ConfigManager[_0x5d4d49(0x404)]!==0x0?(ConfigManager[_0x5d4d49(0x3b8)]=0x0,ConfigManager[_0x5d4d49(0x4c8)]=0x0,ConfigManager[_0x5d4d49(0x8d5)]=0x0,ConfigManager[_0x5d4d49(0x404)]=0x0):_0x5d4d49(0x2b5)!=='eAntk'?(ConfigManager[_0x5d4d49(0x3b8)]=0x64,ConfigManager[_0x5d4d49(0x4c8)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x5d4d49(0x404)]=0x64):this[_0x5d4d49(0x891)]();ConfigManager['save']();if(this[_0x5d4d49(0x38f)]['constructor']===Scene_Options){if('ffzKQ'===_0x5d4d49(0x28c)){if(this[_0x5d4d49(0x38f)][_0x5d4d49(0x41c)])this['_scene'][_0x5d4d49(0x41c)][_0x5d4d49(0x1f5)]();if(this['_scene'][_0x5d4d49(0x3dc)])this[_0x5d4d49(0x38f)][_0x5d4d49(0x3dc)]['refresh']();}else this[_0x5d4d49(0x20c)]()&&_0x216135&&this[_0x5d4d49(0x7e9)]()===0x1&&this[_0x5d4d49(0x806)]()===this[_0x5d4d49(0x636)]()-0x1?this['smoothSelect'](0x0):_0x1130e2[_0x5d4d49(0x8b9)][_0x5d4d49(0x5b7)]['call'](this,_0x21c7e6);}}else return'button';}},SceneManager[_0x52866a(0x46d)]=function(){const _0x2aebdc=_0x52866a;$gameTemp[_0x2aebdc(0x601)]()&&VisuMZ[_0x2aebdc(0x8b9)][_0x2aebdc(0x727)]['QoL']['F7key']&&($gameTemp[_0x2aebdc(0x61f)]=!$gameTemp[_0x2aebdc(0x61f)]);},SceneManager[_0x52866a(0x6ac)]=function(){const _0x4d7167=_0x52866a;if(!$gameTemp[_0x4d7167(0x601)]())return;if(!SceneManager['isSceneBattle']())return;for(const _0x59d20b of $gameParty[_0x4d7167(0x88b)]()){if(!_0x59d20b)continue;_0x59d20b[_0x4d7167(0x5a9)](_0x59d20b[_0x4d7167(0x74b)]());}},SceneManager[_0x52866a(0x60b)]=function(){const _0x5bc073=_0x52866a;this[_0x5bc073(0x594)]=![],this[_0x5bc073(0x371)]=!VisuMZ['CoreEngine'][_0x5bc073(0x727)]['UI'][_0x5bc073(0x3ee)];},SceneManager[_0x52866a(0x5c0)]=function(_0x1c99fc){const _0xeeba42=_0x52866a;if(VisuMZ[_0xeeba42(0x8b9)][_0xeeba42(0x727)]['UI']['SideButtons']){if('tDPWo'!=='Ffjdq')this[_0xeeba42(0x594)]=_0x1c99fc;else return _0x5154cb['CoreEngine'][_0xeeba42(0x727)]['UI'][_0xeeba42(0x536)];}},SceneManager[_0x52866a(0x803)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x52866a(0x1dc)]=function(){const _0x1c963c=_0x52866a;return this[_0x1c963c(0x371)];},SceneManager[_0x52866a(0x8f1)]=function(){const _0x59a20f=_0x52866a;return this[_0x59a20f(0x1dc)]()||this[_0x59a20f(0x803)]();},VisuMZ[_0x52866a(0x8b9)]['SceneManager_isGameActive']=SceneManager[_0x52866a(0x498)],SceneManager[_0x52866a(0x498)]=function(){const _0x99c0e9=_0x52866a;if(VisuMZ['CoreEngine'][_0x99c0e9(0x727)][_0x99c0e9(0x98c)][_0x99c0e9(0x61e)])return VisuMZ[_0x99c0e9(0x8b9)][_0x99c0e9(0x406)][_0x99c0e9(0x235)](this);else{if(_0x99c0e9(0x50d)!==_0x99c0e9(0x50d)){if(_0x488706[_0x99c0e9(0x747)]!==_0x3b91f1)return _0x448f11[_0x99c0e9(0x8b9)][_0x99c0e9(0x798)]();return _0x10aeb6['CoreEngine'][_0x99c0e9(0x698)][_0x99c0e9(0x235)](this);}else return!![];}},SceneManager[_0x52866a(0x833)]=function(_0x1e88c1){const _0x52001f=_0x52866a;if(_0x1e88c1 instanceof Error)_0x52001f(0x882)===_0x52001f(0x22f)?this[_0x52001f(0x694)](_0x4a35af[_0x52001f(0x5d1)](_0x52001f(0x327))):this[_0x52001f(0x6dc)](_0x1e88c1);else _0x1e88c1 instanceof Array&&_0x1e88c1[0x0]==='LoadError'?this[_0x52001f(0x549)](_0x1e88c1):_0x52001f(0x651)===_0x52001f(0x4f9)?_0x2bd06d+='(\x5cd+)([%％])>':this[_0x52001f(0x2e6)](_0x1e88c1);this[_0x52001f(0x461)]();},VisuMZ['CoreEngine'][_0x52866a(0x5c2)]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x577d89=_0x52866a;if(VisuMZ[_0x577d89(0x8b9)]['Settings']['QoL'][_0x577d89(0x6e7)])_0x577d89(0x984)!==_0x577d89(0x7bf)?this[_0x577d89(0x753)]():_0x5b5b0a*=_0x497a41(_0xdba01d);else return VisuMZ[_0x577d89(0x8b9)][_0x577d89(0x5c2)]['call'](this);},BattleManager[_0x52866a(0x753)]=function(){const _0x223c0e=_0x52866a;return $gameParty[_0x223c0e(0x52b)](),SoundManager[_0x223c0e(0x387)](),this['onEscapeSuccess'](),!![];},BattleManager['isTpb']=function(){const _0x21b036=_0x52866a;return $gameSystem[_0x21b036(0x639)]()>=0x1;},BattleManager[_0x52866a(0x47f)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x52866a(0x8b9)]['Game_Temp_initialize']=Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x7ed)],Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(){const _0x37c90e=_0x52866a;VisuMZ[_0x37c90e(0x8b9)][_0x37c90e(0x544)][_0x37c90e(0x235)](this),this[_0x37c90e(0x48f)](),this[_0x37c90e(0x381)](),this[_0x37c90e(0x8e7)]();},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x48f)]=function(){const _0x5cadec=_0x52866a;VisuMZ[_0x5cadec(0x8b9)][_0x5cadec(0x727)][_0x5cadec(0x98c)][_0x5cadec(0x22b)]&&(this[_0x5cadec(0x66e)]=![]);},Game_Temp[_0x52866a(0x8dc)]['setLastPluginCommandInterpreter']=function(_0x56a192){const _0x2c0a80=_0x52866a;this[_0x2c0a80(0x994)]=_0x56a192;},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x40d)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x52866a(0x8dc)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x4f950e=_0x52866a;this['_forcedTroopView']=undefined,this[_0x4f950e(0x8e9)]=undefined;},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x96b)]=function(_0x7c135e){const _0xbe8670=_0x52866a;$gameMap&&$dataMap&&$dataMap['note']&&this[_0xbe8670(0x271)]($dataMap[_0xbe8670(0x7e2)]);const _0x1e44d7=$dataTroops[_0x7c135e];if(_0x1e44d7){let _0x55ffca=DataManager[_0xbe8670(0x56d)](_0x1e44d7['id']);this[_0xbe8670(0x271)](_0x55ffca);}},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x271)]=function(_0x4ef71a){const _0x2ba86c=_0x52866a;if(!_0x4ef71a)return;if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x2ba86c(0x701)===_0x2ba86c(0x4e9)?_0x25c8a1[_0x2ba86c(0x6e9)]=!![]:this[_0x2ba86c(0x489)]='FV';else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x2ba86c(0x489)]='SV';else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('mwcZQ'!==_0x2ba86c(0x2aa)){const _0x242a75=String(RegExp['$1']);if(_0x242a75[_0x2ba86c(0x1e7)](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if('xNoHV'===_0x2ba86c(0x5fc))this[_0x2ba86c(0x489)]='FV';else{if(_0x25938a[_0x2ba86c(0x708)]>0x0)_0x59ad56+=_0x58fc0e+'\x0a\x0a\x0a\x0a\x0a';else{const _0x2cd572=_0x46e227[_0x19da20][_0x2ba86c(0x683)];_0x5d1ca7+=_0x569fba+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x2ba86c(0x782)](_0x2c43c0,_0x2cd572||_0x2ba86c(0x336))+_0x5c4545;}_0x4b11a1+=_0x4e067d[_0x2ba86c(0x782)](_0x569c7b,_0x327c4b,_0x1bcded,_0x3633e9);}}else{if(_0x242a75[_0x2ba86c(0x1e7)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x2ba86c(0x7bc)!==_0x2ba86c(0x7bc)){if(_0x5f44e1[_0x2ba86c(0x601)]())_0x12888e[_0x2ba86c(0x3e1)](_0x4bca8a);}else this['_forcedTroopView']='SV';}}}else _0x407766[_0x2ba86c(0x20f)]&&(this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x702));}}}if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:DTB)>/i))this[_0x2ba86c(0x8e9)]=0x0;else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if('KRyXj'==='CRPRZ')return _0x35fd2f[_0x2ba86c(0x803)]()||_0x2993eb[_0x2ba86c(0x1dc)]()?_0x333c1f['CoreEngine'][_0x2ba86c(0x727)][_0x2ba86c(0x505)][_0x2ba86c(0x622)]:_0x2ba86c(0x63d);else this[_0x2ba86c(0x8e9)]=0x1;}else{if(_0x4ef71a['match'](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x2ba86c(0x956)===_0x2ba86c(0x956))this[_0x2ba86c(0x8e9)]=0x2;else for(const _0x2eda72 of _0x37c8ee[_0x2ba86c(0x6c9)]){if(_0x2eda72[_0x2ba86c(0x8f2)][_0x2ba86c(0x235)](this)){const _0x2a07c5=_0x2eda72['Symbol'];let _0x3228cd=_0x2eda72[_0x2ba86c(0x48e)];if(['',_0x2ba86c(0x820)]['includes'](_0x3228cd))_0x3228cd=_0x2eda72[_0x2ba86c(0x4f8)][_0x2ba86c(0x235)](this);const _0x6882c2=_0x2eda72[_0x2ba86c(0x5d6)][_0x2ba86c(0x235)](this),_0x346191=_0x2eda72['ExtJS']['call'](this);this[_0x2ba86c(0x1c5)](_0x3228cd,_0x2a07c5,_0x6882c2,_0x346191),this[_0x2ba86c(0x889)](_0x2a07c5,_0x2eda72[_0x2ba86c(0x3a1)][_0x2ba86c(0x733)](this,_0x346191));}}}else{if(_0x4ef71a['match'](/<(?:CTB)>/i)){if(Imported[_0x2ba86c(0x7c3)]){if(_0x2ba86c(0x1cb)==='bBVPN')this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x237);else{if(_0x26eb9d[_0x2ba86c(0x601)]())_0x2d4701['log'](_0x46bb4c);}}}else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:STB)>/i)){if(Imported[_0x2ba86c(0x804)]){if(_0x2ba86c(0x4aa)!=='blGWG')return _0x409959[_0x2ba86c(0x8b9)]['Settings'][_0x2ba86c(0x98c)][_0x2ba86c(0x360)]&&_0x3f6ab4['isEnemy']()?_0x47e6e5[_0x2ba86c(0x3b3)]-0.05:_0x3527d2['eva'];else this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x83e);}}else{if(_0x4ef71a['match'](/<(?:BTB)>/i))Imported[_0x2ba86c(0x20f)]&&(this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x702));else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:FTB)>/i))Imported[_0x2ba86c(0x52a)]&&(this['_forcedBattleSys']=_0x2ba86c(0x518));else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:OTB)>/i)){if(_0x2ba86c(0x3a0)==='YXVGb')Imported[_0x2ba86c(0x807)]&&('PCZPg'===_0x2ba86c(0x5e0)?_0x570fad=_0x24cf23['GroupDigits'](_0x43e4aa):this[_0x2ba86c(0x8e9)]='OTB');else{let _0x3c1d39=0x0;return _0x3a869a['areButtonsOutsideMainUI']()?_0x3c1d39=this[_0x2ba86c(0x4a1)]():_0x3c1d39=_0x1b9375['CoreEngine'][_0x2ba86c(0x22a)][_0x2ba86c(0x235)](this),this[_0x2ba86c(0x849)]()&&this[_0x2ba86c(0x411)]()!==_0x2ba86c(0x63d)&&(_0x3c1d39-=_0x35942f[_0x2ba86c(0x8dc)][_0x2ba86c(0x504)]()),_0x3c1d39;}}else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:ETB)>/i))_0x2ba86c(0x687)!==_0x2ba86c(0x593)?Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x50b)):this[_0x2ba86c(0x497)](this['maxItems']()-0x1);else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:PTB)>/i))Imported[_0x2ba86c(0x37a)]&&(this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x42c));else{if(_0x4ef71a[_0x2ba86c(0x1e7)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('yLVim'===_0x2ba86c(0x634))this[_0x2ba86c(0x57f)]||this[_0x2ba86c(0x526)]?this[_0x2ba86c(0x226)]=0xff:(this['opacity']+=this[_0x2ba86c(0x8ab)]?this[_0x2ba86c(0x49c)]():-0x1*this[_0x2ba86c(0x49c)](),this[_0x2ba86c(0x226)]=_0x465b26[_0x2ba86c(0x490)](0xc0,this[_0x2ba86c(0x226)]));else{const _0x5ddb7d=String(RegExp['$1']);if(_0x5ddb7d[_0x2ba86c(0x1e7)](/DTB/i))this[_0x2ba86c(0x8e9)]=0x0;else{if(_0x5ddb7d['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x2ba86c(0x8e9)]=0x2;else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x237));else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/STB/i)){if(Imported['VisuMZ_2_BattleSystemSTB']){if('tKsBj'===_0x2ba86c(0x3c9))this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x83e);else return _0x5bf750[_0x2ba86c(0x36a)];}}else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/BTB/i)){if(Imported[_0x2ba86c(0x20f)]){if(_0x2ba86c(0x3bd)===_0x2ba86c(0x67e))return _0x6d50ef[_0x2ba86c(0x3c0)][_0x2ba86c(0x8b5)][_0x2ba86c(0x235)](this);else this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x702);}}else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/FTB/i)){if(_0x2ba86c(0x83d)!==_0x2ba86c(0x83d))return _0x32dc58[_0x2ba86c(0x8b9)][_0x2ba86c(0x4ae)][_0x2ba86c(0x235)](this,_0x342770);else Imported[_0x2ba86c(0x52a)]&&(_0x2ba86c(0x4fc)===_0x2ba86c(0x51f)?(_0x22c03b[_0x2ba86c(0x8b9)][_0x2ba86c(0x96f)][_0x2ba86c(0x235)](this),_0x52c27e[_0x2ba86c(0x61f)]&&!_0x16995d[_0x2ba86c(0x20e)]()&&(this['updateMain'](),_0x1e88fc['updateEffekseer']())):this[_0x2ba86c(0x8e9)]='FTB');}else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/OTB/i)){if(Imported[_0x2ba86c(0x807)]){if(_0x2ba86c(0x596)!==_0x2ba86c(0x7b4))this['_forcedBattleSys']='OTB';else return this[_0x2ba86c(0x594)];}}else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/ETB/i))_0x2ba86c(0x20d)===_0x2ba86c(0x5b6)?(_0x2abd90[_0x2ba86c(0x8dc)]['initialize'][_0x2ba86c(0x235)](this),this[_0x2ba86c(0x764)]=_0x233c67,this[_0x2ba86c(0x6cf)]=null,this[_0x2ba86c(0x8c3)]()):Imported[_0x2ba86c(0x3b9)]&&(this[_0x2ba86c(0x8e9)]='ETB');else{if(_0x5ddb7d[_0x2ba86c(0x1e7)](/PTB/i)){if(Imported[_0x2ba86c(0x37a)]){if(_0x2ba86c(0x7ef)===_0x2ba86c(0x279)){this[_0x2ba86c(0x22d)]++;let _0xa248ae=_0x50961e['CoreEngine'][_0x2ba86c(0x23e)](_0x10f56b['list']);_0xa248ae[_0x2ba86c(0x708)]>0x0&&(_0x5baa0e+=_0x5e11c1,_0x9de166+=_0x445792,_0xde776c+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x2ba86c(0x782)](_0x2966b7['id'],_0x4f6de9[_0x2ba86c(0x683)]),_0x6349de+=_0x2a1008,_0xcacf06+=_0xa248ae,_0x2503af+=_0x481c98,_0x406adf+=_0x2ba86c(0x5da)['format'](_0x9e585f['id'],_0x48b21b[_0x2ba86c(0x683)]),_0x55c832+=_0x574ec5),this[_0x2ba86c(0x22d)]--;}else this[_0x2ba86c(0x8e9)]=_0x2ba86c(0x42c);}}}}}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype']['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x5f7)]=function(_0x1edd5d,_0xeac4e7,_0xd66eff,_0x37087a){const _0x12286a=_0x52866a;if(!this[_0x12286a(0x509)]())return;_0xd66eff=_0xd66eff||![],_0x37087a=_0x37087a||![];if($dataAnimations[_0xeac4e7]){if('UdVYF'===_0x12286a(0x6e0))this['catchUnknownError'](_0x304fd0);else{const _0x31b9d2={'targets':_0x1edd5d,'animationId':_0xeac4e7,'mirror':_0xd66eff,'mute':_0x37087a};this[_0x12286a(0x4a3)][_0x12286a(0x4f5)](_0x31b9d2);for(const _0x48e15c of _0x1edd5d){if(_0x48e15c['startAnimation']){if(_0x12286a(0x46e)==='gYxZw'){const _0x365935=this['isMVAnimation'](_0x3c239e),_0x1c53c2=new(_0x365935?_0x2ac91e:_0x4a6b05)();_0x1c53c2[_0x12286a(0x681)]=_0x3f68de,_0x1c53c2[_0x12286a(0x8c3)](_0x6ac0d5,_0x15f4f2,_0x5138b7,_0x2160ae),_0x1c53c2[_0x12286a(0x832)](_0x26bed2),this[_0x12286a(0x86c)][_0x12286a(0x5b0)](_0x1c53c2),this[_0x12286a(0x69c)]['push'](_0x1c53c2);}else _0x48e15c['startAnimation']();}}}}},Game_Temp[_0x52866a(0x8dc)]['showFauxAnimations']=function(){return!![];},Game_Temp['prototype'][_0x52866a(0x6f1)]=function(){return this['_fauxAnimationQueue']['shift']();},Game_Temp['prototype'][_0x52866a(0x8e7)]=function(){const _0x450b6f=_0x52866a;this[_0x450b6f(0x5db)]=[];},Game_Temp[_0x52866a(0x8dc)]['requestPointAnimation']=function(_0x2a77fb,_0x3e3eaf,_0x153e45,_0x412625,_0x43d0f){const _0x185fec=_0x52866a;if(!this[_0x185fec(0x4a0)]())return;_0x412625=_0x412625||![],_0x43d0f=_0x43d0f||![];if($dataAnimations[_0x153e45]){if(_0x185fec(0x5a1)===_0x185fec(0x8a6))_0x3b9b4d=(0x1-_0x2abc8d(_0x6e1936['$1']))*-_0x14835f;else{const _0x3547d6={'x':_0x2a77fb,'y':_0x3e3eaf,'animationId':_0x153e45,'mirror':_0x412625,'mute':_0x43d0f};this['_pointAnimationQueue']['push'](_0x3547d6);}}},Game_Temp[_0x52866a(0x8dc)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x7c4)]=function(){const _0x80320f=_0x52866a;return this[_0x80320f(0x5db)][_0x80320f(0x8af)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x7ac)]=Game_System['prototype']['initialize'],Game_System[_0x52866a(0x8dc)]['initialize']=function(){const _0x1ae790=_0x52866a;VisuMZ[_0x1ae790(0x8b9)][_0x1ae790(0x7ac)][_0x1ae790(0x235)](this),this['initCoreEngine']();},Game_System[_0x52866a(0x8dc)][_0x52866a(0x975)]=function(){const _0x32bd78=_0x52866a;this[_0x32bd78(0x3d1)]={'SideView':$dataSystem[_0x32bd78(0x4d8)],'BattleSystem':this[_0x32bd78(0x831)](),'FontSize':$dataSystem[_0x32bd78(0x1d4)][_0x32bd78(0x2e7)],'Padding':0xc};},Game_System[_0x52866a(0x8dc)][_0x52866a(0x730)]=function(){const _0x365b65=_0x52866a;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x365b65(0x489)]==='FV')return![];}if(this[_0x365b65(0x3d1)]===undefined)this['initCoreEngine']();if(this[_0x365b65(0x3d1)][_0x365b65(0x41a)]===undefined)this[_0x365b65(0x975)]();return this[_0x365b65(0x3d1)][_0x365b65(0x41a)];},Game_System[_0x52866a(0x8dc)][_0x52866a(0x4c0)]=function(_0x2e378a){const _0x1962c3=_0x52866a;if(this[_0x1962c3(0x3d1)]===undefined)this['initCoreEngine']();if(this[_0x1962c3(0x3d1)][_0x1962c3(0x41a)]===undefined)this['initCoreEngine']();this[_0x1962c3(0x3d1)]['SideView']=_0x2e378a;},Game_System[_0x52866a(0x8dc)][_0x52866a(0x41d)]=function(){const _0x4f04cd=_0x52866a;if(this[_0x4f04cd(0x3d1)]===undefined)this[_0x4f04cd(0x975)]();this[_0x4f04cd(0x3d1)][_0x4f04cd(0x7f1)]=this[_0x4f04cd(0x831)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x46a800=_0x52866a,_0x5b5ca4=(VisuMZ[_0x46a800(0x8b9)][_0x46a800(0x727)][_0x46a800(0x7f1)]||_0x46a800(0x1e4))['toUpperCase']()[_0x46a800(0x8cb)]();return VisuMZ[_0x46a800(0x8b9)][_0x46a800(0x925)](_0x5b5ca4);},Game_System[_0x52866a(0x8dc)][_0x52866a(0x639)]=function(){const _0x231a9b=_0x52866a;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x231a9b(0x8e9)];if(this[_0x231a9b(0x3d1)]===undefined)this[_0x231a9b(0x975)]();if(this['_CoreEngineSettings'][_0x231a9b(0x7f1)]===undefined)this['resetBattleSystem']();return this[_0x231a9b(0x3d1)][_0x231a9b(0x7f1)];},Game_System['prototype'][_0x52866a(0x95a)]=function(_0x10e1c9){const _0xa1d366=_0x52866a;if(this[_0xa1d366(0x3d1)]===undefined)this[_0xa1d366(0x975)]();if(this[_0xa1d366(0x3d1)][_0xa1d366(0x7f1)]===undefined)this['resetBattleSystem']();this[_0xa1d366(0x3d1)][_0xa1d366(0x7f1)]=_0x10e1c9;},Game_System['prototype']['mainFontSize']=function(){const _0x546bdf=_0x52866a;if(this[_0x546bdf(0x3d1)]===undefined)this[_0x546bdf(0x975)]();if(this['_CoreEngineSettings'][_0x546bdf(0x39b)]===undefined)this[_0x546bdf(0x975)]();return this[_0x546bdf(0x3d1)][_0x546bdf(0x39b)];},Game_System[_0x52866a(0x8dc)][_0x52866a(0x559)]=function(_0x10aff4){const _0x1bdb4a=_0x52866a;if(this[_0x1bdb4a(0x3d1)]===undefined)this[_0x1bdb4a(0x975)]();if(this[_0x1bdb4a(0x3d1)][_0x1bdb4a(0x63c)]===undefined)this[_0x1bdb4a(0x975)]();this['_CoreEngineSettings']['FontSize']=_0x10aff4;},Game_System[_0x52866a(0x8dc)]['windowPadding']=function(){const _0x395a99=_0x52866a;if(this[_0x395a99(0x3d1)]===undefined)this['initCoreEngine']();if(this[_0x395a99(0x3d1)][_0x395a99(0x850)]===undefined)this['initCoreEngine']();return this[_0x395a99(0x3d1)][_0x395a99(0x850)];},Game_System[_0x52866a(0x8dc)][_0x52866a(0x6ef)]=function(_0x7efad0){const _0x2052d3=_0x52866a;if(this[_0x2052d3(0x3d1)]===undefined)this['initCoreEngine']();if(this[_0x2052d3(0x3d1)][_0x2052d3(0x63c)]===undefined)this[_0x2052d3(0x975)]();this[_0x2052d3(0x3d1)][_0x2052d3(0x850)]=_0x7efad0;},VisuMZ['CoreEngine'][_0x52866a(0x3eb)]=Game_Screen['prototype'][_0x52866a(0x7ed)],Game_Screen[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(){const _0x260b25=_0x52866a;VisuMZ[_0x260b25(0x8b9)][_0x260b25(0x3eb)][_0x260b25(0x235)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x52866a(0x8dc)]['initCoreEngineScreenShake']=function(){const _0x488648=_0x52866a,_0xc0df1b=VisuMZ[_0x488648(0x8b9)][_0x488648(0x727)]['ScreenShake'];this[_0x488648(0x972)]=_0xc0df1b?.[_0x488648(0x412)]||_0x488648(0x677);},Game_Screen[_0x52866a(0x8dc)]['getCoreEngineScreenShakeStyle']=function(){const _0x304db6=_0x52866a;if(this['_coreEngineShakeStyle']===undefined)this[_0x304db6(0x957)]();return this[_0x304db6(0x972)];},Game_Screen[_0x52866a(0x8dc)][_0x52866a(0x97d)]=function(_0x2516f8){const _0x576e09=_0x52866a;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this[_0x576e09(0x972)]=_0x2516f8[_0x576e09(0x962)]()[_0x576e09(0x8cb)]();},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x73a)]=function(){const _0x373918=_0x52866a;if($gameParty[_0x373918(0x2dc)]())return![];return this[_0x373918(0x683)]()&&this['name']()[_0x373918(0x664)](0x0)==='!';},VisuMZ['CoreEngine'][_0x52866a(0x426)]=Game_Picture[_0x52866a(0x8dc)]['x'],Game_Picture[_0x52866a(0x8dc)]['x']=function(){const _0x326512=_0x52866a;if(this[_0x326512(0x73a)]()){if(_0x326512(0x396)!==_0x326512(0x4a2))return this[_0x326512(0x802)]();else _0x571cd3['keyMapper'][0x23]=_0x326512(0x278),_0x4b039e[_0x326512(0x84f)][0x24]='home';}else return VisuMZ[_0x326512(0x8b9)]['Game_Picture_x'][_0x326512(0x235)](this);},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x802)]=function(){const _0x2b085e=_0x52866a,_0x29d5e9=$gameMap[_0x2b085e(0x929)]()*$gameMap[_0x2b085e(0x41b)]();return this['_x']-_0x29d5e9;},VisuMZ[_0x52866a(0x8b9)]['Game_Picture_y']=Game_Picture['prototype']['y'],Game_Picture[_0x52866a(0x8dc)]['y']=function(){const _0x5b4e54=_0x52866a;if(this[_0x5b4e54(0x73a)]()){if(_0x5b4e54(0x7b9)!==_0x5b4e54(0x2a0))return this[_0x5b4e54(0x2f3)]();else _0x5cd834+=_0x4813f5(_0x345ff9);}else return VisuMZ['CoreEngine'][_0x5b4e54(0x5a0)][_0x5b4e54(0x235)](this);},Game_Picture[_0x52866a(0x8dc)]['yScrollLinkedOffset']=function(){const _0x3de9a7=_0x52866a,_0x1330cc=$gameMap['displayY']()*$gameMap[_0x3de9a7(0x789)]();return this['_y']-_0x1330cc;},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x59f)]=function(_0x3b272e){const _0x250beb=_0x52866a;this[_0x250beb(0x3c4)]=_0x3b272e;},VisuMZ['CoreEngine']['Game_Picture_calcEasing']=Game_Picture[_0x52866a(0x8dc)]['calcEasing'],Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x483)]=function(_0x3ceb13){const _0x619f58=_0x52866a;return this[_0x619f58(0x3c4)]=this[_0x619f58(0x3c4)]||0x0,[0x0,0x1,0x2,0x3][_0x619f58(0x234)](this[_0x619f58(0x3c4)])?VisuMZ[_0x619f58(0x8b9)][_0x619f58(0x614)][_0x619f58(0x235)](this,_0x3ceb13):VisuMZ[_0x619f58(0x1bc)](_0x3ceb13,this[_0x619f58(0x3c4)]);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x485)]=Game_Action[_0x52866a(0x8dc)]['itemHit'],Game_Action['prototype'][_0x52866a(0x865)]=function(_0x40e7d9){const _0x23b63e=_0x52866a;return VisuMZ[_0x23b63e(0x8b9)][_0x23b63e(0x727)][_0x23b63e(0x98c)][_0x23b63e(0x52e)]?this[_0x23b63e(0x964)](_0x40e7d9):VisuMZ[_0x23b63e(0x8b9)][_0x23b63e(0x485)][_0x23b63e(0x235)](this,_0x40e7d9);},Game_Action['prototype']['itemHitImprovedAccuracy']=function(_0x2e08b3){const _0x36f217=_0x52866a,_0x154664=this[_0x36f217(0x5c6)](_0x2e08b3),_0x4c6ca6=this['subjectHitRate'](_0x2e08b3),_0x4e0330=this[_0x36f217(0x761)](_0x2e08b3);return _0x154664*(_0x4c6ca6-_0x4e0330);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x65d)]=Game_Action['prototype'][_0x52866a(0x6fe)],Game_Action['prototype'][_0x52866a(0x6fe)]=function(_0x5e1084){const _0x1abf58=_0x52866a;if(VisuMZ['CoreEngine'][_0x1abf58(0x727)][_0x1abf58(0x98c)][_0x1abf58(0x52e)])return 0x0;else{if('sXMzu'!==_0x1abf58(0x8d3))return VisuMZ['CoreEngine'][_0x1abf58(0x65d)]['call'](this,_0x5e1084);else this['_registerKeyInput'](_0x38ac51);}},Game_Action[_0x52866a(0x8dc)][_0x52866a(0x5c6)]=function(_0x1ab758){const _0x4bc5fc=_0x52866a;return this[_0x4bc5fc(0x665)]()['successRate']*0.01;},Game_Action[_0x52866a(0x8dc)][_0x52866a(0x30e)]=function(_0x21c966){const _0x3e036f=_0x52866a;if(VisuMZ['CoreEngine'][_0x3e036f(0x727)][_0x3e036f(0x98c)]['AccuracyBoost']&&this[_0x3e036f(0x49f)]())return 0x1;return this[_0x3e036f(0x315)]()?_0x3e036f(0x65b)!==_0x3e036f(0x65b)?this[_0x3e036f(0x69c)][_0x3e036f(0x708)]>0x0:VisuMZ[_0x3e036f(0x8b9)]['Settings'][_0x3e036f(0x98c)]['AccuracyBoost']&&this['subject']()[_0x3e036f(0x969)]()?_0x3e036f(0x7c1)!==_0x3e036f(0x7c1)?_0x4e9be8[_0x3e036f(0x3c0)]['StatusRect'][_0x3e036f(0x235)](this):this[_0x3e036f(0x843)]()[_0x3e036f(0x72c)]+0.05:this[_0x3e036f(0x843)]()[_0x3e036f(0x72c)]:0x1;},Game_Action['prototype'][_0x52866a(0x761)]=function(_0x1e76cf){const _0x498995=_0x52866a;if(this['subject']()[_0x498995(0x969)]()===_0x1e76cf[_0x498995(0x969)]())return 0x0;if(this['isPhysical']())return VisuMZ['CoreEngine'][_0x498995(0x727)][_0x498995(0x98c)][_0x498995(0x360)]&&_0x1e76cf[_0x498995(0x247)]()?_0x1e76cf['eva']-0.05:_0x1e76cf['eva'];else return this[_0x498995(0x5ec)]()?_0x498995(0x868)!==_0x498995(0x799)?_0x1e76cf['mev']:_0x31f2d9[_0x498995(0x8b9)][_0x498995(0x798)]():0x0;},VisuMZ['CoreEngine'][_0x52866a(0x72b)]=Game_Action[_0x52866a(0x8dc)][_0x52866a(0x6a9)],Game_Action['prototype'][_0x52866a(0x6a9)]=function(_0x5f1a3e){const _0x349afc=_0x52866a;VisuMZ[_0x349afc(0x8b9)][_0x349afc(0x72b)][_0x349afc(0x235)](this,_0x5f1a3e);if(VisuMZ[_0x349afc(0x8b9)]['Settings']['QoL'][_0x349afc(0x52e)])return;const _0x3624ae=_0x5f1a3e[_0x349afc(0x506)]();if(_0x3624ae[_0x349afc(0x2f9)]){if(_0x349afc(0x519)===_0x349afc(0x519)){if(0x1-this[_0x349afc(0x6fe)](_0x5f1a3e)>this['itemHit'](_0x5f1a3e)){if('gOuhX'===_0x349afc(0x765)){_0x37f3d5[_0x349afc(0x8dc)][_0x349afc(0x8c1)][_0x349afc(0x235)](this),this[_0x349afc(0x3ff)]();if(this[_0x349afc(0x5f6)])this[_0x349afc(0x21e)]();else this[_0x349afc(0x66b)]!==''&&(this['_battlerName']='');}else _0x3624ae[_0x349afc(0x2f9)]=![],_0x3624ae[_0x349afc(0x82a)]=!![];}}else{const _0x28f136=this[_0x349afc(0x5ad)]();this[_0x349afc(0x34d)]=new _0x5ca677(_0x28f136),this[_0x349afc(0x34d)]['setHandler'](_0x349afc(0x492),this['popScene']['bind'](this)),this[_0x349afc(0x40c)](this['_commandWindow']),this[_0x349afc(0x34d)][_0x349afc(0x382)](_0x4c1d66[_0x349afc(0x3c0)]['CommandBgType']);}}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x48b)]=Game_BattlerBase['prototype'][_0x52866a(0x7a4)],Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x7a4)]=function(){const _0xe34e22=_0x52866a;this[_0xe34e22(0x923)]={},VisuMZ[_0xe34e22(0x8b9)][_0xe34e22(0x48b)][_0xe34e22(0x235)](this);},VisuMZ[_0x52866a(0x8b9)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x1f5)]=function(){const _0x4e2f68=_0x52866a;this[_0x4e2f68(0x923)]={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh'][_0x4e2f68(0x235)](this);},Game_BattlerBase['prototype'][_0x52866a(0x91a)]=function(_0x2db0f8){const _0x54c0b9=_0x52866a;return this[_0x54c0b9(0x923)]=this['_cache']||{},this['_cache'][_0x2db0f8]!==undefined;},Game_BattlerBase[_0x52866a(0x8dc)]['paramPlus']=function(_0x55341b){const _0x33427b=_0x52866a,_0x569a77=(_0x4520a8,_0x143dbb)=>{const _0x1c84f8=_0x1098;if(!_0x143dbb)return _0x4520a8;if(_0x143dbb[_0x1c84f8(0x7e2)][_0x1c84f8(0x1e7)](VisuMZ[_0x1c84f8(0x8b9)][_0x1c84f8(0x232)][_0x1c84f8(0x86d)][_0x55341b])){var _0x434096=Number(RegExp['$1']);_0x4520a8+=_0x434096;}if(_0x143dbb['note']['match'](VisuMZ[_0x1c84f8(0x8b9)][_0x1c84f8(0x232)][_0x1c84f8(0x62c)][_0x55341b])){var _0xb84438=String(RegExp['$1']);try{_0x4520a8+=eval(_0xb84438);}catch(_0xf42b1b){if(_0x1c84f8(0x48a)===_0x1c84f8(0x48a)){if($gameTemp['isPlaytest']())console[_0x1c84f8(0x3e1)](_0xf42b1b);}else _0x28c7fe=!_0x38384a;}}return _0x4520a8;};return this['traitObjects']()[_0x33427b(0x25c)](_0x569a77,this[_0x33427b(0x431)][_0x55341b]);},Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x35e)]=function(_0x21867b){const _0x52709c=_0x52866a;var _0x88ac63=_0x52709c(0x4f6)+(this[_0x52709c(0x969)]()?_0x52709c(0x61d):'Enemy')+'ParamMax'+_0x21867b;if(this[_0x52709c(0x91a)](_0x88ac63))return this[_0x52709c(0x923)][_0x88ac63];this[_0x52709c(0x923)][_0x88ac63]=eval(VisuMZ[_0x52709c(0x8b9)]['Settings'][_0x52709c(0x3ad)][_0x88ac63]);const _0x487699=(_0xdad3b3,_0x3a3c49)=>{const _0xc9abfd=_0x52709c;if(!_0x3a3c49)return _0xdad3b3;if(_0x3a3c49[_0xc9abfd(0x7e2)][_0xc9abfd(0x1e7)](VisuMZ['CoreEngine'][_0xc9abfd(0x232)][_0xc9abfd(0x35e)][_0x21867b])){if('eAcuN'!==_0xc9abfd(0x6dd))_0x543d24[_0xc9abfd(0x2ac)][_0xc9abfd(0x7b2)]=_0xc9abfd(0x217);else{var _0x480d1b=Number(RegExp['$1']);if(_0x480d1b===0x0)_0x480d1b=Number['MAX_SAFE_INTEGER'];_0xdad3b3=Math[_0xc9abfd(0x629)](_0xdad3b3,_0x480d1b);}}if(_0x3a3c49[_0xc9abfd(0x7e2)]['match'](VisuMZ[_0xc9abfd(0x8b9)][_0xc9abfd(0x232)]['paramMaxJS'][_0x21867b])){var _0x46b88e=String(RegExp['$1']);try{_0xdad3b3=Math[_0xc9abfd(0x629)](_0xdad3b3,Number(eval(_0x46b88e)));}catch(_0x40d09d){if($gameTemp['isPlaytest']())console['log'](_0x40d09d);}}return _0xdad3b3;};if(this['_cache'][_0x88ac63]===0x0)this[_0x52709c(0x923)][_0x88ac63]=Number[_0x52709c(0x6b9)];return this[_0x52709c(0x923)][_0x88ac63]=this[_0x52709c(0x239)]()[_0x52709c(0x25c)](_0x487699,this['_cache'][_0x88ac63]),this['_cache'][_0x88ac63];},Game_BattlerBase[_0x52866a(0x8dc)]['paramRate']=function(_0x4cbea3){const _0x3079c8=_0x52866a,_0x8191b3=this[_0x3079c8(0x680)](Game_BattlerBase['TRAIT_PARAM'],_0x4cbea3),_0x1e5411=(_0xb6e176,_0x3e14ba)=>{const _0x536a08=_0x3079c8;if(!_0x3e14ba)return _0xb6e176;if(_0x3e14ba[_0x536a08(0x7e2)]['match'](VisuMZ[_0x536a08(0x8b9)]['RegExp']['paramRate1'][_0x4cbea3])){if('uLRDr'===_0x536a08(0x5bd)){var _0xe1d5c7=Number(RegExp['$1'])/0x64;_0xb6e176*=_0xe1d5c7;}else return this[_0x536a08(0x270)]()[_0x536a08(0x429)];}if(_0x3e14ba['note'][_0x536a08(0x1e7)](VisuMZ[_0x536a08(0x8b9)][_0x536a08(0x232)][_0x536a08(0x4d0)][_0x4cbea3])){var _0xe1d5c7=Number(RegExp['$1']);_0xb6e176*=_0xe1d5c7;}if(_0x3e14ba['note'][_0x536a08(0x1e7)](VisuMZ['CoreEngine'][_0x536a08(0x232)][_0x536a08(0x310)][_0x4cbea3])){if('skIfG'!==_0x536a08(0x8a5)){const _0x7fd853=_0x5c9eb1(this['constructor']['name']),_0x3e88e8=this[_0x536a08(0x4ad)](_0x7fd853);return _0x3e88e8?_0x3e88e8[_0x536a08(0x8fe)]:0xc0;}else{var _0x394282=String(RegExp['$1']);try{_0xb6e176*=eval(_0x394282);}catch(_0x52e9c6){if($gameTemp[_0x536a08(0x601)]())console[_0x536a08(0x3e1)](_0x52e9c6);}}}return _0xb6e176;};return this[_0x3079c8(0x239)]()['reduce'](_0x1e5411,_0x8191b3);},Game_BattlerBase[_0x52866a(0x8dc)]['paramFlatBonus']=function(_0x1d52b6){const _0x5c6ab8=_0x52866a,_0x4ac4fa=(_0xcac9ec,_0x5dbe6d)=>{const _0x42380b=_0x1098;if(!_0x5dbe6d)return _0xcac9ec;if(_0x5dbe6d[_0x42380b(0x7e2)]['match'](VisuMZ[_0x42380b(0x8b9)]['RegExp']['paramFlat'][_0x1d52b6])){if(_0x42380b(0x706)===_0x42380b(0x706)){var _0x384c59=Number(RegExp['$1']);_0xcac9ec+=_0x384c59;}else _0x1fe829+=_0x428df3+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x20e2ac,_0x318a18[_0x42380b(0x683)]||_0x42380b(0x336))+_0x2c243a;}if(_0x5dbe6d[_0x42380b(0x7e2)][_0x42380b(0x1e7)](VisuMZ['CoreEngine'][_0x42380b(0x232)][_0x42380b(0x24d)][_0x1d52b6])){var _0xd46444=String(RegExp['$1']);try{_0x42380b(0x45d)!==_0x42380b(0x45d)?this[_0x42380b(0x829)][_0x42380b(0x938)](_0x5e1788[_0x1f4946])?_0x41e5f7['playOk']():_0x35b6a3[_0x42380b(0x6ba)]():_0xcac9ec+=eval(_0xd46444);}catch(_0x1b0a00){if($gameTemp['isPlaytest']())console[_0x42380b(0x3e1)](_0x1b0a00);}}return _0xcac9ec;};return this['traitObjects']()[_0x5c6ab8(0x25c)](_0x4ac4fa,0x0);},Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x60d)]=function(_0x5c5282){const _0x57acba=_0x52866a;let _0x144813=_0x57acba(0x60d)+_0x5c5282+_0x57acba(0x430);if(this[_0x57acba(0x91a)](_0x144813))return this[_0x57acba(0x923)][_0x144813];return this[_0x57acba(0x923)][_0x144813]=Math['round'](VisuMZ[_0x57acba(0x8b9)]['Settings'][_0x57acba(0x3ad)]['BasicParameterFormula']['call'](this,_0x5c5282)),this['_cache'][_0x144813];},Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x377)]=function(_0xd65238){const _0x1bfe31=_0x52866a,_0x1350b0=(_0x412f18,_0x4efb1c)=>{const _0x4f2ae5=_0x1098;if(!_0x4efb1c)return _0x412f18;if(_0x4efb1c[_0x4f2ae5(0x7e2)][_0x4f2ae5(0x1e7)](VisuMZ[_0x4f2ae5(0x8b9)][_0x4f2ae5(0x232)][_0x4f2ae5(0x69e)][_0xd65238])){var _0x20ddf5=Number(RegExp['$1'])/0x64;_0x412f18+=_0x20ddf5;}if(_0x4efb1c[_0x4f2ae5(0x7e2)][_0x4f2ae5(0x1e7)](VisuMZ['CoreEngine'][_0x4f2ae5(0x232)][_0x4f2ae5(0x739)][_0xd65238])){var _0x20ddf5=Number(RegExp['$1']);_0x412f18+=_0x20ddf5;}if(_0x4efb1c[_0x4f2ae5(0x7e2)][_0x4f2ae5(0x1e7)](VisuMZ[_0x4f2ae5(0x8b9)]['RegExp'][_0x4f2ae5(0x91d)][_0xd65238])){var _0x4dc827=String(RegExp['$1']);try{_0x412f18+=eval(_0x4dc827);}catch(_0x1cb947){if($gameTemp[_0x4f2ae5(0x601)]())console['log'](_0x1cb947);}}return _0x412f18;};return this[_0x1bfe31(0x239)]()[_0x1bfe31(0x25c)](_0x1350b0,0x0);},Game_BattlerBase['prototype']['xparamRate']=function(_0xbf45e5){const _0x30e89d=_0x52866a,_0x255683=(_0xcf001c,_0x276636)=>{const _0x35cf32=_0x1098;if('BUQXW'!==_0x35cf32(0x260))return _0x5c0130[_0x35cf32(0x53f)][_0x35cf32(0x235)](this);else{if(!_0x276636)return _0xcf001c;if(_0x276636[_0x35cf32(0x7e2)]['match'](VisuMZ[_0x35cf32(0x8b9)][_0x35cf32(0x232)]['xparamRate1'][_0xbf45e5])){var _0x47eeb9=Number(RegExp['$1'])/0x64;_0xcf001c*=_0x47eeb9;}if(_0x276636['note'][_0x35cf32(0x1e7)](VisuMZ['CoreEngine'][_0x35cf32(0x232)][_0x35cf32(0x5a7)][_0xbf45e5])){var _0x47eeb9=Number(RegExp['$1']);_0xcf001c*=_0x47eeb9;}if(_0x276636['note'][_0x35cf32(0x1e7)](VisuMZ[_0x35cf32(0x8b9)][_0x35cf32(0x232)][_0x35cf32(0x4dd)][_0xbf45e5])){var _0x56637e=String(RegExp['$1']);try{_0xcf001c*=eval(_0x56637e);}catch(_0x540d12){if($gameTemp[_0x35cf32(0x601)]())console['log'](_0x540d12);}}return _0xcf001c;}};return this[_0x30e89d(0x239)]()['reduce'](_0x255683,0x1);},Game_BattlerBase[_0x52866a(0x8dc)]['xparamFlatBonus']=function(_0x3264a9){const _0xf408d4=_0x52866a,_0x13326c=(_0x13dca5,_0x14c1e)=>{const _0xacf683=_0x1098;if('hQZYe'===_0xacf683(0x476)){if(!_0x14c1e)return _0x13dca5;if(_0x14c1e[_0xacf683(0x7e2)][_0xacf683(0x1e7)](VisuMZ['CoreEngine'][_0xacf683(0x232)][_0xacf683(0x58c)][_0x3264a9])){if(_0xacf683(0x449)!==_0xacf683(0x78d)){var _0x549a0e=Number(RegExp['$1'])/0x64;_0x13dca5+=_0x549a0e;}else{if(_0x5f07f4)_0x1e5b9d[_0xacf683(0x729)](_0x13cfb5);}}if(_0x14c1e['note'][_0xacf683(0x1e7)](VisuMZ[_0xacf683(0x8b9)]['RegExp'][_0xacf683(0x4c2)][_0x3264a9])){var _0x549a0e=Number(RegExp['$1']);_0x13dca5+=_0x549a0e;}if(_0x14c1e['note'][_0xacf683(0x1e7)](VisuMZ[_0xacf683(0x8b9)]['RegExp'][_0xacf683(0x861)][_0x3264a9])){var _0x1cd377=String(RegExp['$1']);try{_0x13dca5+=eval(_0x1cd377);}catch(_0xdc6686){if($gameTemp[_0xacf683(0x601)]())console[_0xacf683(0x3e1)](_0xdc6686);}}return _0x13dca5;}else return _0x3a5248[_0xacf683(0x3c0)][_0xacf683(0x8c6)][_0xacf683(0x235)](this);};return this[_0xf408d4(0x239)]()['reduce'](_0x13326c,0x0);},Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x591)]=function(_0x11e11a){const _0x2d336b=_0x52866a;let _0x57a87d=_0x2d336b(0x591)+_0x11e11a+_0x2d336b(0x430);if(this['checkCacheKey'](_0x57a87d))return this[_0x2d336b(0x923)][_0x57a87d];return this[_0x2d336b(0x923)][_0x57a87d]=VisuMZ[_0x2d336b(0x8b9)][_0x2d336b(0x727)][_0x2d336b(0x3ad)]['XParameterFormula']['call'](this,_0x11e11a),this[_0x2d336b(0x923)][_0x57a87d];},Game_BattlerBase[_0x52866a(0x8dc)]['sparamPlus']=function(_0x5708f1){const _0x28d19a=_0x52866a,_0x5f0f3d=(_0x16ce7a,_0x5a61b0)=>{const _0xbb00fa=_0x1098;if(!_0x5a61b0)return _0x16ce7a;if(_0x5a61b0[_0xbb00fa(0x7e2)]['match'](VisuMZ[_0xbb00fa(0x8b9)][_0xbb00fa(0x232)]['sparamPlus1'][_0x5708f1])){var _0xe7140d=Number(RegExp['$1'])/0x64;_0x16ce7a+=_0xe7140d;}if(_0x5a61b0['note']['match'](VisuMZ['CoreEngine'][_0xbb00fa(0x232)]['sparamPlus2'][_0x5708f1])){var _0xe7140d=Number(RegExp['$1']);_0x16ce7a+=_0xe7140d;}if(_0x5a61b0[_0xbb00fa(0x7e2)][_0xbb00fa(0x1e7)](VisuMZ[_0xbb00fa(0x8b9)][_0xbb00fa(0x232)][_0xbb00fa(0x827)][_0x5708f1])){var _0x17c267=String(RegExp['$1']);try{if(_0xbb00fa(0x968)!==_0xbb00fa(0x968))return'BTB';else _0x16ce7a+=eval(_0x17c267);}catch(_0x268637){if($gameTemp[_0xbb00fa(0x601)]())console[_0xbb00fa(0x3e1)](_0x268637);}}return _0x16ce7a;};return this['traitObjects']()[_0x28d19a(0x25c)](_0x5f0f3d,0x0);},Game_BattlerBase[_0x52866a(0x8dc)]['sparamRate']=function(_0x3e2586){const _0x3e0d2c=_0x52866a,_0x5e985e=(_0x2a5c3b,_0x2b558e)=>{const _0x2f408a=_0x1098;if(!_0x2b558e)return _0x2a5c3b;if(_0x2b558e[_0x2f408a(0x7e2)][_0x2f408a(0x1e7)](VisuMZ[_0x2f408a(0x8b9)]['RegExp'][_0x2f408a(0x6a2)][_0x3e2586])){var _0x5e386a=Number(RegExp['$1'])/0x64;_0x2a5c3b*=_0x5e386a;}if(_0x2b558e[_0x2f408a(0x7e2)][_0x2f408a(0x1e7)](VisuMZ['CoreEngine'][_0x2f408a(0x232)]['sparamRate2'][_0x3e2586])){if(_0x2f408a(0x1e8)!==_0x2f408a(0x537)){var _0x5e386a=Number(RegExp['$1']);_0x2a5c3b*=_0x5e386a;}else return _0x4eb7b3[_0x2f408a(0x8b9)][_0x2f408a(0x727)][_0x2f408a(0x4bd)][_0x2f408a(0x6b3)];}if(_0x2b558e[_0x2f408a(0x7e2)][_0x2f408a(0x1e7)](VisuMZ[_0x2f408a(0x8b9)][_0x2f408a(0x232)][_0x2f408a(0x368)][_0x3e2586])){if(_0x2f408a(0x47d)!==_0x2f408a(0x47d)){var _0x3f651e=_0x11fcb4(_0xc47f4a['$1']);_0x328001*=_0x3f651e;}else{var _0x50e20d=String(RegExp['$1']);try{_0x2a5c3b*=eval(_0x50e20d);}catch(_0x4866db){if($gameTemp[_0x2f408a(0x601)]())console[_0x2f408a(0x3e1)](_0x4866db);}}}return _0x2a5c3b;};return this[_0x3e0d2c(0x239)]()[_0x3e0d2c(0x25c)](_0x5e985e,0x1);},Game_BattlerBase['prototype'][_0x52866a(0x5b1)]=function(_0x29efba){const _0x81c4e3=_0x52866a,_0x474083=(_0x10b07d,_0x210f97)=>{const _0x203018=_0x1098;if(_0x203018(0x452)!==_0x203018(0x452)){const _0x368880=_0xd3cdb5['FunctionName'][_0x203018(0x73d)](/[ ]/g,''),_0x4b5054=_0x28cc8a[_0x203018(0x6e3)];_0x3f9424[_0x203018(0x8b9)][_0x203018(0x254)](_0x368880,_0x4b5054);}else{if(!_0x210f97)return _0x10b07d;if(_0x210f97['note'][_0x203018(0x1e7)](VisuMZ[_0x203018(0x8b9)][_0x203018(0x232)][_0x203018(0x268)][_0x29efba])){if('FwXlO'!==_0x203018(0x37e)){var _0xe20db0=_0xd62774(_0xa4fbe6['$1'])/0x64;_0x1e8bcc*=_0xe20db0;}else{var _0x5f49a0=Number(RegExp['$1'])/0x64;_0x10b07d+=_0x5f49a0;}}if(_0x210f97['note'][_0x203018(0x1e7)](VisuMZ[_0x203018(0x8b9)][_0x203018(0x232)][_0x203018(0x4eb)][_0x29efba])){var _0x5f49a0=Number(RegExp['$1']);_0x10b07d+=_0x5f49a0;}if(_0x210f97[_0x203018(0x7e2)][_0x203018(0x1e7)](VisuMZ['CoreEngine'][_0x203018(0x232)][_0x203018(0x62e)][_0x29efba])){if(_0x203018(0x76d)===_0x203018(0x76d)){var _0x411c10=String(RegExp['$1']);try{_0x10b07d+=eval(_0x411c10);}catch(_0x58f4e6){if('jnIsJ'==='UVSmh')this[_0x203018(0x397)][_0x52c5e3]=_0x203018(0x902)[_0x203018(0x782)](_0x48a8d6(_0x242b11['$1']));else{if($gameTemp[_0x203018(0x601)]())console[_0x203018(0x3e1)](_0x58f4e6);}}}else _0x58c17b+=_0x585e92;}return _0x10b07d;}};return this[_0x81c4e3(0x239)]()[_0x81c4e3(0x25c)](_0x474083,0x0);},Game_BattlerBase[_0x52866a(0x8dc)][_0x52866a(0x6bf)]=function(_0x33e8c3){const _0x4d3cf4=_0x52866a;let _0x2fa7a2=_0x4d3cf4(0x6bf)+_0x33e8c3+_0x4d3cf4(0x430);if(this['checkCacheKey'](_0x2fa7a2))return this['_cache'][_0x2fa7a2];return this['_cache'][_0x2fa7a2]=VisuMZ['CoreEngine'][_0x4d3cf4(0x727)]['Param']['SParameterFormula'][_0x4d3cf4(0x235)](this,_0x33e8c3),this['_cache'][_0x2fa7a2];},Game_BattlerBase[_0x52866a(0x8dc)]['paramValueByName']=function(_0x1fdc51,_0x70a816){const _0x14eccb=_0x52866a;if(typeof paramId===_0x14eccb(0x5aa))return this[_0x14eccb(0x60d)](_0x1fdc51);_0x1fdc51=String(_0x1fdc51||'')['toUpperCase']();if(_0x1fdc51===_0x14eccb(0x839))return this[_0x14eccb(0x60d)](0x0);if(_0x1fdc51===_0x14eccb(0x566))return this[_0x14eccb(0x60d)](0x1);if(_0x1fdc51===_0x14eccb(0x738))return this[_0x14eccb(0x60d)](0x2);if(_0x1fdc51===_0x14eccb(0x442))return this[_0x14eccb(0x60d)](0x3);if(_0x1fdc51===_0x14eccb(0x462))return this['param'](0x4);if(_0x1fdc51===_0x14eccb(0x53e))return this[_0x14eccb(0x60d)](0x5);if(_0x1fdc51==='AGI')return this['param'](0x6);if(_0x1fdc51===_0x14eccb(0x79f))return this[_0x14eccb(0x60d)](0x7);if(_0x1fdc51===_0x14eccb(0x358))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x1fdc51==='EVA')return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x1)*0x64))+'%':this[_0x14eccb(0x591)](0x1);if(_0x1fdc51===_0x14eccb(0x4a8))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x2)*0x64))+'%':this[_0x14eccb(0x591)](0x2);if(_0x1fdc51===_0x14eccb(0x419))return _0x70a816?String(Math['round'](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x1fdc51===_0x14eccb(0x893))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x4)*0x64))+'%':this[_0x14eccb(0x591)](0x4);if(_0x1fdc51===_0x14eccb(0x960))return _0x70a816?String(Math[_0x14eccb(0x447)](this['xparam'](0x5)*0x64))+'%':this[_0x14eccb(0x591)](0x5);if(_0x1fdc51===_0x14eccb(0x8cc))return _0x70a816?String(Math[_0x14eccb(0x447)](this['xparam'](0x6)*0x64))+'%':this[_0x14eccb(0x591)](0x6);if(_0x1fdc51==='HRG')return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x7)*0x64))+'%':this[_0x14eccb(0x591)](0x7);if(_0x1fdc51===_0x14eccb(0x990))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x591)](0x8)*0x64))+'%':this[_0x14eccb(0x591)](0x8);if(_0x1fdc51===_0x14eccb(0x911))return _0x70a816?String(Math[_0x14eccb(0x447)](this['xparam'](0x9)*0x64))+'%':this[_0x14eccb(0x591)](0x9);if(_0x1fdc51===_0x14eccb(0x663))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x0)*0x64))+'%':this[_0x14eccb(0x6bf)](0x0);if(_0x1fdc51==='GRD')return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x1)*0x64))+'%':this[_0x14eccb(0x6bf)](0x1);if(_0x1fdc51==='REC')return _0x70a816?String(Math['round'](this[_0x14eccb(0x6bf)](0x2)*0x64))+'%':this[_0x14eccb(0x6bf)](0x2);if(_0x1fdc51===_0x14eccb(0x286))return _0x70a816?String(Math[_0x14eccb(0x447)](this['sparam'](0x3)*0x64))+'%':this[_0x14eccb(0x6bf)](0x3);if(_0x1fdc51===_0x14eccb(0x4f3))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x4)*0x64))+'%':this[_0x14eccb(0x6bf)](0x4);if(_0x1fdc51===_0x14eccb(0x913))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x5)*0x64))+'%':this[_0x14eccb(0x6bf)](0x5);if(_0x1fdc51===_0x14eccb(0x705))return _0x70a816?String(Math[_0x14eccb(0x447)](this['sparam'](0x6)*0x64))+'%':this[_0x14eccb(0x6bf)](0x6);if(_0x1fdc51===_0x14eccb(0x67a))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x1fdc51===_0x14eccb(0x496))return _0x70a816?String(Math[_0x14eccb(0x447)](this[_0x14eccb(0x6bf)](0x8)*0x64))+'%':this[_0x14eccb(0x6bf)](0x8);if(_0x1fdc51==='EXR')return _0x70a816?String(Math['round'](this[_0x14eccb(0x6bf)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x14eccb(0x8b9)]['CustomParamAbb'][_0x1fdc51]){if(_0x14eccb(0x323)!=='kvhck'){const _0x5231b1=VisuMZ[_0x14eccb(0x8b9)][_0x14eccb(0x6aa)][_0x1fdc51],_0x225ef2=this[_0x5231b1];return VisuMZ['CoreEngine'][_0x14eccb(0x703)][_0x1fdc51]==='integer'?_0x225ef2:_0x70a816?String(Math[_0x14eccb(0x447)](_0x225ef2*0x64))+'%':_0x225ef2;}else _0x4b292c[_0x14eccb(0x3c5)]?this[_0x14eccb(0x8e6)]=_0x4f763f['windowOpacity']():this['backOpacity']=_0x27b895[_0x14eccb(0x8b9)][_0x14eccb(0x727)]['Window'][_0x14eccb(0x55f)];}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x199ae1=_0x52866a;return this[_0x199ae1(0x500)]()&&this['_hp']<this['mhp']*VisuMZ['CoreEngine'][_0x199ae1(0x727)]['Param']['CrisisRate'];},Game_Battler[_0x52866a(0x8dc)][_0x52866a(0x35a)]=function(){const _0xd8141f=_0x52866a;SoundManager[_0xd8141f(0x36f)](),this['requestMotion']('evade');},VisuMZ[_0x52866a(0x8b9)]['Game_Actor_paramBase']=Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x6c7)],Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x6c7)]=function(_0x2ccd9a){const _0x3a4cdc=_0x52866a;if(this[_0x3a4cdc(0x429)]>0x63)return this[_0x3a4cdc(0x223)](_0x2ccd9a);return VisuMZ[_0x3a4cdc(0x8b9)][_0x3a4cdc(0x209)][_0x3a4cdc(0x235)](this,_0x2ccd9a);},Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x223)]=function(_0x2b7477){const _0x58f9c6=_0x52866a,_0x19f573=this[_0x58f9c6(0x931)]()[_0x58f9c6(0x301)][_0x2b7477][0x63],_0x156f0b=this[_0x58f9c6(0x931)]()[_0x58f9c6(0x301)][_0x2b7477][0x62];return _0x19f573+(_0x19f573-_0x156f0b)*(this[_0x58f9c6(0x429)]-0x63);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x29c)]=Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x448)],Game_Actor[_0x52866a(0x8dc)]['changeClass']=function(_0x5b1f05,_0x186cee){const _0x27d645=_0x52866a;$gameTemp['_changingClass']=!![],VisuMZ[_0x27d645(0x8b9)][_0x27d645(0x29c)][_0x27d645(0x235)](this,_0x5b1f05,_0x186cee),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x52866a(0x8b9)]['Game_Actor_levelUp']=Game_Actor['prototype']['levelUp'],Game_Actor[_0x52866a(0x8dc)]['levelUp']=function(){const _0x368dfa=_0x52866a;VisuMZ[_0x368dfa(0x8b9)][_0x368dfa(0x375)][_0x368dfa(0x235)](this);if(!$gameTemp['_changingClass'])this[_0x368dfa(0x525)]();},Game_Actor[_0x52866a(0x8dc)]['levelUpRecovery']=function(){const _0x1e57f6=_0x52866a;this['_cache']={};if(VisuMZ['CoreEngine']['Settings'][_0x1e57f6(0x98c)][_0x1e57f6(0x4ec)])this[_0x1e57f6(0x742)]=this[_0x1e57f6(0x590)];if(VisuMZ[_0x1e57f6(0x8b9)][_0x1e57f6(0x727)][_0x1e57f6(0x98c)][_0x1e57f6(0x737)])this[_0x1e57f6(0x59d)]=this[_0x1e57f6(0x754)];},Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x4c4)]=function(){const _0x249a1c=_0x52866a;if(this['isMaxLevel']())return 0x1;const _0x4d1506=this[_0x249a1c(0x6f2)]()-this[_0x249a1c(0x7d9)](),_0x575498=this[_0x249a1c(0x768)]()-this['currentLevelExp']();return(_0x575498/_0x4d1506)[_0x249a1c(0x903)](0x0,0x1);},Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x239)]=function(){const _0x493902=_0x52866a,_0x299c2f=Game_Battler['prototype'][_0x493902(0x239)][_0x493902(0x235)](this);for(const _0x3c03cc of this[_0x493902(0x6a6)]()){if(_0x3c03cc){if(_0x493902(0x364)===_0x493902(0x364))_0x299c2f[_0x493902(0x4f5)](_0x3c03cc);else return this[_0x493902(0x5dc)]();}}return _0x299c2f[_0x493902(0x4f5)](this[_0x493902(0x931)](),this['actor']()),_0x299c2f;},Object[_0x52866a(0x495)](Game_Enemy['prototype'],_0x52866a(0x429),{'get':function(){const _0x334a2c=_0x52866a;return this[_0x334a2c(0x671)]();},'configurable':!![]}),Game_Enemy[_0x52866a(0x8dc)]['getLevel']=function(){return this['enemy']()['level'];},Game_Enemy[_0x52866a(0x8dc)][_0x52866a(0x231)]=function(){const _0x4370be=_0x52866a;!this[_0x4370be(0x50c)]&&(this[_0x4370be(0x8c7)]+=Math[_0x4370be(0x447)]((Graphics[_0x4370be(0x8a0)]-0x270)/0x2),this['_screenY']-=Math[_0x4370be(0x7b3)]((Graphics[_0x4370be(0x8a0)]-Graphics[_0x4370be(0x898)])/0x2),$gameSystem[_0x4370be(0x730)]()?this['_screenX']-=Math[_0x4370be(0x7b3)]((Graphics[_0x4370be(0x2e8)]-Graphics[_0x4370be(0x912)])/0x2):this['_screenX']+=Math[_0x4370be(0x447)]((Graphics['boxWidth']-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x52866a(0x8dc)][_0x52866a(0x4f7)]=function(){const _0x2a1077=_0x52866a;return VisuMZ['CoreEngine'][_0x2a1077(0x727)]['Gold'][_0x2a1077(0x2b4)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party[_0x52866a(0x8dc)][_0x52866a(0x2ff)],Game_Party[_0x52866a(0x8dc)][_0x52866a(0x2ff)]=function(_0x1ae3cb){const _0x5ebaaf=_0x52866a;if(VisuMZ[_0x5ebaaf(0x8b9)][_0x5ebaaf(0x727)][_0x5ebaaf(0x98c)][_0x5ebaaf(0x3f0)]&&DataManager[_0x5ebaaf(0x5a6)](_0x1ae3cb))return;VisuMZ[_0x5ebaaf(0x8b9)][_0x5ebaaf(0x3c3)]['call'](this,_0x1ae3cb);},Game_Party[_0x52866a(0x8dc)][_0x52866a(0x2e4)]=function(){const _0x439fc8=_0x52866a,_0x209765=VisuMZ[_0x439fc8(0x8b9)][_0x439fc8(0x727)][_0x439fc8(0x98c)],_0x3d2057=_0x209765['BTestAddedQuantity']??0x63;let _0x812620=[];(_0x209765[_0x439fc8(0x31b)]??!![])&&(_0x439fc8(0x604)!==_0x439fc8(0x604)?(_0x467354+=_0x1ab35e+'\x0a',_0x4177f9+='〘Scrolling\x20Text〙\x0a'):_0x812620=_0x812620['concat']($dataItems));(_0x209765[_0x439fc8(0x7db)]??!![])&&(_0x812620=_0x812620[_0x439fc8(0x43d)]($dataWeapons));if(_0x209765['BTestArmors']??!![]){if(_0x439fc8(0x1dd)!==_0x439fc8(0x1dd)){var _0x2f7850=_0x5126f4(_0x3cb085['$1'])/0x64;_0x37afdc+=_0x2f7850;}else _0x812620=_0x812620[_0x439fc8(0x43d)]($dataArmors);}for(const _0x5abdc3 of _0x812620){if(!_0x5abdc3)continue;if(_0x5abdc3[_0x439fc8(0x683)][_0x439fc8(0x8cb)]()<=0x0)continue;if(_0x5abdc3[_0x439fc8(0x683)][_0x439fc8(0x1e7)](/-----/i))continue;this[_0x439fc8(0x1bf)](_0x5abdc3,_0x3d2057);}},VisuMZ['CoreEngine'][_0x52866a(0x34a)]=Game_Troop[_0x52866a(0x8dc)][_0x52866a(0x8c3)],Game_Troop[_0x52866a(0x8dc)][_0x52866a(0x8c3)]=function(_0x34a7ed){const _0x1ca777=_0x52866a;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x1ca777(0x96b)](_0x34a7ed),VisuMZ[_0x1ca777(0x8b9)][_0x1ca777(0x34a)][_0x1ca777(0x235)](this,_0x34a7ed);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x897)]=Game_Map['prototype'][_0x52866a(0x8c3)],Game_Map[_0x52866a(0x8dc)][_0x52866a(0x8c3)]=function(_0x1b726b){const _0x44d163=_0x52866a;VisuMZ[_0x44d163(0x8b9)]['Game_Map_setup'][_0x44d163(0x235)](this,_0x1b726b),this[_0x44d163(0x595)](_0x1b726b);},Game_Map['prototype']['setupCoreEngine']=function(){const _0x48e797=_0x52866a;this[_0x48e797(0x7bb)]=VisuMZ[_0x48e797(0x8b9)]['Settings'][_0x48e797(0x98c)]['NoTileShadows']||![];if($dataMap&&$dataMap['note']){if('qMTEo'!==_0x48e797(0x339)){if($dataMap[_0x48e797(0x7e2)][_0x48e797(0x1e7)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x48e797(0x7e2)][_0x48e797(0x1e7)](/<HIDE TILE SHADOWS>/i))this[_0x48e797(0x7bb)]=!![];}else return _0xa0c833[_0x48e797(0x447)](_0x280990[_0x48e797(0x8b9)][_0x48e797(0x688)][_0x48e797(0x235)](this,_0x1cd7b1));}},Game_Map[_0x52866a(0x8dc)][_0x52866a(0x2c1)]=function(){const _0x5d254e=_0x52866a;if(this[_0x5d254e(0x7bb)]===undefined)this['setupCoreEngine']();return this[_0x5d254e(0x7bb)];},VisuMZ['CoreEngine']['Game_Character_processMoveCommand']=Game_Character[_0x52866a(0x8dc)][_0x52866a(0x598)],Game_Character[_0x52866a(0x8dc)][_0x52866a(0x598)]=function(_0x958a8){const _0x11dbe2=_0x52866a;try{if(_0x11dbe2(0x750)===_0x11dbe2(0x338)){var _0x373eaa=_0x1e4a3d(_0x4b31d9['$1'])/0x64;_0x362902+=_0x373eaa;}else VisuMZ[_0x11dbe2(0x8b9)][_0x11dbe2(0x6b0)][_0x11dbe2(0x235)](this,_0x958a8);}catch(_0x24003f){if(_0x11dbe2(0x809)==='UPuCf')return _0x1cdc84['CoreEngine'][_0x11dbe2(0x941)][_0x11dbe2(0x235)](this)['clamp'](0x0,0x1);else{if($gameTemp[_0x11dbe2(0x601)]())console[_0x11dbe2(0x3e1)](_0x24003f);}}},Game_Player['prototype']['makeEncounterCount']=function(){const _0x5eca06=_0x52866a,_0x11e1b1=$gameMap[_0x5eca06(0x567)]();this[_0x5eca06(0x68f)]=Math[_0x5eca06(0x5b2)](_0x11e1b1)+Math[_0x5eca06(0x5b2)](_0x11e1b1)+this[_0x5eca06(0x503)]();},Game_Player[_0x52866a(0x8dc)][_0x52866a(0x503)]=function(){const _0x348cea=_0x52866a;return $dataMap&&$dataMap[_0x348cea(0x7e2)]&&$dataMap['note'][_0x348cea(0x1e7)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x348cea(0x2d4)!==_0x348cea(0x2a5)?Number(RegExp['$1']):(this[_0x348cea(0x3c4)]=this[_0x348cea(0x3c4)]||0x0,[0x0,0x1,0x2,0x3][_0x348cea(0x234)](this['_coreEasingType'])?_0x50b054[_0x348cea(0x8b9)][_0x348cea(0x614)]['call'](this,_0x1b8dde):_0x2f60b9['ApplyEasing'](_0x3aac8b,this[_0x348cea(0x3c4)])):_0x348cea(0x258)===_0x348cea(0x258)?VisuMZ[_0x348cea(0x8b9)][_0x348cea(0x727)][_0x348cea(0x98c)][_0x348cea(0x57d)]:_0x55b298[_0x348cea(0x3c0)][_0x348cea(0x4b5)]['call'](this);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x1d3)]=Game_Event['prototype']['isCollidedWithEvents'],Game_Event[_0x52866a(0x8dc)][_0x52866a(0x2b9)]=function(_0x35a13e,_0x200e83){const _0x5d791b=_0x52866a;if(this[_0x5d791b(0x4a7)]())return this['checkSmartEventCollision'](_0x35a13e,_0x200e83);else{if(_0x5d791b(0x3bf)===_0x5d791b(0x369))_0x159663[_0x5d791b(0x8b9)][_0x5d791b(0x3a8)][_0x5d791b(0x235)](this),this[_0x5d791b(0x950)](this[_0x5d791b(0x2ec)]-0x1),_0x18bf80['clear']();else return VisuMZ[_0x5d791b(0x8b9)][_0x5d791b(0x1d3)]['call'](this,_0x35a13e,_0x200e83);}},Game_Event[_0x52866a(0x8dc)][_0x52866a(0x4a7)]=function(){const _0x2a3397=_0x52866a;return VisuMZ[_0x2a3397(0x8b9)]['Settings'][_0x2a3397(0x98c)][_0x2a3397(0x714)];},Game_Event[_0x52866a(0x8dc)][_0x52866a(0x6b8)]=function(_0x55463b,_0x3099e5){const _0x521cd2=_0x52866a;if(!this[_0x521cd2(0x206)]())return _0x521cd2(0x8c5)!=='OuXrM'?_0x38cb14['CoreEngine'][_0x521cd2(0x703)][_0xd5b979]===_0x521cd2(0x94f)?_0x193991:_0x2fbe09((_0x4285e8*0x64)[_0x521cd2(0x859)](_0x223b13))+'%':![];else{const _0x138d53=$gameMap[_0x521cd2(0x1d8)](_0x55463b,_0x3099e5)[_0x521cd2(0x54c)](_0x429b75=>_0x429b75[_0x521cd2(0x206)]());return _0x138d53[_0x521cd2(0x708)]>0x0;}},VisuMZ['CoreEngine'][_0x52866a(0x826)]=Game_Interpreter[_0x52866a(0x8dc)]['command105'],Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x894)]=function(_0x1bd3aa){const _0x4081f4=_0x52866a,_0x3fcaaf=this['getCombinedScrollingText']();return _0x3fcaaf[_0x4081f4(0x1e7)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x4081f4(0x263)](_0x3fcaaf):VisuMZ[_0x4081f4(0x8b9)][_0x4081f4(0x826)][_0x4081f4(0x235)](this,_0x1bd3aa);},Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x80a)]=function(){const _0x4ca367=_0x52866a;let _0x257c97='',_0x4966a5=this[_0x4ca367(0x863)]+0x1;while(this['_list'][_0x4966a5]&&this[_0x4ca367(0x707)][_0x4966a5][_0x4ca367(0x527)]===0x195){_0x4ca367(0x316)!==_0x4ca367(0x316)?this['_screenX']-=_0x5e66c4['floor']((_0x126815[_0x4ca367(0x2e8)]-_0x41712c[_0x4ca367(0x912)])/0x2):(_0x257c97+=this[_0x4ca367(0x707)][_0x4966a5][_0x4ca367(0x65f)][0x0]+'\x0a',_0x4966a5++);}return _0x257c97;},Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x263)]=function(_0x10e40d){const _0x423dda=_0x52866a;try{if(_0x423dda(0x552)!==_0x423dda(0x8de))eval(_0x10e40d);else return _0x2658b9[_0x423dda(0x58e)](_0x423dda(0x648));}catch(_0x5be1a5){$gameTemp['isPlaytest']()&&(_0x423dda(0x610)!==_0x423dda(0x610)?this['_categoryWindow'][_0x423dda(0x382)](_0x22cc16['layoutSettings'][_0x423dda(0x97a)]):(console[_0x423dda(0x3e1)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x423dda(0x3e1)](_0x5be1a5)));}return!![];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x302)]=Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x335)],Game_Interpreter['prototype'][_0x52866a(0x335)]=function(_0x6869ae){const _0x45d17f=_0x52866a;try{VisuMZ[_0x45d17f(0x8b9)][_0x45d17f(0x302)]['call'](this,_0x6869ae);}catch(_0x311202){if(_0x45d17f(0x4f4)===_0x45d17f(0x4f4))$gameTemp[_0x45d17f(0x601)]()&&(console[_0x45d17f(0x3e1)](_0x45d17f(0x993)),console[_0x45d17f(0x3e1)](_0x311202)),this[_0x45d17f(0x5de)]();else{if(_0x503a76)_0xa987a2[_0x45d17f(0x4d3)](_0x553445);}}return!![];},VisuMZ[_0x52866a(0x8b9)]['Game_Interpreter_command122']=Game_Interpreter['prototype'][_0x52866a(0x71c)],Game_Interpreter['prototype'][_0x52866a(0x71c)]=function(_0x3055e6){const _0x13dbb3=_0x52866a;try{VisuMZ['CoreEngine'][_0x13dbb3(0x446)][_0x13dbb3(0x235)](this,_0x3055e6);}catch(_0x59d885){_0x13dbb3(0x3fa)!=='PUgao'?this[_0x13dbb3(0x34d)][_0x13dbb3(0x382)](_0x3af1b3['layoutSettings']['CommandBgType']):$gameTemp[_0x13dbb3(0x601)]()&&(console['log'](_0x13dbb3(0x1ce)),console[_0x13dbb3(0x3e1)](_0x59d885));}return!![];},VisuMZ['CoreEngine'][_0x52866a(0x961)]=Game_Interpreter[_0x52866a(0x8dc)]['command355'],Game_Interpreter['prototype'][_0x52866a(0x6e4)]=function(){const _0x2c0287=_0x52866a;try{VisuMZ[_0x2c0287(0x8b9)]['Game_Interpreter_command355'][_0x2c0287(0x235)](this);}catch(_0x1f1952){$gameTemp[_0x2c0287(0x601)]()&&(_0x2c0287(0x580)===_0x2c0287(0x580)?(console[_0x2c0287(0x3e1)](_0x2c0287(0x280)),console[_0x2c0287(0x3e1)](_0x1f1952)):this['_helpWindow'][_0x2c0287(0x382)](_0x611e7c[_0x2c0287(0x3c0)][_0x2c0287(0x3ae)]));}return!![];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8f5)]=Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x7fc)],Game_Interpreter['prototype'][_0x52866a(0x7fc)]=function(_0x1e358b){const _0x132305=_0x52866a;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['CoreEngine'][_0x132305(0x8f5)][_0x132305(0x235)](this,_0x1e358b);},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x49c)]=function(){const _0x2f2b69=_0x52866a;return VisuMZ[_0x2f2b69(0x8b9)][_0x2f2b69(0x727)]['UI']['FadeSpeed'];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x34c)]=function(){const _0x5bd506=_0x52866a;return VisuMZ[_0x5bd506(0x8b9)][_0x5bd506(0x727)]['UI'][_0x5bd506(0x995)];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x2d3)]=function(){const _0x32050e=_0x52866a;return VisuMZ[_0x32050e(0x8b9)][_0x32050e(0x727)]['UI']['BottomButtons'];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x80c)]=function(){const _0x7dd139=_0x52866a;return VisuMZ[_0x7dd139(0x8b9)][_0x7dd139(0x727)]['UI'][_0x7dd139(0x259)];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x2ae)]=function(){const _0x3f52aa=_0x52866a;return VisuMZ[_0x3f52aa(0x8b9)]['Settings']['UI'][_0x3f52aa(0x5fb)];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x4da)]=function(){const _0x953ef7=_0x52866a;return VisuMZ[_0x953ef7(0x8b9)][_0x953ef7(0x727)]['UI'][_0x953ef7(0x88f)];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x834)]=function(){const _0x16902c=_0x52866a;return VisuMZ[_0x16902c(0x8b9)][_0x16902c(0x727)]['Window'][_0x16902c(0x2f8)];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x32b)]=Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x7c6)],Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x7c6)]=function(){const _0xaf8b4f=_0x52866a;VisuMZ[_0xaf8b4f(0x8b9)][_0xaf8b4f(0x32b)][_0xaf8b4f(0x235)](this),this[_0xaf8b4f(0x38a)](),this['_windowLayer']['x']=Math['round'](this[_0xaf8b4f(0x2ba)]['x']),this[_0xaf8b4f(0x2ba)]['y']=Math[_0xaf8b4f(0x447)](this['_windowLayer']['y']);},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x38a)]=function(){},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x24b)]=function(){const _0x217a84=_0x52866a;return TextManager[_0x217a84(0x8b0)](_0x217a84(0x7ea),_0x217a84(0x6ad));},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x91f)]=function(){const _0xb6def5=_0x52866a;return TextManager[_0xb6def5(0x58e)](_0xb6def5(0x648));},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x8f3)]=function(){const _0x1bbee3=_0x52866a;return TextManager[_0x1bbee3(0x58e)](_0x1bbee3(0x8af));},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x617)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x80f)]=function(){const _0x677e1c=_0x52866a;return TextManager[_0x677e1c(0x58e)](_0x677e1c(0x492));},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x72f)]=function(){const _0x26d607=_0x52866a;return this[_0x26d607(0x390)]&&this[_0x26d607(0x390)][_0x26d607(0x8ab)]?TextManager[_0x26d607(0x2fa)]:'';},Scene_Base['prototype'][_0x52866a(0x359)]=function(){return'';},Scene_Base['prototype']['buttonAssistText3']=function(){return'';},Scene_Base[_0x52866a(0x8dc)]['buttonAssistText4']=function(){const _0xc4dda3=_0x52866a;return TextManager[_0xc4dda3(0x842)];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x875)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x952)]=function(){return 0x0;},Scene_Base['prototype'][_0x52866a(0x6de)]=function(){return 0x0;},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x329)]=function(){return 0x0;},Scene_Base[_0x52866a(0x8dc)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x523)]=function(){return 0x0;},VisuMZ[_0x52866a(0x8b9)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x5fd)],Scene_Boot[_0x52866a(0x8dc)]['loadSystemImages']=function(){const _0x1bc161=_0x52866a;VisuMZ['CoreEngine'][_0x1bc161(0x7ec)]['call'](this),this[_0x1bc161(0x4d4)]();},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x4d4)]=function(){const _0x17837f=_0x52866a,_0x5dee00=[_0x17837f(0x2bd),_0x17837f(0x927),'battlebacks2',_0x17837f(0x3d7),_0x17837f(0x928),_0x17837f(0x881),'parallaxes',_0x17837f(0x7f4),_0x17837f(0x220),_0x17837f(0x7ee),_0x17837f(0x540),'tilesets',_0x17837f(0x2de),_0x17837f(0x42b)];for(const _0x19387e of _0x5dee00){const _0x3d2a39=VisuMZ[_0x17837f(0x8b9)][_0x17837f(0x727)][_0x17837f(0x30c)][_0x19387e],_0x8efd18=_0x17837f(0x1d2)[_0x17837f(0x782)](_0x19387e);for(const _0x2e496e of _0x3d2a39){ImageManager[_0x17837f(0x227)](_0x8efd18,_0x2e496e);}}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x5c4)]=Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x350)],Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x350)]=function(){const _0x2998df=_0x52866a;Utils[_0x2998df(0x615)](_0x2998df(0x5c5))&&VisuMZ['CoreEngine'][_0x2998df(0x727)][_0x2998df(0x98c)][_0x2998df(0x576)]?this[_0x2998df(0x7a9)]():_0x2998df(0x8e8)!==_0x2998df(0x869)?VisuMZ[_0x2998df(0x8b9)][_0x2998df(0x5c4)]['call'](this):(_0x47e265=_0x771c7d||_0x2fb426['faceWidth'],_0x5763ce=_0x4af639||_0x4e19b3[_0x2998df(0x439)],_0x38131a=_0xd3e2c6['round'](_0x514c91),_0x5568eb=_0x4be529['round'](_0x342891),_0x57cf45=_0x44623f[_0x2998df(0x447)](_0x155a0a),_0x3cdf65=_0x28f8d4['round'](_0x19f6e2),_0x5ab827['CoreEngine'][_0x2998df(0x743)]['call'](this,_0x165373,_0x1932e7,_0x607abd,_0x403036,_0x1be9bd,_0x5dad7a));},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x7a9)]=function(){const _0x422b66=_0x52866a;DataManager[_0x422b66(0x89d)](),SceneManager[_0x422b66(0x3c2)](Scene_Map);},Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x871)]=function(){const _0x444abe=_0x52866a,_0xd7cdb8=$dataSystem[_0x444abe(0x1d4)][_0x444abe(0x2a6)],_0x40ea35=$dataSystem[_0x444abe(0x1d4)][_0x444abe(0x607)],_0x2cc52d=VisuMZ[_0x444abe(0x8b9)]['Settings']['UI'][_0x444abe(0x240)];Graphics[_0x444abe(0x912)]=_0xd7cdb8-_0x2cc52d*0x2,Graphics[_0x444abe(0x898)]=_0x40ea35-_0x2cc52d*0x2,this[_0x444abe(0x3ba)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8bb)]=Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x647)],Scene_Boot[_0x52866a(0x8dc)][_0x52866a(0x647)]=function(){const _0x4f089a=_0x52866a;if(this[_0x4f089a(0x7cd)]()){if(_0x4f089a(0x73c)!==_0x4f089a(0x73c)){this[_0x4f089a(0x69c)][_0x4f089a(0x616)](_0x332762),this['_effectsContainer'][_0x4f089a(0x8f6)](_0x361ac0);for(const _0x2abeb1 of _0x1695b8[_0x4f089a(0x681)]){_0x2abeb1[_0x4f089a(0x6d4)]&&_0x2abeb1['endAnimation']();const _0x41a1bb=this[_0x4f089a(0x294)]();if(_0x41a1bb)_0x41a1bb['removeChild'](_0x2abeb1);}_0x257689[_0x4f089a(0x389)]();}else this[_0x4f089a(0x3f9)]();}else{if(_0x4f089a(0x50a)!=='BOtCC'){if(!_0x127c0c)return;if(!_0x5b0f9a[_0x4f089a(0x969)]())return;const _0x4eaaa2=0x80,_0x318815=_0x36b8e1[_0x4f089a(0x4c4)]();let _0x2f2021=_0x4af834[_0x4f089a(0x8d8)](),_0x50b55f=_0x255078[_0x4f089a(0x668)]();_0x318815>=0x1&&(_0x2f2021=_0x2e961d[_0x4f089a(0x924)](),_0x50b55f=_0x1a3e12[_0x4f089a(0x6d0)]()),this['drawGauge'](_0x409c77,_0x3b6ed0,_0x4eaaa2,_0x318815,_0x2f2021,_0x50b55f);}else VisuMZ[_0x4f089a(0x8b9)]['Scene_Boot_updateDocumentTitle']['call'](this);}},Scene_Boot['prototype'][_0x52866a(0x7cd)]=function(){const _0x48da4c=_0x52866a;if(Scene_Title[_0x48da4c(0x4b9)]==='')return![];if(Scene_Title[_0x48da4c(0x4b9)]===_0x48da4c(0x97f))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']==='0.00')return![];return!![];},Scene_Boot['prototype'][_0x52866a(0x3f9)]=function(){const _0x1afa19=_0x52866a,_0x5c0a7c=$dataSystem[_0x1afa19(0x56a)],_0x2f46ea=Scene_Title[_0x1afa19(0x4b9)]||'',_0x2c2ab3=Scene_Title[_0x1afa19(0x74c)]||'',_0xc06cf2=VisuMZ[_0x1afa19(0x8b9)][_0x1afa19(0x727)][_0x1afa19(0x5f1)][_0x1afa19(0x2e1)][_0x1afa19(0x4d5)],_0x2a4e2e=_0xc06cf2[_0x1afa19(0x782)](_0x5c0a7c,_0x2f46ea,_0x2c2ab3);document[_0x1afa19(0x26c)]=_0x2a4e2e;},Scene_Boot[_0x52866a(0x8dc)]['determineSideButtonLayoutValid']=function(){const _0x59d831=_0x52866a;if(VisuMZ['CoreEngine'][_0x59d831(0x727)]['UI'][_0x59d831(0x7d3)]){const _0x3ebecf=Graphics[_0x59d831(0x2e8)]-Graphics[_0x59d831(0x912)]-VisuMZ[_0x59d831(0x8b9)][_0x59d831(0x727)]['UI'][_0x59d831(0x240)]*0x2,_0x221e87=Sprite_Button[_0x59d831(0x8dc)][_0x59d831(0x973)][_0x59d831(0x235)](this)*0x4;if(_0x3ebecf>=_0x221e87)SceneManager[_0x59d831(0x5c0)](!![]);}},Scene_Title[_0x52866a(0x4b9)]=VisuMZ['CoreEngine'][_0x52866a(0x727)][_0x52866a(0x5f1)]['Title'][_0x52866a(0x97f)],Scene_Title[_0x52866a(0x74c)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)]['Title'][_0x52866a(0x3fd)],Scene_Title[_0x52866a(0x8ec)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x7e4)],VisuMZ['CoreEngine']['Scene_Title_drawGameTitle']=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0x52866a(0x8dc)][_0x52866a(0x8c9)]=function(){const _0x375ad7=_0x52866a;VisuMZ['CoreEngine'][_0x375ad7(0x727)][_0x375ad7(0x5f1)][_0x375ad7(0x2e1)][_0x375ad7(0x8c9)][_0x375ad7(0x235)](this);if(Scene_Title[_0x375ad7(0x4b9)]!==''&&Scene_Title[_0x375ad7(0x4b9)]!==_0x375ad7(0x97f))this[_0x375ad7(0x511)]();if(Scene_Title[_0x375ad7(0x74c)]!==''&&Scene_Title[_0x375ad7(0x74c)]!==_0x375ad7(0x398))this['drawGameVersion']();},Scene_Title[_0x52866a(0x8dc)]['drawGameSubtitle']=function(){const _0xc09926=_0x52866a;VisuMZ[_0xc09926(0x8b9)]['Settings'][_0xc09926(0x5f1)][_0xc09926(0x2e1)][_0xc09926(0x511)][_0xc09926(0x235)](this);},Scene_Title[_0x52866a(0x8dc)][_0x52866a(0x76a)]=function(){const _0x2b8204=_0x52866a;VisuMZ['CoreEngine'][_0x2b8204(0x727)][_0x2b8204(0x5f1)][_0x2b8204(0x2e1)][_0x2b8204(0x76a)]['call'](this);},Scene_Title[_0x52866a(0x8dc)][_0x52866a(0x6cd)]=function(){const _0x29d97b=_0x52866a;this[_0x29d97b(0x7b6)]();const _0x505f8f=$dataSystem[_0x29d97b(0x249)][_0x29d97b(0x1ef)],_0x49bcca=this[_0x29d97b(0x5ad)]();this['_commandWindow']=new Window_TitleCommand(_0x49bcca),this[_0x29d97b(0x34d)]['setBackgroundType'](_0x505f8f);const _0x4fda20=this[_0x29d97b(0x5ad)]();this[_0x29d97b(0x34d)][_0x29d97b(0x20a)](_0x4fda20['x'],_0x4fda20['y'],_0x4fda20['width'],_0x4fda20[_0x29d97b(0x8a0)]),this[_0x29d97b(0x40c)](this[_0x29d97b(0x34d)]);},Scene_Title['prototype'][_0x52866a(0x410)]=function(){const _0x43e2e4=_0x52866a;if(this[_0x43e2e4(0x34d)]){if(_0x43e2e4(0x276)!==_0x43e2e4(0x276))var _0x3e72cd=_0x527890[_0x43e2e4(0x1bc)](_0x1fd57a*0x2-0x1,_0x43e2e4(0x704))*0.5+0.5;else return this[_0x43e2e4(0x34d)][_0x43e2e4(0x636)]();}else return VisuMZ[_0x43e2e4(0x8b9)]['Settings'][_0x43e2e4(0x468)]['length'];},Scene_Title[_0x52866a(0x8dc)][_0x52866a(0x5ad)]=function(){const _0x22297b=_0x52866a;return VisuMZ['CoreEngine'][_0x22297b(0x727)][_0x22297b(0x5f1)][_0x22297b(0x2e1)][_0x22297b(0x855)][_0x22297b(0x235)](this);},Scene_Title['prototype'][_0x52866a(0x7b6)]=function(){const _0x3898cf=_0x52866a;for(const _0x2f4c66 of Scene_Title['pictureButtons']){const _0x2942a6=new Sprite_TitlePictureButton(_0x2f4c66);this[_0x3898cf(0x5b0)](_0x2942a6);}},VisuMZ['CoreEngine'][_0x52866a(0x553)]=Scene_Map['prototype']['initialize'],Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(){const _0x8a42b4=_0x52866a;VisuMZ[_0x8a42b4(0x8b9)]['Scene_Map_initialize'][_0x8a42b4(0x235)](this),$gameTemp[_0x8a42b4(0x459)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x96f)]=Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x77e)],Scene_Map['prototype']['updateMainMultiply']=function(){const _0x38cfd6=_0x52866a;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x38cfd6(0x235)](this);if($gameTemp['_playTestFastMode']&&!$gameMessage[_0x38cfd6(0x20e)]()){if(_0x38cfd6(0x67d)!=='rEFyj')return!![];else this[_0x38cfd6(0x45e)](),SceneManager[_0x38cfd6(0x4c5)]();}},Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x70e)]=function(){const _0x34cba4=_0x52866a;Scene_Message['prototype'][_0x34cba4(0x70e)][_0x34cba4(0x235)](this),!SceneManager[_0x34cba4(0x515)](Scene_Battle)&&(this['_spriteset'][_0x34cba4(0x8c1)](),this[_0x34cba4(0x51c)][_0x34cba4(0x82b)](),this[_0x34cba4(0x2ba)][_0x34cba4(0x8ab)]=![],SceneManager[_0x34cba4(0x2dd)]()),$gameScreen['clearZoom']();},VisuMZ['CoreEngine'][_0x52866a(0x5ab)]=Scene_Map[_0x52866a(0x8dc)]['createMenuButton'],Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x31d)]=function(){const _0x4dc4eb=_0x52866a;VisuMZ['CoreEngine'][_0x4dc4eb(0x5ab)][_0x4dc4eb(0x235)](this),SceneManager['isSideButtonLayout']()&&this[_0x4dc4eb(0x654)]();},Scene_Map[_0x52866a(0x8dc)]['moveMenuButtonSideButtonLayout']=function(){const _0x42bc01=_0x52866a;this[_0x42bc01(0x901)]['x']=Graphics[_0x42bc01(0x912)]+0x4;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x574)]=Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x5a4)],Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x5a4)]=function(){const _0x8c0d9b=_0x52866a;VisuMZ[_0x8c0d9b(0x8b9)][_0x8c0d9b(0x574)][_0x8c0d9b(0x235)](this),this['updateDashToggle']();},Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x7d1)]=function(){const _0x4b3155=_0x52866a;Input['isTriggered'](_0x4b3155(0x313))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x4b3155(0x6b1)],ConfigManager[_0x4b3155(0x28b)]());},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x966)],Scene_MenuBase['prototype'][_0x52866a(0x966)]=function(){const _0x546efd=_0x52866a;let _0x4a9035=0x0;return SceneManager[_0x546efd(0x8f1)]()?_0x4a9035=this[_0x546efd(0x38c)]():_0x4a9035=VisuMZ[_0x546efd(0x8b9)][_0x546efd(0x257)][_0x546efd(0x235)](this),this[_0x546efd(0x849)]()&&this['getButtonAssistLocation']()===_0x546efd(0x880)&&(_0x4a9035+=Window_ButtonAssist[_0x546efd(0x8dc)][_0x546efd(0x504)]()),_0x4a9035;},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x38c)]=function(){const _0x1ee087=_0x52866a;if(this[_0x1ee087(0x34c)]()){if(_0x1ee087(0x709)===_0x1ee087(0x4ce))_0x1aedd6[_0x3d1104]=_0x219132[_0x1ee087(0x8b7)][_0x1c482f[_0x182023]];else return this[_0x1ee087(0x5dc)]();}else return 0x0;},VisuMZ[_0x52866a(0x8b9)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x8e1)],Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x8e1)]=function(){const _0x309b1c=_0x52866a;if(SceneManager[_0x309b1c(0x8f1)]()){if(_0x309b1c(0x4c1)==='HFxBw')this[_0x309b1c(0x7ed)](...arguments);else return this[_0x309b1c(0x745)]();}else return VisuMZ[_0x309b1c(0x8b9)][_0x309b1c(0x8d7)][_0x309b1c(0x235)](this);},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x745)]=function(){const _0x377082=_0x52866a;return!this[_0x377082(0x34c)]()?this[_0x377082(0x582)]():0x0;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x22a)]=Scene_MenuBase['prototype'][_0x52866a(0x474)],Scene_MenuBase['prototype'][_0x52866a(0x474)]=function(){const _0x367fe3=_0x52866a;let _0x258f92=0x0;if(SceneManager[_0x367fe3(0x8f1)]())_0x258f92=this[_0x367fe3(0x4a1)]();else{if(_0x367fe3(0x2cb)!==_0x367fe3(0x2cb)){const _0x4547e9=_0x555794[_0x367fe3(0x2c2)]==_0x367fe3(0x35c)?'open':_0x211de9[_0x367fe3(0x2c2)]==_0x367fe3(0x95f)?_0x367fe3(0x4cf):'xdg-open';_0x564a41('child_process')['exec'](_0x4547e9+'\x20'+_0x20bd39);}else _0x258f92=VisuMZ[_0x367fe3(0x8b9)][_0x367fe3(0x22a)][_0x367fe3(0x235)](this);}if(this[_0x367fe3(0x849)]()&&this[_0x367fe3(0x411)]()!==_0x367fe3(0x63d)){if(_0x367fe3(0x204)!==_0x367fe3(0x204)){var _0x57e794=_0xdf68a5(_0x5636f1['$1'])/0x64;_0x27f706*=_0x57e794;}else _0x258f92-=Window_ButtonAssist[_0x367fe3(0x8dc)][_0x367fe3(0x504)]();}return _0x258f92;},Scene_MenuBase['prototype'][_0x52866a(0x4a1)]=function(){const _0x5d2d47=_0x52866a;return Graphics[_0x5d2d47(0x898)]-this[_0x5d2d47(0x724)]();},VisuMZ[_0x52866a(0x8b9)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x6fd)],Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x6fd)]=function(){const _0x2d2256=_0x52866a;this[_0x2d2256(0x3d0)]=new PIXI[(_0x2d2256(0x1be))][(_0x2d2256(0x6f9))](clamp=!![]),this[_0x2d2256(0x852)]=new Sprite(),this[_0x2d2256(0x852)][_0x2d2256(0x96a)]=SceneManager['backgroundBitmap'](),this[_0x2d2256(0x852)][_0x2d2256(0x1be)]=[this[_0x2d2256(0x3d0)]],this[_0x2d2256(0x5b0)](this[_0x2d2256(0x852)]),this[_0x2d2256(0x8eb)](0xc0),this[_0x2d2256(0x8eb)](this[_0x2d2256(0x652)]()),this[_0x2d2256(0x943)]();},Scene_MenuBase['prototype']['getBackgroundOpacity']=function(){const _0x3ced7c=_0x52866a,_0x131246=String(this['constructor'][_0x3ced7c(0x683)]),_0x1cc99f=this[_0x3ced7c(0x4ad)](_0x131246);return _0x1cc99f?_0x3ced7c(0x986)!==_0x3ced7c(0x2a3)?_0x1cc99f['SnapshotOpacity']:0x0:0xc0;},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x943)]=function(){const _0x3992fe=_0x52866a,_0x2aa05f=String(this[_0x3992fe(0x948)][_0x3992fe(0x683)]),_0x3a9945=this[_0x3992fe(0x4ad)](_0x2aa05f);_0x3a9945&&(_0x3a9945[_0x3992fe(0x3bc)]!==''||_0x3a9945[_0x3992fe(0x486)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x3992fe(0x417)](_0x3a9945['BgFilename1'])),this[_0x3992fe(0x363)]=new Sprite(ImageManager[_0x3992fe(0x4c3)](_0x3a9945[_0x3992fe(0x486)])),this[_0x3992fe(0x5b0)](this['_backSprite1']),this[_0x3992fe(0x5b0)](this[_0x3992fe(0x363)]),this[_0x3992fe(0x1cd)]['bitmap'][_0x3992fe(0x3db)](this[_0x3992fe(0x96e)][_0x3992fe(0x733)](this,this['_backSprite1'])),this[_0x3992fe(0x363)][_0x3992fe(0x96a)][_0x3992fe(0x3db)](this[_0x3992fe(0x96e)][_0x3992fe(0x733)](this,this['_backSprite2'])));},Scene_MenuBase['prototype'][_0x52866a(0x4ad)]=function(_0x51d80b){const _0x1834a8=_0x52866a;return VisuMZ[_0x1834a8(0x8b9)][_0x1834a8(0x727)]['MenuBg'][_0x51d80b]||VisuMZ[_0x1834a8(0x8b9)][_0x1834a8(0x727)]['MenuBg'][_0x1834a8(0x985)];},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x96e)]=function(_0x4a64a9){const _0xe0f312=_0x52866a;this[_0xe0f312(0x45a)](_0x4a64a9),this[_0xe0f312(0x8ef)](_0x4a64a9);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x4ea)]=Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x57c)],Scene_MenuBase['prototype'][_0x52866a(0x57c)]=function(){const _0x59fe65=_0x52866a;VisuMZ[_0x59fe65(0x8b9)][_0x59fe65(0x4ea)][_0x59fe65(0x235)](this),SceneManager['isSideButtonLayout']()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x56f)]=function(){const _0x255b02=_0x52866a;this[_0x255b02(0x7e5)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x562)],Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x562)]=function(){const _0x466118=_0x52866a;VisuMZ[_0x466118(0x8b9)][_0x466118(0x29e)]['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x466118(0x6f7)]();},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0x285b01=_0x52866a;this['_pageupButton']['x']=-0x1*(this[_0x285b01(0x390)][_0x285b01(0x2e8)]+this['_pagedownButton'][_0x285b01(0x2e8)]+0x8),this[_0x285b01(0x213)]['x']=-0x1*(this[_0x285b01(0x213)]['width']+0x4);},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x849)]=function(){const _0x3d3069=_0x52866a;return VisuMZ['CoreEngine'][_0x3d3069(0x727)][_0x3d3069(0x505)][_0x3d3069(0x8c0)];},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x411)]=function(){const _0x5f1b48=_0x52866a;return SceneManager[_0x5f1b48(0x803)]()||SceneManager[_0x5f1b48(0x1dc)]()?VisuMZ[_0x5f1b48(0x8b9)][_0x5f1b48(0x727)]['ButtonAssist'][_0x5f1b48(0x622)]:_0x5f1b48(0x63d);},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x38a)]=function(){const _0x2391bf=_0x52866a;if(!this['isMenuButtonAssistEnabled']())return;const _0x2e443e=this[_0x2391bf(0x7fd)]();this[_0x2391bf(0x68b)]=new Window_ButtonAssist(_0x2e443e),this[_0x2391bf(0x40c)](this[_0x2391bf(0x68b)]);},Scene_MenuBase['prototype'][_0x52866a(0x7fd)]=function(){const _0x2b54ef=_0x52866a;return this[_0x2b54ef(0x411)]()==='button'?this[_0x2b54ef(0x27c)]():this[_0x2b54ef(0x70b)]();},Scene_MenuBase['prototype'][_0x52866a(0x27c)]=function(){const _0x2bb23b=_0x52866a,_0x57d1aa=ConfigManager[_0x2bb23b(0x7a7)]?(Sprite_Button[_0x2bb23b(0x8dc)][_0x2bb23b(0x973)]()+0x6)*0x2:0x0,_0x3c6061=this['buttonY'](),_0x32459c=Graphics['boxWidth']-_0x57d1aa*0x2,_0x22ca30=this[_0x2bb23b(0x4da)]();return new Rectangle(_0x57d1aa,_0x3c6061,_0x32459c,_0x22ca30);},Scene_MenuBase[_0x52866a(0x8dc)][_0x52866a(0x70b)]=function(){const _0x2efc4e=_0x52866a,_0x5933ad=Graphics[_0x2efc4e(0x912)],_0x54ab1e=Window_ButtonAssist[_0x2efc4e(0x8dc)][_0x2efc4e(0x504)](),_0x144f8f=0x0;let _0x2f305a=0x0;if(this[_0x2efc4e(0x411)]()===_0x2efc4e(0x880))_0x2f305a=0x0;else{if('sjYtb'===_0x2efc4e(0x693))_0x2f305a=Graphics[_0x2efc4e(0x898)]-_0x54ab1e;else{const _0x3821da=this['picture']();!_0x3821da[_0x2efc4e(0x2eb)]()?_0xf39578['CoreEngine'][_0x2efc4e(0x884)][_0x2efc4e(0x235)](this):(this[_0x2efc4e(0x2eb)]['x']=_0x3821da['anchor']()['x'],this[_0x2efc4e(0x2eb)]['y']=_0x3821da[_0x2efc4e(0x2eb)]()['y']);}}return new Rectangle(_0x144f8f,_0x2f305a,_0x5933ad,_0x54ab1e);},Scene_Menu['layoutSettings']=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x289)],VisuMZ['CoreEngine'][_0x52866a(0x31f)]=Scene_Menu[_0x52866a(0x8dc)][_0x52866a(0x473)],Scene_Menu[_0x52866a(0x8dc)][_0x52866a(0x473)]=function(){const _0x33e561=_0x52866a;VisuMZ[_0x33e561(0x8b9)]['Scene_Menu_create'][_0x33e561(0x235)](this),this[_0x33e561(0x6ce)]();},Scene_Menu[_0x52866a(0x8dc)]['setCoreEngineUpdateWindowBg']=function(){const _0x289f63=_0x52866a;this['_commandWindow']&&this['_commandWindow'][_0x289f63(0x382)](Scene_Menu['layoutSettings'][_0x289f63(0x1f7)]),this[_0x289f63(0x8d2)]&&(_0x289f63(0x435)!==_0x289f63(0x653)?this[_0x289f63(0x8d2)][_0x289f63(0x382)](Scene_Menu[_0x289f63(0x3c0)][_0x289f63(0x710)]):this[_0x289f63(0x3dc)][_0x289f63(0x382)](_0xcf7daa[_0x289f63(0x3c0)][_0x289f63(0x581)])),this[_0x289f63(0x4b4)]&&this[_0x289f63(0x4b4)][_0x289f63(0x382)](Scene_Menu[_0x289f63(0x3c0)][_0x289f63(0x830)]);},Scene_Menu['prototype']['commandWindowRect']=function(){const _0x134924=_0x52866a;return Scene_Menu[_0x134924(0x3c0)][_0x134924(0x855)][_0x134924(0x235)](this);},Scene_Menu['prototype'][_0x52866a(0x81f)]=function(){const _0x1e0a82=_0x52866a;return Scene_Menu[_0x1e0a82(0x3c0)][_0x1e0a82(0x40a)][_0x1e0a82(0x235)](this);},Scene_Menu[_0x52866a(0x8dc)][_0x52866a(0x38b)]=function(){const _0x923112=_0x52866a;return Scene_Menu[_0x923112(0x3c0)][_0x923112(0x8c6)][_0x923112(0x235)](this);},Scene_Item[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x379)],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x4db)]=Scene_Item[_0x52866a(0x8dc)][_0x52866a(0x473)],Scene_Item['prototype'][_0x52866a(0x473)]=function(){const _0x113bb0=_0x52866a;VisuMZ[_0x113bb0(0x8b9)][_0x113bb0(0x4db)][_0x113bb0(0x235)](this),this[_0x113bb0(0x6ce)]();},Scene_Item[_0x52866a(0x8dc)]['setCoreEngineUpdateWindowBg']=function(){const _0x23067d=_0x52866a;this[_0x23067d(0x6ab)]&&this[_0x23067d(0x6ab)][_0x23067d(0x382)](Scene_Item[_0x23067d(0x3c0)][_0x23067d(0x3ae)]),this[_0x23067d(0x383)]&&this[_0x23067d(0x383)][_0x23067d(0x382)](Scene_Item[_0x23067d(0x3c0)][_0x23067d(0x97a)]),this[_0x23067d(0x85c)]&&(_0x23067d(0x759)===_0x23067d(0x87d)?this[_0x23067d(0x549)](_0x55035a):this['_itemWindow'][_0x23067d(0x382)](Scene_Item[_0x23067d(0x3c0)][_0x23067d(0x618)])),this['_actorWindow']&&this['_actorWindow'][_0x23067d(0x382)](Scene_Item['layoutSettings'][_0x23067d(0x2e2)]);},Scene_Item[_0x52866a(0x8dc)][_0x52866a(0x3aa)]=function(){const _0x33be4d=_0x52866a;return Scene_Item['layoutSettings'][_0x33be4d(0x788)][_0x33be4d(0x235)](this);},Scene_Item[_0x52866a(0x8dc)]['categoryWindowRect']=function(){const _0x270e5d=_0x52866a;return Scene_Item[_0x270e5d(0x3c0)][_0x270e5d(0x4b5)][_0x270e5d(0x235)](this);},Scene_Item[_0x52866a(0x8dc)]['itemWindowRect']=function(){const _0x255ba2=_0x52866a;return Scene_Item[_0x255ba2(0x3c0)][_0x255ba2(0x481)][_0x255ba2(0x235)](this);},Scene_Item['prototype'][_0x52866a(0x55b)]=function(){const _0x40f213=_0x52866a;return Scene_Item[_0x40f213(0x3c0)][_0x40f213(0x58b)]['call'](this);},Scene_Skill[_0x52866a(0x3c0)]=VisuMZ['CoreEngine']['Settings'][_0x52866a(0x5f1)][_0x52866a(0x8bc)],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x837)]=Scene_Skill[_0x52866a(0x8dc)][_0x52866a(0x473)],Scene_Skill[_0x52866a(0x8dc)][_0x52866a(0x473)]=function(){const _0x2159ed=_0x52866a;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x2159ed(0x235)](this),this[_0x2159ed(0x6ce)]();},Scene_Skill['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x263301=_0x52866a;this[_0x263301(0x6ab)]&&this[_0x263301(0x6ab)][_0x263301(0x382)](Scene_Skill[_0x263301(0x3c0)]['HelpBgType']);this[_0x263301(0x892)]&&(_0x263301(0x1ec)!==_0x263301(0x1ec)?(_0xc4c805[_0x263301(0x8b9)][_0x263301(0x1bb)][_0x263301(0x235)](this),this[_0x263301(0x29b)](),this[_0x263301(0x642)](),this[_0x263301(0x2ab)]()):this[_0x263301(0x892)][_0x263301(0x382)](Scene_Skill['layoutSettings']['SkillTypeBgType']));this[_0x263301(0x4b4)]&&(_0x263301(0x402)==='iHomB'?this[_0x263301(0x4b4)][_0x263301(0x382)](_0x3c4dd6[_0x263301(0x3c0)][_0x263301(0x830)]):this['_statusWindow']['setBackgroundType'](Scene_Skill[_0x263301(0x3c0)][_0x263301(0x830)]));if(this[_0x263301(0x85c)]){if(_0x263301(0x793)===_0x263301(0x793))this[_0x263301(0x85c)]['setBackgroundType'](Scene_Skill[_0x263301(0x3c0)][_0x263301(0x618)]);else return _0x47b9d2[_0x263301(0x8b9)][_0x263301(0x727)]['UI'][_0x263301(0x539)];}if(this['_actorWindow']){if(_0x263301(0x873)!==_0x263301(0x7da))this[_0x263301(0x787)][_0x263301(0x382)](Scene_Skill[_0x263301(0x3c0)][_0x263301(0x2e2)]);else{if(this[_0x263301(0x2c9)]==='keyboard'){this[_0x263301(0x89c)][_0x263301(0x6c1)](),this[_0x263301(0x277)][_0x263301(0x6c1)](),this['resetTextColor']();let _0xbf1a80=_0x4e172e[_0x263301(0x8b9)][_0x263301(0x727)][_0x263301(0x626)]['NameInputMessage'][_0x263301(0x4cd)]('\x0a'),_0x3faef7=_0xbf1a80[_0x263301(0x708)],_0x59f0e1=(this[_0x263301(0x6a1)]-_0x3faef7*this[_0x263301(0x504)]())/0x2;for(let _0x1cd29e=0x0;_0x1cd29e<_0x3faef7;++_0x1cd29e){let _0x1fbeb6=_0xbf1a80[_0x1cd29e],_0x336e7b=this[_0x263301(0x84e)](_0x1fbeb6)[_0x263301(0x2e8)],_0x32096d=_0x5297a5[_0x263301(0x7b3)]((this[_0x263301(0x89c)][_0x263301(0x2e8)]-_0x336e7b)/0x2);this[_0x263301(0x828)](_0x1fbeb6,_0x32096d,_0x59f0e1),_0x59f0e1+=this[_0x263301(0x504)]();}}else _0x1de1af[_0x263301(0x8b9)]['Window_NameInput_refresh']['call'](this);}}},Scene_Skill[_0x52866a(0x8dc)]['helpWindowRect']=function(){const _0x597521=_0x52866a;return Scene_Skill[_0x597521(0x3c0)]['HelpRect'][_0x597521(0x235)](this);},Scene_Skill['prototype'][_0x52866a(0x8ce)]=function(){const _0x359fd7=_0x52866a;return Scene_Skill['layoutSettings'][_0x359fd7(0x6b2)][_0x359fd7(0x235)](this);},Scene_Skill[_0x52866a(0x8dc)][_0x52866a(0x38b)]=function(){const _0x3e0c90=_0x52866a;return Scene_Skill[_0x3e0c90(0x3c0)][_0x3e0c90(0x8c6)][_0x3e0c90(0x235)](this);},Scene_Skill[_0x52866a(0x8dc)][_0x52866a(0x6a5)]=function(){const _0x20e0e2=_0x52866a;return Scene_Skill[_0x20e0e2(0x3c0)]['ItemRect']['call'](this);},Scene_Skill[_0x52866a(0x8dc)]['actorWindowRect']=function(){const _0x683eea=_0x52866a;return Scene_Skill[_0x683eea(0x3c0)][_0x683eea(0x58b)][_0x683eea(0x235)](this);},Scene_Equip[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x4de)],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x94b)]=Scene_Equip[_0x52866a(0x8dc)]['create'],Scene_Equip[_0x52866a(0x8dc)][_0x52866a(0x473)]=function(){const _0x12fd34=_0x52866a;VisuMZ[_0x12fd34(0x8b9)][_0x12fd34(0x94b)]['call'](this),this[_0x12fd34(0x6ce)]();},Scene_Equip[_0x52866a(0x8dc)][_0x52866a(0x6ce)]=function(){const _0x5ccb9a=_0x52866a;if(this[_0x5ccb9a(0x6ab)]){if(_0x5ccb9a(0x5f0)!==_0x5ccb9a(0x65a))this[_0x5ccb9a(0x6ab)][_0x5ccb9a(0x382)](Scene_Equip['layoutSettings'][_0x5ccb9a(0x3ae)]);else{_0x44dc49[_0x5ccb9a(0x432)](_0xc21ca8,_0x4693f7);const _0x3a14dd=_0x511750[_0x5ccb9a(0x31c)];_0x371506[_0x5ccb9a(0x35d)](_0x3a14dd);}}this[_0x5ccb9a(0x4b4)]&&this[_0x5ccb9a(0x4b4)][_0x5ccb9a(0x382)](Scene_Equip[_0x5ccb9a(0x3c0)][_0x5ccb9a(0x830)]),this[_0x5ccb9a(0x34d)]&&(_0x5ccb9a(0x3a4)===_0x5ccb9a(0x3a4)?this[_0x5ccb9a(0x34d)]['setBackgroundType'](Scene_Equip[_0x5ccb9a(0x3c0)]['CommandBgType']):(this[_0x5ccb9a(0x5e8)]-=this[_0x5ccb9a(0x424)](),this['isClosed']()&&(this['_closing']=![]))),this[_0x5ccb9a(0x203)]&&(_0x5ccb9a(0x4a4)===_0x5ccb9a(0x560)?(this[_0x5ccb9a(0x390)]['x']=-0x1*(this[_0x5ccb9a(0x390)][_0x5ccb9a(0x2e8)]+this[_0x5ccb9a(0x213)][_0x5ccb9a(0x2e8)]+0x8),this[_0x5ccb9a(0x213)]['x']=-0x1*(this[_0x5ccb9a(0x213)][_0x5ccb9a(0x2e8)]+0x4)):this['_slotWindow'][_0x5ccb9a(0x382)](Scene_Equip[_0x5ccb9a(0x3c0)][_0x5ccb9a(0x4fa)])),this[_0x5ccb9a(0x85c)]&&this[_0x5ccb9a(0x85c)][_0x5ccb9a(0x382)](Scene_Equip[_0x5ccb9a(0x3c0)][_0x5ccb9a(0x618)]);},Scene_Equip[_0x52866a(0x8dc)][_0x52866a(0x3aa)]=function(){const _0x494502=_0x52866a;return Scene_Equip['layoutSettings'][_0x494502(0x788)][_0x494502(0x235)](this);},Scene_Equip['prototype'][_0x52866a(0x38b)]=function(){const _0xcdef72=_0x52866a;return Scene_Equip['layoutSettings'][_0xcdef72(0x8c6)][_0xcdef72(0x235)](this);},Scene_Equip['prototype']['commandWindowRect']=function(){const _0x132c9b=_0x52866a;return Scene_Equip[_0x132c9b(0x3c0)][_0x132c9b(0x855)]['call'](this);},Scene_Equip[_0x52866a(0x8dc)]['slotWindowRect']=function(){const _0x5a3a9a=_0x52866a;return Scene_Equip['layoutSettings'][_0x5a3a9a(0x606)]['call'](this);},Scene_Equip[_0x52866a(0x8dc)][_0x52866a(0x6a5)]=function(){const _0x5633e2=_0x52866a;return Scene_Equip[_0x5633e2(0x3c0)][_0x5633e2(0x481)][_0x5633e2(0x235)](this);},Scene_Status[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x2a2)],VisuMZ['CoreEngine'][_0x52866a(0x8fa)]=Scene_Status[_0x52866a(0x8dc)][_0x52866a(0x473)],Scene_Status[_0x52866a(0x8dc)]['create']=function(){const _0x486204=_0x52866a;VisuMZ[_0x486204(0x8b9)]['Scene_Status_create'][_0x486204(0x235)](this),this[_0x486204(0x6ce)]();},Scene_Status[_0x52866a(0x8dc)][_0x52866a(0x6ce)]=function(){const _0x4d16f6=_0x52866a;this[_0x4d16f6(0x6cb)]&&('LUlZc'!==_0x4d16f6(0x416)?this['_profileWindow'][_0x4d16f6(0x382)](Scene_Status[_0x4d16f6(0x3c0)][_0x4d16f6(0x5ed)]):_0x367b86=_0x5f0965[_0x4d16f6(0x5f8)](_0x2060d2));if(this[_0x4d16f6(0x4b4)]){if(_0x4d16f6(0x977)!==_0x4d16f6(0x2b2))this['_statusWindow'][_0x4d16f6(0x382)](Scene_Status[_0x4d16f6(0x3c0)]['StatusBgType']);else return 7.5625*_0x180973*_0x16f49a;}this[_0x4d16f6(0x853)]&&this[_0x4d16f6(0x853)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x4d16f6(0x4e5)]);if(this[_0x4d16f6(0x8b1)]){if(_0x4d16f6(0x3a3)!==_0x4d16f6(0x3a3))return 0x0;else this[_0x4d16f6(0x8b1)][_0x4d16f6(0x382)](Scene_Status[_0x4d16f6(0x3c0)][_0x4d16f6(0x4ed)]);}},Scene_Status['prototype'][_0x52866a(0x2ef)]=function(){const _0x2df70f=_0x52866a;return Scene_Status['layoutSettings'][_0x2df70f(0x5be)][_0x2df70f(0x235)](this);},Scene_Status[_0x52866a(0x8dc)][_0x52866a(0x38b)]=function(){const _0x3e44b1=_0x52866a;return Scene_Status[_0x3e44b1(0x3c0)][_0x3e44b1(0x8c6)]['call'](this);},Scene_Status[_0x52866a(0x8dc)][_0x52866a(0x89b)]=function(){const _0x591b67=_0x52866a;return Scene_Status['layoutSettings'][_0x591b67(0x569)]['call'](this);},Scene_Status[_0x52866a(0x8dc)][_0x52866a(0x84a)]=function(){const _0x44da0c=_0x52866a;return Scene_Status[_0x44da0c(0x3c0)][_0x44da0c(0x233)][_0x44da0c(0x235)](this);},Scene_Options[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x6bd)],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x7d7)]=Scene_Options[_0x52866a(0x8dc)]['create'],Scene_Options['prototype'][_0x52866a(0x473)]=function(){const _0x2532a9=_0x52866a;VisuMZ[_0x2532a9(0x8b9)][_0x2532a9(0x7d7)][_0x2532a9(0x235)](this),this[_0x2532a9(0x6ce)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x599803=_0x52866a;this[_0x599803(0x41c)]&&this[_0x599803(0x41c)][_0x599803(0x382)](Scene_Options['layoutSettings'][_0x599803(0x602)]);},Scene_Options[_0x52866a(0x8dc)][_0x52866a(0x939)]=function(){const _0x4722f4=_0x52866a;return Scene_Options[_0x4722f4(0x3c0)][_0x4722f4(0x926)][_0x4722f4(0x235)](this);},Scene_Save[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x7d8)],Scene_Save[_0x52866a(0x8dc)][_0x52866a(0x473)]=function(){const _0x17e372=_0x52866a;Scene_File[_0x17e372(0x8dc)][_0x17e372(0x473)][_0x17e372(0x235)](this),this[_0x17e372(0x6ce)]();},Scene_Save[_0x52866a(0x8dc)][_0x52866a(0x6ce)]=function(){const _0x1b674a=_0x52866a;this['_helpWindow']&&this[_0x1b674a(0x6ab)]['setBackgroundType'](Scene_Save[_0x1b674a(0x3c0)][_0x1b674a(0x3ae)]);if(this[_0x1b674a(0x3dc)]){if(_0x1b674a(0x643)!==_0x1b674a(0x2a8))this[_0x1b674a(0x3dc)]['setBackgroundType'](Scene_Save['layoutSettings'][_0x1b674a(0x581)]);else return 0x0;}},Scene_Save['prototype'][_0x52866a(0x3aa)]=function(){const _0x5b58fe=_0x52866a;return Scene_Save[_0x5b58fe(0x3c0)][_0x5b58fe(0x788)][_0x5b58fe(0x235)](this);},Scene_Save[_0x52866a(0x8dc)][_0x52866a(0x4f1)]=function(){const _0x5cf20b=_0x52866a;return Scene_Save[_0x5cf20b(0x3c0)][_0x5cf20b(0x487)][_0x5cf20b(0x235)](this);},Scene_Load[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)]['Settings'][_0x52866a(0x5f1)]['LoadMenu'],Scene_Load[_0x52866a(0x8dc)][_0x52866a(0x473)]=function(){const _0x3eb2b8=_0x52866a;Scene_File[_0x3eb2b8(0x8dc)][_0x3eb2b8(0x473)][_0x3eb2b8(0x235)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x52866a(0x6ce)]=function(){const _0x1f0aa4=_0x52866a;this[_0x1f0aa4(0x6ab)]&&this[_0x1f0aa4(0x6ab)]['setBackgroundType'](Scene_Load[_0x1f0aa4(0x3c0)][_0x1f0aa4(0x3ae)]);if(this[_0x1f0aa4(0x3dc)]){if('mFElC'!=='mFElC')return _0x57e3d2['CoreEngine'][_0x1f0aa4(0x727)]['UI']['ButtonHeight'];else this['_listWindow'][_0x1f0aa4(0x382)](Scene_Load[_0x1f0aa4(0x3c0)][_0x1f0aa4(0x581)]);}},Scene_Load['prototype'][_0x52866a(0x3aa)]=function(){const _0x378f95=_0x52866a;return Scene_Load[_0x378f95(0x3c0)][_0x378f95(0x788)][_0x378f95(0x235)](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0x4d9830=_0x52866a;return Scene_Load[_0x4d9830(0x3c0)][_0x4d9830(0x487)][_0x4d9830(0x235)](this);},Scene_GameEnd[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)]['Settings'][_0x52866a(0x5f1)]['GameEnd'],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x34b)]=Scene_GameEnd[_0x52866a(0x8dc)][_0x52866a(0x6fd)],Scene_GameEnd[_0x52866a(0x8dc)]['createBackground']=function(){const _0x37ebc8=_0x52866a;Scene_MenuBase[_0x37ebc8(0x8dc)][_0x37ebc8(0x6fd)]['call'](this);},Scene_GameEnd[_0x52866a(0x8dc)][_0x52866a(0x6cd)]=function(){const _0x31286f=_0x52866a,_0x3a3e33=this[_0x31286f(0x5ad)]();this['_commandWindow']=new Window_GameEnd(_0x3a3e33),this[_0x31286f(0x34d)]['setHandler'](_0x31286f(0x492),this['popScene'][_0x31286f(0x733)](this)),this[_0x31286f(0x40c)](this[_0x31286f(0x34d)]),this[_0x31286f(0x34d)][_0x31286f(0x382)](Scene_GameEnd[_0x31286f(0x3c0)][_0x31286f(0x1f7)]);},Scene_GameEnd[_0x52866a(0x8dc)][_0x52866a(0x5ad)]=function(){const _0x42b579=_0x52866a;return Scene_GameEnd['layoutSettings'][_0x42b579(0x855)][_0x42b579(0x235)](this);},Scene_Shop[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)]['MenuLayout']['ShopMenu'],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8a3)]=Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x473)],Scene_Shop['prototype'][_0x52866a(0x473)]=function(){const _0x2b656a=_0x52866a;VisuMZ[_0x2b656a(0x8b9)][_0x2b656a(0x8a3)][_0x2b656a(0x235)](this),this[_0x2b656a(0x6ce)]();},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x6ce)]=function(){const _0x39c49a=_0x52866a;this[_0x39c49a(0x6ab)]&&('eOPJq'==='ixzDQ'?(_0x3c4bf1['alwaysDash']=!_0x67397['alwaysDash'],_0x4c2ccf['save']()):this[_0x39c49a(0x6ab)][_0x39c49a(0x382)](Scene_Shop[_0x39c49a(0x3c0)]['HelpBgType']));if(this['_goldWindow']){if('WiBkK'!==_0x39c49a(0x1c0))this[_0x39c49a(0x8d2)]['setBackgroundType'](Scene_Shop[_0x39c49a(0x3c0)][_0x39c49a(0x710)]);else{if(_0x207d43)_0xa5cb6e['ParseWeaponNotetags'](_0x8babae);}}this[_0x39c49a(0x34d)]&&(_0x39c49a(0x59c)!==_0x39c49a(0x54f)?this[_0x39c49a(0x34d)][_0x39c49a(0x382)](Scene_Shop[_0x39c49a(0x3c0)][_0x39c49a(0x1f7)]):(this['_digitGrouping']=_0x405862['CoreEngine'][_0x39c49a(0x727)][_0x39c49a(0x98c)][_0x39c49a(0x7f3)],this[_0x39c49a(0x39d)]=_0x1446d3[_0x39c49a(0x8b9)]['Settings'][_0x39c49a(0x98c)][_0x39c49a(0x4bc)]));this[_0x39c49a(0x512)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x39c49a(0x3c0)][_0x39c49a(0x936)]);if(this[_0x39c49a(0x3a6)]){if('SyvAD'!==_0x39c49a(0x290))return _0x29a385[_0x39c49a(0x8b9)][_0x39c49a(0x727)][_0x39c49a(0x4bd)][_0x39c49a(0x98d)]['call'](this,_0x2f5893);else this[_0x39c49a(0x3a6)][_0x39c49a(0x382)](Scene_Shop['layoutSettings'][_0x39c49a(0x4fe)]);}if(this[_0x39c49a(0x4b4)]){if(_0x39c49a(0x932)===_0x39c49a(0x690))return _0x11a3f0['getInputButtonString']('ok');else this[_0x39c49a(0x4b4)][_0x39c49a(0x382)](Scene_Shop[_0x39c49a(0x3c0)][_0x39c49a(0x830)]);}if(this[_0x39c49a(0x659)]){if(_0x39c49a(0x43f)==='gjWeh'){this['_inputSpecialKeyCode']=_0x239632[_0x39c49a(0x794)];let _0x486caa=_0x48d6e2[_0x39c49a(0x362)](_0x33f8c8[_0x39c49a(0x58f)]);this['_inputString']===_0x3fe30c?this[_0x39c49a(0x91c)]=_0x486caa:this['_inputString']+=_0x486caa;}else this[_0x39c49a(0x659)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x39c49a(0x8b8)]);}this[_0x39c49a(0x383)]&&this[_0x39c49a(0x383)][_0x39c49a(0x382)](Scene_Shop['layoutSettings'][_0x39c49a(0x97a)]),this[_0x39c49a(0x244)]&&('MzzBe'===_0x39c49a(0x2b0)?this[_0x39c49a(0x244)]['setBackgroundType'](Scene_Shop[_0x39c49a(0x3c0)][_0x39c49a(0x405)]):this['_actorWindow']['setBackgroundType'](_0x277c42[_0x39c49a(0x3c0)][_0x39c49a(0x2e2)]));},Scene_Shop['prototype'][_0x52866a(0x3aa)]=function(){const _0x29e124=_0x52866a;return Scene_Shop['layoutSettings'][_0x29e124(0x788)][_0x29e124(0x235)](this);},Scene_Shop['prototype']['goldWindowRect']=function(){const _0x4a4d5f=_0x52866a;return Scene_Shop[_0x4a4d5f(0x3c0)][_0x4a4d5f(0x40a)][_0x4a4d5f(0x235)](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x5ad)]=function(){const _0x516477=_0x52866a;return Scene_Shop[_0x516477(0x3c0)][_0x516477(0x855)][_0x516477(0x235)](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x4df)]=function(){const _0x33c48c=_0x52866a;return Scene_Shop[_0x33c48c(0x3c0)][_0x33c48c(0x482)]['call'](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x38d)]=function(){const _0x308b2a=_0x52866a;return Scene_Shop[_0x308b2a(0x3c0)]['NumberRect'][_0x308b2a(0x235)](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x38b)]=function(){const _0xb693f=_0x52866a;return Scene_Shop['layoutSettings'][_0xb693f(0x8c6)][_0xb693f(0x235)](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x24a)]=function(){const _0x595653=_0x52866a;return Scene_Shop[_0x595653(0x3c0)][_0x595653(0x205)]['call'](this);},Scene_Shop[_0x52866a(0x8dc)][_0x52866a(0x348)]=function(){const _0x3c9358=_0x52866a;return Scene_Shop[_0x3c9358(0x3c0)][_0x3c9358(0x4b5)][_0x3c9358(0x235)](this);},Scene_Shop['prototype'][_0x52866a(0x953)]=function(){const _0x16233b=_0x52866a;return Scene_Shop['layoutSettings'][_0x16233b(0x8b5)][_0x16233b(0x235)](this);},Scene_Name[_0x52866a(0x3c0)]=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)]['MenuLayout'][_0x52866a(0x744)],VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x5b3)]=Scene_Name[_0x52866a(0x8dc)]['create'],Scene_Name[_0x52866a(0x8dc)]['create']=function(){const _0x3adf1d=_0x52866a;VisuMZ['CoreEngine'][_0x3adf1d(0x5b3)]['call'](this),this[_0x3adf1d(0x6ce)]();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3cbc02=_0x52866a;this[_0x3cbc02(0x829)]&&this[_0x3cbc02(0x829)]['setBackgroundType'](Scene_Name[_0x3cbc02(0x3c0)][_0x3cbc02(0x1c2)]);if(this[_0x3cbc02(0x60a)]){if('jfyFf'==='jfyFf')this[_0x3cbc02(0x60a)][_0x3cbc02(0x382)](Scene_Name[_0x3cbc02(0x3c0)][_0x3cbc02(0x353)]);else return this[_0x3cbc02(0x263)](_0x349781);}},Scene_Name[_0x52866a(0x8dc)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x52866a(0x8dc)][_0x52866a(0x662)]=function(){const _0x59efa3=_0x52866a;return Scene_Name['layoutSettings']['EditRect'][_0x59efa3(0x235)](this);},Scene_Name[_0x52866a(0x8dc)][_0x52866a(0x85b)]=function(){const _0x544d22=_0x52866a;return Scene_Name['layoutSettings'][_0x544d22(0x212)][_0x544d22(0x235)](this);},Scene_Name[_0x52866a(0x8dc)][_0x52866a(0x791)]=function(){const _0x2db7e7=_0x52866a;if(!this[_0x2db7e7(0x60a)])return![];return VisuMZ[_0x2db7e7(0x8b9)][_0x2db7e7(0x727)]['KeyboardInput']['EnableNameInput'];},Scene_Name[_0x52866a(0x8dc)]['buttonAssistKey1']=function(){const _0x1ea976=_0x52866a;if(this[_0x1ea976(0x791)]()){if(_0x1ea976(0x88a)==='YDmyo')return TextManager[_0x1ea976(0x58e)](_0x1ea976(0x648));else{const _0x191d9b=_0x1fbdc5[_0x1ea976(0x8b9)][_0x1ea976(0x6aa)][_0x35ef16],_0x279bda=this[_0x191d9b];return _0x6b8a8e['CoreEngine'][_0x1ea976(0x703)][_0x112dc2]===_0x1ea976(0x94f)?_0x279bda:_0x53e6d8?_0x6757c6(_0x357acc[_0x1ea976(0x447)](_0x279bda*0x64))+'%':_0x279bda;}}else return _0x1ea976(0x2c5)!==_0x1ea976(0x45c)?Scene_MenuBase[_0x1ea976(0x8dc)][_0x1ea976(0x24b)][_0x1ea976(0x235)](this):_0xc6b9d4['CoreEngine'][_0x1ea976(0x727)]['Window'][_0x1ea976(0x2cd)];},Scene_Name[_0x52866a(0x8dc)]['buttonAssistText1']=function(){const _0x192b9f=_0x52866a;if(this['EnableNameInput']()){if(_0x192b9f(0x8ea)==='xkAFr'){const _0x457525=VisuMZ[_0x192b9f(0x8b9)][_0x192b9f(0x727)][_0x192b9f(0x626)];return this[_0x192b9f(0x60a)][_0x192b9f(0x2c9)]===_0x192b9f(0x464)?_0x457525['Keyboard']||_0x192b9f(0x3a9):_0x457525[_0x192b9f(0x1c6)]||_0x192b9f(0x1c6);}else _0xe279aa['CoreEngine']['Sprite_Picture_loadBitmap'][_0x192b9f(0x235)](this);}else return Scene_MenuBase[_0x192b9f(0x8dc)][_0x192b9f(0x72f)]['call'](this);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x29f)]=Scene_Name[_0x52866a(0x8dc)]['onInputOk'],Scene_Name[_0x52866a(0x8dc)][_0x52866a(0x992)]=function(){const _0x242371=_0x52866a;this['doesNameContainBannedWords']()?this[_0x242371(0x7ff)]():_0x242371(0x682)!=='KZmjw'?VisuMZ[_0x242371(0x8b9)][_0x242371(0x29f)]['call'](this):(this[_0x242371(0x4ef)]['x']=this[_0x242371(0x68c)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']);},Scene_Name[_0x52866a(0x8dc)][_0x52866a(0x954)]=function(){const _0x450ab8=_0x52866a,_0x3e405e=VisuMZ['CoreEngine'][_0x450ab8(0x727)]['KeyboardInput'];if(!_0x3e405e)return![];const _0x2d5424=_0x3e405e[_0x450ab8(0x236)];if(!_0x2d5424)return![];const _0x199276=this[_0x450ab8(0x829)][_0x450ab8(0x683)]()[_0x450ab8(0x962)]();for(const _0x45779c of _0x2d5424){if(_0x199276[_0x450ab8(0x234)](_0x45779c['toLowerCase']()))return!![];}return![];},Scene_Name['prototype'][_0x52866a(0x7ff)]=function(){const _0x4dfb45=_0x52866a;SoundManager[_0x4dfb45(0x6ba)]();},VisuMZ[_0x52866a(0x8b9)]['Scene_Battle_update']=Scene_Battle['prototype'][_0x52866a(0x8c1)],Scene_Battle[_0x52866a(0x8dc)][_0x52866a(0x8c1)]=function(){const _0xfd4f5b=_0x52866a;VisuMZ[_0xfd4f5b(0x8b9)][_0xfd4f5b(0x6fb)][_0xfd4f5b(0x235)](this);if($gameTemp[_0xfd4f5b(0x61f)])this[_0xfd4f5b(0x4c7)]();},Scene_Battle[_0x52866a(0x8dc)]['updatePlayTestF7']=function(){const _0x32a8e2=_0x52866a;!BattleManager[_0x32a8e2(0x638)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x32a8e2(0x20e)]()&&(_0x32a8e2(0x573)===_0x32a8e2(0x1ca)?this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x32a8e2(0x736),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x32a8e2(0x1d1)]['x'],'targetScaleY':this[_0x32a8e2(0x1d1)]['y'],'targetOpacity':this[_0x32a8e2(0x226)],'targetBackOpacity':this[_0x32a8e2(0x8e6)],'targetContentsOpacity':this[_0x32a8e2(0x823)]}:(this[_0x32a8e2(0x816)]=!![],this['update'](),SceneManager[_0x32a8e2(0x4c5)](),this[_0x32a8e2(0x816)]=![]));},VisuMZ[_0x52866a(0x8b9)]['Scene_Battle_createCancelButton']=Scene_Battle['prototype'][_0x52866a(0x57c)],Scene_Battle[_0x52866a(0x8dc)][_0x52866a(0x57c)]=function(){const _0x125b24=_0x52866a;VisuMZ[_0x125b24(0x8b9)][_0x125b24(0x472)]['call'](this),SceneManager[_0x125b24(0x803)]()&&(_0x125b24(0x434)!==_0x125b24(0x251)?this[_0x125b24(0x70d)]():(_0x19dad0(_0x125b24(0x370)[_0x125b24(0x782)](_0x1bd739,_0x24ce96)),_0x2d8ae9[_0x125b24(0x317)]()));},Scene_Battle[_0x52866a(0x8dc)][_0x52866a(0x70d)]=function(){const _0x2acdc2=_0x52866a;this[_0x2acdc2(0x7e5)]['x']=Graphics[_0x2acdc2(0x912)]+0x4;if(this[_0x2acdc2(0x2d3)]()){if(_0x2acdc2(0x6ed)!=='YgZlF')this[_0x2acdc2(0x7e5)]['y']=Graphics['boxHeight']-this[_0x2acdc2(0x4da)]();else return _0x18222c[_0x2acdc2(0x2fb)]['call'](this);}else _0x2acdc2(0x4cc)!=='NeFDc'?_0x3bb495[_0x2acdc2(0x8b9)]['Settings']['MenuLayout'][_0x2acdc2(0x2e1)]['drawGameVersion']['call'](this):this[_0x2acdc2(0x7e5)]['y']=0x0;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x6ea)]=Sprite_Button[_0x52866a(0x8dc)]['initialize'],Sprite_Button[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(_0x176eec){const _0x2b9983=_0x52866a;VisuMZ[_0x2b9983(0x8b9)][_0x2b9983(0x6ea)][_0x2b9983(0x235)](this,_0x176eec),this['initButtonHidden']();},Sprite_Button[_0x52866a(0x8dc)][_0x52866a(0x23b)]=function(){const _0x171acd=_0x52866a,_0x2448bf=VisuMZ[_0x171acd(0x8b9)][_0x171acd(0x727)]['UI'];this[_0x171acd(0x66f)]=![];switch(this[_0x171acd(0x8f9)]){case'cancel':this[_0x171acd(0x66f)]=!_0x2448bf['cancelShowButton'];break;case _0x171acd(0x7ea):case _0x171acd(0x6ad):this['_isButtonHidden']=!_0x2448bf[_0x171acd(0x1e3)];break;case'down':case'up':case _0x171acd(0x6f3):case'up2':case'ok':this[_0x171acd(0x66f)]=!_0x2448bf[_0x171acd(0x79b)];break;case _0x171acd(0x978):this[_0x171acd(0x66f)]=!_0x2448bf['menuShowButton'];break;}},VisuMZ['CoreEngine'][_0x52866a(0x43a)]=Sprite_Button['prototype']['updateOpacity'],Sprite_Button[_0x52866a(0x8dc)]['updateOpacity']=function(){const _0x34592b=_0x52866a;if(SceneManager['areButtonsHidden']()||this['_isButtonHidden']){if('jiwnp'===_0x34592b(0x6a4)){const _0x63ba26=this[_0x34592b(0x8a7)]();let _0x4a4654=_0x29b780[_0x34592b(0x5e7)];this['setAction'](_0x4e7edd,_0x63ba26[0x0]);for(const _0x197e2d of _0x63ba26){const _0x9f6e43=_0x197e2d[_0x34592b(0x8d0)]();_0x9f6e43>_0x4a4654&&(_0x4a4654=_0x9f6e43,this['setAction'](_0x51e0a7,_0x197e2d));}}else this['hideButtonFromView']();}else'QTxmE'!==_0x34592b(0x571)?(_0x28d2a3['CoreEngine']['DataManager_setupNewGame'][_0x34592b(0x235)](this),this[_0x34592b(0x656)](),this[_0x34592b(0x906)]()):VisuMZ[_0x34592b(0x8b9)][_0x34592b(0x43a)]['call'](this);},Sprite_Button[_0x52866a(0x8dc)]['hideButtonFromView']=function(){const _0x81b0ed=_0x52866a;this[_0x81b0ed(0x8ab)]=![],this['opacity']=0x0,this['x']=Graphics[_0x81b0ed(0x2e8)]*0xa,this['y']=Graphics[_0x81b0ed(0x8a0)]*0xa;},VisuMZ['CoreEngine'][_0x52866a(0x88c)]=Sprite_Battler[_0x52866a(0x8dc)]['startMove'],Sprite_Battler[_0x52866a(0x8dc)]['startMove']=function(_0x165eeb,_0x44e6d1,_0x1aff46){const _0x125fd4=_0x52866a;(this[_0x125fd4(0x4d1)]!==_0x165eeb||this[_0x125fd4(0x43e)]!==_0x44e6d1)&&('DKqao'!==_0x125fd4(0x7f9)?this[_0x125fd4(0x6ab)][_0x125fd4(0x382)](_0x59aa3c['layoutSettings'][_0x125fd4(0x3ae)]):(this['setMoveEasingType'](_0x125fd4(0x5df)),this[_0x125fd4(0x283)]=_0x1aff46)),VisuMZ[_0x125fd4(0x8b9)]['Sprite_Battler_startMove']['call'](this,_0x165eeb,_0x44e6d1,_0x1aff46);},Sprite_Battler[_0x52866a(0x8dc)][_0x52866a(0x4e1)]=function(_0x2b982c){this['_moveEasingType']=_0x2b982c;},Sprite_Battler[_0x52866a(0x8dc)][_0x52866a(0x4ff)]=function(){const _0x5e94f0=_0x52866a;if(this[_0x5e94f0(0x8b4)]<=0x0)return;const _0x3c8d56=this[_0x5e94f0(0x8b4)],_0x3f2728=this[_0x5e94f0(0x283)],_0x926e6a=this[_0x5e94f0(0x423)];this[_0x5e94f0(0x5b4)]=this[_0x5e94f0(0x5b9)](this[_0x5e94f0(0x5b4)],this[_0x5e94f0(0x4d1)],_0x3c8d56,_0x3f2728,_0x926e6a),this[_0x5e94f0(0x94a)]=this[_0x5e94f0(0x5b9)](this[_0x5e94f0(0x94a)],this[_0x5e94f0(0x43e)],_0x3c8d56,_0x3f2728,_0x926e6a),this[_0x5e94f0(0x8b4)]--;if(this['_movementDuration']<=0x0)this[_0x5e94f0(0x75e)]();},Sprite_Battler[_0x52866a(0x8dc)]['applyEasing']=function(_0xf9999a,_0x61963f,_0x850422,_0x5332da,_0x393f4f){const _0x562d32=_0x52866a,_0x4933b1=VisuMZ[_0x562d32(0x1bc)]((_0x5332da-_0x850422)/_0x5332da,_0x393f4f||'Linear'),_0x5783d6=VisuMZ[_0x562d32(0x1bc)]((_0x5332da-_0x850422+0x1)/_0x5332da,_0x393f4f||_0x562d32(0x5df)),_0x499d51=(_0xf9999a-_0x61963f*_0x4933b1)/(0x1-_0x4933b1);return _0x499d51+(_0x61963f-_0x499d51)*_0x5783d6;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x3f6)]=Sprite_Actor[_0x52866a(0x8dc)][_0x52866a(0x386)],Sprite_Actor[_0x52866a(0x8dc)]['setActorHome']=function(_0x41fee4){const _0x559043=_0x52866a;VisuMZ[_0x559043(0x8b9)][_0x559043(0x727)]['UI'][_0x559043(0x7c8)]?_0x559043(0x28f)==='AeaWF'?this[_0x559043(0x57e)](_0x41fee4):_0x2bde08['loadBitmap'](_0xe30197,_0x51e6e3):VisuMZ[_0x559043(0x8b9)][_0x559043(0x3f6)][_0x559043(0x235)](this,_0x41fee4);},Sprite_Actor[_0x52866a(0x8dc)][_0x52866a(0x57e)]=function(_0x64aeb3){const _0x10c2a8=_0x52866a;let _0x17cca8=Math[_0x10c2a8(0x447)](Graphics[_0x10c2a8(0x2e8)]/0x2+0xc0);_0x17cca8-=Math['floor']((Graphics[_0x10c2a8(0x2e8)]-Graphics[_0x10c2a8(0x912)])/0x2),_0x17cca8+=_0x64aeb3*0x20;let _0x29d048=Graphics[_0x10c2a8(0x8a0)]-0xc8-$gameParty[_0x10c2a8(0x288)]()*0x30;_0x29d048-=Math[_0x10c2a8(0x7b3)]((Graphics[_0x10c2a8(0x8a0)]-Graphics[_0x10c2a8(0x898)])/0x2),_0x29d048+=_0x64aeb3*0x30,this[_0x10c2a8(0x8aa)](_0x17cca8,_0x29d048);},Sprite_Actor[_0x52866a(0x8dc)][_0x52866a(0x1e2)]=function(){const _0x4bb53f=_0x52866a;this[_0x4bb53f(0x80e)](0x4b0,0x0,0x78);},Sprite_Animation[_0x52866a(0x8dc)][_0x52866a(0x832)]=function(_0x2f3b93){const _0x3b72fe=_0x52866a;this[_0x3b72fe(0x910)]=_0x2f3b93;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x4ca)]=Sprite_Animation['prototype'][_0x52866a(0x989)],Sprite_Animation['prototype'][_0x52866a(0x989)]=function(){const _0x1eb9e1=_0x52866a;if(this[_0x1eb9e1(0x910)])return;VisuMZ[_0x1eb9e1(0x8b9)][_0x1eb9e1(0x4ca)][_0x1eb9e1(0x235)](this);},VisuMZ[_0x52866a(0x8b9)]['Sprite_Animation_setViewport']=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x52866a(0x8dc)]['setViewport']=function(_0x22fcc6){const _0x512b49=_0x52866a;this[_0x512b49(0x877)]()?this[_0x512b49(0x1f2)](_0x22fcc6):_0x512b49(0x425)===_0x512b49(0x425)?VisuMZ[_0x512b49(0x8b9)][_0x512b49(0x7ba)][_0x512b49(0x235)](this,_0x22fcc6):(_0x438887[_0x512b49(0x8b9)][_0x512b49(0x8fa)][_0x512b49(0x235)](this),this[_0x512b49(0x6ce)]());},Sprite_Animation['prototype'][_0x52866a(0x877)]=function(){const _0xc94703=_0x52866a;if(!this['_animation'])return![];const _0x37731d=this[_0xc94703(0x778)]['name']||'';if(_0x37731d[_0xc94703(0x1e7)](/<MIRROR OFFSET X>/i))return!![];if(_0x37731d[_0xc94703(0x1e7)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0xc94703(0x8b9)][_0xc94703(0x727)]['QoL'][_0xc94703(0x81c)];},Sprite_Animation[_0x52866a(0x8dc)][_0x52866a(0x1f2)]=function(_0x2ba848){const _0x4dbe69=_0x52866a,_0x1d59f8=this['_viewportSize'],_0x5743c6=this[_0x4dbe69(0x670)],_0x36f32e=this[_0x4dbe69(0x778)]['offsetX']*(this[_0x4dbe69(0x2ce)]?-0x1:0x1)-_0x1d59f8/0x2,_0x511b79=this[_0x4dbe69(0x778)]['offsetY']-_0x5743c6/0x2,_0x3ff7a8=this['targetPosition'](_0x2ba848);_0x2ba848['gl'][_0x4dbe69(0x453)](_0x36f32e+_0x3ff7a8['x'],_0x511b79+_0x3ff7a8['y'],_0x1d59f8,_0x5743c6);},Sprite_Animation[_0x52866a(0x8dc)][_0x52866a(0x5c3)]=function(_0x10f67c){const _0x5d042b=_0x52866a;if(_0x10f67c[_0x5d042b(0x6c2)]){}const _0x4e835e=this[_0x5d042b(0x778)]['name'];let _0x888308=_0x10f67c[_0x5d042b(0x8a0)]*_0x10f67c[_0x5d042b(0x1d1)]['y'],_0x586261=0x0,_0x122286=-_0x888308/0x2;if(_0x4e835e[_0x5d042b(0x1e7)](/<(?:HEAD|HEADER|TOP)>/i))_0x122286=-_0x888308;if(_0x4e835e['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x122286=0x0;if(_0x4e835e[_0x5d042b(0x1e7)](/<(?:LEFT)>/i))_0x586261=-_0x10f67c[_0x5d042b(0x2e8)]/0x2;if(_0x4e835e[_0x5d042b(0x1e7)](/<(?:RIGHT)>/i))_0x122286=_0x10f67c['width']/0x2;if(_0x4e835e[_0x5d042b(0x1e7)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x586261=Number(RegExp['$1'])*_0x10f67c[_0x5d042b(0x2e8)];_0x4e835e[_0x5d042b(0x1e7)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x122286=(0x1-Number(RegExp['$1']))*-_0x888308);_0x4e835e['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x586261=Number(RegExp['$1'])*_0x10f67c[_0x5d042b(0x2e8)],_0x122286=(0x1-Number(RegExp['$2']))*-_0x888308);if(_0x4e835e['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x586261+=Number(RegExp['$1']);if(_0x4e835e[_0x5d042b(0x1e7)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x122286+=Number(RegExp['$1']);_0x4e835e['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x586261+=Number(RegExp['$1']),_0x122286+=Number(RegExp['$2']));const _0x79955c=new Point(_0x586261,_0x122286);return _0x10f67c[_0x5d042b(0x669)](),_0x10f67c[_0x5d042b(0x61a)][_0x5d042b(0x542)](_0x79955c);},Sprite_AnimationMV[_0x52866a(0x8dc)][_0x52866a(0x832)]=function(_0x1a4c85){const _0x3e2a35=_0x52866a;this[_0x3e2a35(0x910)]=_0x1a4c85;},VisuMZ[_0x52866a(0x8b9)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x52866a(0x8dc)][_0x52866a(0x90b)],Sprite_AnimationMV[_0x52866a(0x8dc)][_0x52866a(0x90b)]=function(_0x32f96f){const _0xcedf54=_0x52866a;this[_0xcedf54(0x910)]&&(_0xcedf54(0x69a)===_0xcedf54(0x69a)?(_0x32f96f=JsonEx['makeDeepCopy'](_0x32f96f),_0x32f96f['se']&&(_0x32f96f['se'][_0xcedf54(0x51e)]=0x0)):this[_0xcedf54(0x950)](0x0)),VisuMZ[_0xcedf54(0x8b9)][_0xcedf54(0x7dd)][_0xcedf54(0x235)](this,_0x32f96f);},Sprite_Damage[_0x52866a(0x8dc)]['createDigits']=function(_0x486cee){const _0x53a425=_0x52866a;let _0x5e22f9=Math[_0x53a425(0x24e)](_0x486cee)[_0x53a425(0x686)]();this[_0x53a425(0x5eb)]()&&(_0x53a425(0x630)===_0x53a425(0x630)?_0x5e22f9=VisuMZ[_0x53a425(0x716)](_0x5e22f9):_0x37cfcd[_0x53a425(0x4c0)](!_0x281fc7[_0x53a425(0x730)]()));const _0x4931cf=this[_0x53a425(0x2e7)](),_0x4b2645=Math['floor'](_0x4931cf*0.75);for(let _0x15966e=0x0;_0x15966e<_0x5e22f9['length'];_0x15966e++){const _0x4865d3=this[_0x53a425(0x5fe)](_0x4b2645,_0x4931cf);_0x4865d3[_0x53a425(0x96a)][_0x53a425(0x48d)](_0x5e22f9[_0x15966e],0x0,0x0,_0x4b2645,_0x4931cf,_0x53a425(0x229)),_0x4865d3['x']=(_0x15966e-(_0x5e22f9[_0x53a425(0x708)]-0x1)/0x2)*_0x4b2645,_0x4865d3['dy']=-_0x15966e;}},Sprite_Damage[_0x52866a(0x8dc)][_0x52866a(0x5eb)]=function(){const _0x1f0831=_0x52866a;return VisuMZ[_0x1f0831(0x8b9)][_0x1f0831(0x727)]['QoL'][_0x1f0831(0x5d7)];},Sprite_Damage[_0x52866a(0x8dc)]['valueOutlineColor']=function(){const _0x4b3fa3=_0x52866a;return ColorManager[_0x4b3fa3(0x3d9)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x941)]=Sprite_Gauge['prototype'][_0x52866a(0x49a)],Sprite_Gauge[_0x52866a(0x8dc)][_0x52866a(0x49a)]=function(){const _0x28ac5e=_0x52866a;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x28ac5e(0x235)](this)[_0x28ac5e(0x903)](0x0,0x1);},VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge['prototype'][_0x52866a(0x7de)]=function(){let _0xaf5c81=VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']['call'](this);return _0xaf5c81;},Sprite_Gauge[_0x52866a(0x8dc)][_0x52866a(0x655)]=function(){const _0x713728=_0x52866a;let _0x192a35=this[_0x713728(0x7de)]();if(this[_0x713728(0x5eb)]()){if('ZXssV'==='ZXssV')_0x192a35=VisuMZ[_0x713728(0x716)](_0x192a35);else{if(!this['isCursorMovable']())return;_0x4a3c7e[_0x713728(0x365)]()?this[_0x713728(0x314)]():_0x775ff7['prototype'][_0x713728(0x1da)][_0x713728(0x235)](this);}}const _0x1a3766=this[_0x713728(0x3cc)]()-0x1,_0x4d044c=this[_0x713728(0x728)]?this['textHeight']():this['bitmapHeight']();this['setupValueFont'](),this[_0x713728(0x96a)][_0x713728(0x48d)](_0x192a35,0x0,0x0,_0x1a3766,_0x4d044c,_0x713728(0x991));},Sprite_Gauge[_0x52866a(0x8dc)][_0x52866a(0x8e0)]=function(){return 0x3;},Sprite_Gauge[_0x52866a(0x8dc)][_0x52866a(0x5eb)]=function(){const _0x591988=_0x52866a;return VisuMZ[_0x591988(0x8b9)][_0x591988(0x727)][_0x591988(0x98c)][_0x591988(0x3ce)];},Sprite_Gauge[_0x52866a(0x8dc)]['valueOutlineColor']=function(){const _0x1ae28a=_0x52866a;return ColorManager[_0x1ae28a(0x8fd)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8fc)]=Sprite_Picture['prototype'][_0x52866a(0x227)],Sprite_Picture[_0x52866a(0x8dc)]['loadBitmap']=function(){const _0x4e302a=_0x52866a;this['_pictureName'][_0x4e302a(0x1e7)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap']['call'](this);},Sprite_Picture[_0x52866a(0x8dc)][_0x52866a(0x41e)]=function(_0x44da22){const _0x1701a7=_0x52866a,_0xe8113a=ImageManager[_0x1701a7(0x987)],_0x4fa5d7=ImageManager['iconHeight'],_0x8b32cd=this['_pictureName']['match'](/SMOOTH/i);this[_0x1701a7(0x96a)]=new Bitmap(_0xe8113a,_0x4fa5d7);const _0x4a8512=ImageManager['loadSystem'](_0x1701a7(0x74e)),_0x21f23b=_0x44da22%0x10*_0xe8113a,_0x29abdc=Math[_0x1701a7(0x7b3)](_0x44da22/0x10)*_0x4fa5d7;this[_0x1701a7(0x96a)][_0x1701a7(0x658)]=_0x8b32cd,this[_0x1701a7(0x96a)]['blt'](_0x4a8512,_0x21f23b,_0x29abdc,_0xe8113a,_0x4fa5d7,0x0,0x0,_0xe8113a,_0x4fa5d7);};function Sprite_TitlePictureButton(){const _0x5e315a=_0x52866a;this[_0x5e315a(0x7ed)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x52866a(0x473)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x948)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(_0x563028){const _0x3afeb0=_0x52866a;Sprite_Clickable['prototype'][_0x3afeb0(0x7ed)]['call'](this),this['_data']=_0x563028,this[_0x3afeb0(0x6cf)]=null,this[_0x3afeb0(0x8c3)]();},Sprite_TitlePictureButton['prototype'][_0x52866a(0x8c3)]=function(){const _0x317907=_0x52866a;this['x']=Graphics['width'],this['y']=Graphics['height'],this[_0x317907(0x8ab)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x52866a(0x8dc)]['setupButtonImage']=function(){const _0x8f0337=_0x52866a;this['bitmap']=ImageManager[_0x8f0337(0x4ee)](this['_data'][_0x8f0337(0x672)]),this[_0x8f0337(0x96a)][_0x8f0337(0x3db)](this[_0x8f0337(0x5cb)][_0x8f0337(0x733)](this));},Sprite_TitlePictureButton['prototype'][_0x52866a(0x5cb)]=function(){const _0x542835=_0x52866a;this[_0x542835(0x764)][_0x542835(0x413)][_0x542835(0x235)](this),this['_data'][_0x542835(0x5ef)][_0x542835(0x235)](this),this[_0x542835(0x28e)](this['_data'][_0x542835(0x3a1)][_0x542835(0x733)](this));},Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x8c1)]=function(){const _0x2089bc=_0x52866a;Sprite_Clickable[_0x2089bc(0x8dc)][_0x2089bc(0x8c1)][_0x2089bc(0x235)](this),this[_0x2089bc(0x5b8)](),this['processTouch']();},Sprite_TitlePictureButton['prototype'][_0x52866a(0x49c)]=function(){const _0x4db06c=_0x52866a;return VisuMZ[_0x4db06c(0x8b9)][_0x4db06c(0x727)][_0x4db06c(0x5f1)][_0x4db06c(0x2e1)][_0x4db06c(0x592)];},Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x5b8)]=function(){const _0x478247=_0x52866a;if(this[_0x478247(0x57f)]||this['_hovered'])this[_0x478247(0x226)]=0xff;else{if(_0x478247(0x46b)===_0x478247(0x78f)){if(_0x18128d[_0x478247(0x8f2)][_0x478247(0x235)](this)){const _0x31e905=_0x19723a['Symbol'];let _0x27bb19=_0x53287e['TextStr'];if(['',_0x478247(0x820)][_0x478247(0x234)](_0x27bb19))_0x27bb19=_0x44d2f0[_0x478247(0x4f8)]['call'](this);const _0x537f70=_0x4423a2[_0x478247(0x5d6)][_0x478247(0x235)](this),_0x56c7cb=_0x8a24e6['ExtJS'][_0x478247(0x235)](this);this['addCommand'](_0x27bb19,_0x31e905,_0x537f70,_0x56c7cb),this[_0x478247(0x889)](_0x31e905,_0x12cdb2[_0x478247(0x3a1)][_0x478247(0x733)](this,_0x56c7cb));}}else this[_0x478247(0x226)]+=this['visible']?this[_0x478247(0x49c)]():-0x1*this[_0x478247(0x49c)](),this[_0x478247(0x226)]=Math[_0x478247(0x490)](0xc0,this[_0x478247(0x226)]);}},Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x28e)]=function(_0x206b94){const _0x117720=_0x52866a;this[_0x117720(0x6cf)]=_0x206b94;},Sprite_TitlePictureButton[_0x52866a(0x8dc)][_0x52866a(0x561)]=function(){const _0x3b0551=_0x52866a;this[_0x3b0551(0x6cf)]&&this[_0x3b0551(0x6cf)]();},VisuMZ['CoreEngine'][_0x52866a(0x436)]=Spriteset_Base[_0x52866a(0x8dc)]['initialize'],Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(){const _0x53d5d1=_0x52866a;VisuMZ['CoreEngine'][_0x53d5d1(0x436)]['call'](this),this[_0x53d5d1(0x95d)]();},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x95d)]=function(){const _0x123c86=_0x52866a;this[_0x123c86(0x8a2)]=[],this[_0x123c86(0x69c)]=[],this[_0x123c86(0x355)]=this['scale']['x'],this['_cacheScaleY']=this[_0x123c86(0x1d1)]['y'];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x41f)]=Spriteset_Base[_0x52866a(0x8dc)]['destroy'],Spriteset_Base['prototype'][_0x52866a(0x389)]=function(_0x5195f6){const _0x46b0f1=_0x52866a;this[_0x46b0f1(0x8bf)](),this[_0x46b0f1(0x470)](),VisuMZ[_0x46b0f1(0x8b9)][_0x46b0f1(0x41f)][_0x46b0f1(0x235)](this,_0x5195f6);},VisuMZ['CoreEngine'][_0x52866a(0x1bb)]=Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x8c1)],Spriteset_Base['prototype']['update']=function(){const _0x19d53d=_0x52866a;VisuMZ[_0x19d53d(0x8b9)]['Spriteset_Base_update'][_0x19d53d(0x235)](this),this[_0x19d53d(0x29b)](),this[_0x19d53d(0x642)](),this[_0x19d53d(0x2ab)]();},Spriteset_Base['prototype'][_0x52866a(0x29b)]=function(){const _0x23dc97=_0x52866a;if(!VisuMZ['CoreEngine']['Settings'][_0x23dc97(0x98c)][_0x23dc97(0x3e8)])return;if(this[_0x23dc97(0x355)]===this[_0x23dc97(0x1d1)]['x']&&this[_0x23dc97(0x87e)]===this['scale']['y'])return;this[_0x23dc97(0x62d)](),this[_0x23dc97(0x355)]=this[_0x23dc97(0x1d1)]['x'],this['_cacheScaleY']=this[_0x23dc97(0x1d1)]['y'];},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x62d)]=function(){const _0x418a61=_0x52866a;this[_0x418a61(0x1d1)]['x']!==0x0&&(this[_0x418a61(0x2e3)]['scale']['x']=0x1/this[_0x418a61(0x1d1)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x418a61(0x1d1)]['x'])),this[_0x418a61(0x1d1)]['y']!==0x0&&(this[_0x418a61(0x2e3)][_0x418a61(0x1d1)]['y']=0x1/this['scale']['y'],this[_0x418a61(0x2e3)]['y']=-(this['y']/this[_0x418a61(0x1d1)]['y']));},VisuMZ['CoreEngine'][_0x52866a(0x94e)]=Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x7d0)],Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x7d0)]=function(){const _0x156dce=_0x52866a;VisuMZ[_0x156dce(0x8b9)][_0x156dce(0x94e)][_0x156dce(0x235)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x52866a(0x8dc)]['updatePositionCoreEngine']=function(){const _0x1e86ed=_0x52866a;if(!$gameScreen)return;if($gameScreen[_0x1e86ed(0x756)]<=0x0)return;this['x']-=Math[_0x1e86ed(0x447)]($gameScreen[_0x1e86ed(0x54a)]());const _0x2f8c7d=$gameScreen[_0x1e86ed(0x675)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x1e86ed(0x27d):this[_0x1e86ed(0x847)]();break;case'horizontal':this[_0x1e86ed(0x1d6)]();break;case _0x1e86ed(0x8b2):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x1e86ed(0x942)]();break;}},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x847)]=function(){const _0x14c605=_0x52866a,_0x33c42b=VisuMZ['CoreEngine'][_0x14c605(0x727)][_0x14c605(0x6c0)];if(_0x33c42b&&_0x33c42b[_0x14c605(0x451)])return _0x33c42b[_0x14c605(0x451)][_0x14c605(0x235)](this);this['x']+=Math[_0x14c605(0x447)]($gameScreen['shake']());},Spriteset_Base['prototype'][_0x52866a(0x942)]=function(){const _0x24daf0=_0x52866a,_0x3bedea=VisuMZ['CoreEngine'][_0x24daf0(0x727)][_0x24daf0(0x6c0)];if(_0x3bedea&&_0x3bedea[_0x24daf0(0x2fb)])return _0x3bedea[_0x24daf0(0x2fb)][_0x24daf0(0x235)](this);const _0x588cd7=$gameScreen['_shakePower']*0.75,_0x5de76d=$gameScreen[_0x24daf0(0x857)]*0.6,_0xf7e437=$gameScreen[_0x24daf0(0x756)];this['x']+=Math[_0x24daf0(0x447)](Math[_0x24daf0(0x5b2)](_0x588cd7)-Math[_0x24daf0(0x5b2)](_0x5de76d))*(Math['min'](_0xf7e437,0x1e)*0.5),this['y']+=Math[_0x24daf0(0x447)](Math[_0x24daf0(0x5b2)](_0x588cd7)-Math[_0x24daf0(0x5b2)](_0x5de76d))*(Math[_0x24daf0(0x490)](_0xf7e437,0x1e)*0.5);},Spriteset_Base['prototype'][_0x52866a(0x1d6)]=function(){const _0x599eb9=_0x52866a,_0x4ec6fd=VisuMZ[_0x599eb9(0x8b9)][_0x599eb9(0x727)][_0x599eb9(0x6c0)];if(_0x4ec6fd&&_0x4ec6fd['horzJS'])return _0x4ec6fd[_0x599eb9(0x53f)][_0x599eb9(0x235)](this);const _0x3650e8=$gameScreen[_0x599eb9(0x308)]*0.75,_0x4ec8a6=$gameScreen[_0x599eb9(0x857)]*0.6,_0x26798c=$gameScreen[_0x599eb9(0x756)];this['x']+=Math[_0x599eb9(0x447)](Math['randomInt'](_0x3650e8)-Math[_0x599eb9(0x5b2)](_0x4ec8a6))*(Math[_0x599eb9(0x490)](_0x26798c,0x1e)*0.5);},Spriteset_Base[_0x52866a(0x8dc)]['updatePositionCoreEngineShakeVert']=function(){const _0x8cfff9=_0x52866a,_0x5977aa=VisuMZ[_0x8cfff9(0x8b9)][_0x8cfff9(0x727)][_0x8cfff9(0x6c0)];if(_0x5977aa&&_0x5977aa['vertJS'])return _0x5977aa[_0x8cfff9(0x7cb)][_0x8cfff9(0x235)](this);const _0x24cafb=$gameScreen[_0x8cfff9(0x308)]*0.75,_0x580f81=$gameScreen['_shakeSpeed']*0.6,_0x931f66=$gameScreen['_shakeDuration'];this['y']+=Math[_0x8cfff9(0x447)](Math['randomInt'](_0x24cafb)-Math[_0x8cfff9(0x5b2)](_0x580f81))*(Math[_0x8cfff9(0x490)](_0x931f66,0x1e)*0.5);},Spriteset_Base['prototype'][_0x52866a(0x642)]=function(){const _0xe1f1d7=_0x52866a;for(const _0x10323b of this[_0xe1f1d7(0x8a2)]){if(!_0x10323b['isPlaying']()){if(_0xe1f1d7(0x5a8)===_0xe1f1d7(0x5a8))this[_0xe1f1d7(0x3ef)](_0x10323b);else return _0x368b9b[_0xe1f1d7(0x3c0)][_0xe1f1d7(0x40a)]['call'](this);}}this[_0xe1f1d7(0x874)]();},Spriteset_Base['prototype'][_0x52866a(0x874)]=function(){const _0x2e2044=_0x52866a;for(;;){const _0x292d3c=$gameTemp[_0x2e2044(0x6f1)]();if(_0x292d3c)this[_0x2e2044(0x230)](_0x292d3c);else break;}},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x230)]=function(_0x343008){const _0x1be8f1=_0x52866a,_0x5d6508=$dataAnimations[_0x343008[_0x1be8f1(0x570)]],_0x180575=_0x343008[_0x1be8f1(0x42d)],_0x6767d7=_0x343008[_0x1be8f1(0x649)],_0x56371f=_0x343008[_0x1be8f1(0x3e5)];let _0x1e2b1a=this[_0x1be8f1(0x2c3)]();const _0x5e87a8=this['animationNextDelay']();if(this[_0x1be8f1(0x6f6)](_0x5d6508))for(const _0x55c53c of _0x180575){this['createFauxAnimationSprite']([_0x55c53c],_0x5d6508,_0x6767d7,_0x1e2b1a,_0x56371f),_0x1e2b1a+=_0x5e87a8;}else this[_0x1be8f1(0x7b0)](_0x180575,_0x5d6508,_0x6767d7,_0x1e2b1a,_0x56371f);},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x7b0)]=function(_0x454b76,_0x5fb461,_0x43b827,_0x19775e,_0x3ac689){const _0x387b66=_0x52866a,_0x39a155=this[_0x387b66(0x599)](_0x5fb461),_0x387b03=new(_0x39a155?Sprite_AnimationMV:Sprite_Animation)(),_0x14bb72=this['makeTargetSprites'](_0x454b76);this[_0x387b66(0x67c)](_0x454b76[0x0])&&('YFtkJ'===_0x387b66(0x2b8)?_0x43b827=!_0x43b827:(_0x44f1cf=_0x225775[_0x387b66(0x447)](_0x538094),_0x213227=_0x49e359[_0x387b66(0x447)](_0x18408c),_0x149dfe=_0x5c90e1[_0x387b66(0x447)](_0x2ea32a),_0x3e624f=_0x1131f4['round'](_0x31c729),_0x11b9ee[_0x387b66(0x8b9)][_0x387b66(0x535)]['call'](this,_0x12bed1,_0x325779,_0x3157d,_0x1ccc88,_0x21f2f1,_0x2790f2),this[_0x387b66(0x351)]())),_0x387b03['targetObjects']=_0x454b76,_0x387b03[_0x387b66(0x8c3)](_0x14bb72,_0x5fb461,_0x43b827,_0x19775e),_0x387b03[_0x387b66(0x832)](_0x3ac689),this[_0x387b66(0x86c)][_0x387b66(0x5b0)](_0x387b03),this['_fauxAnimationSprites'][_0x387b66(0x4f5)](_0x387b03);},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x3ef)]=function(_0x4cb860){const _0x330b57=_0x52866a;this[_0x330b57(0x8a2)][_0x330b57(0x616)](_0x4cb860),this[_0x330b57(0x86c)][_0x330b57(0x8f6)](_0x4cb860);for(const _0x47d1ff of _0x4cb860[_0x330b57(0x681)]){_0x47d1ff[_0x330b57(0x6d4)]&&_0x47d1ff['endAnimation']();}_0x4cb860[_0x330b57(0x389)]();},Spriteset_Base[_0x52866a(0x8dc)]['removeAllFauxAnimations']=function(){const _0x1eb368=_0x52866a;for(const _0x5dd0ee of this[_0x1eb368(0x8a2)]){this[_0x1eb368(0x3ef)](_0x5dd0ee);}},Spriteset_Base['prototype'][_0x52866a(0x900)]=function(){const _0x278e5e=_0x52866a;return this[_0x278e5e(0x8a2)][_0x278e5e(0x708)]>0x0;},Spriteset_Base['prototype'][_0x52866a(0x2ab)]=function(){const _0x1e51bb=_0x52866a;for(const _0x59b311 of this[_0x1e51bb(0x69c)]){!_0x59b311[_0x1e51bb(0x7b5)]()&&this[_0x1e51bb(0x563)](_0x59b311);}this[_0x1e51bb(0x568)]();},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x568)]=function(){const _0x10b7dc=_0x52866a;for(;;){if(_0x10b7dc(0x208)===_0x10b7dc(0x208)){const _0x44e29e=$gameTemp['retrievePointAnimation']();if(_0x44e29e){if(_0x10b7dc(0x775)===_0x10b7dc(0x775))this[_0x10b7dc(0x5bf)](_0x44e29e);else{const _0x253347={'targets':_0x414f65,'animationId':_0x5872cd,'mirror':_0x376039,'mute':_0x3b5f20};this[_0x10b7dc(0x4a3)]['push'](_0x253347);for(const _0x2f9805 of _0x2a79de){_0x2f9805[_0x10b7dc(0x32a)]&&_0x2f9805[_0x10b7dc(0x32a)]();}}}else{if(_0x10b7dc(0x589)!=='deMrU')return _0x1d5336[_0x10b7dc(0x8b9)][_0x10b7dc(0x8d7)][_0x10b7dc(0x235)](this);else break;}}else this[_0x10b7dc(0x2eb)]['x']=_0x17d691[_0x10b7dc(0x2eb)]()['x'],this[_0x10b7dc(0x2eb)]['y']=_0x299035[_0x10b7dc(0x2eb)]()['y'];}},Spriteset_Base[_0x52866a(0x8dc)]['createPointAnimation']=function(_0x398bf8){const _0x49e8bf=_0x52866a,_0x56f799=$dataAnimations[_0x398bf8['animationId']],_0x2f5950=this[_0x49e8bf(0x565)](_0x398bf8),_0x4395a2=_0x398bf8[_0x49e8bf(0x649)],_0x41864f=_0x398bf8[_0x49e8bf(0x3e5)];let _0x541460=this['animationBaseDelay']();const _0x50b9cd=this['animationNextDelay']();if(this[_0x49e8bf(0x6f6)](_0x56f799)){if('tIJWo'===_0x49e8bf(0x63e))for(const _0x2ecb43 of _0x2f5950){if(_0x49e8bf(0x1e1)===_0x49e8bf(0x1e1))this['createPointAnimationSprite']([_0x2ecb43],_0x56f799,_0x4395a2,_0x541460,_0x41864f),_0x541460+=_0x50b9cd;else return _0x3f95d4[_0x49e8bf(0x3c0)]['EditRect'][_0x49e8bf(0x235)](this);}else _0x22e827+=_0x5819c5,_0x18350d+=_0x49e8bf(0x959)[_0x49e8bf(0x782)](_0x502644);}else this[_0x49e8bf(0x393)](_0x2f5950,_0x56f799,_0x4395a2,_0x541460,_0x41864f);},Spriteset_Base['prototype'][_0x52866a(0x565)]=function(_0x130720){const _0x4a616f=_0x52866a,_0x206447=new Sprite_Clickable();_0x206447['x']=_0x130720['x'],_0x206447['y']=_0x130720['y'],_0x206447['z']=0x64;const _0x1d0f81=this['getPointAnimationLayer']();return _0x1d0f81[_0x4a616f(0x5b0)](_0x206447),[_0x206447];},Spriteset_Base[_0x52866a(0x8dc)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x52866a(0x8dc)][_0x52866a(0x294)]=function(){const _0x151ff4=_0x52866a;return this[_0x151ff4(0x477)]||this;},Spriteset_Battle['prototype']['getPointAnimationLayer']=function(){const _0x4b11bf=_0x52866a;return this[_0x4b11bf(0x20b)]||this;},Spriteset_Base['prototype'][_0x52866a(0x393)]=function(_0x204c8b,_0x476c99,_0x2dd604,_0x103910,_0x1f6b00){const _0x484e84=_0x52866a,_0x23b450=this[_0x484e84(0x599)](_0x476c99),_0x525b70=new(_0x23b450?Sprite_AnimationMV:Sprite_Animation)();_0x525b70[_0x484e84(0x681)]=_0x204c8b,_0x525b70[_0x484e84(0x8c3)](_0x204c8b,_0x476c99,_0x2dd604,_0x103910),_0x525b70[_0x484e84(0x832)](_0x1f6b00),this[_0x484e84(0x86c)][_0x484e84(0x5b0)](_0x525b70),this[_0x484e84(0x69c)][_0x484e84(0x4f5)](_0x525b70);},Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x563)]=function(_0x358702){const _0x316cdb=_0x52866a;this[_0x316cdb(0x69c)]['remove'](_0x358702),this[_0x316cdb(0x86c)][_0x316cdb(0x8f6)](_0x358702);for(const _0x597207 of _0x358702['targetObjects']){if(_0x316cdb(0x885)!==_0x316cdb(0x885))return[0x25,0x26,0x27,0x28]['contains'](this[_0x316cdb(0x307)]);else{_0x597207[_0x316cdb(0x6d4)]&&_0x597207[_0x316cdb(0x6d4)]();const _0x57f18f=this['getPointAnimationLayer']();if(_0x57f18f)_0x57f18f[_0x316cdb(0x8f6)](_0x597207);}}_0x358702[_0x316cdb(0x389)]();},Spriteset_Base['prototype'][_0x52866a(0x470)]=function(){const _0x4f6e94=_0x52866a;for(const _0x5ddf35 of this[_0x4f6e94(0x69c)]){this[_0x4f6e94(0x563)](_0x5ddf35);}},Spriteset_Base['prototype'][_0x52866a(0x2ea)]=function(){return this['_pointAnimationSprites']['length']>0x0;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x771)]=Spriteset_Base['prototype'][_0x52866a(0x8a9)],Spriteset_Base[_0x52866a(0x8dc)][_0x52866a(0x8a9)]=function(){const _0x507aab=_0x52866a;return VisuMZ[_0x507aab(0x8b9)][_0x507aab(0x771)][_0x507aab(0x235)](this)||this[_0x507aab(0x2ea)]();},Spriteset_Battle[_0x52866a(0x8dc)][_0x52866a(0x6fd)]=function(){const _0x2cc13a=_0x52866a;this['_backgroundFilter']=new PIXI[(_0x2cc13a(0x1be))][(_0x2cc13a(0x6f9))](clamp=!![]),this[_0x2cc13a(0x852)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this[_0x2cc13a(0x852)][_0x2cc13a(0x1be)]=[this[_0x2cc13a(0x3d0)]],this[_0x2cc13a(0x1eb)]['addChild'](this[_0x2cc13a(0x852)]);},VisuMZ[_0x52866a(0x8b9)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x52866a(0x8dc)][_0x52866a(0x685)],Spriteset_Battle[_0x52866a(0x8dc)][_0x52866a(0x685)]=function(){const _0x46dd4d=_0x52866a;if(this['coreEngineRepositionEnemies']()){if(_0x46dd4d(0x5dd)==='icKJL'){let _0x5be2ea=_0x46dd4d(0x591)+_0x44653a+_0x46dd4d(0x430);if(this[_0x46dd4d(0x91a)](_0x5be2ea))return this[_0x46dd4d(0x923)][_0x5be2ea];return this['_cache'][_0x5be2ea]=_0xfd8986[_0x46dd4d(0x8b9)][_0x46dd4d(0x727)]['Param']['XParameterFormula']['call'](this,_0x56ed5e),this['_cache'][_0x5be2ea];}else this[_0x46dd4d(0x83f)]();}VisuMZ['CoreEngine'][_0x46dd4d(0x399)]['call'](this);},Spriteset_Battle[_0x52866a(0x8dc)][_0x52866a(0x445)]=function(){const _0x175dd1=_0x52866a,_0x4d92ea=VisuMZ[_0x175dd1(0x8b9)][_0x175dd1(0x727)][_0x175dd1(0x758)];if(!_0x4d92ea)return![];if(Utils[_0x175dd1(0x917)]>=_0x175dd1(0x810)&&!_0x4d92ea['RepositionEnemies130']){if(_0x175dd1(0x3e7)==='aqcnH')return![];else _0x14f6e4[_0x175dd1(0x8b9)][_0x175dd1(0x961)][_0x175dd1(0x235)](this);}return _0x4d92ea[_0x175dd1(0x62f)];},Spriteset_Battle[_0x52866a(0x8dc)][_0x52866a(0x83f)]=function(){const _0x2be469=_0x52866a;for(member of $gameTroop['members']()){member[_0x2be469(0x231)]();}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x7fb)]=Window_Base[_0x52866a(0x8dc)][_0x52866a(0x7ed)],Window_Base[_0x52866a(0x8dc)]['initialize']=function(_0x1eabe4){const _0x2538bf=_0x52866a;_0x1eabe4['x']=Math[_0x2538bf(0x447)](_0x1eabe4['x']),_0x1eabe4['y']=Math[_0x2538bf(0x447)](_0x1eabe4['y']),_0x1eabe4[_0x2538bf(0x2e8)]=Math[_0x2538bf(0x447)](_0x1eabe4['width']),_0x1eabe4[_0x2538bf(0x8a0)]=Math[_0x2538bf(0x447)](_0x1eabe4[_0x2538bf(0x8a0)]),this[_0x2538bf(0x2ad)](),VisuMZ['CoreEngine'][_0x2538bf(0x7fb)][_0x2538bf(0x235)](this,_0x1eabe4),this[_0x2538bf(0x7e8)]();},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x2ad)]=function(){const _0x39f63c=_0x52866a;this[_0x39f63c(0x433)]=VisuMZ[_0x39f63c(0x8b9)][_0x39f63c(0x727)][_0x39f63c(0x98c)][_0x39f63c(0x7f3)],this[_0x39f63c(0x39d)]=VisuMZ[_0x39f63c(0x8b9)][_0x39f63c(0x727)][_0x39f63c(0x98c)][_0x39f63c(0x4bc)];},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x504)]=function(){const _0x2c484d=_0x52866a;return VisuMZ[_0x2c484d(0x8b9)][_0x2c484d(0x727)]['Window'][_0x2c484d(0x79d)];},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x650)]=function(){const _0x35d5d8=_0x52866a;return VisuMZ[_0x35d5d8(0x8b9)][_0x35d5d8(0x727)]['Window']['ItemPadding'];},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x33a)]=function(){const _0x489155=_0x52866a;$gameSystem[_0x489155(0x3c5)]?this[_0x489155(0x8e6)]=$gameSystem[_0x489155(0x3c5)]():this[_0x489155(0x8e6)]=VisuMZ[_0x489155(0x8b9)][_0x489155(0x727)][_0x489155(0x864)]['BackOpacity'];},Window_Base[_0x52866a(0x8dc)]['translucentOpacity']=function(){const _0x7f6722=_0x52866a;return VisuMZ[_0x7f6722(0x8b9)][_0x7f6722(0x727)]['Window'][_0x7f6722(0x44c)];},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x424)]=function(){const _0x32ae12=_0x52866a;return VisuMZ[_0x32ae12(0x8b9)]['Settings'][_0x32ae12(0x864)][_0x32ae12(0x2cd)];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x85a)]=Window_Base['prototype'][_0x52866a(0x8c1)],Window_Base[_0x52866a(0x8dc)][_0x52866a(0x8c1)]=function(){const _0x7b6a8a=_0x52866a;VisuMZ[_0x7b6a8a(0x8b9)][_0x7b6a8a(0x85a)]['call'](this),this[_0x7b6a8a(0x2d5)]();},Window_Base['prototype'][_0x52866a(0x36c)]=function(){const _0x33692d=_0x52866a;this[_0x33692d(0x6af)]&&(this[_0x33692d(0x5e8)]+=this['openingSpeed'](),this[_0x33692d(0x391)]()&&(_0x33692d(0x92a)===_0x33692d(0x92a)?this[_0x33692d(0x6af)]=![]:_0x177517[_0x33692d(0x8b9)][_0x33692d(0x727)]['UI'][_0x33692d(0x7c8)]?this[_0x33692d(0x57e)](_0x52e3dc):_0x2b1230[_0x33692d(0x8b9)]['Sprite_Actor_setActorHome'][_0x33692d(0x235)](this,_0x4c9a2e)));},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x755)]=function(){const _0x39e20e=_0x52866a;if(this[_0x39e20e(0x395)]){this[_0x39e20e(0x5e8)]-=this[_0x39e20e(0x424)]();if(this[_0x39e20e(0x734)]()){if(_0x39e20e(0x8e2)!==_0x39e20e(0x8e2)){if(_0x17cd55['inBattle']())return![];return this[_0x39e20e(0x683)]()&&this[_0x39e20e(0x683)]()['charAt'](0x0)==='!';}else this[_0x39e20e(0x395)]=![];}}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x2a4)]=Window_Base['prototype'][_0x52866a(0x48d)],Window_Base[_0x52866a(0x8dc)]['drawText']=function(_0x2af05d,_0x54a691,_0x519eea,_0x3e90dd,_0x3bab94){const _0x3bc34d=_0x52866a;if(this[_0x3bc34d(0x5eb)]())_0x2af05d=VisuMZ['GroupDigits'](_0x2af05d);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x3bc34d(0x235)](this,_0x2af05d,_0x54a691,_0x519eea,_0x3e90dd,_0x3bab94);},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x5eb)]=function(){return this['_digitGrouping'];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x645)]=Window_Base[_0x52866a(0x8dc)][_0x52866a(0x762)],Window_Base[_0x52866a(0x8dc)]['createTextState']=function(_0x5b3435,_0x2c9aec,_0xc53ee8,_0xeaf0b1){const _0x5cb6eb=_0x52866a;var _0x390f8d=VisuMZ[_0x5cb6eb(0x8b9)][_0x5cb6eb(0x645)][_0x5cb6eb(0x235)](this,_0x5b3435,_0x2c9aec,_0xc53ee8,_0xeaf0b1);if(this[_0x5cb6eb(0x6b6)]())_0x390f8d['text']=VisuMZ['GroupDigits'](_0x390f8d[_0x5cb6eb(0x47b)]);return _0x390f8d;},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x6b6)]=function(){const _0x59a7c0=_0x52866a;return this[_0x59a7c0(0x39d)];},Window_Base['prototype'][_0x52866a(0x769)]=function(_0x273c56){const _0x3eaab4=_0x52866a;this[_0x3eaab4(0x433)]=_0x273c56;},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x7e0)]=function(_0xea6100){const _0x33fda8=_0x52866a;this[_0x33fda8(0x39d)]=_0xea6100;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x684)]=Window_Base[_0x52866a(0x8dc)][_0x52866a(0x87c)],Window_Base[_0x52866a(0x8dc)][_0x52866a(0x87c)]=function(_0x3dce75,_0x307b3c,_0x154bc3){const _0x453f10=_0x52866a;_0x307b3c=Math[_0x453f10(0x447)](_0x307b3c),_0x154bc3=Math[_0x453f10(0x447)](_0x154bc3),VisuMZ[_0x453f10(0x8b9)][_0x453f10(0x684)][_0x453f10(0x235)](this,_0x3dce75,_0x307b3c,_0x154bc3);},VisuMZ[_0x52866a(0x8b9)]['Window_Base_drawFace']=Window_Base['prototype'][_0x52866a(0x60c)],Window_Base['prototype']['drawFace']=function(_0x446b13,_0x30d2df,_0xe5153e,_0x5919eb,_0x32c655,_0x4aad85){const _0x24142e=_0x52866a;_0x32c655=_0x32c655||ImageManager[_0x24142e(0x7ca)],_0x4aad85=_0x4aad85||ImageManager[_0x24142e(0x439)],_0xe5153e=Math[_0x24142e(0x447)](_0xe5153e),_0x5919eb=Math[_0x24142e(0x447)](_0x5919eb),_0x32c655=Math[_0x24142e(0x447)](_0x32c655),_0x4aad85=Math['round'](_0x4aad85),VisuMZ[_0x24142e(0x8b9)][_0x24142e(0x743)]['call'](this,_0x446b13,_0x30d2df,_0xe5153e,_0x5919eb,_0x32c655,_0x4aad85);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x3c1)]=Window_Base[_0x52866a(0x8dc)][_0x52866a(0x522)],Window_Base[_0x52866a(0x8dc)][_0x52866a(0x522)]=function(_0x581013,_0x18b21c,_0x276bc0,_0x33ff67){const _0x5f178d=_0x52866a;_0x276bc0=Math['round'](_0x276bc0),_0x33ff67=Math[_0x5f178d(0x447)](_0x33ff67),VisuMZ['CoreEngine'][_0x5f178d(0x3c1)]['call'](this,_0x581013,_0x18b21c,_0x276bc0,_0x33ff67);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x8f7)]=Window_Selectable['prototype'][_0x52866a(0x30d)],Window_Selectable[_0x52866a(0x8dc)]['itemRect']=function(_0x168f4e){const _0x377e4b=_0x52866a;let _0x3ada87=VisuMZ[_0x377e4b(0x8b9)]['Window_Selectable_itemRect']['call'](this,_0x168f4e);return _0x3ada87['x']=Math[_0x377e4b(0x447)](_0x3ada87['x']),_0x3ada87['y']=Math['round'](_0x3ada87['y']),_0x3ada87[_0x377e4b(0x2e8)]=Math['round'](_0x3ada87['width']),_0x3ada87[_0x377e4b(0x8a0)]=Math[_0x377e4b(0x447)](_0x3ada87[_0x377e4b(0x8a0)]),_0x3ada87;},VisuMZ['CoreEngine'][_0x52866a(0x862)]=Window_StatusBase[_0x52866a(0x8dc)]['drawActorSimpleStatus'],Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x6bc)]=function(_0x4a5a98,_0x2c0672,_0x1a2eeb){const _0x3e8ad1=_0x52866a;_0x2c0672=Math[_0x3e8ad1(0x447)](_0x2c0672),_0x1a2eeb=Math['round'](_0x1a2eeb),VisuMZ[_0x3e8ad1(0x8b9)][_0x3e8ad1(0x862)][_0x3e8ad1(0x235)](this,_0x4a5a98,_0x2c0672,_0x1a2eeb);},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x7e8)]=function(){const _0x37fac6=_0x52866a;this[_0x37fac6(0x24c)]={'duration':0x0,'wholeDuration':0x0,'type':_0x37fac6(0x736),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x37fac6(0x1d1)]['x'],'targetScaleY':this[_0x37fac6(0x1d1)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x37fac6(0x8e6)],'targetContentsOpacity':this[_0x37fac6(0x823)]};},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x2d5)]=function(){const _0x1cbd8c=_0x52866a;if(!this[_0x1cbd8c(0x24c)])return;if(this['_coreEasing'][_0x1cbd8c(0x4e7)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x1cbd8c(0x24c)][_0x1cbd8c(0x95b)]),this['y']=this[_0x1cbd8c(0x3a7)](this['y'],this[_0x1cbd8c(0x24c)][_0x1cbd8c(0x2bb)]),this[_0x1cbd8c(0x1d1)]['x']=this[_0x1cbd8c(0x3a7)](this[_0x1cbd8c(0x1d1)]['x'],this['_coreEasing']['targetScaleX']),this[_0x1cbd8c(0x1d1)]['y']=this[_0x1cbd8c(0x3a7)](this[_0x1cbd8c(0x1d1)]['y'],this[_0x1cbd8c(0x24c)][_0x1cbd8c(0x50f)]),this['opacity']=this[_0x1cbd8c(0x3a7)](this[_0x1cbd8c(0x226)],this[_0x1cbd8c(0x24c)][_0x1cbd8c(0x800)]),this[_0x1cbd8c(0x8e6)]=this[_0x1cbd8c(0x3a7)](this[_0x1cbd8c(0x8e6)],this[_0x1cbd8c(0x24c)]['targetBackOpacity']),this['contentsOpacity']=this[_0x1cbd8c(0x3a7)](this[_0x1cbd8c(0x823)],this[_0x1cbd8c(0x24c)]['targetContentsOpacity']),this[_0x1cbd8c(0x24c)][_0x1cbd8c(0x4e7)]--;},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x3a7)]=function(_0x858a1b,_0x3aad37){const _0x16beeb=_0x52866a;if(!this['_coreEasing'])return _0x3aad37;const _0x3f641b=this['_coreEasing'][_0x16beeb(0x4e7)],_0xca2108=this[_0x16beeb(0x24c)][_0x16beeb(0x6eb)],_0x26518a=this[_0x16beeb(0x713)]((_0xca2108-_0x3f641b)/_0xca2108),_0x33b2e4=this[_0x16beeb(0x713)]((_0xca2108-_0x3f641b+0x1)/_0xca2108),_0x1bb9d3=(_0x858a1b-_0x3aad37*_0x26518a)/(0x1-_0x26518a);return _0x1bb9d3+(_0x3aad37-_0x1bb9d3)*_0x33b2e4;},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x713)]=function(_0x3597d1){const _0xc7ee97=_0x52866a;if(!this['_coreEasing'])return _0x3597d1;return VisuMZ['ApplyEasing'](_0x3597d1,this[_0xc7ee97(0x24c)][_0xc7ee97(0x64a)]||_0xc7ee97(0x736));},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x3df)]=function(_0x4aa540,_0x138445){const _0x24ee52=_0x52866a;if(!this[_0x24ee52(0x24c)])return;this['x']=this['_coreEasing'][_0x24ee52(0x95b)],this['y']=this['_coreEasing'][_0x24ee52(0x2bb)],this[_0x24ee52(0x1d1)]['x']=this[_0x24ee52(0x24c)][_0x24ee52(0x2f1)],this['scale']['y']=this[_0x24ee52(0x24c)][_0x24ee52(0x50f)],this[_0x24ee52(0x226)]=this['_coreEasing']['targetOpacity'],this[_0x24ee52(0x8e6)]=this[_0x24ee52(0x24c)][_0x24ee52(0x6ee)],this[_0x24ee52(0x823)]=this['_coreEasing']['targetContentsOpacity'],this[_0x24ee52(0x357)](_0x4aa540,_0x138445,this['x'],this['y'],this[_0x24ee52(0x1d1)]['x'],this[_0x24ee52(0x1d1)]['y'],this[_0x24ee52(0x226)],this[_0x24ee52(0x8e6)],this['contentsOpacity']);},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x357)]=function(_0x4d9fc9,_0x3562e1,_0x2951e5,_0x4f27a0,_0x4c9312,_0x23d654,_0x4bcc5e,_0x196131,_0x3ba9ff){const _0x464b00=_0x52866a;this[_0x464b00(0x24c)]={'duration':_0x4d9fc9,'wholeDuration':_0x4d9fc9,'type':_0x3562e1,'targetX':_0x2951e5,'targetY':_0x4f27a0,'targetScaleX':_0x4c9312,'targetScaleY':_0x23d654,'targetOpacity':_0x4bcc5e,'targetBackOpacity':_0x196131,'targetContentsOpacity':_0x3ba9ff};},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x93f)]=function(_0x2b1245,_0x4bde10,_0x524446,_0x412ad5,_0x1ea9f9){const _0x1ce15f=_0x52866a;this['resetFontSettings'](),this[_0x1ce15f(0x89c)][_0x1ce15f(0x2e7)]=VisuMZ[_0x1ce15f(0x8b9)][_0x1ce15f(0x727)][_0x1ce15f(0x52c)][_0x1ce15f(0x8ed)];const _0x326ec3=VisuMZ[_0x1ce15f(0x8b9)]['Settings'][_0x1ce15f(0x52c)][_0x1ce15f(0x4e8)];if(_0x326ec3>0x0&&_0x4bde10===TextManager[_0x1ce15f(0x3e2)]){const _0x3ae7a5=_0x412ad5+(this['lineHeight']()-ImageManager[_0x1ce15f(0x48c)])/0x2;this['drawIcon'](_0x326ec3,_0x524446+(_0x1ea9f9-ImageManager['iconWidth']),_0x3ae7a5),_0x1ea9f9-=ImageManager[_0x1ce15f(0x987)]+0x4;}else _0x1ce15f(0x282)!==_0x1ce15f(0x282)?(_0x4a1fc1[_0x1ce15f(0x8b9)]['ColorManager_loadWindowskin'][_0x1ce15f(0x235)](this),this['_colorCache']=this['_colorCache']||{}):(this[_0x1ce15f(0x7af)](ColorManager['systemColor']()),this[_0x1ce15f(0x48d)](_0x4bde10,_0x524446,_0x412ad5,_0x1ea9f9,_0x1ce15f(0x991)),_0x1ea9f9-=this['textWidth'](_0x4bde10)+0x6);this[_0x1ce15f(0x378)]();const _0x557b14=this[_0x1ce15f(0x625)](this[_0x1ce15f(0x433)]?VisuMZ[_0x1ce15f(0x716)](_0x2b1245):_0x2b1245);if(_0x557b14>_0x1ea9f9){if(_0x1ce15f(0x83b)===_0x1ce15f(0x51d)){_0x46376a+=_0x5f4d6d;if(_0x278b91>=_0x430dc1)_0x326dd7=_0x208411-0x1;this[_0x1ce15f(0x497)](_0x3eb6a6);}else this[_0x1ce15f(0x48d)](VisuMZ[_0x1ce15f(0x8b9)][_0x1ce15f(0x727)][_0x1ce15f(0x52c)]['GoldOverlap'],_0x524446,_0x412ad5,_0x1ea9f9,_0x1ce15f(0x991));}else this['drawText'](_0x2b1245,_0x524446,_0x412ad5,_0x1ea9f9,_0x1ce15f(0x991));this['resetFontSettings']();},Window_Base[_0x52866a(0x8dc)]['drawIconBySize']=function(_0x337f04,_0xa809c2,_0x556029,_0xfa5ae,_0x105261){const _0x5ee955=_0x52866a,_0x191096=ImageManager[_0x5ee955(0x94d)](_0x5ee955(0x74e)),_0x242ae7=ImageManager[_0x5ee955(0x987)],_0x3021ec=ImageManager[_0x5ee955(0x48c)],_0x3ce348=_0x337f04%0x10*_0x242ae7,_0x255cfd=Math[_0x5ee955(0x7b3)](_0x337f04/0x10)*_0x3021ec,_0x75667c=_0xfa5ae,_0x1df7c9=_0xfa5ae;this[_0x5ee955(0x89c)][_0x5ee955(0x298)]['imageSmoothingEnabled']=_0x105261,this[_0x5ee955(0x89c)][_0x5ee955(0x1db)](_0x191096,_0x3ce348,_0x255cfd,_0x242ae7,_0x3021ec,_0xa809c2,_0x556029,_0x75667c,_0x1df7c9),this[_0x5ee955(0x89c)]['_context'][_0x5ee955(0x23c)]=!![];},Window_Base['prototype'][_0x52866a(0x93e)]=function(_0x51c751,_0x5ad29c,_0x5e2412,_0x22c15d,_0x9a70e6,_0x13a5e0){const _0x2612e6=_0x52866a,_0x21e283=Math[_0x2612e6(0x7b3)]((_0x5e2412-0x2)*_0x22c15d),_0x28411b=Sprite_Gauge[_0x2612e6(0x8dc)]['gaugeHeight'][_0x2612e6(0x235)](this),_0xb45a0e=_0x5ad29c+this['lineHeight']()-_0x28411b-0x2;this[_0x2612e6(0x89c)][_0x2612e6(0x2f0)](_0x51c751,_0xb45a0e,_0x5e2412,_0x28411b,ColorManager['gaugeBackColor']()),this['contents']['gradientFillRect'](_0x51c751+0x1,_0xb45a0e+0x1,_0x21e283,_0x28411b-0x2,_0x9a70e6,_0x13a5e0);},Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x619)]=function(_0x43fbdf){const _0x2d5350=_0x52866a;let _0x68519d=this[_0x2d5350(0x806)]();const _0x5b72a1=this[_0x2d5350(0x636)](),_0x480eeb=this['maxCols']();if(this[_0x2d5350(0x20c)]()&&(_0x68519d<_0x5b72a1||_0x43fbdf&&_0x480eeb===0x1)){_0x68519d+=_0x480eeb;if(_0x68519d>=_0x5b72a1)_0x68519d=_0x5b72a1-0x1;this[_0x2d5350(0x497)](_0x68519d);}else!this[_0x2d5350(0x20c)]()&&((_0x68519d<_0x5b72a1-_0x480eeb||_0x43fbdf&&_0x480eeb===0x1)&&(_0x2d5350(0x808)===_0x2d5350(0x808)?this[_0x2d5350(0x497)]((_0x68519d+_0x480eeb)%_0x5b72a1):_0x46abfd['CoreEngine'][_0x2d5350(0x2c0)][_0x2d5350(0x235)](this,_0x378957)));},VisuMZ[_0x52866a(0x8b9)]['Window_Selectable_cursorDown']=Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x619)],Window_Selectable[_0x52866a(0x8dc)]['cursorDown']=function(_0x3f24b4){const _0x4833ed=_0x52866a;this['isUseModernControls']()&&_0x3f24b4&&this['maxCols']()===0x1&&this[_0x4833ed(0x806)]()===this['maxItems']()-0x1?_0x4833ed(0x2b3)!==_0x4833ed(0x2b3)?(_0x548fdf[_0x4833ed(0x89d)](),_0x2a7393[_0x4833ed(0x3c2)](_0x4c9280)):this['smoothSelect'](0x0):VisuMZ[_0x4833ed(0x8b9)][_0x4833ed(0x5b7)]['call'](this,_0x3f24b4);},Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x814)]=function(_0x1db297){const _0x56a488=_0x52866a;let _0x49d00e=Math['max'](0x0,this['index']());const _0x47e6c6=this[_0x56a488(0x636)](),_0x308281=this[_0x56a488(0x7e9)]();if(this['isUseModernControls']()&&_0x49d00e>0x0||_0x1db297&&_0x308281===0x1){if(_0x56a488(0x441)==='UGIyp'){_0x49d00e-=_0x308281;if(_0x49d00e<=0x0)_0x49d00e=0x0;this[_0x56a488(0x497)](_0x49d00e);}else this[_0x56a488(0x445)]()&&this[_0x56a488(0x83f)](),_0x3432b1[_0x56a488(0x8b9)][_0x56a488(0x399)][_0x56a488(0x235)](this);}else{if(!this[_0x56a488(0x20c)]()){if(_0x56a488(0x2af)!==_0x56a488(0x2af))this[_0x56a488(0x497)]((_0x21398b+_0x55f801)%_0x416614);else{if(_0x49d00e>=_0x308281||_0x1db297&&_0x308281===0x1){if('vxFrz'===_0x56a488(0x98a))this[_0x56a488(0x497)]((_0x49d00e-_0x308281+_0x47e6c6)%_0x47e6c6);else{return _0x5eb5e4[_0x56a488(0x8dc)][_0x56a488(0x508)][_0x56a488(0x235)](this)+_0x245940['CoreEngine'][_0x56a488(0x727)][_0x56a488(0x864)][_0x56a488(0x293)];;}}}}}},VisuMZ[_0x52866a(0x8b9)]['Window_Selectable_cursorUp']=Window_Selectable['prototype'][_0x52866a(0x814)],Window_Selectable['prototype']['cursorUp']=function(_0x27e3d8){const _0x2c65ce=_0x52866a;this[_0x2c65ce(0x20c)]()&&_0x27e3d8&&this[_0x2c65ce(0x7e9)]()===0x1&&this['index']()===0x0?this[_0x2c65ce(0x497)](this['maxItems']()-0x1):VisuMZ[_0x2c65ce(0x8b9)]['Window_Selectable_cursorUp'][_0x2c65ce(0x235)](this,_0x27e3d8);},Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x20c)]=function(){const _0x510557=_0x52866a;return VisuMZ[_0x510557(0x8b9)][_0x510557(0x727)][_0x510557(0x98c)]['ModernControls'];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x770)]=Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x1da)],Window_Selectable[_0x52866a(0x8dc)]['processCursorMove']=function(){const _0x2a6a17=_0x52866a;this[_0x2a6a17(0x20c)]()?(this[_0x2a6a17(0x216)](),this[_0x2a6a17(0x63a)]()):VisuMZ[_0x2a6a17(0x8b9)][_0x2a6a17(0x770)][_0x2a6a17(0x235)](this);},Window_Selectable['prototype'][_0x52866a(0x319)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x273e2d=_0x52866a;if(this[_0x273e2d(0x611)]()){if(_0x273e2d(0x8ba)===_0x273e2d(0x8ba)){const _0x94b13d=this['index']();if(Input[_0x273e2d(0x8ff)](_0x273e2d(0x7c7))){if('KuvUm'===_0x273e2d(0x83c))Input[_0x273e2d(0x44e)](_0x273e2d(0x8af))&&this[_0x273e2d(0x319)]()?'MeFnZ'===_0x273e2d(0x699)?this['cursorPagedown']():_0x53b94d+=_0x3c58cd(_0x41a6e5):this[_0x273e2d(0x619)](Input['isTriggered'](_0x273e2d(0x7c7)));else return _0x1e1b3d[_0x273e2d(0x1bc)](_0x4c9c4b,this[_0x273e2d(0x3c4)]);}Input['isRepeated']('up')&&(Input['isPressed'](_0x273e2d(0x8af))&&this['allowShiftScrolling']()?'TbZzd'!==_0x273e2d(0x908)?this[_0x273e2d(0x7df)]():_0x528ac1+=_0x273e2d(0x3cb):this[_0x273e2d(0x814)](Input['isTriggered']('up')));Input['isRepeated'](_0x273e2d(0x991))&&this['cursorRight'](Input['isTriggered'](_0x273e2d(0x991)));Input[_0x273e2d(0x8ff)]('left')&&(_0x273e2d(0x422)!==_0x273e2d(0x62b)?this[_0x273e2d(0x694)](Input['isTriggered']('left')):(_0x298e92[_0x273e2d(0x2f9)]=![],_0x3cd1d2[_0x273e2d(0x82a)]=!![]));!this[_0x273e2d(0x3da)](_0x273e2d(0x6ad))&&Input[_0x273e2d(0x8ff)](_0x273e2d(0x6ad))&&this[_0x273e2d(0x872)]();if(!this[_0x273e2d(0x3da)]('pageup')&&Input[_0x273e2d(0x8ff)](_0x273e2d(0x7ea))){if(_0x273e2d(0x21c)===_0x273e2d(0x583))return _0x563f59['layoutSettings'][_0x273e2d(0x487)][_0x273e2d(0x235)](this);else this['cursorPageup']();}if(this[_0x273e2d(0x806)]()!==_0x94b13d){if('vtEQw'!=='pyfcx')this[_0x273e2d(0x667)]();else{let _0xca9333=0x0;for(const _0x467ed3 of _0x52c9a0[_0x273e2d(0x8b9)][_0x273e2d(0x727)][_0x273e2d(0x3ad)][_0x273e2d(0x252)]){const _0x18657a=this[_0x273e2d(0x650)](),_0x2ba763=this[_0x273e2d(0x4d7)](_0xca9333);this['drawItem'](_0x18657a,_0x2ba763,_0x467ed3),_0xca9333++;}}}}else this[_0x273e2d(0x8e9)]=0x1;}},Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x63a)]=function(){const _0x2f12e9=_0x52866a;if(this['isCursorMovable']()){const _0x23c036=this[_0x2f12e9(0x806)]();Input[_0x2f12e9(0x5d1)](_0x2f12e9(0x444))&&this[_0x2f12e9(0x497)](Math[_0x2f12e9(0x490)](this[_0x2f12e9(0x806)](),0x0)),Input[_0x2f12e9(0x5d1)](_0x2f12e9(0x278))&&('eLSEC'===_0x2f12e9(0x878)?this['smoothSelect'](Math[_0x2f12e9(0x629)](this['index'](),this[_0x2f12e9(0x636)]()-0x1)):(_0x2538ac[_0x2f12e9(0x8b9)][_0x2f12e9(0x32b)][_0x2f12e9(0x235)](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=_0x14e208[_0x2f12e9(0x447)](this['_windowLayer']['x']),this[_0x2f12e9(0x2ba)]['y']=_0x3176f1[_0x2f12e9(0x447)](this['_windowLayer']['y']))),this[_0x2f12e9(0x806)]()!==_0x23c036&&this[_0x2f12e9(0x667)]();}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x6a0)]=Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x749)],Window_Selectable['prototype']['processTouch']=function(){const _0x5d8848=_0x52866a;this[_0x5d8848(0x20c)]()?this[_0x5d8848(0x21f)]():VisuMZ[_0x5d8848(0x8b9)][_0x5d8848(0x6a0)][_0x5d8848(0x235)](this);},Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x21f)]=function(){const _0x49ce94=_0x52866a;VisuMZ[_0x49ce94(0x8b9)][_0x49ce94(0x6a0)][_0x49ce94(0x235)](this);},Window_Selectable['prototype'][_0x52866a(0x82e)]=function(){const _0x21aea8=_0x52866a;return VisuMZ['CoreEngine'][_0x21aea8(0x727)][_0x21aea8(0x864)][_0x21aea8(0x328)];},Window_Selectable['prototype'][_0x52866a(0x904)]=function(){const _0x2f0249=_0x52866a;return VisuMZ[_0x2f0249(0x8b9)][_0x2f0249(0x727)][_0x2f0249(0x864)][_0x2f0249(0x340)];},Window_Selectable['prototype']['itemHeight']=function(){const _0x11cc87=_0x52866a;return Window_Scrollable[_0x11cc87(0x8dc)]['itemHeight']['call'](this)+VisuMZ[_0x11cc87(0x8b9)][_0x11cc87(0x727)]['Window'][_0x11cc87(0x293)];;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x2c0)]=Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x29a)],Window_Selectable[_0x52866a(0x8dc)][_0x52866a(0x29a)]=function(_0x1f5711){const _0x1dacb0=_0x52866a,_0x1f4981=VisuMZ[_0x1dacb0(0x8b9)]['Settings'][_0x1dacb0(0x864)];if(_0x1f4981[_0x1dacb0(0x2d8)]===![])return;if(_0x1f4981[_0x1dacb0(0x47e)]){if(_0x1dacb0(0x218)!==_0x1dacb0(0x218))return _0x29a926['layoutSettings'][_0x1dacb0(0x788)][_0x1dacb0(0x235)](this);else _0x1f4981[_0x1dacb0(0x47e)][_0x1dacb0(0x235)](this,_0x1f5711);}else VisuMZ[_0x1dacb0(0x8b9)][_0x1dacb0(0x2c0)][_0x1dacb0(0x235)](this,_0x1f5711);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x5c9)]=Window_Gold['prototype'][_0x52866a(0x1f5)],Window_Gold[_0x52866a(0x8dc)][_0x52866a(0x1f5)]=function(){const _0x51d801=_0x52866a;if(this[_0x51d801(0x26a)]())this['drawGoldItemStyle']();else{if(_0x51d801(0x3d2)!==_0x51d801(0x3d2)){_0x35d6c8[_0x51d801(0x432)](_0x4ad9ae,_0x59a9b5);const _0x3c8645=_0x239840[_0x51d801(0x490)](_0x43dfff[_0x51d801(0x507)],_0x39525d[_0x51d801(0x202)]),_0x287fd4=_0x5a67ae[_0x51d801(0x629)](_0x2603be['StartID'],_0x4579f2['EndingID']);for(let _0x227fbc=_0x3c8645;_0x227fbc<=_0x287fd4;_0x227fbc++){_0x42398d[_0x51d801(0x27a)](_0x227fbc);}}else VisuMZ[_0x51d801(0x8b9)][_0x51d801(0x5c9)][_0x51d801(0x235)](this);}},Window_Gold[_0x52866a(0x8dc)][_0x52866a(0x26a)]=function(){const _0x206854=_0x52866a;if(TextManager['currencyUnit']!==this[_0x206854(0x3e2)]())return![];return VisuMZ[_0x206854(0x8b9)]['Settings']['Gold']['ItemStyle'];},Window_Gold[_0x52866a(0x8dc)][_0x52866a(0x321)]=function(){const _0x1ad486=_0x52866a;this[_0x1ad486(0x4bf)](),this[_0x1ad486(0x89c)]['clear'](),this[_0x1ad486(0x89c)][_0x1ad486(0x2e7)]=VisuMZ[_0x1ad486(0x8b9)][_0x1ad486(0x727)][_0x1ad486(0x52c)][_0x1ad486(0x8ed)];const _0x3dd992=VisuMZ['CoreEngine'][_0x1ad486(0x727)][_0x1ad486(0x52c)][_0x1ad486(0x4e8)],_0x844eeb=this[_0x1ad486(0x458)](0x0);if(_0x3dd992>0x0){const _0x13cccd=_0x844eeb['y']+(this['lineHeight']()-ImageManager[_0x1ad486(0x48c)])/0x2;this[_0x1ad486(0x87c)](_0x3dd992,_0x844eeb['x'],_0x13cccd);const _0x1eb119=ImageManager[_0x1ad486(0x987)]+0x4;_0x844eeb['x']+=_0x1eb119,_0x844eeb[_0x1ad486(0x2e8)]-=_0x1eb119;}this[_0x1ad486(0x7af)](ColorManager['systemColor']()),this[_0x1ad486(0x48d)](this['currencyUnit'](),_0x844eeb['x'],_0x844eeb['y'],_0x844eeb[_0x1ad486(0x2e8)],'left');const _0x3f1d03=this[_0x1ad486(0x625)](this[_0x1ad486(0x3e2)]())+0x6;;_0x844eeb['x']+=_0x3f1d03,_0x844eeb[_0x1ad486(0x2e8)]-=_0x3f1d03,this[_0x1ad486(0x378)]();const _0x416f3c=this['value'](),_0x2c0f5f=this[_0x1ad486(0x625)](this[_0x1ad486(0x433)]?VisuMZ[_0x1ad486(0x716)](this[_0x1ad486(0x7d2)]()):this[_0x1ad486(0x7d2)]());_0x2c0f5f>_0x844eeb[_0x1ad486(0x2e8)]?this['drawText'](VisuMZ['CoreEngine'][_0x1ad486(0x727)][_0x1ad486(0x52c)][_0x1ad486(0x965)],_0x844eeb['x'],_0x844eeb['y'],_0x844eeb[_0x1ad486(0x2e8)],_0x1ad486(0x991)):this[_0x1ad486(0x48d)](this['value'](),_0x844eeb['x'],_0x844eeb['y'],_0x844eeb[_0x1ad486(0x2e8)],_0x1ad486(0x991)),this[_0x1ad486(0x4bf)]();},Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x7c2)]=function(_0x2f136e,_0x17b983,_0x17dec8,_0x4dd9e2,_0x3417cd){const _0x17f87f=_0x52866a;_0x4dd9e2=String(_0x4dd9e2||'')[_0x17f87f(0x2a9)]();if(VisuMZ[_0x17f87f(0x8b9)][_0x17f87f(0x727)][_0x17f87f(0x3ad)][_0x17f87f(0x56b)]){if('NOTcK'!=='NOTcK')_0xc98753[_0x17f87f(0x8b9)][_0x17f87f(0x727)]['UI'][_0x17f87f(0x7d3)]&&(this[_0x17f87f(0x594)]=_0x4cbe6e);else{const _0x1a351a=VisuMZ[_0x17f87f(0x700)](_0x4dd9e2);_0x3417cd?(this[_0x17f87f(0x54e)](_0x1a351a,_0x2f136e,_0x17b983,this[_0x17f87f(0x7f8)]()),_0x17dec8-=this[_0x17f87f(0x7f8)]()+0x2,_0x2f136e+=this['gaugeLineHeight']()+0x2):(this[_0x17f87f(0x87c)](_0x1a351a,_0x2f136e+0x2,_0x17b983+0x2),_0x17dec8-=ImageManager[_0x17f87f(0x987)]+0x4,_0x2f136e+=ImageManager['iconWidth']+0x4);}}const _0x33e131=TextManager['param'](_0x4dd9e2);this['resetFontSettings'](),this[_0x17f87f(0x7af)](ColorManager[_0x17f87f(0x7b8)]()),_0x3417cd?(this['contents']['fontSize']=this[_0x17f87f(0x666)](),this[_0x17f87f(0x89c)]['drawText'](_0x33e131,_0x2f136e,_0x17b983,_0x17dec8,this[_0x17f87f(0x7f8)](),_0x17f87f(0x327))):this[_0x17f87f(0x48d)](_0x33e131,_0x2f136e,_0x17b983,_0x17dec8),this[_0x17f87f(0x4bf)]();},Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x666)]=function(){const _0x4d1051=_0x52866a;return $gameSystem[_0x4d1051(0x69f)]()-0x8;},Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x77c)]=function(_0x2332df,_0x36302e,_0x4244a7,_0x1da049){const _0x400251=_0x52866a;_0x1da049=_0x1da049||0xa8,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x400251(0x727)]['UI'][_0x400251(0x578)])this[_0x400251(0x828)](_0x2332df[_0x400251(0x931)]()[_0x400251(0x683)],_0x36302e,_0x4244a7,_0x1da049);else{if('PgtpT'==='ZeiXw')this['playCursorSound']();else{const _0x255098=_0x2332df[_0x400251(0x931)]()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x400251(0x48d)](_0x255098,_0x36302e,_0x4244a7,_0x1da049);}}},Window_StatusBase[_0x52866a(0x8dc)]['drawActorNickname']=function(_0x34fb3e,_0x473260,_0x288cf6,_0x21f88f){const _0x3cfd27=_0x52866a;_0x21f88f=_0x21f88f||0x10e,this[_0x3cfd27(0x378)]();if(VisuMZ[_0x3cfd27(0x8b9)][_0x3cfd27(0x727)]['UI']['TextCodeNicknames'])_0x3cfd27(0x534)!=='gWOui'?(_0x7d2d1b['CoreEngine'][_0x3cfd27(0x6c5)]['call'](this),this[_0x3cfd27(0x91c)]=_0x5cf293,this['_inputSpecialKeyCode']=_0x3473c1,this['_gamepadWait']=_0x415584['keyRepeatWait']):this[_0x3cfd27(0x828)](_0x34fb3e[_0x3cfd27(0x7bd)](),_0x473260,_0x288cf6,_0x21f88f);else{if(_0x3cfd27(0x983)==='pRWtx'){const _0x592635='_stored_tpGaugeColor2';this[_0x3cfd27(0x397)]=this[_0x3cfd27(0x397)]||{};if(this[_0x3cfd27(0x397)][_0x592635])return this[_0x3cfd27(0x397)][_0x592635];const _0x30e8b2=_0x9b4a4a[_0x3cfd27(0x8b9)][_0x3cfd27(0x727)][_0x3cfd27(0x4bd)][_0x3cfd27(0x238)];return this[_0x3cfd27(0x86b)](_0x592635,_0x30e8b2);}else{const _0x3bd9bb=_0x34fb3e['nickname']()[_0x3cfd27(0x73d)](/\\I\[(\d+)\]/gi,'');this[_0x3cfd27(0x48d)](_0x34fb3e[_0x3cfd27(0x7bd)](),_0x473260,_0x288cf6,_0x21f88f);}}},VisuMZ[_0x52866a(0x8b9)]['Window_StatusBase_drawActorLevel']=Window_StatusBase['prototype'][_0x52866a(0x98f)],Window_StatusBase['prototype'][_0x52866a(0x98f)]=function(_0x3771f3,_0x1edb90,_0x274eb3){const _0x1af358=_0x52866a;if(this[_0x1af358(0x23f)]())this['drawActorExpGauge'](_0x3771f3,_0x1edb90,_0x274eb3);VisuMZ['CoreEngine'][_0x1af358(0x306)][_0x1af358(0x235)](this,_0x3771f3,_0x1edb90,_0x274eb3);},Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x23f)]=function(){const _0x16f904=_0x52866a;return VisuMZ[_0x16f904(0x8b9)]['Settings']['UI'][_0x16f904(0x536)];},Window_StatusBase[_0x52866a(0x8dc)][_0x52866a(0x914)]=function(_0x37a894,_0x264fa7,_0x51adaf){const _0x2267fe=_0x52866a;if(!_0x37a894)return;if(!_0x37a894[_0x2267fe(0x969)]())return;const _0x3ed05d=0x80,_0x3525ef=_0x37a894[_0x2267fe(0x4c4)]();let _0x48a1f2=ColorManager['expGaugeColor1'](),_0x3605b9=ColorManager[_0x2267fe(0x668)]();_0x3525ef>=0x1&&(_0x48a1f2=ColorManager[_0x2267fe(0x924)](),_0x3605b9=ColorManager[_0x2267fe(0x6d0)]()),this[_0x2267fe(0x93e)](_0x264fa7,_0x51adaf,_0x3ed05d,_0x3525ef,_0x48a1f2,_0x3605b9);},Window_EquipStatus[_0x52866a(0x8dc)][_0x52866a(0x621)]=function(){const _0x32e9d6=_0x52866a;let _0x617fac=0x0;for(const _0x15cda6 of VisuMZ[_0x32e9d6(0x8b9)]['Settings']['Param']['DisplayedParams']){const _0x332e67=this[_0x32e9d6(0x650)](),_0x563d46=this['paramY'](_0x617fac);this[_0x32e9d6(0x3de)](_0x332e67,_0x563d46,_0x15cda6),_0x617fac++;}},Window_EquipStatus[_0x52866a(0x8dc)]['drawParamName']=function(_0x49d756,_0x1649f0,_0x58db20){const _0x5e1b01=_0x52866a,_0x18dd44=this[_0x5e1b01(0x59e)]()-this[_0x5e1b01(0x650)]()*0x2;this['drawParamText'](_0x49d756,_0x1649f0,_0x18dd44,_0x58db20,![]);},Window_EquipStatus[_0x52866a(0x8dc)][_0x52866a(0x867)]=function(_0x45b945,_0x3b4e5c,_0x1fb6f5){const _0x1a2e3e=_0x52866a,_0x412739=this[_0x1a2e3e(0x407)]();this[_0x1a2e3e(0x378)](),this[_0x1a2e3e(0x48d)](this[_0x1a2e3e(0x5f6)][_0x1a2e3e(0x443)](_0x1fb6f5,!![]),_0x45b945,_0x3b4e5c,_0x412739,_0x1a2e3e(0x991));},Window_EquipStatus[_0x52866a(0x8dc)]['drawRightArrow']=function(_0x270f2b,_0x2f2eff){const _0x24ad07=_0x52866a,_0xf437de=this[_0x24ad07(0x88d)]();this['changeTextColor'](ColorManager['systemColor']());const _0x107e27=VisuMZ['CoreEngine']['Settings']['UI'][_0x24ad07(0x3a2)];this[_0x24ad07(0x48d)](_0x107e27,_0x270f2b,_0x2f2eff,_0xf437de,_0x24ad07(0x229));},Window_EquipStatus['prototype'][_0x52866a(0x7d5)]=function(_0x46cf6e,_0x2ee75c,_0x5dcbc9){const _0xd36cfc=_0x52866a,_0x5036ed=this['paramWidth'](),_0x34c44b=this[_0xd36cfc(0x89a)]['paramValueByName'](_0x5dcbc9),_0x4031e4=_0x34c44b-this['_actor'][_0xd36cfc(0x443)](_0x5dcbc9);this[_0xd36cfc(0x7af)](ColorManager['paramchangeTextColor'](_0x4031e4)),this[_0xd36cfc(0x48d)](this[_0xd36cfc(0x89a)][_0xd36cfc(0x443)](_0x5dcbc9,!![]),_0x46cf6e,_0x2ee75c,_0x5036ed,_0xd36cfc(0x991));},VisuMZ[_0x52866a(0x8b9)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x52866a(0x8dc)][_0x52866a(0x8d6)],Window_EquipItem['prototype'][_0x52866a(0x8d6)]=function(_0x18a866){const _0xadb256=_0x52866a;if(_0x18a866&&this['_actor']){if(_0xadb256(0x632)===_0xadb256(0x1e6))this[_0xadb256(0x20c)]()?this[_0xadb256(0x21f)]():_0x342df5[_0xadb256(0x8b9)][_0xadb256(0x6a0)][_0xadb256(0x235)](this);else return this[_0xadb256(0x5f6)][_0xadb256(0x4a9)](_0x18a866);}else return VisuMZ[_0xadb256(0x8b9)][_0xadb256(0x74d)][_0xadb256(0x235)](this,_0x18a866);},Window_StatusParams[_0x52866a(0x8dc)][_0x52866a(0x636)]=function(){const _0x1d33ad=_0x52866a;return VisuMZ[_0x1d33ad(0x8b9)][_0x1d33ad(0x727)][_0x1d33ad(0x3ad)][_0x1d33ad(0x252)][_0x1d33ad(0x708)];},Window_StatusParams[_0x52866a(0x8dc)][_0x52866a(0x3de)]=function(_0x5495ed){const _0xf21011=_0x52866a,_0x1d443a=this[_0xf21011(0x458)](_0x5495ed),_0x298ca2=VisuMZ[_0xf21011(0x8b9)][_0xf21011(0x727)][_0xf21011(0x3ad)][_0xf21011(0x252)][_0x5495ed],_0x41a1ce=TextManager[_0xf21011(0x60d)](_0x298ca2),_0x2f49ab=this['_actor']['paramValueByName'](_0x298ca2,!![]);this[_0xf21011(0x7c2)](_0x1d443a['x'],_0x1d443a['y'],0xa0,_0x298ca2,![]),this[_0xf21011(0x378)](),this['drawText'](_0x2f49ab,_0x1d443a['x']+0xa0,_0x1d443a['y'],0x3c,'right');};if(VisuMZ[_0x52866a(0x8b9)]['Settings']['KeyboardInput'][_0x52866a(0x791)]){VisuMZ[_0x52866a(0x8b9)]['Settings']['KeyboardInput'][_0x52866a(0x7a3)]&&(Window_NameInput[_0x52866a(0x463)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x52866a(0x4a5),'OK']);;VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x1c4)]=Window_NameInput[_0x52866a(0x8dc)]['initialize'],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x7ed)]=function(_0x410bab){const _0xea024f=_0x52866a;this[_0xea024f(0x2c9)]=this[_0xea024f(0x4ab)](),VisuMZ[_0xea024f(0x8b9)]['Window_NameInput_initialize'][_0xea024f(0x235)](this,_0x410bab),this[_0xea024f(0x2c9)]===_0xea024f(0x81b)?this[_0xea024f(0x950)](0x0):(Input[_0xea024f(0x6c1)](),this[_0xea024f(0x299)]());},Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x4ab)]=function(){const _0x473385=_0x52866a;if(Input[_0x473385(0x55d)]())return _0x473385(0x81b);return VisuMZ[_0x473385(0x8b9)][_0x473385(0x727)][_0x473385(0x626)][_0x473385(0x2d7)]||'keyboard';},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x886)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x4ba)],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x4ba)]=function(){const _0x24e502=_0x52866a;if(!this[_0x24e502(0x391)]())return;if(!this[_0x24e502(0x1fd)])return;if(this[_0x24e502(0x2c9)]===_0x24e502(0x464)&&Input[_0x24e502(0x896)]())this['switchModes']('default');else{if(Input[_0x24e502(0x2df)]('backspace'))Input[_0x24e502(0x6c1)](),this[_0x24e502(0x937)]();else{if(Input[_0x24e502(0x5d1)](_0x24e502(0x648)))Input['clear'](),this[_0x24e502(0x2c9)]===_0x24e502(0x464)?this[_0x24e502(0x65c)](_0x24e502(0x81b)):this[_0x24e502(0x65c)](_0x24e502(0x464));else{if(this[_0x24e502(0x2c9)]===_0x24e502(0x464))_0x24e502(0x5a2)===_0x24e502(0x475)?_0x5cbd5b[_0x24e502(0x52f)](!![]):this[_0x24e502(0x846)]();else Input[_0x24e502(0x2df)]('escape')?(Input[_0x24e502(0x6c1)](),this[_0x24e502(0x65c)]('keyboard')):VisuMZ[_0x24e502(0x8b9)]['Window_NameInput_processHandling'][_0x24e502(0x235)](this);}}}},VisuMZ['CoreEngine'][_0x52866a(0x1fb)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x749)],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x749)]=function(){const _0x5a0f00=_0x52866a;if(!this['isOpenAndActive']())return;if(this[_0x5a0f00(0x2c9)]===_0x5a0f00(0x464)){if(TouchInput[_0x5a0f00(0x5d1)]()&&this[_0x5a0f00(0x456)]()){if('KrMAd'===_0x5a0f00(0x97e))return _0x935674[_0x5a0f00(0x8b9)]['Settings'][_0x5a0f00(0x98c)][_0x5a0f00(0x714)];else this['switchModes'](_0x5a0f00(0x81b));}else TouchInput[_0x5a0f00(0x585)]()&&this[_0x5a0f00(0x65c)](_0x5a0f00(0x81b));}else VisuMZ[_0x5a0f00(0x8b9)][_0x5a0f00(0x1fb)][_0x5a0f00(0x235)](this);},Window_NameInput['prototype'][_0x52866a(0x846)]=function(){const _0x45cb7d=_0x52866a;if(Input[_0x45cb7d(0x2df)](_0x45cb7d(0x26f))){if(_0x45cb7d(0x45b)!==_0x45cb7d(0x92f))Input[_0x45cb7d(0x6c1)](),this[_0x45cb7d(0x471)]();else return this[_0x45cb7d(0x73a)]()?this[_0x45cb7d(0x2f3)]():_0x5e2c83['CoreEngine'][_0x45cb7d(0x5a0)]['call'](this);}else{if(Input['_inputString']!==undefined){let _0xc01e93=Input[_0x45cb7d(0x91c)],_0x58ca13=_0xc01e93[_0x45cb7d(0x708)];for(let _0x2cf497=0x0;_0x2cf497<_0x58ca13;++_0x2cf497){this[_0x45cb7d(0x829)]['add'](_0xc01e93[_0x2cf497])?_0x45cb7d(0x8f0)===_0x45cb7d(0x532)?this[_0x45cb7d(0x619)](_0x1b245d['isTriggered'](_0x45cb7d(0x7c7))):SoundManager[_0x45cb7d(0x723)]():SoundManager[_0x45cb7d(0x6ba)]();}Input[_0x45cb7d(0x6c1)]();}}},Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x65c)]=function(_0x1ff230){const _0x128089=_0x52866a;let _0x17d076=this['_mode'];this[_0x128089(0x2c9)]=_0x1ff230,_0x17d076!==this[_0x128089(0x2c9)]&&('MPIws'!==_0x128089(0x372)?(this[_0x128089(0x1f5)](),SoundManager[_0x128089(0x723)](),this['_mode']===_0x128089(0x81b)?this['select'](0x0):this[_0x128089(0x950)](-0x1)):this[_0x128089(0x89c)][_0x128089(0x2e7)]-=0x6);},VisuMZ['CoreEngine'][_0x52866a(0x8df)]=Window_NameInput[_0x52866a(0x8dc)]['cursorDown'],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x619)]=function(_0x36f4e8){const _0x54bd18=_0x52866a;if(this[_0x54bd18(0x2c9)]===_0x54bd18(0x464)&&!Input[_0x54bd18(0x61c)]())return;if(Input[_0x54bd18(0x365)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorDown'][_0x54bd18(0x235)](this,_0x36f4e8),this[_0x54bd18(0x65c)](_0x54bd18(0x81b));},VisuMZ['CoreEngine'][_0x52866a(0x97c)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x814)],Window_NameInput[_0x52866a(0x8dc)]['cursorUp']=function(_0x36aada){const _0x2b94e3=_0x52866a;if(this[_0x2b94e3(0x2c9)]===_0x2b94e3(0x464)&&!Input[_0x2b94e3(0x61c)]())return;if(Input[_0x2b94e3(0x365)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorUp'][_0x2b94e3(0x235)](this,_0x36aada),this[_0x2b94e3(0x65c)]('default');},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x795)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x93a)],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x93a)]=function(_0x469c25){const _0x11d27b=_0x52866a;if(this[_0x11d27b(0x2c9)]===_0x11d27b(0x464)&&!Input[_0x11d27b(0x61c)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x11d27b(0x8b9)][_0x11d27b(0x795)]['call'](this,_0x469c25),this['switchModes'](_0x11d27b(0x81b));},VisuMZ['CoreEngine'][_0x52866a(0x55c)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x694)],Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x694)]=function(_0x32d1f1){const _0x502f8f=_0x52866a;if(this[_0x502f8f(0x2c9)]===_0x502f8f(0x464)&&!Input['isArrowPressed']())return;if(Input[_0x502f8f(0x365)]())return;VisuMZ[_0x502f8f(0x8b9)][_0x502f8f(0x55c)][_0x502f8f(0x235)](this,_0x32d1f1),this[_0x502f8f(0x65c)](_0x502f8f(0x81b));},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x27b)]=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x872)],Window_NameInput['prototype'][_0x52866a(0x872)]=function(){const _0x35a854=_0x52866a;if(this[_0x35a854(0x2c9)]==='keyboard')return;if(Input[_0x35a854(0x365)]())return;VisuMZ[_0x35a854(0x8b9)][_0x35a854(0x27b)][_0x35a854(0x235)](this),this[_0x35a854(0x65c)](_0x35a854(0x81b));},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x557)]=Window_NameInput['prototype'][_0x52866a(0x7df)],Window_NameInput[_0x52866a(0x8dc)]['cursorPageup']=function(){const _0x20ac2e=_0x52866a;if(this['_mode']==='keyboard')return;if(Input[_0x20ac2e(0x365)]())return;VisuMZ[_0x20ac2e(0x8b9)]['Window_NameInput_cursorPageup'][_0x20ac2e(0x235)](this),this[_0x20ac2e(0x65c)]('default');},VisuMZ[_0x52866a(0x8b9)]['Window_NameInput_refresh']=Window_NameInput[_0x52866a(0x8dc)][_0x52866a(0x1f5)],Window_NameInput['prototype'][_0x52866a(0x1f5)]=function(){const _0x5b01ed=_0x52866a;if(this[_0x5b01ed(0x2c9)]===_0x5b01ed(0x464)){this[_0x5b01ed(0x89c)][_0x5b01ed(0x6c1)](),this['contentsBack']['clear'](),this[_0x5b01ed(0x378)]();let _0x5acf58=VisuMZ[_0x5b01ed(0x8b9)][_0x5b01ed(0x727)][_0x5b01ed(0x626)][_0x5b01ed(0x3b1)][_0x5b01ed(0x4cd)]('\x0a'),_0x43aea0=_0x5acf58[_0x5b01ed(0x708)],_0x492f83=(this[_0x5b01ed(0x6a1)]-_0x43aea0*this['lineHeight']())/0x2;for(let _0x1623d1=0x0;_0x1623d1<_0x43aea0;++_0x1623d1){let _0x4cb8f0=_0x5acf58[_0x1623d1],_0x1bb158=this[_0x5b01ed(0x84e)](_0x4cb8f0)['width'],_0x6c4bb4=Math[_0x5b01ed(0x7b3)]((this[_0x5b01ed(0x89c)][_0x5b01ed(0x2e8)]-_0x1bb158)/0x2);this[_0x5b01ed(0x828)](_0x4cb8f0,_0x6c4bb4,_0x492f83),_0x492f83+=this[_0x5b01ed(0x504)]();}}else VisuMZ[_0x5b01ed(0x8b9)][_0x5b01ed(0x796)][_0x5b01ed(0x235)](this);};};VisuMZ['CoreEngine'][_0x52866a(0x4ae)]=Window_ShopSell[_0x52866a(0x8dc)][_0x52866a(0x8d6)],Window_ShopSell['prototype'][_0x52866a(0x8d6)]=function(_0x53acce){const _0x15c78e=_0x52866a;if(VisuMZ[_0x15c78e(0x8b9)][_0x15c78e(0x727)][_0x15c78e(0x98c)][_0x15c78e(0x3f0)]&&DataManager[_0x15c78e(0x5a6)](_0x53acce)){if(_0x15c78e(0x579)!==_0x15c78e(0x2d0))return![];else{const _0x29ef2e=_0x5599f1['Symbol'];let _0x56d3fa=_0x5993ce['TextStr'];if(['',_0x15c78e(0x820)][_0x15c78e(0x234)](_0x56d3fa))_0x56d3fa=_0x5846b5[_0x15c78e(0x4f8)][_0x15c78e(0x235)](this);const _0x59a996=_0x218e52[_0x15c78e(0x5d6)][_0x15c78e(0x235)](this),_0x1fcc5f=_0xf06f4e[_0x15c78e(0x5d9)][_0x15c78e(0x235)](this);this[_0x15c78e(0x1c5)](_0x56d3fa,_0x29ef2e,_0x59a996,_0x1fcc5f),this['setHandler'](_0x29ef2e,_0x353d83['CallHandlerJS']['bind'](this,_0x1fcc5f));}}else return VisuMZ[_0x15c78e(0x8b9)]['Window_ShopSell_isEnabled'][_0x15c78e(0x235)](this,_0x53acce);},Window_NumberInput[_0x52866a(0x8dc)][_0x52866a(0x20c)]=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x52866a(0x626)]['EnableNumberInput']&&(VisuMZ['CoreEngine'][_0x52866a(0x3a8)]=Window_NumberInput[_0x52866a(0x8dc)][_0x52866a(0x4cf)],Window_NumberInput[_0x52866a(0x8dc)][_0x52866a(0x4cf)]=function(){const _0x61c0c1=_0x52866a;VisuMZ[_0x61c0c1(0x8b9)]['Window_NumberInput_start'][_0x61c0c1(0x235)](this),this[_0x61c0c1(0x950)](this[_0x61c0c1(0x2ec)]-0x1),Input[_0x61c0c1(0x6c1)]();},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x64c)]=Window_NumberInput[_0x52866a(0x8dc)][_0x52866a(0x947)],Window_NumberInput['prototype'][_0x52866a(0x947)]=function(){const _0x621273=_0x52866a;if(!this['isOpenAndActive']())return;if(Input[_0x621273(0x365)]())this[_0x621273(0x314)]();else{if(Input['isSpecialCode'](_0x621273(0x207)))this[_0x621273(0x3e3)]();else{if(Input[_0x621273(0x307)]===0x2e)this[_0x621273(0x33d)]();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x621273(0x3f1)]();else Input[_0x621273(0x307)]===0x23?_0x621273(0x879)==='riDLV'?this[_0x621273(0x951)]():this[_0x621273(0x3f9)]():_0x621273(0x71e)!==_0x621273(0x779)?VisuMZ['CoreEngine'][_0x621273(0x64c)][_0x621273(0x235)](this):this['bitmap'][_0x621273(0x389)]();}}}},Window_NumberInput[_0x52866a(0x8dc)]['processCursorMove']=function(){const _0x353d69=_0x52866a;if(!this[_0x353d69(0x611)]())return;Input[_0x353d69(0x365)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x353d69(0x8dc)][_0x353d69(0x1da)][_0x353d69(0x235)](this);},Window_NumberInput[_0x52866a(0x8dc)][_0x52866a(0x63a)]=function(){},Window_NumberInput['prototype'][_0x52866a(0x314)]=function(){const _0x5d9e59=_0x52866a;if(String(this[_0x5d9e59(0x2d2)])[_0x5d9e59(0x708)]>=this[_0x5d9e59(0x2ec)])return;const _0x434532=Number(String(this['_number'])+Input[_0x5d9e59(0x91c)]);if(isNaN(_0x434532))return;this['_number']=_0x434532;const _0x1d8279='9'[_0x5d9e59(0x6ca)](this['_maxDigits']);this[_0x5d9e59(0x2d2)]=this[_0x5d9e59(0x2d2)][_0x5d9e59(0x903)](0x0,_0x1d8279),Input[_0x5d9e59(0x6c1)](),this[_0x5d9e59(0x1f5)](),SoundManager[_0x5d9e59(0x84c)](),this[_0x5d9e59(0x950)](this[_0x5d9e59(0x2ec)]-0x1);},Window_NumberInput['prototype'][_0x52866a(0x3e3)]=function(){const _0x368478=_0x52866a;this[_0x368478(0x2d2)]=Number(String(this[_0x368478(0x2d2)])['slice'](0x0,-0x1)),this[_0x368478(0x2d2)]=Math['max'](0x0,this[_0x368478(0x2d2)]),Input['clear'](),this[_0x368478(0x1f5)](),SoundManager[_0x368478(0x84c)](),this['select'](this[_0x368478(0x2ec)]-0x1);},Window_NumberInput[_0x52866a(0x8dc)]['processKeyboardDelete']=function(){const _0x587844=_0x52866a;this['_number']=Number(String(this[_0x587844(0x2d2)])['substring'](0x1)),this[_0x587844(0x2d2)]=Math[_0x587844(0x629)](0x0,this[_0x587844(0x2d2)]),Input[_0x587844(0x6c1)](),this[_0x587844(0x1f5)](),SoundManager[_0x587844(0x84c)](),this[_0x587844(0x950)](this['_maxDigits']-0x1);});function _0x1098(_0x6d6769,_0x3c0466){const _0x1499ce=_0x1499();return _0x1098=function(_0x109837,_0x5f18aa){_0x109837=_0x109837-0x1bb;let _0x426166=_0x1499ce[_0x109837];return _0x426166;},_0x1098(_0x6d6769,_0x3c0466);};Window_TitleCommand['_commandList']=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x468)],Window_TitleCommand['prototype']['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x52866a(0x8dc)][_0x52866a(0x93b)]=function(){const _0x597081=_0x52866a;for(const _0x43c407 of Window_TitleCommand['_commandList']){if(_0x43c407[_0x597081(0x8f2)][_0x597081(0x235)](this)){const _0x316fbf=_0x43c407[_0x597081(0x214)];let _0x2bba2b=_0x43c407[_0x597081(0x48e)];if(['','Untitled'][_0x597081(0x234)](_0x2bba2b))_0x2bba2b=_0x43c407['TextJS'][_0x597081(0x235)](this);const _0x4dbf80=_0x43c407[_0x597081(0x5d6)][_0x597081(0x235)](this),_0x30f7fe=_0x43c407[_0x597081(0x5d9)][_0x597081(0x235)](this);this['addCommand'](_0x2bba2b,_0x316fbf,_0x4dbf80,_0x30f7fe),this[_0x597081(0x889)](_0x316fbf,_0x43c407[_0x597081(0x3a1)][_0x597081(0x733)](this,_0x30f7fe));}}},Window_GameEnd['_commandList']=VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x727)][_0x52866a(0x5f1)][_0x52866a(0x781)][_0x52866a(0x28a)],Window_GameEnd[_0x52866a(0x8dc)][_0x52866a(0x92c)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x52866a(0x93b)]=function(){const _0x53e04c=_0x52866a;for(const _0x4475fe of Window_GameEnd[_0x53e04c(0x6c9)]){if(_0x4475fe[_0x53e04c(0x8f2)][_0x53e04c(0x235)](this)){const _0xaa382f=_0x4475fe[_0x53e04c(0x214)];let _0x1af072=_0x4475fe[_0x53e04c(0x48e)];if(['',_0x53e04c(0x820)][_0x53e04c(0x234)](_0x1af072))_0x1af072=_0x4475fe[_0x53e04c(0x4f8)][_0x53e04c(0x235)](this);const _0x57611d=_0x4475fe[_0x53e04c(0x5d6)][_0x53e04c(0x235)](this),_0x4f2045=_0x4475fe[_0x53e04c(0x5d9)][_0x53e04c(0x235)](this);this[_0x53e04c(0x1c5)](_0x1af072,_0xaa382f,_0x57611d,_0x4f2045),this[_0x53e04c(0x889)](_0xaa382f,_0x4475fe[_0x53e04c(0x3a1)][_0x53e04c(0x733)](this,_0x4f2045));}}};function Window_ButtonAssist(){const _0x521b44=_0x52866a;this[_0x521b44(0x7ed)](...arguments);}Window_ButtonAssist[_0x52866a(0x8dc)]=Object[_0x52866a(0x473)](Window_Base[_0x52866a(0x8dc)]),Window_ButtonAssist[_0x52866a(0x8dc)][_0x52866a(0x948)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x52866a(0x7ed)]=function(_0x131afc){const _0x2e3952=_0x52866a;this[_0x2e3952(0x764)]={},Window_Base[_0x2e3952(0x8dc)][_0x2e3952(0x7ed)]['call'](this,_0x131afc),this['setBackgroundType'](VisuMZ[_0x2e3952(0x8b9)][_0x2e3952(0x727)][_0x2e3952(0x505)][_0x2e3952(0x5d8)]||0x0),this[_0x2e3952(0x1f5)]();},Window_ButtonAssist[_0x52866a(0x8dc)]['makeFontBigger']=function(){const _0x6ae903=_0x52866a;if(this[_0x6ae903(0x89c)]['fontSize']<=0x60){if(_0x6ae903(0x8c2)!=='yQpsp'){const _0x20a95e=_0x1f2a3d[_0x6ae903(0x38f)];for(let _0x164ac7=0x1;_0x164ac7<=0x5;_0x164ac7++){if(this[_0x6ae903(0x764)][_0x6ae903(0x97b)[_0x6ae903(0x782)](_0x164ac7)]!==_0x20a95e['buttonAssistKey%1'['format'](_0x164ac7)]())return this[_0x6ae903(0x1f5)]();if(this[_0x6ae903(0x764)]['text%1'[_0x6ae903(0x782)](_0x164ac7)]!==_0x20a95e['buttonAssistText%1'[_0x6ae903(0x782)](_0x164ac7)]())return this[_0x6ae903(0x1f5)]();}}else this[_0x6ae903(0x89c)][_0x6ae903(0x2e7)]+=0x6;}},Window_ButtonAssist[_0x52866a(0x8dc)]['makeFontSmaller']=function(){const _0x539589=_0x52866a;this[_0x539589(0x89c)][_0x539589(0x2e7)]>=0x18&&(_0x539589(0x56e)===_0x539589(0x56e)?this[_0x539589(0x89c)][_0x539589(0x2e7)]-=0x6:this[_0x539589(0x39d)]=_0x48fa79);},Window_ButtonAssist[_0x52866a(0x8dc)][_0x52866a(0x8c1)]=function(){const _0x87dd06=_0x52866a;Window_Base[_0x87dd06(0x8dc)][_0x87dd06(0x8c1)][_0x87dd06(0x235)](this),this['updateKeyText']();},Window_ButtonAssist[_0x52866a(0x8dc)][_0x52866a(0x4b3)]=function(){const _0x42c1e0=_0x52866a;this[_0x42c1e0(0x67b)]=SceneManager[_0x42c1e0(0x38f)][_0x42c1e0(0x411)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x52866a(0x8dc)]['updateKeyText']=function(){const _0x174685=_0x52866a,_0x1c4c51=SceneManager[_0x174685(0x38f)];for(let _0x20cb29=0x1;_0x20cb29<=0x5;_0x20cb29++){if(this[_0x174685(0x764)][_0x174685(0x97b)[_0x174685(0x782)](_0x20cb29)]!==_0x1c4c51[_0x174685(0x414)[_0x174685(0x782)](_0x20cb29)]())return this[_0x174685(0x1f5)]();if(this[_0x174685(0x764)][_0x174685(0x84d)[_0x174685(0x782)](_0x20cb29)]!==_0x1c4c51[_0x174685(0x860)['format'](_0x20cb29)]())return this[_0x174685(0x1f5)]();}},Window_ButtonAssist['prototype'][_0x52866a(0x1f5)]=function(){const _0x12b30b=_0x52866a;this[_0x12b30b(0x89c)]['clear']();for(let _0xbf37e0=0x1;_0xbf37e0<=0x5;_0xbf37e0++){this['drawSegment'](_0xbf37e0);}},Window_ButtonAssist['prototype']['drawSegment']=function(_0x5f08e0){const _0x2d76fc=_0x52866a,_0x3536fb=this[_0x2d76fc(0x7b1)]/0x5,_0x47d98f=SceneManager['_scene'],_0x2343a2=_0x47d98f[_0x2d76fc(0x414)[_0x2d76fc(0x782)](_0x5f08e0)](),_0x1564ba=_0x47d98f[_0x2d76fc(0x860)[_0x2d76fc(0x782)](_0x5f08e0)]();this[_0x2d76fc(0x764)][_0x2d76fc(0x97b)['format'](_0x5f08e0)]=_0x2343a2,this[_0x2d76fc(0x764)][_0x2d76fc(0x84d)[_0x2d76fc(0x782)](_0x5f08e0)]=_0x1564ba;if(_0x2343a2==='')return;if(_0x1564ba==='')return;const _0x1b4b69=_0x47d98f[_0x2d76fc(0x4d2)['format'](_0x5f08e0)](),_0x521b57=this[_0x2d76fc(0x650)](),_0x1f5267=_0x3536fb*(_0x5f08e0-0x1)+_0x521b57+_0x1b4b69,_0x428bb5=VisuMZ[_0x2d76fc(0x8b9)][_0x2d76fc(0x727)][_0x2d76fc(0x505)][_0x2d76fc(0x76b)];this[_0x2d76fc(0x828)](_0x428bb5['format'](_0x2343a2,_0x1564ba),_0x1f5267,0x0,_0x3536fb-_0x521b57*0x2);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x698)]=Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x551)],Game_Interpreter[_0x52866a(0x8dc)][_0x52866a(0x551)]=function(){const _0x320108=_0x52866a;if($gameTemp[_0x320108(0x747)]!==undefined)return VisuMZ[_0x320108(0x8b9)][_0x320108(0x798)]();return VisuMZ[_0x320108(0x8b9)][_0x320108(0x698)][_0x320108(0x235)](this);},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x798)]=function(){const _0x279315=_0x52866a,_0x5fbc6c=$gameTemp['_pictureCoordinatesMode']||0x0;if(_0x5fbc6c<0x0||_0x5fbc6c>0x64||TouchInput[_0x279315(0x585)]()||Input[_0x279315(0x5d1)](_0x279315(0x492))){if(_0x279315(0x291)===_0x279315(0x291))$gameTemp[_0x279315(0x747)]=undefined,Input[_0x279315(0x6c1)](),TouchInput['clear']();else return this[_0x279315(0x89c)][_0x279315(0x331)](_0x2b4093);}const _0x16cb36=$gameScreen[_0x279315(0x37c)](_0x5fbc6c);return _0x16cb36&&(_0x16cb36['_x']=TouchInput['_x'],_0x16cb36['_y']=TouchInput['_y']),VisuMZ[_0x279315(0x8b9)][_0x279315(0x62a)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x52866a(0x8b9)]['updatePictureCoordinates']=function(){const _0x3f2099=_0x52866a,_0x2f93ce=SceneManager[_0x3f2099(0x38f)];if(!_0x2f93ce)return;if(!_0x2f93ce[_0x3f2099(0x44a)]){if(_0x3f2099(0x8b6)!=='tQNaK'){const _0x4d6e99=_0xdd1517[_0x3f2099(0x8b9)][_0x3f2099(0x727)][_0x3f2099(0x626)];if(!_0x4d6e99)return![];const _0x22a46c=_0x4d6e99[_0x3f2099(0x236)];if(!_0x22a46c)return![];const _0x5b947f=this[_0x3f2099(0x829)]['name']()['toLowerCase']();for(const _0x913103 of _0x22a46c){if(_0x5b947f['includes'](_0x913103['toLowerCase']()))return!![];}return![];}else SoundManager[_0x3f2099(0x8c4)](),_0x2f93ce[_0x3f2099(0x44a)]=new Window_PictureCoordinates(),_0x2f93ce[_0x3f2099(0x5b0)](_0x2f93ce['_pictureCoordinatesWindow']);}$gameTemp[_0x3f2099(0x747)]===undefined&&(SoundManager[_0x3f2099(0x2bc)](),_0x2f93ce['removeChild'](_0x2f93ce[_0x3f2099(0x44a)]),_0x2f93ce[_0x3f2099(0x44a)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x52866a(0x8dc)]=Object[_0x52866a(0x473)](Window_Base[_0x52866a(0x8dc)]),Window_PictureCoordinates['prototype']['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x52866a(0x8dc)]['initialize']=function(){const _0x3c5884=_0x52866a;this[_0x3c5884(0x5af)]=_0x3c5884(0x376),this[_0x3c5884(0x845)]='nah',this['_lastY']=_0x3c5884(0x376);const _0x32b330=this[_0x3c5884(0x623)]();Window_Base[_0x3c5884(0x8dc)][_0x3c5884(0x7ed)]['call'](this,_0x32b330),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x52866a(0x8dc)][_0x52866a(0x623)]=function(){const _0x4c071a=_0x52866a;let _0x310aa5=0x0,_0x293347=Graphics[_0x4c071a(0x8a0)]-this[_0x4c071a(0x504)](),_0x9e0be5=Graphics[_0x4c071a(0x2e8)],_0xb72b03=this[_0x4c071a(0x504)]();return new Rectangle(_0x310aa5,_0x293347,_0x9e0be5,_0xb72b03);},Window_PictureCoordinates[_0x52866a(0x8dc)][_0x52866a(0x4b3)]=function(){const _0x3be1be=_0x52866a;this[_0x3be1be(0x67b)]=0x0;},Window_PictureCoordinates[_0x52866a(0x8dc)]['update']=function(){const _0x506c68=_0x52866a;Window_Base[_0x506c68(0x8dc)][_0x506c68(0x8c1)][_0x506c68(0x235)](this),this[_0x506c68(0x312)]();},Window_PictureCoordinates[_0x52866a(0x8dc)]['updateData']=function(){const _0x4cf393=_0x52866a;if(!this['needsUpdate']())return;this[_0x4cf393(0x1f5)]();},Window_PictureCoordinates['prototype'][_0x52866a(0x466)]=function(){const _0x3bd0b2=_0x52866a,_0x27e8d5=$gameTemp[_0x3bd0b2(0x747)],_0x75d9d=$gameScreen[_0x3bd0b2(0x37c)](_0x27e8d5);return _0x75d9d?this[_0x3bd0b2(0x5af)]!==_0x75d9d[_0x3bd0b2(0x5f4)]||this[_0x3bd0b2(0x845)]!==_0x75d9d['_x']||this['_lastY']!==_0x75d9d['_y']:![];},Window_PictureCoordinates['prototype'][_0x52866a(0x1f5)]=function(){const _0x1a0f48=_0x52866a;this[_0x1a0f48(0x89c)][_0x1a0f48(0x6c1)]();const _0x27cb10=$gameTemp[_0x1a0f48(0x747)],_0x3e31e1=$gameScreen[_0x1a0f48(0x37c)](_0x27cb10);if(!_0x3e31e1)return;this[_0x1a0f48(0x5af)]=_0x3e31e1[_0x1a0f48(0x5f4)],this[_0x1a0f48(0x845)]=_0x3e31e1['_x'],this[_0x1a0f48(0x5f5)]=_0x3e31e1['_y'];const _0x2cb880=ColorManager[_0x1a0f48(0x1ed)]();this[_0x1a0f48(0x89c)][_0x1a0f48(0x2f0)](0x0,0x0,this[_0x1a0f48(0x7b1)],this['innerHeight'],_0x2cb880);const _0x226054='\x20Origin:\x20%1'['format'](_0x3e31e1[_0x1a0f48(0x5f4)]===0x0?_0x1a0f48(0x96c):_0x1a0f48(0x58a)),_0x1661c6=_0x1a0f48(0x5cf)[_0x1a0f48(0x782)](_0x3e31e1['_x']),_0x36cd38=_0x1a0f48(0x920)[_0x1a0f48(0x782)](_0x3e31e1['_y']),_0x3cde9d=_0x1a0f48(0x2d6)[_0x1a0f48(0x782)](TextManager[_0x1a0f48(0x58e)](_0x1a0f48(0x492)));let _0x573693=Math['floor'](this[_0x1a0f48(0x7b1)]/0x4);this['drawText'](_0x226054,_0x573693*0x0,0x0,_0x573693),this[_0x1a0f48(0x48d)](_0x1661c6,_0x573693*0x1,0x0,_0x573693,'center'),this[_0x1a0f48(0x48d)](_0x36cd38,_0x573693*0x2,0x0,_0x573693,_0x1a0f48(0x229));const _0x87c06f=this[_0x1a0f48(0x84e)](_0x3cde9d)[_0x1a0f48(0x2e8)],_0x1ba2e5=this[_0x1a0f48(0x7b1)]-_0x87c06f;this['drawTextEx'](_0x3cde9d,_0x1ba2e5,0x0,_0x87c06f);},VisuMZ[_0x52866a(0x52f)]=function(_0x5383ff){const _0x3202aa=_0x52866a;if(Utils[_0x3202aa(0x615)](_0x3202aa(0x5c5))){if(_0x3202aa(0x905)!==_0x3202aa(0x905))_0xeddce6=_0xac3deb[_0x3202aa(0x924)](),_0x475a01=_0x19a786[_0x3202aa(0x6d0)]();else{var _0x45d275=require('nw.gui')[_0x3202aa(0x864)][_0x3202aa(0x8bd)]();SceneManager[_0x3202aa(0x440)]();if(_0x5383ff)setTimeout(_0x45d275['focus'][_0x3202aa(0x733)](_0x45d275),0x190);}}},VisuMZ[_0x52866a(0x1bc)]=function(_0x593caf,_0x2eba3a){const _0x1da229=_0x52866a;_0x2eba3a=_0x2eba3a[_0x1da229(0x2a9)]();var _0x2db4d7=1.70158,_0x50ab02=0.7;switch(_0x2eba3a){case _0x1da229(0x736):return _0x593caf;case _0x1da229(0x660):return-0x1*Math[_0x1da229(0x98e)](_0x593caf*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x1da229(0x720)](_0x593caf*(Math['PI']/0x2));case _0x1da229(0x66c):return-0.5*(Math[_0x1da229(0x98e)](Math['PI']*_0x593caf)-0x1);case'INQUAD':return _0x593caf*_0x593caf;case'OUTQUAD':return _0x593caf*(0x2-_0x593caf);case _0x1da229(0x91b):return _0x593caf<0.5?0x2*_0x593caf*_0x593caf:-0x1+(0x4-0x2*_0x593caf)*_0x593caf;case'INCUBIC':return _0x593caf*_0x593caf*_0x593caf;case _0x1da229(0x721):var _0x20fd21=_0x593caf-0x1;return _0x20fd21*_0x20fd21*_0x20fd21+0x1;case _0x1da229(0x8ad):return _0x593caf<0.5?0x4*_0x593caf*_0x593caf*_0x593caf:(_0x593caf-0x1)*(0x2*_0x593caf-0x2)*(0x2*_0x593caf-0x2)+0x1;case'INQUART':return _0x593caf*_0x593caf*_0x593caf*_0x593caf;case _0x1da229(0x60e):var _0x20fd21=_0x593caf-0x1;return 0x1-_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21;case _0x1da229(0x545):var _0x20fd21=_0x593caf-0x1;return _0x593caf<0.5?0x8*_0x593caf*_0x593caf*_0x593caf*_0x593caf:0x1-0x8*_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21;case _0x1da229(0x988):return _0x593caf*_0x593caf*_0x593caf*_0x593caf*_0x593caf;case _0x1da229(0x3cd):var _0x20fd21=_0x593caf-0x1;return 0x1+_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21;case _0x1da229(0x620):var _0x20fd21=_0x593caf-0x1;return _0x593caf<0.5?0x10*_0x593caf*_0x593caf*_0x593caf*_0x593caf*_0x593caf:0x1+0x10*_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21*_0x20fd21;case _0x1da229(0x8be):if(_0x593caf===0x0){if(_0x1da229(0x90c)!==_0x1da229(0x90c)){var _0x1ac0f4=_0x31bfa2-1.5/2.75;return 7.5625*_0x1ac0f4*_0x1ac0f4+0.75;}else return 0x0;}return Math[_0x1da229(0x824)](0x2,0xa*(_0x593caf-0x1));case'OUTEXPO':if(_0x593caf===0x1)return 0x1;return-Math[_0x1da229(0x824)](0x2,-0xa*_0x593caf)+0x1;case _0x1da229(0x4e4):if(_0x593caf===0x0||_0x593caf===0x1){if(_0x1da229(0x2ca)===_0x1da229(0x89e))_0x221c40[_0x1da229(0x601)]()&&_0x5940eb[_0x1da229(0x8b9)][_0x1da229(0x727)][_0x1da229(0x98c)][_0x1da229(0x342)]&&(_0x5516ac[_0x1da229(0x61f)]=!_0x570988[_0x1da229(0x61f)]);else return _0x593caf;}var _0x5b5a55=_0x593caf*0x2,_0x3c2eca=_0x5b5a55-0x1;if(_0x5b5a55<0x1){if(_0x1da229(0x940)===_0x1da229(0x309))_0x21db7f=_0x1bd204,this[_0x1da229(0x23d)](_0x1b0e81,_0x6862aa);else return 0.5*Math[_0x1da229(0x824)](0x2,0xa*_0x3c2eca);}return 0.5*(-Math[_0x1da229(0x824)](0x2,-0xa*_0x3c2eca)+0x2);case _0x1da229(0x92d):var _0x5b5a55=_0x593caf/0x1;return-0x1*(Math[_0x1da229(0x818)](0x1-_0x5b5a55*_0x593caf)-0x1);case _0x1da229(0x43c):var _0x20fd21=_0x593caf-0x1;return Math[_0x1da229(0x818)](0x1-_0x20fd21*_0x20fd21);case _0x1da229(0x624):var _0x5b5a55=_0x593caf*0x2,_0x3c2eca=_0x5b5a55-0x2;if(_0x5b5a55<0x1){if(_0x1da229(0x64e)!==_0x1da229(0x64e)){const _0x5d20cc=this[_0x1da229(0x5c6)](_0x1f9fd1),_0xfe8a52=this[_0x1da229(0x30e)](_0xee081d),_0x21bfcb=this[_0x1da229(0x761)](_0x37adc1);return _0x5d20cc*(_0xfe8a52-_0x21bfcb);}else return-0.5*(Math[_0x1da229(0x818)](0x1-_0x5b5a55*_0x5b5a55)-0x1);}return 0.5*(Math['sqrt'](0x1-_0x3c2eca*_0x3c2eca)+0x1);case'INBACK':return _0x593caf*_0x593caf*((_0x2db4d7+0x1)*_0x593caf-_0x2db4d7);case _0x1da229(0x94c):var _0x5b5a55=_0x593caf/0x1-0x1;return _0x5b5a55*_0x5b5a55*((_0x2db4d7+0x1)*_0x5b5a55+_0x2db4d7)+0x1;break;case _0x1da229(0x82f):var _0x5b5a55=_0x593caf*0x2,_0x2fb8be=_0x5b5a55-0x2,_0x48532f=_0x2db4d7*1.525;if(_0x5b5a55<0x1){if(_0x1da229(0x587)!==_0x1da229(0x587))_0x334d92[_0x1da229(0x8b9)]['Scene_Menu_create']['call'](this),this[_0x1da229(0x6ce)]();else return 0.5*_0x5b5a55*_0x5b5a55*((_0x48532f+0x1)*_0x5b5a55-_0x48532f);}return 0.5*(_0x2fb8be*_0x2fb8be*((_0x48532f+0x1)*_0x2fb8be+_0x48532f)+0x2);case _0x1da229(0x325):if(_0x593caf===0x0||_0x593caf===0x1)return'vTWFT'!==_0x1da229(0x5cc)?_0x10c679[_0x1da229(0x3c0)][_0x1da229(0x481)][_0x1da229(0x235)](this):_0x593caf;var _0x5b5a55=_0x593caf/0x1,_0x3c2eca=_0x5b5a55-0x1,_0x5db7a1=0x1-_0x50ab02,_0x48532f=_0x5db7a1/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x1da229(0x824)](0x2,0xa*_0x3c2eca)*Math[_0x1da229(0x720)]((_0x3c2eca-_0x48532f)*(0x2*Math['PI'])/_0x5db7a1));case _0x1da229(0x3cf):var _0x5db7a1=0x1-_0x50ab02,_0x5b5a55=_0x593caf*0x2;if(_0x593caf===0x0||_0x593caf===0x1)return _0x593caf;var _0x48532f=_0x5db7a1/(0x2*Math['PI'])*Math[_0x1da229(0x478)](0x1);return Math[_0x1da229(0x824)](0x2,-0xa*_0x5b5a55)*Math['sin']((_0x5b5a55-_0x48532f)*(0x2*Math['PI'])/_0x5db7a1)+0x1;case _0x1da229(0x836):var _0x5db7a1=0x1-_0x50ab02;if(_0x593caf===0x0||_0x593caf===0x1)return _0x593caf;var _0x5b5a55=_0x593caf*0x2,_0x3c2eca=_0x5b5a55-0x1,_0x48532f=_0x5db7a1/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x5b5a55<0x1)return-0.5*(Math[_0x1da229(0x824)](0x2,0xa*_0x3c2eca)*Math[_0x1da229(0x720)]((_0x3c2eca-_0x48532f)*(0x2*Math['PI'])/_0x5db7a1));return Math[_0x1da229(0x824)](0x2,-0xa*_0x3c2eca)*Math[_0x1da229(0x720)]((_0x3c2eca-_0x48532f)*(0x2*Math['PI'])/_0x5db7a1)*0.5+0x1;case'OUTBOUNCE':var _0x5b5a55=_0x593caf/0x1;if(_0x5b5a55<0x1/2.75)return 7.5625*_0x5b5a55*_0x5b5a55;else{if(_0x5b5a55<0x2/2.75){if(_0x1da229(0x401)===_0x1da229(0x401)){var _0x2fb8be=_0x5b5a55-1.5/2.75;return 7.5625*_0x2fb8be*_0x2fb8be+0.75;}else for(_0xda4a87 of _0x2e8e4e['members']()){_0x44d5b6[_0x1da229(0x231)]();}}else{if(_0x5b5a55<2.5/2.75){var _0x2fb8be=_0x5b5a55-2.25/2.75;return 7.5625*_0x2fb8be*_0x2fb8be+0.9375;}else{var _0x2fb8be=_0x5b5a55-2.625/2.75;return 7.5625*_0x2fb8be*_0x2fb8be+0.984375;}}}case _0x1da229(0x332):var _0x46a9f5=0x1-VisuMZ[_0x1da229(0x1bc)](0x1-_0x593caf,_0x1da229(0x704));return _0x46a9f5;case'INOUTBOUNCE':if(_0x593caf<0.5)var _0x46a9f5=VisuMZ[_0x1da229(0x1bc)](_0x593caf*0x2,_0x1da229(0x4b8))*0.5;else var _0x46a9f5=VisuMZ['ApplyEasing'](_0x593caf*0x2-0x1,'outbounce')*0.5+0.5;return _0x46a9f5;default:return _0x593caf;}},VisuMZ[_0x52866a(0x700)]=function(_0x3dd8e6){const _0x200303=_0x52866a;_0x3dd8e6=String(_0x3dd8e6)[_0x200303(0x2a9)]();const _0x186714=VisuMZ[_0x200303(0x8b9)][_0x200303(0x727)][_0x200303(0x3ad)];if(_0x3dd8e6===_0x200303(0x839))return _0x186714[_0x200303(0x228)];if(_0x3dd8e6==='MAXMP')return _0x186714[_0x200303(0x30a)];if(_0x3dd8e6===_0x200303(0x738))return _0x186714[_0x200303(0x7d6)];if(_0x3dd8e6===_0x200303(0x442))return _0x186714[_0x200303(0x5e9)];if(_0x3dd8e6===_0x200303(0x462))return _0x186714[_0x200303(0x963)];if(_0x3dd8e6===_0x200303(0x53e))return _0x186714['IconParam5'];if(_0x3dd8e6===_0x200303(0x786))return _0x186714[_0x200303(0x4e2)];if(_0x3dd8e6===_0x200303(0x79f))return _0x186714[_0x200303(0x39e)];if(_0x3dd8e6===_0x200303(0x358))return _0x186714[_0x200303(0x28d)];if(_0x3dd8e6===_0x200303(0x521))return _0x186714['IconXParam1'];if(_0x3dd8e6===_0x200303(0x4a8))return _0x186714['IconXParam2'];if(_0x3dd8e6==='CEV')return _0x186714[_0x200303(0x558)];if(_0x3dd8e6==='MEV')return _0x186714[_0x200303(0x7ad)];if(_0x3dd8e6===_0x200303(0x960))return _0x186714[_0x200303(0x572)];if(_0x3dd8e6==='CNT')return _0x186714[_0x200303(0x60f)];if(_0x3dd8e6===_0x200303(0x780))return _0x186714[_0x200303(0x5ea)];if(_0x3dd8e6===_0x200303(0x990))return _0x186714['IconXParam8'];if(_0x3dd8e6==='TRG')return _0x186714[_0x200303(0x5fa)];if(_0x3dd8e6===_0x200303(0x663))return _0x186714[_0x200303(0x919)];if(_0x3dd8e6===_0x200303(0x86a))return _0x186714['IconSParam1'];if(_0x3dd8e6==='REC')return _0x186714[_0x200303(0x3f2)];if(_0x3dd8e6===_0x200303(0x286))return _0x186714[_0x200303(0x1fc)];if(_0x3dd8e6===_0x200303(0x4f3))return _0x186714[_0x200303(0x719)];if(_0x3dd8e6===_0x200303(0x913))return _0x186714['IconSParam5'];if(_0x3dd8e6===_0x200303(0x705))return _0x186714[_0x200303(0x6e6)];if(_0x3dd8e6===_0x200303(0x67a))return _0x186714[_0x200303(0x586)];if(_0x3dd8e6===_0x200303(0x496))return _0x186714['IconSParam8'];if(_0x3dd8e6===_0x200303(0x480))return _0x186714[_0x200303(0x1d9)];if(VisuMZ['CoreEngine'][_0x200303(0x4be)][_0x3dd8e6])return VisuMZ[_0x200303(0x8b9)]['CustomParamIcons'][_0x3dd8e6]||0x0;return 0x0;},VisuMZ[_0x52866a(0x844)]=function(_0x575944,_0x32668c,_0x1e6665){const _0x41c3cc=_0x52866a;if(_0x1e6665===undefined&&_0x575944%0x1===0x0)return _0x575944;if(_0x1e6665!==undefined&&[_0x41c3cc(0x839),_0x41c3cc(0x566),'ATK',_0x41c3cc(0x442),'MAT','MDF','AGI',_0x41c3cc(0x79f)][_0x41c3cc(0x234)](String(_0x1e6665)[_0x41c3cc(0x2a9)]()[_0x41c3cc(0x8cb)]()))return _0x575944;_0x32668c=_0x32668c||0x0;if(VisuMZ[_0x41c3cc(0x8b9)][_0x41c3cc(0x6aa)][_0x1e6665]){if('gphuw'===_0x41c3cc(0x2b7))this[_0x41c3cc(0x7df)]();else{if(VisuMZ['CoreEngine'][_0x41c3cc(0x703)][_0x1e6665]===_0x41c3cc(0x94f)){if(_0x41c3cc(0x982)==='uibRZ'){if(_0x50d1b9['inBattle']())return;_0x426f0b[_0x41c3cc(0x432)](_0x365a59,_0x45f445);const _0x53d516=_0x1f2635[_0x41c3cc(0x490)](_0x5bc15d['StartID'],_0xe1f08a[_0x41c3cc(0x202)]),_0x5ca129=_0x1e32fd[_0x41c3cc(0x629)](_0x26a180[_0x41c3cc(0x507)],_0x464662[_0x41c3cc(0x202)]),_0x575b5d=(_0x2efb1b[_0x41c3cc(0x264)]||0x0)/0x64;for(let _0x29bb3b=_0x53d516;_0x29bb3b<=_0x5ca129;_0x29bb3b++){const _0x47f0d9=_0x3e9893[_0x41c3cc(0x677)]()<=_0x575b5d;_0x454b1c[_0x41c3cc(0x43b)](_0x29bb3b,_0x47f0d9);}}else return _0x575944;}else return String((_0x575944*0x64)[_0x41c3cc(0x859)](_0x32668c))+'%';}}return String((_0x575944*0x64)[_0x41c3cc(0x859)](_0x32668c))+'%';},VisuMZ[_0x52866a(0x716)]=function(_0x2464d5){const _0x445b13=_0x52866a;_0x2464d5=String(_0x2464d5);if(!_0x2464d5)return _0x2464d5;if(typeof _0x2464d5!==_0x445b13(0x57a))return _0x2464d5;const _0x37ecd7=VisuMZ[_0x445b13(0x8b9)]['Settings'][_0x445b13(0x98c)][_0x445b13(0x6c3)]||_0x445b13(0x326),_0x16fdc2={'maximumFractionDigits':0x6};_0x2464d5=_0x2464d5[_0x445b13(0x73d)](/\[(.*?)\]/g,(_0x496dab,_0x8f6e54)=>{const _0x5607da=_0x445b13;return _0x5607da(0x75a)===_0x5607da(0x75a)?VisuMZ['PreserveNumbers'](_0x8f6e54,'[',']'):_0x21562f['CoreEngine'][_0x5607da(0x727)][_0x5607da(0x505)][_0x5607da(0x622)];}),_0x2464d5=_0x2464d5['replace'](/<(.*?)>/g,(_0x5180bf,_0x5660d5)=>{const _0x3692e8=_0x445b13;return VisuMZ[_0x3692e8(0x68a)](_0x5660d5,'<','>');}),_0x2464d5=_0x2464d5[_0x445b13(0x73d)](/\{\{(.*?)\}\}/g,(_0x19b1d8,_0x3b783c)=>{const _0x3c0006=_0x445b13;return VisuMZ[_0x3c0006(0x68a)](_0x3b783c,'','');}),_0x2464d5=_0x2464d5[_0x445b13(0x73d)](/(\d+\.?\d*)/g,(_0x24f169,_0x168e61)=>{const _0x22d69e=_0x445b13;let _0x3c9bee=_0x168e61;if(_0x3c9bee[0x0]==='0')return _0x3c9bee;if(_0x3c9bee[_0x3c9bee[_0x22d69e(0x708)]-0x1]==='.')return Number(_0x3c9bee)['toLocaleString'](_0x37ecd7,_0x16fdc2)+'.';else{if(_0x3c9bee[_0x3c9bee['length']-0x1]===','){if(_0x22d69e(0x63b)!==_0x22d69e(0x63b))this[_0x22d69e(0x6ab)]['setBackgroundType'](_0x28ca08[_0x22d69e(0x3c0)][_0x22d69e(0x3ae)]);else return Number(_0x3c9bee)['toLocaleString'](_0x37ecd7,_0x16fdc2)+',';}else return Number(_0x3c9bee)[_0x22d69e(0x8cd)](_0x37ecd7,_0x16fdc2);}});let _0x253e9b=0x3;while(_0x253e9b--){_0x445b13(0x53d)===_0x445b13(0x334)?!_0x1e3f3c[_0x445b13(0x403)]&&_0x269270[_0x445b13(0x8ab)]&&_0x1376a4['render'](_0x39cdd3):_0x2464d5=VisuMZ[_0x445b13(0x5f8)](_0x2464d5);}return _0x2464d5;},VisuMZ['PreserveNumbers']=function(_0x2f0e0e,_0x415e5f,_0x140919){const _0x500ba1=_0x52866a;return _0x2f0e0e=_0x2f0e0e[_0x500ba1(0x73d)](/(\d)/gi,(_0x9c645c,_0x428bab)=>'PRESERVCONVERSION(%1)'[_0x500ba1(0x782)](Number(_0x428bab))),_0x500ba1(0x5f3)[_0x500ba1(0x782)](_0x2f0e0e,_0x415e5f,_0x140919);},VisuMZ[_0x52866a(0x5f8)]=function(_0x181b88){return _0x181b88=_0x181b88['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3d839c,_0x1db9b5)=>Number(parseInt(_0x1db9b5))),_0x181b88;},VisuMZ[_0x52866a(0x35d)]=function(_0x3e7070){const _0x3257da=_0x52866a;SoundManager[_0x3257da(0x723)]();if(!Utils['isNwjs']()){const _0x112afa=window[_0x3257da(0x7e7)](_0x3e7070,'_blank');}else{const _0x5eede4=process[_0x3257da(0x2c2)]==_0x3257da(0x35c)?_0x3257da(0x7e7):process[_0x3257da(0x2c2)]==_0x3257da(0x95f)?_0x3257da(0x4cf):_0x3257da(0x92e);require(_0x3257da(0x61b))[_0x3257da(0x46f)](_0x5eede4+'\x20'+_0x3e7070);}},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x2eb)]=function(){const _0x475865=_0x52866a;return this[_0x475865(0x4ef)];},VisuMZ[_0x52866a(0x8b9)]['Game_Picture_initBasic']=Game_Picture['prototype'][_0x52866a(0x5e4)],Game_Picture[_0x52866a(0x8dc)]['initBasic']=function(){const _0x178dbd=_0x52866a;VisuMZ[_0x178dbd(0x8b9)]['Game_Picture_initBasic']['call'](this),this[_0x178dbd(0x4ef)]={'x':0x0,'y':0x0},this[_0x178dbd(0x68c)]={'x':0x0,'y':0x0};},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x866)]=Game_Picture[_0x52866a(0x8dc)]['updateMove'],Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x4ff)]=function(){const _0x392de4=_0x52866a;this[_0x392de4(0x6ec)]();const _0x35f47a=this[_0x392de4(0x3f5)];VisuMZ[_0x392de4(0x8b9)]['Game_Picture_updateMove'][_0x392de4(0x235)](this),_0x35f47a>0x0&&this[_0x392de4(0x3f5)]<=0x0&&(_0x392de4(0x385)==='nfhnC'?this[_0x392de4(0x1f2)](_0x5772a7):(this['_x']=this[_0x392de4(0x689)],this['_y']=this[_0x392de4(0x6b7)],this['_scaleX']=this[_0x392de4(0x64b)],this[_0x392de4(0x6d1)]=this['_targetScaleY'],this[_0x392de4(0x33e)]=this[_0x392de4(0x5bb)],this[_0x392de4(0x4ef)]&&(this[_0x392de4(0x4ef)]['x']=this[_0x392de4(0x68c)]['x'],this[_0x392de4(0x4ef)]['y']=this['_targetAnchor']['y'])));},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x1f8)]=Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x267)],Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x267)]=function(_0x3bb1e0,_0x130fab,_0x5ca2c4,_0x2c2c9a,_0x3efeab,_0x44e5e2,_0x45b2dd,_0x1a4f63){const _0x5664d0=_0x52866a;VisuMZ['CoreEngine'][_0x5664d0(0x1f8)][_0x5664d0(0x235)](this,_0x3bb1e0,_0x130fab,_0x5ca2c4,_0x2c2c9a,_0x3efeab,_0x44e5e2,_0x45b2dd,_0x1a4f63),this[_0x5664d0(0x783)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x130fab]||{'x':0x0,'y':0x0});},VisuMZ[_0x52866a(0x8b9)]['Game_Picture_move']=Game_Picture['prototype']['move'],Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x20a)]=function(_0x445520,_0x4a4f7c,_0x119902,_0x29fdbf,_0x351dad,_0x4cb021,_0x220413,_0x4d329e,_0x3e577c){const _0x1f5428=_0x52866a;VisuMZ['CoreEngine'][_0x1f5428(0x819)][_0x1f5428(0x235)](this,_0x445520,_0x4a4f7c,_0x119902,_0x29fdbf,_0x351dad,_0x4cb021,_0x220413,_0x4d329e,_0x3e577c),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x445520]||{'x':0x0,'y':0x0});},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x6ec)]=function(){const _0x2f6241=_0x52866a;this[_0x2f6241(0x3f5)]>0x0&&(this[_0x2f6241(0x4ef)]['x']=this[_0x2f6241(0x5b9)](this['_anchor']['x'],this[_0x2f6241(0x68c)]['x']),this['_anchor']['y']=this[_0x2f6241(0x5b9)](this[_0x2f6241(0x4ef)]['y'],this[_0x2f6241(0x68c)]['y']));},Game_Picture[_0x52866a(0x8dc)]['setAnchor']=function(_0x3fb26b){const _0x139f98=_0x52866a;this[_0x139f98(0x4ef)]=_0x3fb26b,this['_targetAnchor']=JsonEx[_0x139f98(0x514)](this[_0x139f98(0x4ef)]);},Game_Picture[_0x52866a(0x8dc)][_0x52866a(0x25d)]=function(_0xb178a1){const _0x2f1b8d=_0x52866a;this[_0x2f1b8d(0x68c)]=_0xb178a1;},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x884)]=Sprite_Picture[_0x52866a(0x8dc)]['updateOrigin'],Sprite_Picture[_0x52866a(0x8dc)]['updateOrigin']=function(){const _0x414529=_0x52866a,_0x6ce2ee=this[_0x414529(0x37c)]();!_0x6ce2ee[_0x414529(0x2eb)]()?VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin'][_0x414529(0x235)](this):(this[_0x414529(0x2eb)]['x']=_0x6ce2ee[_0x414529(0x2eb)]()['x'],this[_0x414529(0x2eb)]['y']=_0x6ce2ee[_0x414529(0x2eb)]()['y']);},Game_Action[_0x52866a(0x8dc)]['setEnemyAction']=function(_0x4bd65d){const _0x3c4942=_0x52866a;if(_0x4bd65d){const _0x514471=_0x4bd65d[_0x3c4942(0x674)];if(_0x514471===0x1&&this[_0x3c4942(0x843)]()[_0x3c4942(0x1c8)]()!==0x1){if('tJYjL'!==_0x3c4942(0x32d))return this[_0x3c4942(0x791)]()?_0x2a6877[_0x3c4942(0x58e)](_0x3c4942(0x648)):_0x45493f[_0x3c4942(0x8dc)]['buttonAssistKey1']['call'](this);else this[_0x3c4942(0x891)]();}else _0x514471===0x2&&this[_0x3c4942(0x843)]()[_0x3c4942(0x76f)]()!==0x2?this[_0x3c4942(0x955)]():this[_0x3c4942(0x8d9)](_0x514471);}else this[_0x3c4942(0x6c1)]();},Game_Actor[_0x52866a(0x8dc)]['usableSkills']=function(){const _0x4fa9a2=_0x52866a;return this[_0x4fa9a2(0x5cd)]()[_0x4fa9a2(0x54c)](_0x183ba1=>this[_0x4fa9a2(0x6a3)](_0x183ba1)&&this[_0x4fa9a2(0x945)]()['includes'](_0x183ba1[_0x4fa9a2(0x415)]));},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x7f5)]=function(){const _0x3fb787=_0x52866a;this[_0x3fb787(0x2c8)]=new Sprite(),this[_0x3fb787(0x2c8)][_0x3fb787(0x96a)]=new Bitmap(0x0,0x0),this[_0x3fb787(0x2c8)]['x']=0x0,this[_0x3fb787(0x34e)](this[_0x3fb787(0x2c8)]);},Window_Base[_0x52866a(0x8dc)][_0x52866a(0x2f2)]=function(){const _0x389f8a=_0x52866a;if(this[_0x389f8a(0x2c8)]){const _0x4b79c2=this['_dimmerSprite']['bitmap'],_0x1380ef=this[_0x389f8a(0x2e8)],_0x6201ee=this[_0x389f8a(0x8a0)],_0x52b7aa=this[_0x389f8a(0x67b)],_0x345028=ColorManager[_0x389f8a(0x6e8)](),_0x243516=ColorManager[_0x389f8a(0x330)]();_0x4b79c2[_0x389f8a(0x70f)](_0x1380ef,_0x6201ee),_0x4b79c2[_0x389f8a(0x380)](0x0,0x0,_0x1380ef,_0x52b7aa,_0x243516,_0x345028,!![]),_0x4b79c2[_0x389f8a(0x2f0)](0x0,_0x52b7aa,_0x1380ef,_0x6201ee-_0x52b7aa*0x2,_0x345028),_0x4b79c2[_0x389f8a(0x380)](0x0,_0x6201ee-_0x52b7aa,_0x1380ef,_0x52b7aa,_0x345028,_0x243516,!![]),this[_0x389f8a(0x2c8)][_0x389f8a(0x465)](0x0,0x0,_0x1380ef,_0x6201ee);}},Game_Actor[_0x52866a(0x8dc)][_0x52866a(0x631)]=function(){const _0xd93a3e=_0x52866a;for(let _0x54f41e=0x0;_0x54f41e<this[_0xd93a3e(0x90a)]();_0x54f41e++){if(_0xd93a3e(0x53a)===_0xd93a3e(0x3e9))this[_0xd93a3e(0x563)](_0xd6bfe1);else{const _0x4afa15=this[_0xd93a3e(0x8a7)]();let _0x3b8263=Number[_0xd93a3e(0x5e7)];this[_0xd93a3e(0x23d)](_0x54f41e,_0x4afa15[0x0]);for(const _0x4a70d9 of _0x4afa15){const _0x56887e=_0x4a70d9[_0xd93a3e(0x8d0)]();_0x56887e>_0x3b8263&&(_0x3b8263=_0x56887e,this[_0xd93a3e(0x23d)](_0x54f41e,_0x4a70d9));}}}this[_0xd93a3e(0x612)]('waiting');},Window_BattleItem[_0x52866a(0x8dc)][_0x52866a(0x8d6)]=function(_0x2196ea){const _0x4018e9=_0x52866a;if(BattleManager[_0x4018e9(0x6cc)]())return BattleManager[_0x4018e9(0x6cc)]()[_0x4018e9(0x6a3)](_0x2196ea);else{if(_0x4018e9(0x47a)!==_0x4018e9(0x47a))this[_0x4018e9(0x828)](_0x591750[_0x4018e9(0x931)]()[_0x4018e9(0x683)],_0x4dffe7,_0x3e6fa9,_0x35eb50);else return Window_ItemList[_0x4018e9(0x8dc)]['isEnabled'][_0x4018e9(0x235)](this,_0x2196ea);}},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x6d8)]=Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x73f)],Scene_Map[_0x52866a(0x8dc)][_0x52866a(0x73f)]=function(){const _0x2ce99f=_0x52866a;VisuMZ[_0x2ce99f(0x8b9)][_0x2ce99f(0x6d8)][_0x2ce99f(0x235)](this);const _0x34b4fa=this[_0x2ce99f(0x491)][_0x2ce99f(0x1ee)];if(_0x34b4fa)this[_0x2ce99f(0x5b0)](_0x34b4fa);},VisuMZ['CoreEngine'][_0x52866a(0x55a)]=Scene_Battle[_0x52866a(0x8dc)][_0x52866a(0x73f)],Scene_Battle['prototype'][_0x52866a(0x73f)]=function(){const _0x413075=_0x52866a;VisuMZ['CoreEngine'][_0x413075(0x55a)][_0x413075(0x235)](this);const _0x193db4=this[_0x413075(0x491)]['_timerSprite'];if(_0x193db4)this[_0x413075(0x5b0)](_0x193db4);},Sprite_Actor[_0x52866a(0x8dc)][_0x52866a(0x8c1)]=function(){const _0x57bcb9=_0x52866a;Sprite_Battler[_0x57bcb9(0x8dc)]['update'][_0x57bcb9(0x235)](this),this[_0x57bcb9(0x3ff)]();if(this[_0x57bcb9(0x5f6)])this[_0x57bcb9(0x21e)]();else this[_0x57bcb9(0x66b)]!==''&&(this[_0x57bcb9(0x66b)]='');},Window[_0x52866a(0x8dc)][_0x52866a(0x55e)]=function(){const _0x263639=_0x52866a,_0x5e7ae2=this['_width'],_0x5b1aaf=this[_0x263639(0x7c9)],_0x51fd18=0x18,_0xe7ad0e=_0x51fd18/0x2,_0x3294d3=0x60+_0x51fd18,_0x20126b=0x0+_0x51fd18;this[_0x263639(0x510)]['bitmap']=this[_0x263639(0x8f8)],this['_downArrowSprite'][_0x263639(0x2eb)]['x']=0.5,this['_downArrowSprite'][_0x263639(0x2eb)]['y']=0.5,this['_downArrowSprite'][_0x263639(0x465)](_0x3294d3+_0xe7ad0e,_0x20126b+_0xe7ad0e+_0x51fd18,_0x51fd18,_0xe7ad0e),this['_downArrowSprite'][_0x263639(0x20a)](Math['round'](_0x5e7ae2/0x2),Math[_0x263639(0x447)](_0x5b1aaf-_0xe7ad0e)),this[_0x263639(0x345)]['bitmap']=this[_0x263639(0x8f8)],this[_0x263639(0x345)][_0x263639(0x2eb)]['x']=0.5,this[_0x263639(0x345)][_0x263639(0x2eb)]['y']=0.5,this[_0x263639(0x345)]['setFrame'](_0x3294d3+_0xe7ad0e,_0x20126b,_0x51fd18,_0xe7ad0e),this[_0x263639(0x345)][_0x263639(0x20a)](Math[_0x263639(0x447)](_0x5e7ae2/0x2),Math[_0x263639(0x447)](_0xe7ad0e));},Window[_0x52866a(0x8dc)][_0x52866a(0x91e)]=function(){const _0x35e024=_0x52866a,_0x3dfbc7=0x90,_0x3b10d4=0x60,_0x29d3ad=0x18;this[_0x35e024(0x75f)][_0x35e024(0x96a)]=this['_windowskin'],this[_0x35e024(0x75f)][_0x35e024(0x2eb)]['x']=0.5,this[_0x35e024(0x75f)]['anchor']['y']=0x1,this['_pauseSignSprite'][_0x35e024(0x20a)](Math[_0x35e024(0x447)](this[_0x35e024(0x7f0)]/0x2),this[_0x35e024(0x7c9)]),this['_pauseSignSprite'][_0x35e024(0x465)](_0x3dfbc7,_0x3b10d4,_0x29d3ad,_0x29d3ad),this[_0x35e024(0x75f)][_0x35e024(0x30b)]=0xff;},Window['prototype'][_0x52866a(0x6b5)]=function(){const _0x5a72d3=_0x52866a,_0x2fad0d=this[_0x5a72d3(0x8cf)][_0x5a72d3(0x61a)][_0x5a72d3(0x542)](new Point(0x0,0x0)),_0x201e94=this['_clientArea'][_0x5a72d3(0x6f8)];_0x201e94['x']=_0x2fad0d['x']+this['origin']['x'],_0x201e94['y']=_0x2fad0d['y']+this[_0x5a72d3(0x42a)]['y'],_0x201e94[_0x5a72d3(0x2e8)]=Math[_0x5a72d3(0x4fb)](this[_0x5a72d3(0x7b1)]*this[_0x5a72d3(0x1d1)]['x']),_0x201e94[_0x5a72d3(0x8a0)]=Math['ceil'](this[_0x5a72d3(0x6a1)]*this[_0x5a72d3(0x1d1)]['y']);},Window[_0x52866a(0x8dc)][_0x52866a(0x717)]=function(){const _0x5d5d3d=_0x52866a,_0x26428f=this[_0x5d5d3d(0x488)],_0x34690b=Math['max'](0x0,this[_0x5d5d3d(0x7f0)]-_0x26428f*0x2),_0x4d4a87=Math['max'](0x0,this[_0x5d5d3d(0x7c9)]-_0x26428f*0x2),_0x39a700=this['_backSprite'],_0x195487=_0x39a700[_0x5d5d3d(0x77f)][0x0];_0x39a700['bitmap']=this[_0x5d5d3d(0x8f8)],_0x39a700[_0x5d5d3d(0x465)](0x0,0x0,0x60,0x60),_0x39a700[_0x5d5d3d(0x20a)](_0x26428f,_0x26428f),_0x39a700[_0x5d5d3d(0x1d1)]['x']=_0x34690b/0x60,_0x39a700[_0x5d5d3d(0x1d1)]['y']=_0x4d4a87/0x60,_0x195487['bitmap']=this[_0x5d5d3d(0x8f8)],_0x195487[_0x5d5d3d(0x465)](0x0,0x60,0x60,0x60),_0x195487[_0x5d5d3d(0x20a)](0x0,0x0,_0x34690b,_0x4d4a87),_0x195487[_0x5d5d3d(0x1d1)]['x']=0x1/_0x39a700[_0x5d5d3d(0x1d1)]['x'],_0x195487[_0x5d5d3d(0x1d1)]['y']=0x1/_0x39a700[_0x5d5d3d(0x1d1)]['y'],_0x39a700[_0x5d5d3d(0x71f)](this[_0x5d5d3d(0x916)]);},Game_Temp[_0x52866a(0x8dc)][_0x52866a(0x333)]=function(){const _0xdf8d63=_0x52866a;this[_0xdf8d63(0x49e)]=[],this['_fauxAnimationQueue']=[],this[_0xdf8d63(0x5db)]=[],this[_0xdf8d63(0x5e5)]=[];},VisuMZ[_0x52866a(0x8b9)][_0x52866a(0x1e0)]=Scene_Base['prototype'][_0x52866a(0x70e)],Scene_Base[_0x52866a(0x8dc)][_0x52866a(0x70e)]=function(){const _0x5197ef=_0x52866a;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix'][_0x5197ef(0x235)](this);},Bitmap[_0x52866a(0x8dc)][_0x52866a(0x331)]=function(_0x4affdc){const _0xe3b6e2=_0x52866a,_0x4f222f=this[_0xe3b6e2(0x4a6)];_0x4f222f['save'](),_0x4f222f[_0xe3b6e2(0x54d)]=this[_0xe3b6e2(0x428)]();const _0x4a4329=_0x4f222f[_0xe3b6e2(0x26e)](_0x4affdc)[_0xe3b6e2(0x2e8)];return _0x4f222f[_0xe3b6e2(0x7ce)](),_0x4a4329;},Window_Message[_0x52866a(0x8dc)][_0x52866a(0x625)]=function(_0x4af8b6){const _0x284849=_0x52866a;return this[_0x284849(0x3a5)]()?this[_0x284849(0x89c)]['measureTextWidthNoRounding'](_0x4af8b6):'vVkjr'===_0x284849(0x56c)?Window_Base[_0x284849(0x8dc)][_0x284849(0x625)][_0x284849(0x235)](this,_0x4af8b6):this[_0x284849(0x8a2)][_0x284849(0x708)]>0x0;},Window_Message[_0x52866a(0x8dc)][_0x52866a(0x3a5)]=function(){const _0xfab5aa=_0x52866a;return VisuMZ[_0xfab5aa(0x8b9)]['Settings'][_0xfab5aa(0x98c)]['FontWidthFix']??!![];};