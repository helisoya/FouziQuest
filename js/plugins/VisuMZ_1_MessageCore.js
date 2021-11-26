//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.28] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x57fb66=_0x213f;(function(_0x416c25,_0x46efb5){const _0x246507=_0x213f,_0x4cbc91=_0x416c25();while(!![]){try{const _0x575960=parseInt(_0x246507(0x1db))/0x1+parseInt(_0x246507(0x1e1))/0x2*(parseInt(_0x246507(0x20e))/0x3)+parseInt(_0x246507(0x2e5))/0x4+parseInt(_0x246507(0x2ab))/0x5*(-parseInt(_0x246507(0x1d5))/0x6)+-parseInt(_0x246507(0x1e0))/0x7+parseInt(_0x246507(0xaf))/0x8+-parseInt(_0x246507(0x139))/0x9*(parseInt(_0x246507(0x2ad))/0xa);if(_0x575960===_0x46efb5)break;else _0x4cbc91['push'](_0x4cbc91['shift']());}catch(_0x347f36){_0x4cbc91['push'](_0x4cbc91['shift']());}}}(_0x2d03,0x59f14));function _0x213f(_0x3fc97a,_0x2b3c46){const _0x2d03a7=_0x2d03();return _0x213f=function(_0x213f2b,_0x60356a){_0x213f2b=_0x213f2b-0x6b;let _0x496f4c=_0x2d03a7[_0x213f2b];return _0x496f4c;},_0x213f(_0x3fc97a,_0x2b3c46);}var label=_0x57fb66(0x2b9),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x13198f){const _0x562542=_0x57fb66;return _0x13198f[_0x562542(0x206)]&&_0x13198f[_0x562542(0x89)][_0x562542(0x18c)]('['+label+']');})[0x0];VisuMZ[label][_0x57fb66(0x251)]=VisuMZ[label][_0x57fb66(0x251)]||{},VisuMZ[_0x57fb66(0x23c)]=function(_0x20265f,_0x213db5){const _0x44be30=_0x57fb66;for(const _0x43ccc9 in _0x213db5){if(_0x43ccc9[_0x44be30(0x24e)](/(.*):(.*)/i)){if(_0x44be30(0x244)==='tstfd')this[_0x44be30(0x289)]();else{const _0x1a1dc5=String(RegExp['$1']),_0x1bf024=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x18eca3,_0x588112,_0x50318e;switch(_0x1bf024){case'NUM':_0x18eca3=_0x213db5[_0x43ccc9]!==''?Number(_0x213db5[_0x43ccc9]):0x0;break;case _0x44be30(0x2b8):_0x588112=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0x29e8bb=>Number(_0x29e8bb));break;case _0x44be30(0x257):_0x18eca3=_0x213db5[_0x43ccc9]!==''?eval(_0x213db5[_0x43ccc9]):null;break;case _0x44be30(0xbb):_0x588112=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0x5d611c=>eval(_0x5d611c));break;case'JSON':_0x18eca3=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):'';break;case _0x44be30(0x203):_0x588112=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0x25fd19=>JSON[_0x44be30(0x2a5)](_0x25fd19));break;case _0x44be30(0x127):_0x18eca3=_0x213db5[_0x43ccc9]!==''?new Function(JSON['parse'](_0x213db5[_0x43ccc9])):new Function(_0x44be30(0x2a6));break;case'ARRAYFUNC':_0x588112=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0xeac1bb=>new Function(JSON[_0x44be30(0x2a5)](_0xeac1bb)));break;case'STR':_0x18eca3=_0x213db5[_0x43ccc9]!==''?String(_0x213db5[_0x43ccc9]):'';break;case'ARRAYSTR':_0x588112=_0x213db5[_0x43ccc9]!==''?JSON['parse'](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0x51e4cc=>String(_0x51e4cc));break;case'STRUCT':_0x50318e=_0x213db5[_0x43ccc9]!==''?JSON['parse'](_0x213db5[_0x43ccc9]):{},_0x20265f[_0x1a1dc5]={},VisuMZ[_0x44be30(0x23c)](_0x20265f[_0x1a1dc5],_0x50318e);continue;case _0x44be30(0x2f8):_0x588112=_0x213db5[_0x43ccc9]!==''?JSON[_0x44be30(0x2a5)](_0x213db5[_0x43ccc9]):[],_0x18eca3=_0x588112[_0x44be30(0x1ed)](_0xe2c99=>VisuMZ[_0x44be30(0x23c)]({},JSON[_0x44be30(0x2a5)](_0xe2c99)));break;default:continue;}_0x20265f[_0x1a1dc5]=_0x18eca3;}}}return _0x20265f;},(_0x272dac=>{const _0x370e72=_0x57fb66,_0x10420d=_0x272dac[_0x370e72(0x23f)];for(const _0x33205a of dependencies){if('dFKnn'===_0x370e72(0x155))return!![];else{if(!Imported[_0x33205a]){if(_0x370e72(0xfb)==='YiBlN'){const _0xa0f30b=_0x1ef983>=0x1?_0x9c81b5['members']()[_0x57ce57-0x1]:null,_0x4522b5=_0xa0f30b?_0xa0f30b[_0x370e72(0x23f)]():'',_0x37b60f=_0x46d3dd(_0x3c986f[_0x370e72(0x2b9)][_0x370e72(0x251)]['AutoColor']['Actors']);return this[_0x370e72(0x99)]()&&_0x37b60f!==0x0?_0x370e72(0x259)[_0x370e72(0x173)](_0x37b60f,_0x4522b5):_0x4522b5;}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x370e72(0x173)](_0x10420d,_0x33205a)),SceneManager[_0x370e72(0x1a4)]();break;}}}}const _0x27c9a1=_0x272dac[_0x370e72(0x89)];if(_0x27c9a1['match'](/\[Version[ ](.*?)\]/i)){if(_0x370e72(0x9d)!==_0x370e72(0x2e2)){const _0x5062c9=Number(RegExp['$1']);_0x5062c9!==VisuMZ[label][_0x370e72(0x21c)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x370e72(0x173)](_0x10420d,_0x5062c9)),SceneManager[_0x370e72(0x1a4)]());}else{_0x30cb40[_0x370e72(0x153)]=_0x39b2a0[_0x370e72(0x153)]['toUpperCase'](),_0x5b9891[_0x370e72(0x11b)]=new _0x2d792a('\x1b'+_0x3fe32b[_0x370e72(0x153)],'gi'),_0x2b228c['textCodeResult']='\x1b'+_0x536096[_0x370e72(0x153)];if(_0x360da6['Type']==='')_0x106069[_0x370e72(0x12b)]+=_0x370e72(0x2bc);}}if(_0x27c9a1[_0x370e72(0x24e)](/\[Tier[ ](\d+)\]/i)){if(_0x370e72(0x1ca)!==_0x370e72(0x207)){const _0x3cffcb=Number(RegExp['$1']);_0x3cffcb<tier?(alert(_0x370e72(0x2dc)[_0x370e72(0x173)](_0x10420d,_0x3cffcb,tier)),SceneManager[_0x370e72(0x1a4)]()):tier=Math[_0x370e72(0x231)](_0x3cffcb,tier);}else _0x27296d[_0x5d67ab]=this['contents'][_0x3005eb];}VisuMZ[_0x370e72(0x23c)](VisuMZ[label][_0x370e72(0x251)],_0x272dac[_0x370e72(0xcf)]);})(pluginData),PluginManager[_0x57fb66(0xf0)](pluginData[_0x57fb66(0x23f)],_0x57fb66(0x27c),_0x41250b=>{const _0x21b39d=_0x57fb66;VisuMZ[_0x21b39d(0x23c)](_0x41250b,_0x41250b);const _0x52ec64=_0x41250b[_0x21b39d(0x70)]||$gameSystem[_0x21b39d(0x27a)]()||0x1,_0x51a3a9=_0x41250b[_0x21b39d(0xc6)]||$gameSystem[_0x21b39d(0x107)]()||0x1,_0x19cd74=_0x41250b[_0x21b39d(0x234)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x4a8db1=_0x41250b['TextAlign'][_0x21b39d(0x2d0)]()||_0x21b39d(0x8f);$gameSystem[_0x21b39d(0x1a1)](_0x52ec64),$gameSystem[_0x21b39d(0x2c8)](_0x51a3a9),$gameSystem[_0x21b39d(0x124)](_0x19cd74),$gameSystem[_0x21b39d(0x2a9)](_0x4a8db1);}),PluginManager['registerCommand'](pluginData[_0x57fb66(0x23f)],'MessageWindowProperties',_0x4d3272=>{const _0x10b0a5=_0x57fb66;VisuMZ['ConvertParams'](_0x4d3272,_0x4d3272);const _0x1d99b1=_0x4d3272[_0x10b0a5(0x174)]||$gameSystem['getMessageWindowRows']()||0x1,_0x56aa9c=_0x4d3272[_0x10b0a5(0x2c7)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x10b0a5(0xfd)]=_0x4d3272[_0x10b0a5(0x7d)]||![];const _0x45d583=_0x4d3272[_0x10b0a5(0xdd)][_0x10b0a5(0x2d0)]();$gameSystem[_0x10b0a5(0x160)](_0x1d99b1),$gameSystem['setMessageWindowWidth'](_0x56aa9c);[_0x10b0a5(0x239),_0x10b0a5(0xa1)][_0x10b0a5(0x18c)](_0x45d583)&&(_0x10b0a5(0x243)===_0x10b0a5(0x24a)?this[_0x10b0a5(0x1dc)](_0x5854ac):$gameSystem['setMessageWindowWordWrap'](eval(_0x45d583)));const _0x3ff6ba=SceneManager[_0x10b0a5(0x1e8)][_0x10b0a5(0x2c9)];_0x3ff6ba&&(_0x3ff6ba['resetWordWrap'](),_0x3ff6ba[_0x10b0a5(0x1c8)](),_0x3ff6ba[_0x10b0a5(0x210)]());}),VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x29d)]=Scene_Boot[_0x57fb66(0x20d)][_0x57fb66(0x182)],Scene_Boot[_0x57fb66(0x20d)][_0x57fb66(0x182)]=function(){const _0x2e39e1=_0x57fb66;VisuMZ['MessageCore'][_0x2e39e1(0x29d)][_0x2e39e1(0x2a1)](this),this[_0x2e39e1(0x132)](),this[_0x2e39e1(0xeb)](),this[_0x2e39e1(0x2f7)](),this[_0x2e39e1(0xc9)]();},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x15e)]=function(_0x296582){const _0x3e8fcd=_0x57fb66,_0x46dce1=VisuMZ[_0x3e8fcd(0x2b9)]['Settings'][_0x296582];_0x46dce1['sort']((_0x203b0b,_0x458288)=>{const _0x4ba26d=_0x3e8fcd;if(!_0x203b0b||!_0x458288)return-0x1;return _0x458288[_0x4ba26d(0x153)][_0x4ba26d(0xd9)]-_0x203b0b[_0x4ba26d(0x153)][_0x4ba26d(0xd9)];});},Scene_Boot[_0x57fb66(0x20d)][_0x57fb66(0x132)]=function(){const _0x8d271c=_0x57fb66;VisuMZ['MessageCore']['SortObjectByKeyLength']('TextCodeActions');for(const _0x11fd7 of VisuMZ['MessageCore'][_0x8d271c(0x251)][_0x8d271c(0x191)]){if(_0x8d271c(0x85)!==_0x8d271c(0x2cf)){_0x11fd7['Match']=_0x11fd7[_0x8d271c(0x153)][_0x8d271c(0xf9)](),_0x11fd7[_0x8d271c(0x11b)]=new RegExp('\x1b'+_0x11fd7[_0x8d271c(0x153)],'gi'),_0x11fd7[_0x8d271c(0x12b)]='\x1b'+_0x11fd7[_0x8d271c(0x153)];if(_0x11fd7[_0x8d271c(0x2d3)]==='')_0x11fd7[_0x8d271c(0x12b)]+=_0x8d271c(0x2bc);}else return _0x592ad2=_0x4df8bf[_0x8d271c(0x147)](/<LEFT>/gi,_0x8d271c(0x1ce)),_0x5703d3=_0x2d6fcb[_0x8d271c(0x147)](/<\/LEFT>/gi,_0x8d271c(0x22e)),_0x4b0a3f=_0x115053['replace'](/<CENTER>/gi,_0x8d271c(0x28a)),_0x419c2b=_0x3510af[_0x8d271c(0x147)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x184723=_0x219192[_0x8d271c(0x147)](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x1fa832=_0x3038e7[_0x8d271c(0x147)](/<\/RIGHT>/gi,_0x8d271c(0x22e)),_0x4c6085;}},Scene_Boot[_0x57fb66(0x20d)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x19d38e=_0x57fb66;VisuMZ[_0x19d38e(0x2b9)]['SortObjectByKeyLength']('TextCodeReplace');for(const _0xdc48c6 of VisuMZ['MessageCore']['Settings'][_0x19d38e(0xaa)]){_0xdc48c6['textCodeCheck']=new RegExp('\x1b'+_0xdc48c6[_0x19d38e(0x153)]+_0xdc48c6[_0x19d38e(0x2d3)],'gi');if(_0xdc48c6['TextStr']!==''&&_0xdc48c6[_0x19d38e(0x24f)]!==_0x19d38e(0x156))_0xdc48c6[_0x19d38e(0x12b)]=new Function(_0x19d38e(0x26b)+_0xdc48c6[_0x19d38e(0x24f)][_0x19d38e(0x147)](/\\/g,'\x1b')+'\x27');else{if(_0x19d38e(0x2b4)!==_0x19d38e(0x2c5))_0xdc48c6[_0x19d38e(0x12b)]=_0xdc48c6[_0x19d38e(0x236)];else{const _0x237d41=this[_0x19d38e(0x192)],_0x19333e=this[_0x19d38e(0x229)],_0x2ef213=this['calcMoveEasing']((_0x19333e-_0x237d41)/_0x19333e),_0x4155ba=this[_0x19d38e(0x2aa)]((_0x19333e-_0x237d41+0x1)/_0x19333e),_0x40f0a6=(_0x1d450f-_0x4d9407*_0x2ef213)/(0x1-_0x2ef213);return _0x40f0a6+(_0x3737d5-_0x40f0a6)*_0x4155ba;}}}},Scene_Boot[_0x57fb66(0x20d)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x1a8874=_0x57fb66;for(const _0x19a69e of VisuMZ[_0x1a8874(0x2b9)]['Settings'][_0x1a8874(0x112)]){if(_0x1a8874(0x75)==='icbYU'){_0x19a69e[_0x1a8874(0x11b)]=new RegExp('\x5c['+_0x19a69e[_0x1a8874(0x153)]+'\x5c]','gi');if(_0x19a69e[_0x1a8874(0x24f)]!==''&&_0x19a69e[_0x1a8874(0x24f)]!==_0x1a8874(0x156))_0x1a8874(0x19d)===_0x1a8874(0x163)?this[_0x1a8874(0x2c2)]=[]:_0x19a69e[_0x1a8874(0x12b)]=new Function(_0x1a8874(0x26b)+_0x19a69e[_0x1a8874(0x24f)][_0x1a8874(0x147)](/\\/g,'\x1b')+'\x27');else{if(_0x1a8874(0x1a9)===_0x1a8874(0x265)){if(_0x3c8faa===_0x1a8874(0x262))return!![];return _0x2260a9[_0x1a8874(0x2b9)][_0x1a8874(0x95)][_0x1a8874(0x2a1)](this,_0x58aa67);}else _0x19a69e[_0x1a8874(0x12b)]=_0x19a69e['TextJS'];}}else{if(this['_MessageCoreSettings']===_0x2b4769)this[_0x1a8874(0x15a)]();if(this[_0x1a8874(0x1dd)][_0x1a8874(0x2be)]===_0x12a8b9)this[_0x1a8874(0x15a)]();return this[_0x1a8874(0x1dd)][_0x1a8874(0x2be)];}}},Scene_Boot[_0x57fb66(0x20d)]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x1f4257=_0x57fb66,_0x2dc240=VisuMZ['MessageCore']['Settings'][_0x1f4257(0x1cd)];if(!VisuMZ['ParseAllNotetags']){if('DhFIy'===_0x1f4257(0xb9))VisuMZ[_0x1f4257(0x2b9)][_0x1f4257(0x1c9)]($dataClasses,_0x2dc240[_0x1f4257(0x1ec)]),VisuMZ[_0x1f4257(0x2b9)][_0x1f4257(0x1c9)]($dataSkills,_0x2dc240[_0x1f4257(0x28b)]),VisuMZ[_0x1f4257(0x2b9)][_0x1f4257(0x1c9)]($dataItems,_0x2dc240[_0x1f4257(0x170)]),VisuMZ['MessageCore'][_0x1f4257(0x1c9)]($dataWeapons,_0x2dc240[_0x1f4257(0x1b7)]),VisuMZ[_0x1f4257(0x2b9)][_0x1f4257(0x1c9)]($dataArmors,_0x2dc240[_0x1f4257(0x276)]),VisuMZ[_0x1f4257(0x2b9)][_0x1f4257(0x1c9)]($dataEnemies,_0x2dc240[_0x1f4257(0x29c)]),VisuMZ['MessageCore'][_0x1f4257(0x1c9)]($dataStates,_0x2dc240['States']);else return this['_textAlignment'];}VisuMZ[_0x1f4257(0x2b9)]['CreateAutoColorRegExpLists']();},VisuMZ['MessageCore'][_0x57fb66(0x1fa)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x57fb66(0x154),_0x57fb66(0x227),'<I>',_0x57fb66(0xb1),_0x57fb66(0x1a5),_0x57fb66(0x254),_0x57fb66(0x136),_0x57fb66(0x235),_0x57fb66(0x14a),_0x57fb66(0x2c1),_0x57fb66(0x172),_0x57fb66(0xad),'(((',_0x57fb66(0x2ce),_0x57fb66(0x7b),_0x57fb66(0x267),_0x57fb66(0x118),_0x57fb66(0x23b),'PICTURE',_0x57fb66(0x2f2),_0x57fb66(0x271),'WAIT',_0x57fb66(0x249),_0x57fb66(0x269),'ENABLE','DISABLE',_0x57fb66(0x1d1),_0x57fb66(0x24c),_0x57fb66(0xb0),_0x57fb66(0x1e7)],VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1c9)]=function(_0x132810,_0x361548){const _0x11645d=_0x57fb66;if(_0x361548<=0x0)return;const _0x8f020b=_0x132810;for(const _0x44a7c0 of _0x8f020b){if(!_0x44a7c0)continue;VisuMZ[_0x11645d(0x2b9)][_0x11645d(0x82)](_0x44a7c0,_0x361548);}},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x248)]=function(){const _0x5986c7=_0x57fb66;VisuMZ[_0x5986c7(0x2b9)][_0x5986c7(0x285)]=[];for(let _0x51f02d=0x1;_0x51f02d<=0x1f;_0x51f02d++){if(_0x5986c7(0x13a)!==_0x5986c7(0x1f3)){const _0x4abc50=_0x5986c7(0x6d)[_0x5986c7(0x173)](_0x51f02d),_0x435283=VisuMZ['MessageCore']['Settings'][_0x5986c7(0x1cd)][_0x4abc50];_0x435283[_0x5986c7(0x2c0)]((_0x231b8f,_0x7b909a)=>{const _0x321da0=_0x5986c7;if(_0x321da0(0x17d)===_0x321da0(0x17d)){if(!_0x231b8f||!_0x7b909a)return-0x1;return _0x7b909a['length']-_0x231b8f['length'];}else{const _0x2812a8=this[_0x321da0(0x233)](_0x3eda4d),_0x5e6863=this[_0x321da0(0x261)](_0x2553fe);this[_0x321da0(0xd0)](_0x2812a8,'choice',_0x5e6863,_0xe3cb9d);}}),this['CreateAutoColorRegExpListEntries'](_0x435283,_0x51f02d);}else return this[_0x5986c7(0x283)]()===0x191;}},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x212)]=function(_0x5cb51b,_0x44acc8){const _0x1f3662=_0x57fb66;for(const _0x56b761 of _0x5cb51b){if(_0x56b761[_0x1f3662(0xd9)]<=0x0)continue;if(/^\d+$/[_0x1f3662(0x133)](_0x56b761))continue;let _0x306025=VisuMZ['MessageCore'][_0x1f3662(0x102)](_0x56b761);if(_0x56b761[_0x1f3662(0x24e)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x14cf56=new RegExp(_0x306025,'i');else var _0x14cf56=new RegExp('\x5cb'+_0x306025+'\x5cb','g');VisuMZ[_0x1f3662(0x2b9)][_0x1f3662(0x285)][_0x1f3662(0xfe)]([_0x14cf56,_0x1f3662(0x259)[_0x1f3662(0x173)](_0x44acc8,_0x56b761)]);}},VisuMZ[_0x57fb66(0x2b9)]['ConvertTextAutoColorRegExpFriendly']=function(_0x59bda5){const _0x4b521b=_0x57fb66;return _0x59bda5=_0x59bda5[_0x4b521b(0x147)](/(\W)/gi,(_0x4dcf10,_0x16b159)=>_0x4b521b(0x2ee)[_0x4b521b(0x173)](_0x16b159)),_0x59bda5;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x2bf)]=VisuMZ[_0x57fb66(0x2bf)],VisuMZ[_0x57fb66(0x2bf)]=function(_0x53e164){const _0x4556d4=_0x57fb66;VisuMZ['MessageCore'][_0x4556d4(0x2bf)][_0x4556d4(0x2a1)](this,_0x53e164);const _0x262003=VisuMZ[_0x4556d4(0x2b9)][_0x4556d4(0x251)]['AutoColor'];VisuMZ[_0x4556d4(0x2b9)]['CreateAutoColorFor'](_0x53e164,_0x262003[_0x4556d4(0x1ec)]);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x284)]=VisuMZ[_0x57fb66(0x284)],VisuMZ[_0x57fb66(0x284)]=function(_0x3bad75){const _0x48e092=_0x57fb66;VisuMZ[_0x48e092(0x2b9)][_0x48e092(0x284)][_0x48e092(0x2a1)](this,_0x3bad75);const _0x378d8d=VisuMZ[_0x48e092(0x2b9)][_0x48e092(0x251)][_0x48e092(0x1cd)];VisuMZ[_0x48e092(0x2b9)][_0x48e092(0x82)](_0x3bad75,_0x378d8d[_0x48e092(0x28b)]);},0x7,VisuMZ[_0x57fb66(0x2b9)]['ParseItemNotetags']=VisuMZ[_0x57fb66(0x1bd)],VisuMZ[_0x57fb66(0x1bd)]=function(_0x1d1918){const _0x2674c4=_0x57fb66;VisuMZ[_0x2674c4(0x2b9)][_0x2674c4(0x1bd)][_0x2674c4(0x2a1)](this,_0x1d1918);const _0x645e07=VisuMZ[_0x2674c4(0x2b9)][_0x2674c4(0x251)][_0x2674c4(0x1cd)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x1d1918,_0x645e07[_0x2674c4(0x170)]);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x25f)]=VisuMZ[_0x57fb66(0x25f)],VisuMZ[_0x57fb66(0x25f)]=function(_0x54baec){const _0x212514=_0x57fb66;VisuMZ[_0x212514(0x2b9)][_0x212514(0x25f)][_0x212514(0x2a1)](this,_0x54baec);const _0x89aca1=VisuMZ[_0x212514(0x2b9)][_0x212514(0x251)][_0x212514(0x1cd)];VisuMZ['MessageCore'][_0x212514(0x82)](_0x54baec,_0x89aca1[_0x212514(0x1b7)]);},VisuMZ['MessageCore'][_0x57fb66(0x143)]=VisuMZ[_0x57fb66(0x143)],VisuMZ[_0x57fb66(0x143)]=function(_0x58b03c){const _0x424d55=_0x57fb66;VisuMZ['MessageCore']['ParseArmorNotetags']['call'](this,_0x58b03c);const _0x3a4118=VisuMZ[_0x424d55(0x2b9)]['Settings'][_0x424d55(0x1cd)];VisuMZ[_0x424d55(0x2b9)][_0x424d55(0x82)](_0x58b03c,_0x3a4118[_0x424d55(0x276)]);},VisuMZ['MessageCore']['ParseEnemyNotetags']=VisuMZ[_0x57fb66(0x17e)],VisuMZ[_0x57fb66(0x17e)]=function(_0x23ab5e){const _0x2b9fc1=_0x57fb66;VisuMZ[_0x2b9fc1(0x2b9)][_0x2b9fc1(0x17e)]['call'](this,_0x23ab5e);const _0xb6d64=VisuMZ['MessageCore'][_0x2b9fc1(0x251)]['AutoColor'];VisuMZ[_0x2b9fc1(0x2b9)]['CreateAutoColorFor'](_0x23ab5e,_0xb6d64[_0x2b9fc1(0x29c)]);},VisuMZ['MessageCore'][_0x57fb66(0x296)]=VisuMZ[_0x57fb66(0x296)],VisuMZ[_0x57fb66(0x296)]=function(_0x19f274){const _0x5f1eae=_0x57fb66;VisuMZ[_0x5f1eae(0x2b9)]['ParseStateNotetags']['call'](this,_0x19f274);const _0x30a3e6=VisuMZ[_0x5f1eae(0x2b9)][_0x5f1eae(0x251)]['AutoColor'];VisuMZ[_0x5f1eae(0x2b9)][_0x5f1eae(0x82)](_0x19f274,_0x30a3e6[_0x5f1eae(0x166)]);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x82)]=function(_0x2bfcda,_0x238f80){const _0x5448ef=_0x57fb66;if(_0x238f80<=0x0)return;const _0x5216df=VisuMZ[_0x5448ef(0x2b9)]['Settings']['AutoColor'][_0x5448ef(0x183)+_0x238f80];let _0x5ebf4f=_0x2bfcda[_0x5448ef(0x23f)]['trim']();if(/^\d+$/[_0x5448ef(0x133)](_0x5ebf4f))return;if(VisuMZ[_0x5448ef(0x2b9)][_0x5448ef(0x1fa)][_0x5448ef(0x18c)](_0x5ebf4f['toUpperCase']()))return;_0x5ebf4f=_0x5ebf4f[_0x5448ef(0x147)](/\\I\[(\d+)\]/gi,''),_0x5ebf4f=_0x5ebf4f['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x5ebf4f[_0x5448ef(0xd9)]<=0x0)return;if(_0x5ebf4f['match'](/-----/i))return;_0x5216df[_0x5448ef(0xfe)](_0x5ebf4f);},SceneManager[_0x57fb66(0xab)]=function(){const _0x254360=_0x57fb66;return this['_scene']&&this['_scene'][_0x254360(0x1de)]===Scene_Battle;},SceneManager[_0x57fb66(0x228)]=function(){const _0x2a8302=_0x57fb66;return this['_scene']&&this[_0x2a8302(0x1e8)][_0x2a8302(0x1de)]===Scene_Map;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x194)]=TextManager['message'],TextManager[_0x57fb66(0x9f)]=function(_0x4c1093){const _0xd6df3a=_0x57fb66,_0x5e787e=['levelUp',_0xd6df3a(0x268),_0xd6df3a(0x11c),'surprise',_0xd6df3a(0x1ea),'defeat',_0xd6df3a(0x1cc),_0xd6df3a(0x1bf),_0xd6df3a(0x1a0),_0xd6df3a(0x22a)];let _0x313b06=VisuMZ['MessageCore'][_0xd6df3a(0x194)][_0xd6df3a(0x2a1)](this,_0x4c1093);return _0x5e787e[_0xd6df3a(0x18c)](_0x4c1093)&&(_0x313b06=_0xd6df3a(0x267)+_0x313b06),_0x313b06;},ConfigManager['textSpeed']=VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x251)][_0x57fb66(0x266)]['Default'],VisuMZ['MessageCore'][_0x57fb66(0x78)]=ConfigManager[_0x57fb66(0x279)],ConfigManager[_0x57fb66(0x279)]=function(){const _0x464ed3=_0x57fb66,_0x318185=VisuMZ[_0x464ed3(0x2b9)][_0x464ed3(0x78)][_0x464ed3(0x2a1)](this);return _0x318185[_0x464ed3(0x262)]=this[_0x464ed3(0x262)],_0x318185;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0xc0)]=ConfigManager[_0x57fb66(0x176)],ConfigManager[_0x57fb66(0x176)]=function(_0x4a5b79){const _0x2fa96e=_0x57fb66;VisuMZ[_0x2fa96e(0x2b9)]['ConfigManager_applyData'][_0x2fa96e(0x2a1)](this,_0x4a5b79);if(_0x2fa96e(0x262)in _0x4a5b79)this[_0x2fa96e(0x262)]=Number(_0x4a5b79[_0x2fa96e(0x262)])[_0x2fa96e(0x14c)](0x1,0xb);else{if(_0x2fa96e(0xde)===_0x2fa96e(0xde))this[_0x2fa96e(0x262)]=VisuMZ[_0x2fa96e(0x2b9)][_0x2fa96e(0x251)][_0x2fa96e(0x266)]['Default'];else return this[_0x2fa96e(0x21d)];}},TextManager[_0x57fb66(0x29b)]=VisuMZ['MessageCore']['Settings'][_0x57fb66(0x266)][_0x57fb66(0x196)],TextManager['instantTextSpeed']=VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x251)][_0x57fb66(0x266)][_0x57fb66(0xdb)],VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0xf1)]=Game_System[_0x57fb66(0x20d)][_0x57fb66(0x2fb)],Game_System[_0x57fb66(0x20d)][_0x57fb66(0x2fb)]=function(){const _0x56b575=_0x57fb66;VisuMZ[_0x56b575(0x2b9)][_0x56b575(0xf1)]['call'](this),this[_0x56b575(0x15a)]();},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x15a)]=function(){const _0x8d084c=_0x57fb66,_0x2bb1a7=VisuMZ[_0x8d084c(0x2b9)][_0x8d084c(0x251)][_0x8d084c(0xc4)],_0x5696c0=VisuMZ[_0x8d084c(0x2b9)]['Settings']['WordWrap'];this[_0x8d084c(0x1dd)]={'messageRows':_0x2bb1a7[_0x8d084c(0x2cc)],'messageWidth':_0x2bb1a7[_0x8d084c(0xe2)],'messageWordWrap':_0x5696c0[_0x8d084c(0x29a)],'helpWordWrap':_0x5696c0[_0x8d084c(0x2d2)],'choiceLineHeight':_0x2bb1a7[_0x8d084c(0x27e)],'choiceRows':_0x2bb1a7[_0x8d084c(0x1ab)],'choiceCols':_0x2bb1a7[_0x8d084c(0x1ae)],'choiceTextAlign':_0x2bb1a7['ChoiceWindowTextAlign']};},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x1aa)]=function(){const _0x114ebe=_0x57fb66;if(this[_0x114ebe(0x1dd)]===undefined)this[_0x114ebe(0x15a)]();if(this['_MessageCoreSettings']['messageRows']===undefined)this[_0x114ebe(0x15a)]();return this[_0x114ebe(0x1dd)]['messageRows'];},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x160)]=function(_0x27b6a0){const _0xfb9474=_0x57fb66;if(this[_0xfb9474(0x1dd)]===undefined)this['initMessageCore']();if(this[_0xfb9474(0x1dd)][_0xfb9474(0x1f9)]===undefined)this['initMessageCore']();this[_0xfb9474(0x1dd)][_0xfb9474(0x1f9)]=_0x27b6a0||0x1;},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x2ec)]=function(){const _0x230732=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this[_0x230732(0x15a)]();if(this['_MessageCoreSettings'][_0x230732(0x2be)]===undefined)this[_0x230732(0x15a)]();return this[_0x230732(0x1dd)][_0x230732(0x2be)];},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x169)]=function(_0x15cbde){const _0x6d9d1f=_0x57fb66;if(this[_0x6d9d1f(0x1dd)]===undefined)this[_0x6d9d1f(0x15a)]();if(this[_0x6d9d1f(0x1dd)][_0x6d9d1f(0x2be)]===undefined)this[_0x6d9d1f(0x15a)]();_0x15cbde=Math[_0x6d9d1f(0x1f8)](_0x15cbde);if(_0x15cbde%0x2!==0x0)_0x15cbde+=0x1;this['_MessageCoreSettings'][_0x6d9d1f(0x2be)]=_0x15cbde||0x2;},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x27d)]=function(){const _0x120b01=_0x57fb66;if(this[_0x120b01(0x1dd)]===undefined)this[_0x120b01(0x15a)]();if(this[_0x120b01(0x1dd)]['messageWordWrap']===undefined)this[_0x120b01(0x15a)]();return this[_0x120b01(0x1dd)][_0x120b01(0x16c)];},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x1df)]=function(_0x562abf){const _0x34a137=_0x57fb66;if(this[_0x34a137(0x1dd)]===undefined)this[_0x34a137(0x15a)]();if(this[_0x34a137(0x1dd)]['messageWordWrap']===undefined)this['initMessageCore']();this[_0x34a137(0x1dd)][_0x34a137(0x16c)]=_0x562abf;},Game_System[_0x57fb66(0x20d)]['isHelpWindowWordWrap']=function(){const _0x387b8f=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this[_0x387b8f(0x15a)]();if(this[_0x387b8f(0x1dd)][_0x387b8f(0x2ac)]===undefined)this['initMessageCore']();return this[_0x387b8f(0x1dd)][_0x387b8f(0x2ac)];},Game_System[_0x57fb66(0x20d)]['setHelpWindowWordWrap']=function(_0x5a9158){const _0x38c213=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this[_0x38c213(0x15a)]();if(this[_0x38c213(0x1dd)][_0x38c213(0x2ac)]===undefined)this[_0x38c213(0x15a)]();this['_MessageCoreSettings'][_0x38c213(0x2ac)]=_0x5a9158;},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x27a)]=function(){const _0x34ab27=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this[_0x34ab27(0x15a)]();return this[_0x34ab27(0x1dd)][_0x34ab27(0xb8)];},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x1a1)]=function(_0x64449){const _0x6e56bd=_0x57fb66;if(this[_0x6e56bd(0x1dd)]===undefined)this[_0x6e56bd(0x15a)]();if(this['_MessageCoreSettings'][_0x6e56bd(0xb8)]===undefined)this[_0x6e56bd(0x15a)]();this[_0x6e56bd(0x1dd)][_0x6e56bd(0xb8)]=_0x64449||0x1;},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x107)]=function(){const _0x393a18=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this[_0x393a18(0x15a)]();if(this[_0x393a18(0x1dd)][_0x393a18(0xbc)]===undefined)this[_0x393a18(0x15a)]();return this['_MessageCoreSettings']['choiceRows'];},Game_System[_0x57fb66(0x20d)][_0x57fb66(0x2c8)]=function(_0x438e4c){const _0x3b692b=_0x57fb66;if(this[_0x3b692b(0x1dd)]===undefined)this[_0x3b692b(0x15a)]();if(this[_0x3b692b(0x1dd)][_0x3b692b(0xbc)]===undefined)this[_0x3b692b(0x15a)]();this[_0x3b692b(0x1dd)][_0x3b692b(0xbc)]=_0x438e4c||0x1;},Game_System['prototype'][_0x57fb66(0x1f6)]=function(){const _0x55e02d=_0x57fb66;if(this[_0x55e02d(0x1dd)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x55e02d(0x106)]===undefined)this['initMessageCore']();return this[_0x55e02d(0x1dd)]['choiceCols'];},Game_System['prototype'][_0x57fb66(0x124)]=function(_0x54dc36){const _0x485a20=_0x57fb66;if(this[_0x485a20(0x1dd)]===undefined)this[_0x485a20(0x15a)]();if(this[_0x485a20(0x1dd)][_0x485a20(0x106)]===undefined)this['initMessageCore']();this[_0x485a20(0x1dd)][_0x485a20(0x106)]=_0x54dc36||0x1;},Game_System[_0x57fb66(0x20d)][_0x57fb66(0xc1)]=function(){const _0x485fe9=_0x57fb66;if(this[_0x485fe9(0x1dd)]===undefined)this[_0x485fe9(0x15a)]();if(this[_0x485fe9(0x1dd)][_0x485fe9(0x9a)]===undefined)this[_0x485fe9(0x15a)]();return this[_0x485fe9(0x1dd)][_0x485fe9(0x9a)];},Game_System[_0x57fb66(0x20d)]['setChoiceListTextAlign']=function(_0x23f964){const _0x3d86c3=_0x57fb66;if(this['_MessageCoreSettings']===undefined)this[_0x3d86c3(0x15a)]();if(this[_0x3d86c3(0x1dd)][_0x3d86c3(0x9a)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x3d86c3(0x9a)]=_0x23f964[_0x3d86c3(0x2d0)]();},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1b0)]=Game_Party[_0x57fb66(0x20d)][_0x57fb66(0x2fb)],Game_Party[_0x57fb66(0x20d)][_0x57fb66(0x2fb)]=function(){const _0x32ec08=_0x57fb66;VisuMZ[_0x32ec08(0x2b9)][_0x32ec08(0x1b0)][_0x32ec08(0x2a1)](this),this['initMessageCore']();},Game_Party[_0x57fb66(0x20d)][_0x57fb66(0x15a)]=function(){const _0x216bd7=_0x57fb66;this[_0x216bd7(0x280)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x57fb66(0x20d)]['getLastGainedItemData']=function(){const _0x3ce94f=_0x57fb66;if(this[_0x3ce94f(0x280)]===undefined)this[_0x3ce94f(0x15a)]();return this[_0x3ce94f(0x280)];},Game_Party[_0x57fb66(0x20d)][_0x57fb66(0xae)]=function(_0x50ccba,_0x158669){const _0x4b1a74=_0x57fb66;if(this[_0x4b1a74(0x280)]===undefined)this['initMessageCore']();if(!_0x50ccba)return;if(DataManager[_0x4b1a74(0x1ba)](_0x50ccba))_0x4b1a74(0x241)!=='tWFqg'?(this['clearCommandList'](),this[_0x4b1a74(0x21e)](),this[_0x4b1a74(0x2c9)]&&(this[_0x4b1a74(0x140)](),this['placeCancelButton']()),this[_0x4b1a74(0x210)](),this[_0x4b1a74(0x13b)](),this[_0x4b1a74(0xd1)](),_0x15f3d9['prototype'][_0x4b1a74(0x292)]['call'](this)):this[_0x4b1a74(0x280)][_0x4b1a74(0x80)]=0x0;else{if(DataManager[_0x4b1a74(0x7a)](_0x50ccba))this['_lastGainedItemData'][_0x4b1a74(0x80)]=0x1;else{if(DataManager[_0x4b1a74(0x2e0)](_0x50ccba)){if('ZNAhq'==='ZNAhq')this[_0x4b1a74(0x280)][_0x4b1a74(0x80)]=0x2;else return _0x424a73['status']&&_0x14a00e[_0x4b1a74(0x89)][_0x4b1a74(0x18c)]('['+_0x286ac3+']');}}}this['_lastGainedItemData']['id']=_0x50ccba['id'],this['_lastGainedItemData']['quantity']=_0x158669;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party[_0x57fb66(0x20d)][_0x57fb66(0x2a8)],Game_Party[_0x57fb66(0x20d)]['gainItem']=function(_0x2da8a4,_0x5546c9,_0x3776e3){const _0x50c31c=_0x57fb66;VisuMZ[_0x50c31c(0x2b9)]['Game_Party_gainItem'][_0x50c31c(0x2a1)](this,_0x2da8a4,_0x5546c9,_0x3776e3),_0x5546c9>0x0&&('jDFOC'!==_0x50c31c(0x238)?this['setLastGainedItemData'](_0x2da8a4,_0x5546c9):this[_0x50c31c(0x1d9)]());},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1a8)]=Game_Map[_0x57fb66(0x20d)][_0x57fb66(0x2fb)],Game_Map[_0x57fb66(0x20d)][_0x57fb66(0x2fb)]=function(){const _0x1f50f0=_0x57fb66;VisuMZ[_0x1f50f0(0x2b9)]['Game_Map_initialize'][_0x1f50f0(0x2a1)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1f1)]=Game_Map['prototype'][_0x57fb66(0x201)],Game_Map[_0x57fb66(0x20d)][_0x57fb66(0x201)]=function(){const _0x4348=_0x57fb66;VisuMZ['MessageCore'][_0x4348(0x1f1)][_0x4348(0x2a1)](this),this[_0x4348(0x2e8)]=[];},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1e6)]=Game_Map[_0x57fb66(0x20d)]['updateEvents'],Game_Map[_0x57fb66(0x20d)][_0x57fb66(0x17f)]=function(){const _0x33553d=_0x57fb66;VisuMZ[_0x33553d(0x2b9)]['Game_Map_updateEvents'][_0x33553d(0x2a1)](this),this['updateMessageCommonEvents']();},Game_Map['prototype'][_0x57fb66(0x1ee)]=function(_0x519077){const _0x5e7f8a=_0x57fb66;if(!$dataCommonEvents[_0x519077])return;this[_0x5e7f8a(0x2e8)]=this[_0x5e7f8a(0x2e8)]||[];const _0x1d57e4=this['_interpreter'][_0x5e7f8a(0x86)],_0x30b15a=new Game_MessageCommonEvent(_0x519077,_0x1d57e4);this[_0x5e7f8a(0x2e8)][_0x5e7f8a(0xfe)](_0x30b15a);},Game_Map[_0x57fb66(0x20d)]['updateMessageCommonEvents']=function(){const _0x489bef=_0x57fb66;this['_messageCommonEvents']=this[_0x489bef(0x2e8)]||[];for(const _0x54d470 of this[_0x489bef(0x2e8)]){!_0x54d470[_0x489bef(0x1b6)]?this[_0x489bef(0x2e8)][_0x489bef(0x2a0)](_0x54d470):_0x489bef(0x1cf)===_0x489bef(0x1cf)?_0x54d470[_0x489bef(0x250)]():_0x3b5168['x']-=_0x5968ef[_0x489bef(0xf2)];}},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0x115)]=function(_0x2f5e21){const _0xd2fa71=_0x57fb66;if($gameMessage['isBusy']())return![];return this['prepareShowTextCommand'](_0x2f5e21),this[_0xd2fa71(0x2c6)](_0x2f5e21),this['prepareShowTextFollowups'](_0x2f5e21),this['setWaitMode'](_0xd2fa71(0x9f)),!![];},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0xfa)]=function(_0x1f2cb7){const _0x287225=_0x57fb66;$gameMessage[_0x287225(0xe4)](_0x1f2cb7[0x0],_0x1f2cb7[0x1]),$gameMessage[_0x287225(0x19c)](_0x1f2cb7[0x2]),$gameMessage['setPositionType'](_0x1f2cb7[0x3]),$gameMessage[_0x287225(0xa9)](_0x1f2cb7[0x4]);},Game_Interpreter['prototype']['addContinuousShowTextCommands']=function(_0x30ec21){const _0x1654dd=_0x57fb66;while(this['isContinuePrepareShowTextCommands']()){this[_0x1654dd(0x226)]++;if(this[_0x1654dd(0x121)]()['code']===0x191){if(_0x1654dd(0x114)!==_0x1654dd(0x114)){_0x51a0da=_0xb3a344[_0x1654dd(0x147)](/\x1b!/g,''),_0x20d1f2=_0x1b6149[_0x1654dd(0x147)](/\x1b\|/g,''),_0x5b061e=_0x1f8314['replace'](/\x1b\./g,'');const _0x3d6876=this[_0x1654dd(0x232)](_0x684705,0x0,0x0,0x0),_0x4ea659=this[_0x1654dd(0x2f4)]();return _0x3d6876[_0x1654dd(0x1ad)]=![],this['processAllText'](_0x3d6876),this[_0x1654dd(0x291)](_0x4ea659),{'width':_0x3d6876['outputWidth'],'height':_0x3d6876[_0x1654dd(0x15d)]};}else $gameMessage[_0x1654dd(0xca)](this[_0x1654dd(0x121)]()[_0x1654dd(0xcf)][0x0]);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0x245)]=function(){const _0x1104c2=_0x57fb66;return this['nextEventCode']()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this[_0x1104c2(0x283)]()===0x191;},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0x2f0)]=function(){const _0x29cb9d=_0x57fb66;return $gameMessage[_0x29cb9d(0x158)][_0x29cb9d(0xd9)]>=$gameSystem[_0x29cb9d(0x1aa)]()&&this[_0x29cb9d(0x283)]()!==0x191;},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0xa4)]=function(_0x3856ba){const _0x38a094=_0x57fb66;switch(this[_0x38a094(0x283)]()){case 0x66:this['_index']++,this[_0x38a094(0xc2)](this[_0x38a094(0x121)]()[_0x38a094(0xcf)]);break;case 0x67:this[_0x38a094(0x226)]++,this['setupNumInput'](this['currentCommand']()[_0x38a094(0xcf)]);break;case 0x68:this['_index']++,this[_0x38a094(0x29e)](this[_0x38a094(0x121)]()[_0x38a094(0xcf)]);break;}},VisuMZ['MessageCore'][_0x57fb66(0x2e6)]=Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0xc2)],Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0xc2)]=function(_0x478349){const _0xd18950=_0x57fb66;_0x478349=this[_0xd18950(0x230)](),VisuMZ[_0xd18950(0x2b9)]['Game_Interpreter_setupChoices'][_0xd18950(0x2a1)](this,_0x478349);},Game_Interpreter[_0x57fb66(0x20d)][_0x57fb66(0x230)]=function(){const _0x1a92d8=_0x57fb66,_0x9103a=this[_0x1a92d8(0x226)],_0x4b3f3a=[];let _0x2c16c6=0x0;this[_0x1a92d8(0x226)]++;while(this['_index']<this[_0x1a92d8(0x97)][_0x1a92d8(0xd9)]){if('xQfUJ'===_0x1a92d8(0x215)){if(this['_MessageCoreSettings']===_0x107098)this['initMessageCore']();if(this[_0x1a92d8(0x1dd)][_0x1a92d8(0xb8)]===_0x402444)this['initMessageCore']();this[_0x1a92d8(0x1dd)][_0x1a92d8(0xb8)]=_0x313459||0x1;}else{if(this['currentCommand']()[_0x1a92d8(0x18d)]===this['_indent']){if(this[_0x1a92d8(0x121)]()[_0x1a92d8(0x200)]===0x194&&this[_0x1a92d8(0x283)]()!==0x66)break;else{if(this[_0x1a92d8(0x121)]()['code']===0x66)_0x1a92d8(0x6e)===_0x1a92d8(0x6e)?(this[_0x1a92d8(0x217)](_0x2c16c6,this[_0x1a92d8(0x121)](),_0x9103a),this[_0x1a92d8(0x226)]-=0x2):this[_0x1a92d8(0x25c)](_0x43bed0);else this['currentCommand']()[_0x1a92d8(0x200)]===0x192&&(this['currentCommand']()['parameters'][0x0]=_0x2c16c6,_0x2c16c6++);}}this[_0x1a92d8(0x226)]++;}}return this['_index']=_0x9103a,this[_0x1a92d8(0x121)]()[_0x1a92d8(0xcf)];},Game_Interpreter['prototype'][_0x57fb66(0x217)]=function(_0x50b854,_0x4bc686,_0x5bf837){const _0x2a5e4e=_0x57fb66;this[_0x2a5e4e(0x189)](_0x50b854,_0x4bc686,_0x5bf837),this['adjustShowChoiceCancel'](_0x50b854,_0x4bc686,_0x5bf837),this[_0x2a5e4e(0xff)](_0x4bc686,_0x5bf837);},Game_Interpreter['prototype'][_0x57fb66(0x189)]=function(_0x36473b,_0x9a7312,_0x3a1235){const _0xe9181e=_0x57fb66;if(_0x9a7312[_0xe9181e(0xcf)][0x2]<0x0)return;const _0x59f3ce=_0x9a7312[_0xe9181e(0xcf)][0x2]+_0x36473b;this[_0xe9181e(0x97)][_0x3a1235][_0xe9181e(0xcf)][0x2]=_0x59f3ce;},Game_Interpreter['prototype'][_0x57fb66(0x119)]=function(_0x1f07c1,_0x5261e2,_0x1dd09f){const _0x2e8ed1=_0x57fb66;if(_0x5261e2[_0x2e8ed1(0xcf)][0x1]>=0x0){var _0x56fae2=_0x5261e2[_0x2e8ed1(0xcf)][0x1]+_0x1f07c1;this[_0x2e8ed1(0x97)][_0x1dd09f][_0x2e8ed1(0xcf)][0x1]=_0x56fae2;}else _0x5261e2[_0x2e8ed1(0xcf)][0x1]===-0x2&&(this[_0x2e8ed1(0x97)][_0x1dd09f]['parameters'][0x1]=_0x5261e2['parameters'][0x1]);},Game_Interpreter['prototype'][_0x57fb66(0xff)]=function(_0x143f86,_0x270355){const _0x3166dc=_0x57fb66;for(const _0x132f39 of _0x143f86[_0x3166dc(0xcf)][0x0]){this[_0x3166dc(0x97)][_0x270355][_0x3166dc(0xcf)][0x0][_0x3166dc(0xfe)](_0x132f39);}this[_0x3166dc(0x97)]['splice'](this['_index']-0x1,0x2);};function _0x2d03(){const _0x54cdd3=['faceName','defaultColor','width','version','_wordWrap','makeCommandList','none','convertMessageCoreEscapeActions','ActionJS','_action','addMessageCoreCommands','HYDYO','gvxJL','_index','</B>','isSceneMap','_wholeMoveDuration','obtainItem','onProcessCharacter','Window_Base_processEscapeCharacter','WRAPBREAK','\x1bTEXTALIGNMENT[0]','_textDelay','addContinuousShowChoices','max','createTextState','parseChoiceText','MaxCols','</CENTER>','TextJS','processAutoColorWords','bUyEu','true','lLwIU','<LINE\x20BREAK>','ConvertParams','updateNameBoxMove','textSizeExWordWrap','name','isWordWrapEnabled','tWFqg','map\x20player','mmbDC','wWOSt','isContinuePrepareShowTextCommands','moveTo','colSpacing','CreateAutoColorRegExpLists','SHOW','vKlVy','TraSB','SWITCHES','convertHardcodedEscapeReplacements','match','TextStr','update','Settings','convertLockColorsEscapeCharacters','clampPlacementPosition','</LEFT>','convertTextMacros','filter','EVAL','tPKwD','\x1bC[%1]%2\x1bPREVCOLOR[0]','processCharacter','messageWindowRect','processWrapBreak','zKlpb','onNewPageMessageCore','ParseWeaponNotetags','textSizeExTextAlignment','isChoiceEnabled','textSpeed','maxCommands','normalColor','bScUr','TextSpeed','</WORDWRAP>','emerge','HIDE','updateOverlappingY','return\x20\x27','getTextAlignment','processColorLock','_data','DefaultOutlineWidth','NameBoxWindowDefaultColor','COMMONEVENT','zRGFU','Actors','snWFf','Window_ChoiceList_updatePlacement','Armors','moveBy','Window_Base_processNewLine','makeData','getChoiceListLineHeight','commandName','ChoiceWindowProperties','isMessageWindowWordWrap','ChoiceWindowLineHeight','findTargetSprite','_lastGainedItemData','event','addedHeight','nextEventCode','ParseSkillNotetags','AutoColorRegExp','processControlCharacter','CkRex','NiTvK','makeFontBigger','\x1bTEXTALIGNMENT[2]','Skills','isColorLocked','hzgvY','innerHeight','processDrawPicture','updateOffsetPosition','returnPreservedFontSettings','refresh','choices','updateForcedPlacement','processPyTextCode','ParseStateNotetags','Window_Base_textSizeEx','boxWidth','battleTargetName','MessageWindow','messageCoreTextSpeed','Enemies','Scene_Boot_onDatabaseLoaded','setupItemChoice','innerWidth','remove','call','bzGvp','prepareAutoSizeEscapeCharacters','processFsTextCode','parse','return\x200','\x1bCOLORLOCK[0]','gainItem','setChoiceListTextAlign','calcMoveEasing','1158365KkUeXy','helpWordWrap','133010FZtPsl','close','TEXTALIGNMENT','convertEscapeCharacters','processCommonEvent','itemHeight','clearActorNameAutoColor','mGUPD','min','launchMessageCommonEvent','\x1bCOLORLOCK[1]','ARRAYNUM','MessageCore','lkFop','outlineWidth','[0]','_colorLock','messageWidth','ParseClassNotetags','sort','</RIGHT>','_autoColorActorNames','JghUV','partyMemberName','xZgZk','addContinuousShowTextCommands','Width','setChoiceListMaxRows','_messageWindow','maziz','Window_Message_clearFlags','MessageRows','Window_Message_isTriggered',')))','qTqOz','toLowerCase','twbsG','HelpWindow','Type','Window_Message_terminateMessage','paintOpacity','Window_Message_newPage','addGeneralOptions','textColor','outLineColor','currencyUnit','NameBoxWindowOffsetY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_forcedPosition','setup','_dimmerSprite','isArmor','processPxTextCode','RckoY','FontSmallerCap','XkLRC','1400436fAfiZo','Game_Interpreter_setupChoices','actorName','_messageCommonEvents','lineHeight','isChoiceVisible','ukGPW','getMessageWindowWidth','processPreviousColor','\x5c%1','WhIVw','isBreakShowTextCommands','join','CENTERPICTURE','startY','getPreservedFontSettings','lYjiq','callOkHandler','process_VisuMZ_MessageCore_TextMacros','ARRAYSTRUCT','xFEmn','bind','initialize','tWlTc','convertFontSettingsEscapeCharacters','TextColor%1','bttvP','isRunning','LineHeight','item','postConvertEscapeCharacters','qPfCk','maxFontSizeInLine','icbYU','itemRectWithPadding','processTextAlignmentChange','ConfigManager_makeData','NameBoxWindowOffsetX','isWeapon','<WORDWRAP>','substring','Center','gGyyn','currentExt','type','fontBold','CreateAutoColorFor','OKHUe','left','naLQB','_eventId','contentsHeight','yVwvD','description','windowWidth','windowX','mZWgF','UpboJ','processMessageCoreEscapeActions','default','clearCommandList','_textColorStack','_moveTargetHeight','updateTransform','fontSize','Window_Options_isVolumeSymbol','clear','_list','Window_Base_processAllText','isAutoColorAffected','choiceTextAlign','_autoSizeRegexp','center','BCMmv','outlineColor','message','StretchDimmedBg','false','contents','setRelativePosition','prepareShowTextFollowups','AizAe','updateAutoPosition','resetFontSettings','convertVariableEscapeCharacters','setSpeakerName','TextCodeReplace','isSceneBattle','bcEzW','</COLORLOCK>','setLastGainedItemData','4581256xPqXTT','ALL','</I>','members','Window_NameBox_updatePlacement','rtl','\x1bTEXTALIGNMENT[3]','messagePositionReset','index','choiceLineHeight','DhFIy','AdjustRect','ARRAYEVAL','choiceRows','\x1bITALIC[0]','addLoadListener','Mtpuk','ConfigManager_applyData','getChoiceListTextAlign','setupChoices','FontChangeValue','General','changePaintOpacity','MaxRows','padding','setColorLock','process_VisuMZ_MessageCore_AutoColor','add','textSizeEx','nGtwE','clearFlags','preFlushTextState','parameters','addCommand','refreshDimmerBitmap','processStoredAutoColorChanges','_textDelayCount','right','convertBackslashCharacters','_autoPosRegExp','processFontChangeBold','kwnBR','length','postFlushTextState','Instant','databaseObjectName','WordWrap','fsRmu','height','_target','JtxmD','MessageWidth','ITALIC','setFaceImage','urfCO','kzXyO','UiHqh','blt','changeValue','changeTextSpeed','process_VisuMZ_MessageCore_TextCodes_Replace','convertShowChoiceEscapeCodes','sfBfi','stretchDimmerSprite','OlVGE','registerCommand','Game_System_initialize','startX','sEfvx','convertTextAlignmentEscapeCharacters','drawTextEx','convertChoiceMacros','followers','isVolumeSymbol','toUpperCase','prepareShowTextCommand','bbPqi','isInputting','_centerMessageWindow','push','addExtraShowChoices','slice','_moveEasingType','ConvertTextAutoColorRegExpFriendly','mHJTh','isTriggered','value','choiceCols','getChoiceListMaxRows','Window_Message_processEscapeCharacter','applyMoveEasing','processNewLine','isPressed','convertBaseEscapeCharacters','Window_Base_processControlCharacter','scale','drawBackPicture','open','resetTextColor','TextMacros','Window_Base_changeTextColor','ilNch','command101','processAutoPosition','ZwHEM','<BR>','adjustShowChoiceCancel','setTextAlignment','textCodeCheck','preemptive','resetPositionX','openness','preConvertEscapeCharacters','fontFace','currentCommand','_textAlignment','easeInOut','setChoiceListMaxColumns','Window_NameBox_refresh','_autoSizeCheck','FUNC','mainFontFace','YhYLo','activate','textCodeResult','boxHeight','placeCancelButton','ZAtEO','qfdZa','EndPadding','mXIVz','process_VisuMZ_MessageCore_TextCodes_Action','test','addedWidth','messageCoreWindowX','<CENTER>','commandSymbol','makeDeepCopy','333kpJGkC','aEzRK','updateBackground','\x1bWrapBreak[0]','maxChoiceWidth','Window_Message_synchronizeNameBox','maxCols','updatePlacement','iconIndex','convertNewPageTextStateMacros','ParseArmorNotetags','textSpeedStatusText','terminateMessage','map\x20party','replace','prepareWordWrapEscapeCharacters','_showFast','<RIGHT>','Window_Options_addGeneralOptions','clamp','fontItalic','battle\x20party','battleActionName','WAIT','resetRect','iaLVZ','Match','<B>','lxtCK','Undefined','trim','_texts','easeIn','initMessageCore','FontBiggerCap','NcYfh','outputHeight','SortObjectByKeyLength','Scene_Options_maxCommands','setMessageWindowRows','Window_Options_changeVolume','VisuMZ_0_CoreEngine','cQsjY','_relativePosition','unshift','States','WORD_WRAP_PADDING','canMove','setMessageWindowWidth','obtainEscapeParam','choicePositionType','messageWordWrap','Window_Message_updatePlacement','_autoPositionTarget','text','Items','isHelpWindowWordWrap','<COLORLOCK>','format','Rows','TZQMd','applyData','_moveTargetY','battleUserName','MessageTextDelay','getConfigValue','GATXn','exec','aOJlz','ParseEnemyNotetags','updateEvents','processDrawCenteredPicture','_moveTargetX','onDatabaseLoaded','TextColor','Window_Base_update','nTGJh','textWidth','indexOf','synchronizeNameBox','adjustShowChoiceDefault','split','calcWindowHeight','includes','indent','updateRelativePosition','convertMessageCoreEscapeReplacements','changeTextColor','TextCodeActions','_moveDuration','drawBackCenteredPicture','TextManager_message','Window_Help_refresh','Name','processAutoSize','ncwxC','_nameBoxWindow','processAllText','statusText','setBackground','hwiRr','AddOption','akaRo','obtainGold','setChoiceListLineHeight','loadPicture','contentsBack','exit','<LEFT>','_targets','Pftnt','Game_Map_initialize','jFmvo','getMessageWindowRows','ChoiceWindowMaxRows','RelativePXPY','drawing','ChoiceWindowMaxCols','ZstqJ','Game_Party_initialize','initTextAlignement','battle\x20enemy','_commonEventId','outputWidth','_resetRect','_interpreter','Weapons','getLastGainedItemData','round','isItem','\x1bBOLD[1]','setWordWrap','ParseItemNotetags','\x1bI[%1]','obtainExp','AYsJI','_spriteset','\x1bi[%1]%2','processFontChangeItalic','isRTL','SCVlS','QDSFB','maxLines','updateDimensions','AddAutoColor','DeQxM','windowPadding','escapeStart','AutoColor','\x1bTEXTALIGNMENT[1]','EhaKx','_messagePositionReset','SWITCH','addWrapBreakAfterPunctuation','mBlfA','mAyDX','12fiZyJu','_moveTargetWidth','_cancelButton','addMessageCoreTextSpeedCommand','registerActorNameAutoColorChanges','resetWordWrap','363111BNsrlO','startWait','_MessageCoreSettings','constructor','setMessageWindowWordWrap','2418199XVjTTn','58AEPhyw','xpNsT','map\x20actor','fHoqA','numVisibleRows','Game_Map_updateEvents','ANY','_scene','faceWidth','victory','floor','Classes','map','addMessageCommonEvent','<%1>','rBYXj','Game_Map_setupEvents','KOFKC','wuGAT','PREVCOLOR','actor','getChoiceListMaxColumns','processActorNameAutoColorChanges','ceil','messageRows','AutoColorBypassList','battle\x20actor','processCustomWait','Window_Options_statusText','diTdQ','Window_Base_initialize','code','setupEvents','updateMove','ARRAYJSON','processEscapeCharacter','quantity','status','cXFym','FastForwardKey','setTextDelay','SSKfp','LzLIZ','updateAutoSizePosition','prototype','39669Yjwqvu','map\x20event','createContents','mKokN','CreateAutoColorRegExpListEntries','start','Window_ChoiceList_windowX','fOUpl','MkGFj','adjustShowChoiceExtension','obtainEscapeString'];_0x2d03=function(){return _0x54cdd3;};return _0x2d03();}function Game_MessageCommonEvent(){const _0x484ef6=_0x57fb66;this[_0x484ef6(0x2fb)](...arguments);}Game_MessageCommonEvent[_0x57fb66(0x20d)]['initialize']=function(_0x573f30,_0x83fba9){const _0x18d5f6=_0x57fb66;this['_commonEventId']=_0x573f30,this[_0x18d5f6(0x86)]=_0x83fba9||0x0,this['refresh']();},Game_MessageCommonEvent[_0x57fb66(0x20d)][_0x57fb66(0x281)]=function(){const _0x30e7f1=_0x57fb66;return $dataCommonEvents[this[_0x30e7f1(0x1b3)]];},Game_MessageCommonEvent[_0x57fb66(0x20d)]['list']=function(){const _0x4a25b4=_0x57fb66;return this[_0x4a25b4(0x281)]()['list'];},Game_MessageCommonEvent[_0x57fb66(0x20d)][_0x57fb66(0x292)]=function(){const _0xf1eb7=_0x57fb66;this['_interpreter']=new Game_Interpreter(),this['_interpreter'][_0xf1eb7(0x2de)](this['list'](),this[_0xf1eb7(0x86)]);},Game_MessageCommonEvent[_0x57fb66(0x20d)][_0x57fb66(0x250)]=function(){const _0x58318f=_0x57fb66;if(this['_interpreter']){if(this[_0x58318f(0x1b6)][_0x58318f(0x6f)]())this['_interpreter'][_0x58318f(0x250)]();else{if('VHJiS'===_0x58318f(0xe1))return _0x1ac8c7=this[_0x58318f(0x255)](_0x239292),_0x165cd5=this[_0x58318f(0xd5)](_0x897c00),_0x4a7689=this[_0x58318f(0xa8)](_0x31f60f),_0x1015e5=this['preConvertEscapeCharacters'](_0x54e515),_0x4f5319=this[_0x58318f(0xec)](_0x45a5ba),_0x24b154=this[_0x58318f(0x6c)](_0x566eeb),_0x36cf62=this[_0x58318f(0xf4)](_0x2e48fd),_0x49c0ae=this['convertLockColorsEscapeCharacters'](_0x21813a),_0x165a48=this[_0x58318f(0x10c)](_0x2ab8ab),_0x586c9c=this[_0x58318f(0x24d)](_0x15bcef),_0x231d62=this[_0x58318f(0x220)](_0xb0de7b),_0x4b5a51=this['convertMessageCoreEscapeReplacements'](_0x49f5cc),_0x3dcf6f=this[_0x58318f(0x72)](_0x1da75b),_0x49a4f3=this[_0x58318f(0xa8)](_0x5be2e9),_0xd12a18=this[_0x58318f(0x237)](_0x113890),_0x5c9258=this[_0x58318f(0x148)](_0x458e5a),_0x343924;else this[_0x58318f(0x96)]();}}},Game_MessageCommonEvent[_0x57fb66(0x20d)]['clear']=function(){const _0x50f04f=_0x57fb66;this[_0x50f04f(0x1b6)]=null;},Scene_Message[_0x57fb66(0x20d)][_0x57fb66(0x25b)]=function(){const _0x185d49=_0x57fb66,_0x3b0f98=Math[_0x185d49(0x2b5)](Graphics[_0x185d49(0x21b)],$gameSystem[_0x185d49(0x2ec)]()),_0x15c70c=$gameSystem['getMessageWindowRows'](),_0x4d4df3=this[_0x185d49(0x18b)](_0x15c70c,![]),_0x2e745d=(Graphics[_0x185d49(0x298)]-_0x3b0f98)/0x2,_0x42b292=0x0;return new Rectangle(_0x2e745d,_0x42b292,_0x3b0f98,_0x4d4df3);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x15f)]=Scene_Options['prototype'][_0x57fb66(0x263)],Scene_Options[_0x57fb66(0x20d)][_0x57fb66(0x263)]=function(){const _0x388c21=_0x57fb66;let _0x282f8f=VisuMZ[_0x388c21(0x2b9)]['Scene_Options_maxCommands'][_0x388c21(0x2a1)](this);const _0x492c0c=VisuMZ[_0x388c21(0x2b9)][_0x388c21(0x251)];if(_0x492c0c[_0x388c21(0x266)]['AddOption']&&_0x492c0c[_0x388c21(0x266)][_0x388c21(0xba)])_0x282f8f++;return _0x282f8f;},VisuMZ['MessageCore'][_0x57fb66(0x1ff)]=Window_Base['prototype'][_0x57fb66(0x2fb)],Window_Base[_0x57fb66(0x20d)]['initialize']=function(_0x531428){const _0x8bda95=_0x57fb66;this[_0x8bda95(0x15a)](_0x531428),VisuMZ[_0x8bda95(0x2b9)]['Window_Base_initialize'][_0x8bda95(0x2a1)](this,_0x531428);},Window_Base['prototype'][_0x57fb66(0x15a)]=function(_0x3c0671){const _0x4a6bcd=_0x57fb66;this[_0x4a6bcd(0x1b1)](),this[_0x4a6bcd(0x1da)](),this['registerResetRect'](_0x3c0671);},Window_Base['prototype']['initTextAlignement']=function(){const _0x488e1d=_0x57fb66;this['setTextAlignment'](_0x488e1d(0x8f));},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x11a)]=function(_0x2751b1){this['_textAlignment']=_0x2751b1;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x26c)]=function(){const _0x352c38=_0x57fb66;return this[_0x352c38(0x122)];},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x297)]=Window_Base[_0x57fb66(0x20d)]['textSizeEx'],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xcb)]=function(_0x3c3a42){const _0x42d0f1=_0x57fb66;return this[_0x42d0f1(0x1da)](),VisuMZ[_0x42d0f1(0x2b9)][_0x42d0f1(0x297)]['call'](this,_0x3c3a42);},VisuMZ['MessageCore'][_0x57fb66(0x98)]=Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x19a)],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x19a)]=function(_0x705ff1){const _0x204a88=_0x57fb66;VisuMZ[_0x204a88(0x2b9)][_0x204a88(0x98)][_0x204a88(0x2a1)](this,_0x705ff1);if(_0x705ff1['drawing'])this[_0x204a88(0x11a)](_0x204a88(0x8f));},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x1da)]=function(){const _0x3f6965=_0x57fb66;this[_0x3f6965(0x1bc)](![]);},Window_Base['prototype']['isWordWrapEnabled']=function(){const _0x296ab4=_0x57fb66;return this[_0x296ab4(0x21d)];},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x1bc)]=function(_0x39e0ca){const _0xce70bd=_0x57fb66;return this[_0xce70bd(0x21d)]=_0x39e0ca,'';},Window_Base[_0x57fb66(0x20d)]['registerResetRect']=function(_0x5c0be4){const _0x52b28d=_0x57fb66;this['_resetRect']=JsonEx[_0x52b28d(0x138)](_0x5c0be4);},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xa7)]=function(){const _0x177cad=_0x57fb66;this['contents']['fontFace']=$gameSystem[_0x177cad(0x128)](),this[_0x177cad(0xa2)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x177cad(0xa2)][_0x177cad(0x81)]=![],this['contents']['fontItalic']=![],this[_0x177cad(0x111)]();},Window_Base['prototype'][_0x57fb66(0x111)]=function(){const _0x44b7d9=_0x57fb66;this['changeTextColor'](ColorManager[_0x44b7d9(0x264)]()),this['changeOutlineColor'](ColorManager[_0x44b7d9(0x9e)]());const _0x4a77f5=VisuMZ[_0x44b7d9(0x2b9)]['Settings'][_0x44b7d9(0xc4)];_0x4a77f5[_0x44b7d9(0x26f)]===undefined&&(_0x4a77f5['DefaultOutlineWidth']=0x3),this[_0x44b7d9(0xa2)][_0x44b7d9(0x2bb)]=_0x4a77f5[_0x44b7d9(0x26f)],this[_0x44b7d9(0xc8)](![]);},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xc8)]=function(_0x11808b){this['_colorLock']=_0x11808b;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x28c)]=function(){const _0x37dff8=_0x57fb66;return this[_0x37dff8(0x2bd)];},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x99)]=function(){return![];},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2f4)]=function(){const _0x3f87b7=_0x57fb66,_0x3078bd=[_0x3f87b7(0x120),_0x3f87b7(0x94),'fontBold',_0x3f87b7(0x14d),_0x3f87b7(0x2d8),_0x3f87b7(0x2d9),_0x3f87b7(0x2bb),_0x3f87b7(0x2d5)];let _0x5de8ad={};for(const _0x21ea38 of _0x3078bd){_0x3f87b7(0x2a2)!==_0x3f87b7(0x2a2)?this[_0x5ec31b]=_0x3c162d(this[_0x3f87b7(0x2dd)][_0x10079c]):_0x5de8ad[_0x21ea38]=this[_0x3f87b7(0xa2)][_0x21ea38];}return _0x5de8ad;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x291)]=function(_0x23772d){const _0x46e6fd=_0x57fb66;for(const _0xccdee4 in _0x23772d){if('FmSet'===_0x46e6fd(0x2ef)){const _0x281a6e=_0x25b60f['getLastGainedItemData']();if(_0x281a6e['id']<0x0)return'';let _0x10a406=null;if(_0x281a6e[_0x46e6fd(0x80)]===0x0)_0x10a406=_0x20f53e[_0x281a6e['id']];if(_0x281a6e[_0x46e6fd(0x80)]===0x1)_0x10a406=_0x5e59db[_0x281a6e['id']];if(_0x281a6e['type']===0x2)_0x10a406=_0x2c23a4[_0x281a6e['id']];if(!_0x10a406)return'';return _0x327b8f?'\x1bi[%1]%2'[_0x46e6fd(0x173)](_0x10a406[_0x46e6fd(0x141)],_0x10a406[_0x46e6fd(0x23f)]):_0x10a406[_0x46e6fd(0x23f)];}else this[_0x46e6fd(0xa2)][_0xccdee4]=_0x23772d[_0xccdee4];}},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x184)]=Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x250)],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x250)]=function(){const _0x49fea9=_0x57fb66;VisuMZ[_0x49fea9(0x2b9)][_0x49fea9(0x184)][_0x49fea9(0x2a1)](this),this[_0x49fea9(0x202)]();},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x168)]=function(){return![];},Window_Base[_0x57fb66(0x20d)]['updateMove']=function(){const _0x1b29ce=_0x57fb66;this[_0x1b29ce(0x192)]>0x0&&(this['canMove']()&&(_0x1b29ce(0x2eb)!=='qzKqp'?(this['x']=this['applyMoveEasing'](this['x'],this[_0x1b29ce(0x181)]),this['y']=this[_0x1b29ce(0x109)](this['y'],this[_0x1b29ce(0x177)]),this[_0x1b29ce(0x21b)]=this['applyMoveEasing'](this[_0x1b29ce(0x21b)],this[_0x1b29ce(0x1d6)]),this[_0x1b29ce(0xdf)]=this[_0x1b29ce(0x109)](this['height'],this[_0x1b29ce(0x92)]),this[_0x1b29ce(0x253)]()):this[_0x1b29ce(0x16a)](_0x290ea6)),this['_moveDuration']--);},Window_Base['prototype'][_0x57fb66(0x253)]=function(_0x1bf52f,_0x3c1eed){const _0x379b9f=_0x57fb66;if(!_0x1bf52f){if(_0x379b9f(0x1e2)===_0x379b9f(0x1e2))this['width']=Math[_0x379b9f(0x2b5)](this[_0x379b9f(0x21b)],Graphics['width']),this[_0x379b9f(0xdf)]=Math[_0x379b9f(0x2b5)](this[_0x379b9f(0xdf)],Graphics[_0x379b9f(0xdf)]);else{if(this[_0x379b9f(0x1dd)]===_0x215423)this[_0x379b9f(0x15a)]();if(this[_0x379b9f(0x1dd)][_0x379b9f(0x106)]===_0x1cfea3)this[_0x379b9f(0x15a)]();return this[_0x379b9f(0x1dd)][_0x379b9f(0x106)];}}if(!_0x3c1eed){if(_0x379b9f(0x20b)!==_0x379b9f(0x1af)){const _0x5203f9=-(Math[_0x379b9f(0x1eb)](Graphics['width']-Graphics['boxWidth'])/0x2),_0x3e3347=_0x5203f9+Graphics[_0x379b9f(0x21b)]-this[_0x379b9f(0x21b)],_0x41bd26=-(Math['floor'](Graphics[_0x379b9f(0xdf)]-Graphics[_0x379b9f(0x12c)])/0x2),_0x1c5b8d=_0x41bd26+Graphics[_0x379b9f(0xdf)]-this[_0x379b9f(0xdf)];this['x']=this['x'][_0x379b9f(0x14c)](_0x5203f9,_0x3e3347),this['y']=this['y'][_0x379b9f(0x14c)](_0x41bd26,_0x1c5b8d);}else{const _0x451470=_0x1a928e['CommonEvent']||0x0;if(_0x451470>0x0)this[_0x379b9f(0x2b6)](_0x451470);}}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x109)]=function(_0x16fe37,_0x2e4310){const _0x40647f=_0x57fb66,_0xd7aaf1=this[_0x40647f(0x192)],_0x341396=this[_0x40647f(0x229)],_0x51925b=this[_0x40647f(0x2aa)]((_0x341396-_0xd7aaf1)/_0x341396),_0x1f0838=this[_0x40647f(0x2aa)]((_0x341396-_0xd7aaf1+0x1)/_0x341396),_0x12cdaa=(_0x16fe37-_0x2e4310*_0x51925b)/(0x1-_0x51925b);return _0x12cdaa+(_0x2e4310-_0x12cdaa)*_0x1f0838;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2aa)]=function(_0x42faf9){const _0x36efde=_0x57fb66,_0x5487b1=0x2;switch(this[_0x36efde(0x101)]){case 0x0:return _0x42faf9;case 0x1:return this[_0x36efde(0x159)](_0x42faf9,_0x5487b1);case 0x2:return this['easeOut'](_0x42faf9,_0x5487b1);case 0x3:return this[_0x36efde(0x123)](_0x42faf9,_0x5487b1);default:return Imported[_0x36efde(0x162)]?VisuMZ[_0x36efde(0x109)](_0x42faf9,this[_0x36efde(0x101)]):_0x42faf9;}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x246)]=function(_0x286f29,_0x53810b,_0x24f96c,_0xf7009a,_0x578d8e,_0x4e31cd){const _0x2a4c6c=_0x57fb66;this['_moveTargetX']=_0x286f29,this[_0x2a4c6c(0x177)]=_0x53810b,this[_0x2a4c6c(0x1d6)]=_0x24f96c||this[_0x2a4c6c(0x21b)],this[_0x2a4c6c(0x92)]=_0xf7009a||this['height'],this[_0x2a4c6c(0x192)]=_0x578d8e||0x1;if(this[_0x2a4c6c(0x192)]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x2a4c6c(0x192)],this['_moveEasingType']=_0x4e31cd||0x0;if(_0x578d8e<=0x0)this[_0x2a4c6c(0x202)]();},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x277)]=function(_0x106359,_0x53af8f,_0x3c2520,_0x428f15,_0x28bdd9,_0xe59954){const _0x6dcee=_0x57fb66;this[_0x6dcee(0x181)]=this['x']+_0x106359,this['_moveTargetY']=this['y']+_0x53af8f,this[_0x6dcee(0x1d6)]=this['width']+(_0x3c2520||0x0),this['_moveTargetHeight']=this[_0x6dcee(0xdf)]+(_0x428f15||0x0),this['_moveDuration']=_0x28bdd9||0x1;if(this[_0x6dcee(0x192)]<=0x0)this[_0x6dcee(0x192)]=0x1;this['_wholeMoveDuration']=this[_0x6dcee(0x192)],this[_0x6dcee(0x101)]=_0xe59954||0x0;if(_0x28bdd9<=0x0)this['updateMove']();},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x151)]=function(_0x4dda64,_0x2f5cac){const _0x5d61ca=_0x57fb66;this[_0x5d61ca(0x246)](this[_0x5d61ca(0x1b5)]['x'],this['_resetRect']['y'],this['_resetRect'][_0x5d61ca(0x21b)],this[_0x5d61ca(0x1b5)][_0x5d61ca(0xdf)],_0x4dda64,_0x2f5cac);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x113)]=Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x190)],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x190)]=function(_0x21ec82){const _0x48b131=_0x57fb66;if(this[_0x48b131(0x28c)]())return;_0x21ec82=_0x21ec82[_0x48b131(0x147)](/\,/g,''),this['_textColorStack']=this['_textColorStack']||[],this[_0x48b131(0x91)][_0x48b131(0x165)](this[_0x48b131(0xa2)][_0x48b131(0x2d8)]),VisuMZ['MessageCore'][_0x48b131(0x113)][_0x48b131(0x2a1)](this,_0x21ec82);},Window_Base['prototype']['processPreviousColor']=function(_0x454c1b){const _0x241c36=_0x57fb66;this[_0x241c36(0x16a)](_0x454c1b);if(this[_0x241c36(0x28c)]())return;if(_0x454c1b[_0x241c36(0x1ad)]){if(_0x241c36(0x1f0)===_0x241c36(0x1f0))this['_textColorStack']=this[_0x241c36(0x91)]||[],this[_0x241c36(0xa2)]['textColor']=this['_textColorStack']['shift']()||ColorManager[_0x241c36(0x264)]();else{if(!_0x18b569[_0x15f5fe])return;this[_0x241c36(0x2e8)]=this[_0x241c36(0x2e8)]||[];const _0x575cce=this[_0x241c36(0x1b6)][_0x241c36(0x86)],_0x241f3d=new _0x2b4863(_0x5c507b,_0x575cce);this['_messageCommonEvents'][_0x241c36(0xfe)](_0x241f3d);}}},Window_Base['prototype'][_0x57fb66(0x2b0)]=function(_0x329486){const _0x743301=_0x57fb66;return _0x329486=this[_0x743301(0x255)](_0x329486),_0x329486=this[_0x743301(0xd5)](_0x329486),_0x329486=this[_0x743301(0xa8)](_0x329486),_0x329486=this[_0x743301(0x11f)](_0x329486),_0x329486=this[_0x743301(0xec)](_0x329486),_0x329486=this[_0x743301(0x6c)](_0x329486),_0x329486=this[_0x743301(0xf4)](_0x329486),_0x329486=this[_0x743301(0x252)](_0x329486),_0x329486=this['convertBaseEscapeCharacters'](_0x329486),_0x329486=this['convertHardcodedEscapeReplacements'](_0x329486),_0x329486=this['convertMessageCoreEscapeActions'](_0x329486),_0x329486=this[_0x743301(0x18f)](_0x329486),_0x329486=this[_0x743301(0x72)](_0x329486),_0x329486=this[_0x743301(0xa8)](_0x329486),_0x329486=this[_0x743301(0x237)](_0x329486),_0x329486=this[_0x743301(0x148)](_0x329486),_0x329486;},Window_Base[_0x57fb66(0x20d)]['convertTextMacros']=function(_0x17a38a){const _0xa51c7a=_0x57fb66;for(const _0x3040df of VisuMZ[_0xa51c7a(0x2b9)]['Settings'][_0xa51c7a(0x112)]){_0x17a38a[_0xa51c7a(0x24e)](_0x3040df[_0xa51c7a(0x11b)])&&(_0x17a38a=_0x17a38a[_0xa51c7a(0x147)](_0x3040df[_0xa51c7a(0x11b)],_0x3040df[_0xa51c7a(0x12b)]['bind'](this)));}return _0x17a38a;},Window_Base['prototype'][_0x57fb66(0xd5)]=function(_0x466f7c){const _0x3b3780=_0x57fb66;return _0x466f7c=_0x466f7c[_0x3b3780(0x147)](/\\/g,'\x1b'),_0x466f7c=_0x466f7c[_0x3b3780(0x147)](/\x1b\x1b/g,'\x5c'),_0x466f7c;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xa8)]=function(_0x50d01b){const _0x3c02fe=_0x57fb66;for(;;){if(_0x50d01b[_0x3c02fe(0x24e)](/\\V\[(\d+)\]/gi))_0x50d01b=_0x50d01b[_0x3c02fe(0x147)](/\\V\[(\d+)\]/gi,(_0x12187d,_0xdffe59)=>this['convertBackslashCharacters'](String($gameVariables['value'](parseInt(_0xdffe59)))));else{if(_0x50d01b[_0x3c02fe(0x24e)](/\x1bV\[(\d+)\]/gi)){if(_0x3c02fe(0x216)===_0x3c02fe(0x216))_0x50d01b=_0x50d01b['replace'](/\x1bV\[(\d+)\]/gi,(_0x2a9d45,_0x1cdac3)=>this[_0x3c02fe(0xd5)](String($gameVariables[_0x3c02fe(0x105)](parseInt(_0x1cdac3)))));else{const _0x414377=_0x441335[_0x3c02fe(0x18a)](',')[_0x3c02fe(0x1ed)](_0x32466d=>_0x5a05ec(_0x32466d)||0x0);if(_0x414377[0x0]!==_0x50329b)this['_forcedPosition']['width']=_0xad5b83(_0x414377[0x2]);if(_0x414377[0x1]!==_0x249534)this[_0x3c02fe(0x2dd)][_0x3c02fe(0xdf)]=_0x4e6cac(_0x414377[0x3]);return'';}}else break;}}return _0x50d01b;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x11f)]=function(_0x517017){const _0x17840f=_0x57fb66;return this[_0x17840f(0x1d9)](),_0x517017;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x72)]=function(_0x2706d2){return _0x2706d2;},Window_Base[_0x57fb66(0x20d)]['convertShowChoiceEscapeCodes']=function(_0x599eea){const _0x324da5=_0x57fb66;return _0x599eea=_0x599eea[_0x324da5(0x147)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x599eea=_0x599eea[_0x324da5(0x147)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x599eea=_0x599eea[_0x324da5(0x147)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x599eea;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x6c)]=function(_0x3d9ae2){const _0x1f4cea=_0x57fb66;return _0x3d9ae2=_0x3d9ae2[_0x1f4cea(0x147)](/<B>/gi,_0x1f4cea(0x1bb)),_0x3d9ae2=_0x3d9ae2[_0x1f4cea(0x147)](/<\/B>/gi,'\x1bBOLD[0]'),_0x3d9ae2=_0x3d9ae2[_0x1f4cea(0x147)](/<I>/gi,'\x1bITALIC[1]'),_0x3d9ae2=_0x3d9ae2[_0x1f4cea(0x147)](/<\/I>/gi,_0x1f4cea(0xbd)),_0x3d9ae2;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xf4)]=function(_0x35994a){const _0x2e23e5=_0x57fb66;return _0x35994a=_0x35994a[_0x2e23e5(0x147)](/<LEFT>/gi,_0x2e23e5(0x1ce)),_0x35994a=_0x35994a[_0x2e23e5(0x147)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x35994a=_0x35994a[_0x2e23e5(0x147)](/<CENTER>/gi,_0x2e23e5(0x28a)),_0x35994a=_0x35994a[_0x2e23e5(0x147)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x35994a=_0x35994a[_0x2e23e5(0x147)](/<RIGHT>/gi,_0x2e23e5(0xb5)),_0x35994a=_0x35994a[_0x2e23e5(0x147)](/<\/RIGHT>/gi,_0x2e23e5(0x22e)),_0x35994a;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x252)]=function(_0x5032d7){const _0x38321e=_0x57fb66;return _0x5032d7=_0x5032d7[_0x38321e(0x147)](/<COLORLOCK>/gi,_0x38321e(0x2b7)),_0x5032d7=_0x5032d7[_0x38321e(0x147)](/<\/COLORLOCK>/gi,_0x38321e(0x2a7)),_0x5032d7=_0x5032d7[_0x38321e(0x147)](/\(\(\(/gi,_0x38321e(0x2b7)),_0x5032d7=_0x5032d7[_0x38321e(0x147)](/\)\)\)/gi,_0x38321e(0x2a7)),_0x5032d7;},Window_Base['prototype'][_0x57fb66(0x10c)]=function(_0x55e209){const _0x56beb7=_0x57fb66;return _0x55e209=_0x55e209[_0x56beb7(0x147)](/\x1bN\[(\d+)\]/gi,(_0x482074,_0x143bea)=>this[_0x56beb7(0x2e7)](parseInt(_0x143bea))),_0x55e209=_0x55e209['replace'](/\x1bP\[(\d+)\]/gi,(_0x3867d9,_0x40a45d)=>this[_0x56beb7(0x2c4)](parseInt(_0x40a45d))),_0x55e209=_0x55e209[_0x56beb7(0x147)](/\x1bG/gi,TextManager[_0x56beb7(0x2da)]),_0x55e209;},Window_Base['prototype'][_0x57fb66(0x24d)]=function(_0x488a5e){const _0x57b2fd=_0x57fb66;return _0x488a5e=_0x488a5e[_0x57b2fd(0x147)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x57b2fd(0x299)]()),_0x488a5e=_0x488a5e[_0x57b2fd(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x57b2fd(0x178)]()),_0x488a5e=_0x488a5e[_0x57b2fd(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x488a5e=_0x488a5e[_0x57b2fd(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x57b2fd(0x14f)](![])),_0x488a5e;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x299)]=function(){const _0x2a5e39=_0x57fb66;if(!SceneManager[_0x2a5e39(0xab)]())return'';if(BattleManager[_0x2a5e39(0xe0)])return BattleManager[_0x2a5e39(0xe0)][_0x2a5e39(0x23f)]();if(BattleManager[_0x2a5e39(0x1a6)][0x0])return BattleManager[_0x2a5e39(0x1a6)][0x0][_0x2a5e39(0x23f)]();return'';},Window_Base['prototype']['battleUserName']=function(){const _0xb0ae6b=_0x57fb66;if(!SceneManager[_0xb0ae6b(0xab)]())return'';let _0x42b345=null;return _0x42b345=BattleManager['_subject'],!_0x42b345&&BattleManager[_0xb0ae6b(0xfc)]()&&(_0x42b345=BattleManager[_0xb0ae6b(0x1f5)]()),_0x42b345?_0x42b345[_0xb0ae6b(0x23f)]():'';},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x14f)]=function(_0x185940){const _0x2ddbf2=_0x57fb66;if(!SceneManager[_0x2ddbf2(0xab)]())return'';let _0xefcda9=BattleManager[_0x2ddbf2(0x222)]||null;!_0xefcda9&&BattleManager[_0x2ddbf2(0xfc)]()&&(_0xefcda9=BattleManager['inputtingAction']());if(_0xefcda9&&_0xefcda9[_0x2ddbf2(0x71)]()){if('FytfO'!==_0x2ddbf2(0x211)){let _0x2d4eb8='';if(_0x185940)_0x2d4eb8+=_0x2ddbf2(0x1be)[_0x2ddbf2(0x173)](_0xefcda9['item']()[_0x2ddbf2(0x141)]);return _0x2d4eb8+=_0xefcda9[_0x2ddbf2(0x71)]()[_0x2ddbf2(0x23f)],_0x2d4eb8;}else this[_0x2ddbf2(0x1bc)](![]);}return'';},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x220)]=function(_0x5a2c0f){const _0x5a8c16=_0x57fb66;for(const _0x32a415 of VisuMZ[_0x5a8c16(0x2b9)][_0x5a8c16(0x251)][_0x5a8c16(0x191)]){_0x5a2c0f[_0x5a8c16(0x24e)](_0x32a415['textCodeCheck'])&&(_0x5a2c0f=_0x5a2c0f[_0x5a8c16(0x147)](_0x32a415['textCodeCheck'],_0x32a415[_0x5a8c16(0x12b)]),_0x5a2c0f=this[_0x5a8c16(0xa8)](_0x5a2c0f));}return _0x5a2c0f;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x18f)]=function(_0x29ab0a){const _0x4eac92=_0x57fb66;for(const _0x141b63 of VisuMZ[_0x4eac92(0x2b9)][_0x4eac92(0x251)][_0x4eac92(0xaa)]){if(_0x29ab0a[_0x4eac92(0x24e)](_0x141b63['textCodeCheck'])){if(_0x4eac92(0xe5)!==_0x4eac92(0x274))_0x29ab0a=_0x29ab0a[_0x4eac92(0x147)](_0x141b63['textCodeCheck'],_0x141b63[_0x4eac92(0x12b)]['bind'](this)),_0x29ab0a=this[_0x4eac92(0xa8)](_0x29ab0a);else{if(_0x9ab47f[_0x4eac92(0x105)](_0x442d80))return!![];}}}return _0x29ab0a;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2e7)]=function(_0x17700d){const _0x5534fb=_0x57fb66,_0x59151e=_0x17700d>=0x1?$gameActors[_0x5534fb(0x1f5)](_0x17700d):null,_0x25ddc0=_0x59151e?_0x59151e[_0x5534fb(0x23f)]():'',_0x45f0e4=Number(VisuMZ[_0x5534fb(0x2b9)][_0x5534fb(0x251)][_0x5534fb(0x1cd)]['Actors']);return this[_0x5534fb(0x99)]()&&_0x45f0e4!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5534fb(0x173)](_0x45f0e4,_0x25ddc0):_0x25ddc0;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2c4)]=function(_0xaa83){const _0x493e8d=_0x57fb66,_0x31a2a9=_0xaa83>=0x1?$gameParty[_0x493e8d(0xb2)]()[_0xaa83-0x1]:null,_0x4be9e7=_0x31a2a9?_0x31a2a9[_0x493e8d(0x23f)]():'',_0x285e43=Number(VisuMZ[_0x493e8d(0x2b9)][_0x493e8d(0x251)][_0x493e8d(0x1cd)][_0x493e8d(0x273)]);return this[_0x493e8d(0x99)]()&&_0x285e43!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x285e43,_0x4be9e7):_0x4be9e7;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x237)]=function(_0x3c72a4){const _0x4769f4=_0x57fb66;if(this[_0x4769f4(0x99)]()){if(_0x4769f4(0x25d)!==_0x4769f4(0x25d)){let _0x514e9e=_0x4080ad['text'];this[_0x4769f4(0x2dd)]={};if(this[_0x4769f4(0x240)]())return _0x514e9e;_0x514e9e=_0x514e9e[_0x4769f4(0x147)](/<POSITION:[ ]*(.*)>/gi,(_0x3e1779,_0x58003a)=>{const _0x5472f1=_0x4769f4,_0xde7a0f=_0x58003a[_0x5472f1(0x18a)](',')[_0x5472f1(0x1ed)](_0x23a3b4=>_0x184a47(_0x23a3b4)||0x0);if(_0xde7a0f[0x0]!==_0xccc187)this[_0x5472f1(0x2dd)]['x']=_0x471587(_0xde7a0f[0x0]);if(_0xde7a0f[0x1]!==_0x221cc8)this[_0x5472f1(0x2dd)]['y']=_0x40accc(_0xde7a0f[0x1]);if(_0xde7a0f[0x2]!==_0x2e1c7e)this[_0x5472f1(0x2dd)][_0x5472f1(0x21b)]=_0x2f8c40(_0xde7a0f[0x2]);if(_0xde7a0f[0x3]!==_0x2f22f3)this[_0x5472f1(0x2dd)]['height']=_0x414118(_0xde7a0f[0x3]);return'';}),_0x514e9e=_0x514e9e[_0x4769f4(0x147)](/<COORDINATES:[ ]*(.*)>/gi,(_0x33c705,_0x24d7f8)=>{const _0x442a6a=_0x4769f4,_0x300455=_0x24d7f8[_0x442a6a(0x18a)](',')['map'](_0x52c163=>_0x376bef(_0x52c163)||0x0);if(_0x300455[0x0]!==_0x5165d4)this[_0x442a6a(0x2dd)]['x']=_0x50f70a(_0x300455[0x0]);if(_0x300455[0x1]!==_0x500cf5)this[_0x442a6a(0x2dd)]['y']=_0x335e20(_0x300455[0x1]);return'';}),_0x514e9e=_0x514e9e[_0x4769f4(0x147)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x195d02,_0x4a26c7)=>{const _0x36487a=_0x4769f4,_0x1bfdfa=_0x4a26c7['split'](',')['map'](_0x18c8b4=>_0x342daa(_0x18c8b4)||0x0);if(_0x1bfdfa[0x0]!==_0x379025)this['_forcedPosition'][_0x36487a(0x21b)]=_0x3ea48b(_0x1bfdfa[0x2]);if(_0x1bfdfa[0x1]!==_0x65a7cb)this['_forcedPosition'][_0x36487a(0xdf)]=_0x5487f1(_0x1bfdfa[0x3]);return'';}),_0x4991ae[_0x4769f4(0x16f)]=_0x514e9e;}else _0x3c72a4=this[_0x4769f4(0xd2)](_0x3c72a4),_0x3c72a4=this[_0x4769f4(0x1f7)](_0x3c72a4);}return _0x3c72a4;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xd2)]=function(_0x43646e){const _0x462fcd=_0x57fb66;for(autoColor of VisuMZ['MessageCore'][_0x462fcd(0x285)]){_0x43646e=_0x43646e[_0x462fcd(0x147)](autoColor[0x0],autoColor[0x1]);}return _0x43646e;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2b3)]=function(){const _0x47a3ca=_0x57fb66;this[_0x47a3ca(0x2c2)]=[];},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x1d9)]=function(){const _0x34df05=_0x57fb66;this[_0x34df05(0x2b3)]();const _0x16f74f=VisuMZ[_0x34df05(0x2b9)]['Settings']['AutoColor'],_0x14683=_0x16f74f['Actors'];if(_0x14683<=0x0)return;for(const _0x2b58a7 of $gameActors[_0x34df05(0x26e)]){if(_0x34df05(0xd8)===_0x34df05(0xd8)){if(!_0x2b58a7)continue;const _0x260ce5=_0x2b58a7[_0x34df05(0x23f)]();if(_0x260ce5['trim']()[_0x34df05(0xd9)]<=0x0)continue;if(/^\d+$/[_0x34df05(0x133)](_0x260ce5))continue;if(_0x260ce5[_0x34df05(0x24e)](/-----/i))continue;let _0x106da8=VisuMZ[_0x34df05(0x2b9)][_0x34df05(0x102)](_0x260ce5);const _0xd29f80=new RegExp('\x5cb'+_0x106da8+'\x5cb','g'),_0x51eb4d=_0x34df05(0x259)[_0x34df05(0x173)](_0x14683,_0x260ce5);this['_autoColorActorNames'][_0x34df05(0xfe)]([_0xd29f80,_0x51eb4d]);}else this[_0x34df05(0x192)]>0x0&&(this[_0x34df05(0x168)]()&&(this['x']=this[_0x34df05(0x109)](this['x'],this[_0x34df05(0x181)]),this['y']=this['applyMoveEasing'](this['y'],this[_0x34df05(0x177)]),this[_0x34df05(0x21b)]=this[_0x34df05(0x109)](this[_0x34df05(0x21b)],this[_0x34df05(0x1d6)]),this[_0x34df05(0xdf)]=this[_0x34df05(0x109)](this[_0x34df05(0xdf)],this['_moveTargetHeight']),this[_0x34df05(0x253)]()),this['_moveDuration']--);}},Window_Base['prototype']['processActorNameAutoColorChanges']=function(_0x199cae){const _0x24ff4f=_0x57fb66;if(this[_0x24ff4f(0x2c2)]===undefined){if(_0x24ff4f(0x23a)===_0x24ff4f(0x23a))this[_0x24ff4f(0x1d9)]();else return _0x531b86[_0x24ff4f(0x20d)]['convertTextMacros'][_0x24ff4f(0x2a1)](this,_0x5baa70);}for(autoColor of this[_0x24ff4f(0x2c2)]){_0x24ff4f(0x272)===_0x24ff4f(0x2f9)?this[_0x24ff4f(0x1b6)][_0x24ff4f(0x250)]():_0x199cae=_0x199cae[_0x24ff4f(0x147)](autoColor[0x0],autoColor[0x1]);}return _0x199cae;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xdc)]=function(_0x2236c7,_0x2eb093,_0x213eeb){const _0x150e10=_0x57fb66;if(!_0x2236c7)return'';const _0x4cf410=_0x2236c7[_0x2eb093];let _0x222576='';if(_0x4cf410&&_0x213eeb&&_0x4cf410[_0x150e10(0x141)]){const _0x2748c2=_0x150e10(0x1c2);_0x222576=_0x2748c2[_0x150e10(0x173)](_0x4cf410[_0x150e10(0x141)],_0x4cf410['name']);}else _0x4cf410?_0x222576=_0x4cf410[_0x150e10(0x23f)]:_0x222576='';return this['isAutoColorAffected']()&&(_0x222576=this['applyDatabaseAutoColor'](_0x222576,_0x2236c7)),_0x222576;},Window_Base[_0x57fb66(0x20d)]['lastGainedObjectName']=function(_0x100289){const _0x5c20d8=_0x57fb66,_0x3967f7=$gameParty['getLastGainedItemData']();if(_0x3967f7['id']<0x0)return'';let _0x4b34c6=null;if(_0x3967f7[_0x5c20d8(0x80)]===0x0)_0x4b34c6=$dataItems[_0x3967f7['id']];if(_0x3967f7['type']===0x1)_0x4b34c6=$dataWeapons[_0x3967f7['id']];if(_0x3967f7[_0x5c20d8(0x80)]===0x2)_0x4b34c6=$dataArmors[_0x3967f7['id']];if(!_0x4b34c6)return'';return _0x100289?_0x5c20d8(0x1c2)[_0x5c20d8(0x173)](_0x4b34c6[_0x5c20d8(0x141)],_0x4b34c6[_0x5c20d8(0x23f)]):_0x4b34c6['name'];},Window_Base['prototype']['lastGainedObjectQuantity']=function(){const _0x12cff8=_0x57fb66,_0x2769d1=$gameParty[_0x12cff8(0x1b8)]();if(_0x2769d1['id']<=0x0)return'';return _0x2769d1[_0x12cff8(0x205)];},Window_Base[_0x57fb66(0x20d)]['applyDatabaseAutoColor']=function(_0x3b365f,_0x46113e){const _0x2948d5=_0x57fb66,_0x11f03e=VisuMZ[_0x2948d5(0x2b9)]['Settings'][_0x2948d5(0x1cd)];let _0x853b94=0x0;if(_0x46113e===$dataActors)_0x853b94=_0x11f03e[_0x2948d5(0x273)];if(_0x46113e===$dataClasses)_0x853b94=_0x11f03e[_0x2948d5(0x1ec)];if(_0x46113e===$dataSkills)_0x853b94=_0x11f03e[_0x2948d5(0x28b)];if(_0x46113e===$dataItems)_0x853b94=_0x11f03e['Items'];if(_0x46113e===$dataWeapons)_0x853b94=_0x11f03e[_0x2948d5(0x1b7)];if(_0x46113e===$dataArmors)_0x853b94=_0x11f03e['Armors'];if(_0x46113e===$dataEnemies)_0x853b94=_0x11f03e[_0x2948d5(0x29c)];if(_0x46113e===$dataStates)_0x853b94=_0x11f03e[_0x2948d5(0x166)];if(_0x853b94>0x0){if('bNTIk'!==_0x2948d5(0x129))_0x3b365f=_0x2948d5(0x259)[_0x2948d5(0x173)](_0x853b94,_0x3b365f);else{const _0x419971=_0x3e6f93[_0x2948d5(0x18a)](',')[_0x2948d5(0x1ed)](_0x489d2a=>_0x1990f5(_0x489d2a)||0x0);if(_0x419971[0x0]!==_0x1ee60d)this[_0x2948d5(0x2dd)]['x']=_0x56d6ac(_0x419971[0x0]);if(_0x419971[0x1]!==_0x1f722b)this['_forcedPosition']['y']=_0x1c2a4f(_0x419971[0x1]);if(_0x419971[0x2]!==_0x119462)this[_0x2948d5(0x2dd)][_0x2948d5(0x21b)]=_0x222e5d(_0x419971[0x2]);if(_0x419971[0x3]!==_0x105607)this[_0x2948d5(0x2dd)][_0x2948d5(0xdf)]=_0x3c4671(_0x419971[0x3]);return'';}}return _0x3b365f;},Window_Base['prototype'][_0x57fb66(0x148)]=function(_0x1cc20e){const _0x265aee=_0x57fb66;_0x1cc20e=_0x1cc20e['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x5dd542,_0x5aefda)=>this[_0x265aee(0x1bc)](!![])),_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x2cfd35,_0x42c570)=>this[_0x265aee(0x1bc)](![])),_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x1b7d90,_0x526a4)=>this[_0x265aee(0x1bc)](![]));if(_0x1cc20e[_0x265aee(0x24e)](Window_Message['_autoSizeRegexp'])){if(_0x265aee(0x2e4)!=='YKklF')this['setWordWrap'](![]);else{const _0x55a53d=_0x1aae78[_0x265aee(0x2a5)]('['+_0x37ddde['$1'][_0x265aee(0x24e)](/\d+/g)+']');for(const _0xe408c8 of _0x55a53d){if(_0x1613b2[_0x265aee(0x105)](_0xe408c8))return!![];}return![];}}else _0x1cc20e[_0x265aee(0x24e)](Window_Message['_autoPosRegExp'])&&this[_0x265aee(0x1bc)](![]);if(!this['isWordWrapEnabled']())return _0x1cc20e;if(_0x1cc20e[_0x265aee(0xd9)]<=0x0)return _0x1cc20e;return VisuMZ[_0x265aee(0x2b9)][_0x265aee(0x251)][_0x265aee(0xdd)]['LineBreakSpace']?_0x265aee(0x1e4)!=='NJEWA'?(_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/[\n\r]+/g,'\x20'),_0x1cc20e=_0x1cc20e['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x5963c6[_0x265aee(0x20d)][_0x265aee(0xd1)]['call'](this),_0x289a8a['MessageCore']['Settings'][_0x265aee(0xc4)][_0x265aee(0xa0)]&&this[_0x265aee(0xee)]()):(_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/[\n\r]+/g,''),_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x1cc20e=this['addWrapBreakAfterPunctuation'](_0x1cc20e),_0x1cc20e=_0x1cc20e['split']('\x20')[_0x265aee(0x2f1)](_0x265aee(0x13c)),_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1cc20e=_0x1cc20e[_0x265aee(0x147)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1cc20e;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x1d2)]=function(_0x1bd038){return _0x1bd038;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x278)]=Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x10a)],Window_Base['prototype'][_0x57fb66(0x10a)]=function(_0x177166){const _0x5d85b2=_0x57fb66;VisuMZ[_0x5d85b2(0x2b9)][_0x5d85b2(0x278)][_0x5d85b2(0x2a1)](this,_0x177166),this['processTextAlignmentX'](_0x177166);},VisuMZ['MessageCore']['Window_Base_processControlCharacter']=Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x286)],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x286)]=function(_0x528d15,_0x2a1c07){const _0x16f55b=_0x57fb66;VisuMZ['MessageCore'][_0x16f55b(0x10d)][_0x16f55b(0x2a1)](this,_0x528d15,_0x2a1c07);if(_0x2a1c07===_0x16f55b(0x13c)){if(_0x16f55b(0x131)!==_0x16f55b(0x131))return _0x499339[_0x16f55b(0x27a)]()+0x8;else this['processWrapBreak'](_0x528d15);}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x218)]=function(_0x55e2a1){const _0x56cbcc=_0x57fb66;var _0x47624c=/^\<(.*?)\>/['exec'](_0x55e2a1['text'][_0x56cbcc(0x100)](_0x55e2a1['index']));if(_0x47624c){if(_0x56cbcc(0xe7)===_0x56cbcc(0x198)){let _0x45d1d6=this['y'];_0x1e2c33[_0x56cbcc(0x2b9)][_0x56cbcc(0x16d)][_0x56cbcc(0x2a1)](this);if(this['_autoPositionTarget'])this['y']=_0x45d1d6;this[_0x56cbcc(0x294)](),this[_0x56cbcc(0x253)]();}else return _0x55e2a1[_0x56cbcc(0xb7)]+=_0x47624c[0x0][_0x56cbcc(0xd9)],String(_0x47624c[0x0][_0x56cbcc(0x100)](0x1,_0x47624c[0x0][_0x56cbcc(0xd9)]-0x1));}else{if(_0x56cbcc(0x1d4)!==_0x56cbcc(0x1d4))_0x2f994f['y']=this[_0x56cbcc(0x16a)](_0x56262d),_0xeb0a18[_0x56cbcc(0x2b9)][_0x56cbcc(0x251)][_0x56cbcc(0xc4)][_0x56cbcc(0x1ac)]&&(_0x8f2af1['y']+=_0x4a4040[_0x56cbcc(0x2f3)]);else return'';}},VisuMZ['MessageCore']['Window_Base_processEscapeCharacter']=Window_Base[_0x57fb66(0x20d)]['processEscapeCharacter'],Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x204)]=function(_0x377ae7,_0x4b11ff){const _0x184c48=_0x57fb66;switch(_0x377ae7){case'C':_0x4b11ff[_0x184c48(0x1ad)]?VisuMZ['MessageCore']['Window_Base_processEscapeCharacter']['call'](this,_0x377ae7,_0x4b11ff):this[_0x184c48(0x16a)](_0x4b11ff);break;case'I':case'{':case'}':VisuMZ[_0x184c48(0x2b9)][_0x184c48(0x22c)][_0x184c48(0x2a1)](this,_0x377ae7,_0x4b11ff);break;case'FS':this[_0x184c48(0x2a4)](_0x4b11ff);break;case'PX':this[_0x184c48(0x2e1)](_0x4b11ff);break;case'PY':this[_0x184c48(0x295)](_0x4b11ff);break;case'BOLD':this[_0x184c48(0xd7)](this[_0x184c48(0x16a)](_0x4b11ff));break;case _0x184c48(0x2f2):this[_0x184c48(0x180)](_0x4b11ff);break;case'COLORLOCK':this[_0x184c48(0x26d)](_0x4b11ff);break;case'COMMONEVENT':this[_0x184c48(0x2b1)](_0x4b11ff);break;case _0x184c48(0xe3):this[_0x184c48(0x1c3)](this['obtainEscapeParam'](_0x4b11ff));break;case'PICTURE':this[_0x184c48(0x28f)](_0x4b11ff);break;case _0x184c48(0x1f4):this[_0x184c48(0x2ed)](_0x4b11ff);break;case _0x184c48(0x2af):this[_0x184c48(0x77)](_0x4b11ff);break;case _0x184c48(0x150):this[_0x184c48(0x1fc)](_0x4b11ff);break;case _0x184c48(0x22d):this[_0x184c48(0x25c)](_0x4b11ff);break;default:this[_0x184c48(0x8e)](_0x377ae7,_0x4b11ff);}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x8e)]=function(_0x506406,_0x2a7d27){const _0x29b8f9=_0x57fb66;for(const _0x57a4a2 of VisuMZ[_0x29b8f9(0x2b9)][_0x29b8f9(0x251)][_0x29b8f9(0x191)]){if('Zoekm'==='Zoekm'){if(_0x57a4a2[_0x29b8f9(0x153)]===_0x506406){if('XYUxb'!=='XYUxb')_0x557e30=_0x29058c[_0x29b8f9(0x231)](_0x119137,_0x3f5e78);else{if(_0x57a4a2[_0x29b8f9(0x2d3)]==='')this['obtainEscapeParam'](_0x2a7d27);_0x57a4a2[_0x29b8f9(0x221)][_0x29b8f9(0x2a1)](this,_0x2a7d27);if(this[_0x29b8f9(0x1de)]===Window_Message){const _0x1558ea=_0x57a4a2['CommonEvent']||0x0;if(_0x1558ea>0x0)this[_0x29b8f9(0x2b6)](_0x1558ea);}}}}else return _0x509af7['MessageCore']['Window_ChoiceList_windowX'][_0x29b8f9(0x2a1)](this);}},Window_Base['prototype'][_0x57fb66(0x289)]=function(){const _0x144e28=_0x57fb66;this['contents'][_0x144e28(0x94)]+=VisuMZ[_0x144e28(0x2b9)]['Settings']['General'][_0x144e28(0xc3)],this[_0x144e28(0xa2)][_0x144e28(0x94)]=Math[_0x144e28(0x2b5)](this[_0x144e28(0xa2)][_0x144e28(0x94)],VisuMZ[_0x144e28(0x2b9)][_0x144e28(0x251)][_0x144e28(0xc4)][_0x144e28(0x15b)]);},Window_Base[_0x57fb66(0x20d)]['makeFontSmaller']=function(){const _0x1bc2c6=_0x57fb66;this[_0x1bc2c6(0xa2)][_0x1bc2c6(0x94)]-=VisuMZ[_0x1bc2c6(0x2b9)]['Settings']['General'][_0x1bc2c6(0xc3)],this['contents']['fontSize']=Math[_0x1bc2c6(0x231)](this[_0x1bc2c6(0xa2)]['fontSize'],VisuMZ[_0x1bc2c6(0x2b9)][_0x1bc2c6(0x251)]['General'][_0x1bc2c6(0x2e3)]);},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2a4)]=function(_0x4df4ee){const _0x1f1ae2=_0x57fb66,_0x2df16c=this[_0x1f1ae2(0x16a)](_0x4df4ee);this[_0x1f1ae2(0xa2)][_0x1f1ae2(0x94)]=_0x2df16c[_0x1f1ae2(0x14c)](VisuMZ['MessageCore'][_0x1f1ae2(0x251)][_0x1f1ae2(0xc4)][_0x1f1ae2(0x2e3)],VisuMZ[_0x1f1ae2(0x2b9)][_0x1f1ae2(0x251)]['General'][_0x1f1ae2(0x15b)]);},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x74)]=function(_0x5b2a37){const _0x352fb7=_0x57fb66;let _0x481544=this['contents'][_0x352fb7(0x94)];const _0x311b95=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x15dbf1=_0x311b95[_0x352fb7(0x17c)](_0x5b2a37);if(!_0x15dbf1){if(_0x352fb7(0x1fe)!=='SCKJs')break;else{_0x114ea9[_0x352fb7(0x2b9)][_0x352fb7(0x98)][_0x352fb7(0x2a1)](this,_0x51fac5);if(_0x8ba1a8[_0x352fb7(0x1ad)])this[_0x352fb7(0x11a)](_0x352fb7(0x8f));}}const _0x302254=String(_0x15dbf1[0x1])[_0x352fb7(0xf9)]();if(_0x302254==='{')this[_0x352fb7(0x289)]();else{if(_0x302254==='}'){if(_0x352fb7(0x15c)===_0x352fb7(0x7e)){if(_0x3d0aa3===_0x352fb7(0x262))return this[_0x352fb7(0xea)](_0x554b31,_0x32f3a2,_0x263293);_0x52683e[_0x352fb7(0x2b9)]['Window_Options_changeVolume'][_0x352fb7(0x2a1)](this,_0x2e3077,_0x266abc,_0x3110f9);}else this['makeFontSmaller']();}else _0x302254==='FS'&&(this[_0x352fb7(0xa2)][_0x352fb7(0x94)]=parseInt(_0x15dbf1[0x3])[_0x352fb7(0x14c)](VisuMZ[_0x352fb7(0x2b9)][_0x352fb7(0x251)][_0x352fb7(0xc4)][_0x352fb7(0x2e3)],VisuMZ[_0x352fb7(0x2b9)][_0x352fb7(0x251)][_0x352fb7(0xc4)][_0x352fb7(0x15b)]));}this[_0x352fb7(0xa2)][_0x352fb7(0x94)]>_0x481544&&(_0x481544=this[_0x352fb7(0xa2)]['fontSize']);}return _0x481544;},Window_Base['prototype']['processPxTextCode']=function(_0x4b0f4b){const _0x16cf24=_0x57fb66;_0x4b0f4b['x']=this['obtainEscapeParam'](_0x4b0f4b);if(VisuMZ['MessageCore']['Settings'][_0x16cf24(0xc4)][_0x16cf24(0x1ac)]){if('kzXyO'!==_0x16cf24(0xe6)){if(_0x1e7386[_0x16cf24(0x105)](_0x1ca134))return![];}else _0x4b0f4b['x']+=_0x4b0f4b[_0x16cf24(0xf2)];}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x295)]=function(_0x4242bf){const _0x1509e0=_0x57fb66;_0x4242bf['y']=this[_0x1509e0(0x16a)](_0x4242bf),VisuMZ[_0x1509e0(0x2b9)][_0x1509e0(0x251)][_0x1509e0(0xc4)][_0x1509e0(0x1ac)]&&(_0x4242bf['y']+=_0x4242bf[_0x1509e0(0x2f3)]);},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0xd7)]=function(_0x445303){this['contents']['fontBold']=!!_0x445303;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x1c3)]=function(_0x31c27d){const _0x4d9b5b=_0x57fb66;this[_0x4d9b5b(0xa2)][_0x4d9b5b(0x14d)]=!!_0x31c27d;},Window_Base[_0x57fb66(0x20d)]['processTextAlignmentChange']=function(_0xbba4b8){const _0x43be3e=_0x57fb66,_0x1cac3e=this[_0x43be3e(0x16a)](_0xbba4b8);if(!_0xbba4b8[_0x43be3e(0x1ad)])return;switch(_0x1cac3e){case 0x0:this[_0x43be3e(0x11a)]('default');return;case 0x1:this[_0x43be3e(0x11a)]('left');break;case 0x2:this[_0x43be3e(0x11a)](_0x43be3e(0x9c));break;case 0x3:this[_0x43be3e(0x11a)](_0x43be3e(0xd4));break;}this['processTextAlignmentX'](_0xbba4b8);},Window_Base['prototype']['processTextAlignmentX']=function(_0x4e50e1){const _0x488b21=_0x57fb66;if(!_0x4e50e1[_0x488b21(0x1ad)])return;if(_0x4e50e1['rtl'])return;if(this[_0x488b21(0x26c)]()===_0x488b21(0x8f))return;let _0x263845=_0x4e50e1[_0x488b21(0x16f)][_0x488b21(0x187)]('\x1bTEXTALIGNMENT',_0x4e50e1[_0x488b21(0xb7)]+0x1),_0x2d5679=_0x4e50e1[_0x488b21(0x16f)]['indexOf']('\x0a',_0x4e50e1[_0x488b21(0xb7)]+0x1);if(_0x263845<0x0)_0x263845=_0x4e50e1[_0x488b21(0x16f)][_0x488b21(0xd9)]+0x1;if(_0x2d5679>0x0)_0x263845=Math[_0x488b21(0x2b5)](_0x263845,_0x2d5679);const _0x2ac317=_0x4e50e1[_0x488b21(0x16f)][_0x488b21(0x7c)](_0x4e50e1[_0x488b21(0xb7)],_0x263845),_0x39b9a6=this[_0x488b21(0x260)](_0x2ac317)[_0x488b21(0x21b)],_0x25b437=_0x4e50e1[_0x488b21(0x21b)]||this[_0x488b21(0x29f)]-0x8,_0x289d47=this['constructor']===Window_Message&&$gameMessage[_0x488b21(0x219)]()!=='';switch(this['getTextAlignment']()){case _0x488b21(0x84):_0x4e50e1['x']=_0x4e50e1['startX'];break;case _0x488b21(0x9c):_0x4e50e1['x']=_0x4e50e1[_0x488b21(0xf2)],_0x4e50e1['x']+=Math[_0x488b21(0x1eb)]((_0x25b437-_0x39b9a6)/0x2);_0x289d47&&(_0x4e50e1['x']-=_0x4e50e1[_0x488b21(0xf2)]/0x2);break;case _0x488b21(0xd4):_0x4e50e1['x']=_0x25b437-_0x39b9a6+_0x4e50e1[_0x488b21(0xf2)];_0x289d47&&(_0x4e50e1['x']-=_0x4e50e1[_0x488b21(0xf2)]);break;}},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x260)]=function(_0x5bd079){const _0xe5c59b=_0x57fb66;_0x5bd079=_0x5bd079[_0xe5c59b(0x147)](/\x1b!/g,''),_0x5bd079=_0x5bd079[_0xe5c59b(0x147)](/\x1b\|/g,''),_0x5bd079=_0x5bd079['replace'](/\x1b\./g,'');const _0x402740=this[_0xe5c59b(0x232)](_0x5bd079,0x0,0x0,0x0),_0x53d8fe=this['getPreservedFontSettings']();return _0x402740[_0xe5c59b(0x1ad)]=![],this[_0xe5c59b(0x19a)](_0x402740),this[_0xe5c59b(0x291)](_0x53d8fe),{'width':_0x402740[_0xe5c59b(0x1b4)],'height':_0x402740['outputHeight']};},Window_Base[_0x57fb66(0x167)]=VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x251)]['WordWrap'][_0x57fb66(0x130)]||0x0,Window_Base['prototype'][_0x57fb66(0x25c)]=function(_0x45877e){const _0x1869b2=_0x57fb66,_0x1447a4=(_0x45877e['rtl']?-0x1:0x1)*this[_0x1869b2(0x186)]('\x20');_0x45877e['x']+=_0x1447a4;if(this[_0x1869b2(0x16a)](_0x45877e)>0x0)_0x45877e['x']+=_0x1447a4;if(_0x45877e[_0x1869b2(0xb4)])return;let _0x128744=_0x45877e[_0x1869b2(0x16f)][_0x1869b2(0x187)](_0x1869b2(0x13c),_0x45877e[_0x1869b2(0xb7)]+0x1),_0x4621c3=_0x45877e[_0x1869b2(0x16f)][_0x1869b2(0x187)]('\x0a',_0x45877e[_0x1869b2(0xb7)]+0x1);if(_0x128744<0x0)_0x128744=_0x45877e[_0x1869b2(0x16f)][_0x1869b2(0xd9)]+0x1;if(_0x4621c3>0x0)_0x128744=Math['min'](_0x128744,_0x4621c3);const _0x2d89e2=_0x45877e[_0x1869b2(0x16f)][_0x1869b2(0x7c)](_0x45877e[_0x1869b2(0xb7)],_0x128744),_0x1b2842=this['textSizeExWordWrap'](_0x2d89e2)[_0x1869b2(0x21b)];let _0x2bab3c=_0x45877e[_0x1869b2(0x21b)]||this[_0x1869b2(0x29f)];_0x2bab3c-=Window_Base[_0x1869b2(0x167)];if(this[_0x1869b2(0x1de)]===Window_Message){if(_0x1869b2(0x73)!==_0x1869b2(0x1c0)){const _0x1c01d4=$gameMessage[_0x1869b2(0x219)]()===''?0x0:ImageManager[_0x1869b2(0x1e9)]+0x14;_0x2bab3c-=_0x1c01d4,VisuMZ[_0x1869b2(0x2b9)][_0x1869b2(0x251)]['WordWrap']['TightWrap']&&(_0x2bab3c-=_0x1c01d4);}else this[_0x1869b2(0xa2)]['fontSize']+=_0x23ce1d[_0x1869b2(0x2b9)]['Settings'][_0x1869b2(0xc4)][_0x1869b2(0xc3)],this['contents'][_0x1869b2(0x94)]=_0x1ff722[_0x1869b2(0x2b5)](this[_0x1869b2(0xa2)][_0x1869b2(0x94)],_0x2c8571[_0x1869b2(0x2b9)][_0x1869b2(0x251)][_0x1869b2(0xc4)][_0x1869b2(0x15b)]);}let _0x3da493=![];if(_0x45877e['x']+_0x1b2842>_0x45877e[_0x1869b2(0xf2)]+_0x2bab3c)_0x3da493=!![];if(_0x1b2842===0x0)_0x3da493=!![];_0x3da493&&(_0x45877e['text']=_0x45877e[_0x1869b2(0x16f)]['slice'](0x0,_0x45877e['index'])+'\x0a'+_0x45877e[_0x1869b2(0x16f)]['substr'](_0x45877e[_0x1869b2(0xb7)]));},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x23e)]=function(_0x39cbb0){const _0x31bff5=_0x57fb66,_0x37b09d=this[_0x31bff5(0x232)](_0x39cbb0,0x0,0x0,0x0),_0x5d2a7c=this[_0x31bff5(0x2f4)]();return _0x37b09d[_0x31bff5(0x1ad)]=![],this[_0x31bff5(0x1bc)](![]),this[_0x31bff5(0x19a)](_0x37b09d),this[_0x31bff5(0x1bc)](!![]),this[_0x31bff5(0x291)](_0x5d2a7c),{'width':_0x37b09d[_0x31bff5(0x1b4)],'height':_0x37b09d['outputHeight']};},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x2b1)]=function(_0x3f3f53){const _0x2c7283=_0x57fb66;return this[_0x2c7283(0x16a)](_0x3f3f53);},Window_Base['prototype'][_0x57fb66(0x28f)]=function(_0x3a19a6){const _0x525f4a=_0x57fb66,_0x48dd37=this['obtainEscapeString'](_0x3a19a6)[_0x525f4a(0x18a)](',');if(!_0x3a19a6[_0x525f4a(0x1ad)])return;const _0x433b7a=_0x48dd37[0x0][_0x525f4a(0x157)](),_0x5de4ec=_0x48dd37[0x1]||0x0,_0x9ca3ba=_0x48dd37[0x2]||0x0,_0x45dd20=ImageManager[_0x525f4a(0x1a2)](_0x433b7a),_0xaf8506=this[_0x525f4a(0xa2)][_0x525f4a(0x2d5)];_0x45dd20[_0x525f4a(0xbe)](this[_0x525f4a(0x10f)][_0x525f4a(0x2fa)](this,_0x45dd20,_0x3a19a6['x'],_0x3a19a6['y'],_0x5de4ec,_0x9ca3ba,_0xaf8506));},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x10f)]=function(_0x2ed914,_0x51dccb,_0x18ccbe,_0x2e4469,_0x2a82d1,_0x2ba74e){const _0x2b50eb=_0x57fb66;_0x2e4469=_0x2e4469||_0x2ed914[_0x2b50eb(0x21b)],_0x2a82d1=_0x2a82d1||_0x2ed914['height'],this[_0x2b50eb(0x1a3)][_0x2b50eb(0x2d5)]=_0x2ba74e,this[_0x2b50eb(0x1a3)][_0x2b50eb(0xe8)](_0x2ed914,0x0,0x0,_0x2ed914['width'],_0x2ed914['height'],_0x51dccb,_0x18ccbe,_0x2e4469,_0x2a82d1),this[_0x2b50eb(0x1a3)][_0x2b50eb(0x2d5)]=0xff;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x180)]=function(_0x143c3a){const _0x3bef34=_0x57fb66,_0x1cb10c=this[_0x3bef34(0x218)](_0x143c3a)[_0x3bef34(0x18a)](',');if(!_0x143c3a[_0x3bef34(0x1ad)])return;const _0x952df8=_0x1cb10c[0x0][_0x3bef34(0x157)](),_0x2a79be=ImageManager[_0x3bef34(0x1a2)](_0x952df8),_0x54e09d=JsonEx[_0x3bef34(0x138)](_0x143c3a),_0x25db82=this['contents'][_0x3bef34(0x2d5)];_0x2a79be[_0x3bef34(0xbe)](this[_0x3bef34(0x193)][_0x3bef34(0x2fa)](this,_0x2a79be,_0x54e09d,_0x25db82));},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x193)]=function(_0x50c58f,_0x11f781,_0x21a84f){const _0x43683e=_0x57fb66,_0x3d9fc6=_0x11f781[_0x43683e(0x21b)]||this['innerWidth'],_0x44a47c=this[_0x43683e(0x226)]!==undefined?this[_0x43683e(0x2b2)]():this['innerHeight'],_0x13d5cb=_0x3d9fc6/_0x50c58f[_0x43683e(0x21b)],_0x483a6c=_0x44a47c/_0x50c58f[_0x43683e(0xdf)],_0xffc1a1=Math[_0x43683e(0x2b5)](_0x13d5cb,_0x483a6c,0x1),_0x16ea70=this[_0x43683e(0x226)]!==undefined?(this[_0x43683e(0x76)](0x0)[_0x43683e(0xdf)]-this[_0x43683e(0x2e9)]())/0x2:0x0,_0x10143f=_0x50c58f[_0x43683e(0x21b)]*_0xffc1a1,_0x267b9d=_0x50c58f[_0x43683e(0xdf)]*_0xffc1a1,_0x37bed1=Math[_0x43683e(0x1eb)]((_0x3d9fc6-_0x10143f)/0x2)+_0x11f781['startX'],_0x4acffa=Math['floor']((_0x44a47c-_0x267b9d)/0x2)+_0x11f781[_0x43683e(0x2f3)]-_0x16ea70*0x2;this[_0x43683e(0x1a3)][_0x43683e(0x2d5)]=_0x21a84f,this[_0x43683e(0x1a3)][_0x43683e(0xe8)](_0x50c58f,0x0,0x0,_0x50c58f[_0x43683e(0x21b)],_0x50c58f['height'],_0x37bed1,_0x4acffa,_0x10143f,_0x267b9d),this[_0x43683e(0x1a3)][_0x43683e(0x2d5)]=0xff;},Window_Base[_0x57fb66(0x20d)][_0x57fb66(0x26d)]=function(_0x53311d){const _0x1c9629=_0x57fb66,_0x3beb42=this['obtainEscapeParam'](_0x53311d);if(_0x53311d['drawing'])this[_0x1c9629(0xc8)](_0x3beb42>0x0);},Window_Base[_0x57fb66(0x20d)]['processCustomWait']=function(_0x503326){const _0x5ed845=_0x57fb66,_0x268f1a=this[_0x5ed845(0x16a)](_0x503326);this['constructor']===Window_Message&&_0x503326['drawing']&&this[_0x5ed845(0x1dc)](_0x268f1a);},Window_Help['prototype'][_0x57fb66(0x1da)]=function(){const _0x215b81=_0x57fb66;this['setWordWrap']($gameSystem[_0x215b81(0x171)]());},Window_Help['prototype'][_0x57fb66(0x99)]=function(){return!![];},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x195)]=Window_Help['prototype']['refresh'],Window_Help[_0x57fb66(0x20d)][_0x57fb66(0x292)]=function(){const _0x28a9c3=_0x57fb66;this[_0x28a9c3(0x2b3)](),VisuMZ[_0x28a9c3(0x2b9)][_0x28a9c3(0x195)][_0x28a9c3(0x2a1)](this),this[_0x28a9c3(0x1da)]();},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x14b)]=Window_Options['prototype'][_0x57fb66(0x2d7)],Window_Options[_0x57fb66(0x20d)][_0x57fb66(0x2d7)]=function(){const _0x561695=_0x57fb66;VisuMZ[_0x561695(0x2b9)]['Window_Options_addGeneralOptions']['call'](this),this[_0x561695(0x223)]();},Window_Options[_0x57fb66(0x20d)][_0x57fb66(0x223)]=function(){const _0x1345f7=_0x57fb66;VisuMZ[_0x1345f7(0x2b9)]['Settings']['TextSpeed'][_0x1345f7(0x19e)]&&this[_0x1345f7(0x1d8)]();},Window_Options[_0x57fb66(0x20d)][_0x57fb66(0x1d8)]=function(){const _0x5875b0=_0x57fb66,_0x4856f9=TextManager[_0x5875b0(0x29b)],_0x47232c=_0x5875b0(0x262);this['addCommand'](_0x4856f9,_0x47232c);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x1fd)]=Window_Options[_0x57fb66(0x20d)][_0x57fb66(0x19b)],Window_Options['prototype']['statusText']=function(_0x3dc1e3){const _0x33d17c=_0x57fb66,_0x5b422f=this[_0x33d17c(0x137)](_0x3dc1e3);if(_0x5b422f===_0x33d17c(0x262))return this[_0x33d17c(0x144)]();return VisuMZ['MessageCore'][_0x33d17c(0x1fd)]['call'](this,_0x3dc1e3);},VisuMZ[_0x57fb66(0x2b9)]['Window_Options_isVolumeSymbol']=Window_Options[_0x57fb66(0x20d)][_0x57fb66(0xf8)],Window_Options[_0x57fb66(0x20d)][_0x57fb66(0xf8)]=function(_0x44c52d){const _0x35fddf=_0x57fb66;if(_0x44c52d===_0x35fddf(0x262))return!![];return VisuMZ[_0x35fddf(0x2b9)]['Window_Options_isVolumeSymbol']['call'](this,_0x44c52d);},Window_Options[_0x57fb66(0x20d)][_0x57fb66(0x144)]=function(){const _0x124c12=_0x57fb66,_0x20921e=this[_0x124c12(0x17a)](_0x124c12(0x262));return _0x20921e>0xa?_0x124c12(0x288)!=='NiTvK'?(_0x87c1e8=_0x16ced9[_0x124c12(0x147)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x124c12(0x299)]()),_0x51836b=_0x50b77f[_0x124c12(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x124c12(0x178)]()),_0x16baac=_0x42d3cf[_0x124c12(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x2dd51d=_0x575488[_0x124c12(0x147)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x124c12(0x14f)](![])),_0x29ef2e):TextManager['instantTextSpeed']:_0x20921e;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x161)]=Window_Options['prototype']['changeVolume'],Window_Options[_0x57fb66(0x20d)]['changeVolume']=function(_0xbf9c58,_0x3acf83,_0x4d6544){const _0x470338=_0x57fb66;if(_0xbf9c58===_0x470338(0x262))return this[_0x470338(0xea)](_0xbf9c58,_0x3acf83,_0x4d6544);VisuMZ[_0x470338(0x2b9)][_0x470338(0x161)]['call'](this,_0xbf9c58,_0x3acf83,_0x4d6544);},Window_Options[_0x57fb66(0x20d)]['changeTextSpeed']=function(_0x14a997,_0x146763,_0x474cc9){const _0x3da459=_0x57fb66,_0x48e121=this[_0x3da459(0x17a)](_0x14a997),_0x4dd47a=0x1,_0x348509=_0x48e121+(_0x146763?_0x4dd47a:-_0x4dd47a);if(_0x348509>0xb&&_0x474cc9){if(_0x3da459(0xa5)===_0x3da459(0xa5))this[_0x3da459(0xe9)](_0x14a997,0x1);else{if(this[_0x3da459(0x280)]===_0x4c8639)this['initMessageCore']();if(!_0xa4987c)return;if(_0x285083[_0x3da459(0x1ba)](_0x17dad3))this[_0x3da459(0x280)][_0x3da459(0x80)]=0x0;else{if(_0x530861[_0x3da459(0x7a)](_0x1861ad))this[_0x3da459(0x280)][_0x3da459(0x80)]=0x1;else _0x8e870d['isArmor'](_0x36bceb)&&(this[_0x3da459(0x280)][_0x3da459(0x80)]=0x2);}this['_lastGainedItemData']['id']=_0x146959['id'],this[_0x3da459(0x280)][_0x3da459(0x205)]=_0x45e8de;}}else _0x3da459(0x12e)===_0x3da459(0x12e)?this[_0x3da459(0xe9)](_0x14a997,_0x348509[_0x3da459(0x14c)](0x1,0xb)):(this['x']=this[_0x3da459(0x109)](this['x'],this[_0x3da459(0x181)]),this['y']=this['applyMoveEasing'](this['y'],this[_0x3da459(0x177)]),this[_0x3da459(0x21b)]=this[_0x3da459(0x109)](this[_0x3da459(0x21b)],this['_moveTargetWidth']),this[_0x3da459(0xdf)]=this[_0x3da459(0x109)](this[_0x3da459(0xdf)],this[_0x3da459(0x92)]),this['clampPlacementPosition']());},Window_Message[_0x57fb66(0x20d)]['contentsHeight']=function(){const _0x496175=_0x57fb66;let _0x29afb8=Window_Base['prototype'][_0x496175(0x87)]['call'](this);return _0x29afb8-=this['addedHeight'](),_0x29afb8;},Window_Message['prototype'][_0x57fb66(0xd1)]=function(){const _0x45f2da=_0x57fb66;Window_Base[_0x45f2da(0x20d)][_0x45f2da(0xd1)][_0x45f2da(0x2a1)](this),VisuMZ[_0x45f2da(0x2b9)]['Settings'][_0x45f2da(0xc4)][_0x45f2da(0xa0)]&&this['stretchDimmerSprite']();},Window_Message['prototype'][_0x57fb66(0xee)]=function(){const _0xef3086=_0x57fb66;this['_dimmerSprite']['x']=Math[_0xef3086(0x1b9)](this[_0xef3086(0x21b)]/0x2),this[_0xef3086(0x2df)]['anchor']['x']=0.5,this[_0xef3086(0x2df)][_0xef3086(0x10e)]['x']=Graphics['width'];},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x2cb)]=Window_Message[_0x57fb66(0x20d)][_0x57fb66(0xcd)],Window_Message[_0x57fb66(0x20d)][_0x57fb66(0xcd)]=function(){const _0x30fabc=_0x57fb66;VisuMZ['MessageCore'][_0x30fabc(0x2cb)][_0x30fabc(0x2a1)](this),this[_0x30fabc(0x2b3)](),this['resetWordWrap'](),this[_0x30fabc(0xc8)](![]),this[_0x30fabc(0x11a)](_0x30fabc(0x8f)),this[_0x30fabc(0x209)](VisuMZ[_0x30fabc(0x2b9)]['Settings']['General'][_0x30fabc(0x179)]);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x1da)]=function(){const _0xffb1f9=_0x57fb66;this[_0xffb1f9(0x1bc)]($gameSystem[_0xffb1f9(0x27d)]());},Window_Message[_0x57fb66(0x20d)]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x209)]=function(_0x69e8bb){const _0x36c35a=_0x57fb66,_0x3bd635=0xb-ConfigManager[_0x36c35a(0x262)];_0x69e8bb=Math[_0x36c35a(0x1b9)](_0x69e8bb*_0x3bd635),this['_textDelayCount']=_0x69e8bb,this['_textDelay']=_0x69e8bb;},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x2cd)]=Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x104)],Window_Message['prototype'][_0x57fb66(0x104)]=function(){const _0xc437e3=_0x57fb66;return VisuMZ[_0xc437e3(0x2b9)]['Window_Message_isTriggered'][_0xc437e3(0x2a1)](this)||Input[_0xc437e3(0x10b)](VisuMZ[_0xc437e3(0x2b9)][_0xc437e3(0x251)][_0xc437e3(0xc4)][_0xc437e3(0x208)]);},VisuMZ[_0x57fb66(0x2b9)]['Window_Message_updatePlacement']=Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x140)],Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x140)]=function(){const _0x13bfcb=_0x57fb66;let _0x1c2317=this['y'];VisuMZ[_0x13bfcb(0x2b9)][_0x13bfcb(0x16d)][_0x13bfcb(0x2a1)](this);if(this[_0x13bfcb(0x16e)])this['y']=_0x1c2317;this[_0x13bfcb(0x294)](),this['clampPlacementPosition']();},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x2d6)]=Window_Message['prototype']['newPage'],Window_Message[_0x57fb66(0x20d)]['newPage']=function(_0x8ad28){const _0x344a38=_0x57fb66;this[_0x344a38(0x142)](_0x8ad28),this[_0x344a38(0x25e)](_0x8ad28),VisuMZ[_0x344a38(0x2b9)][_0x344a38(0x2d6)]['call'](this,_0x8ad28),this[_0x344a38(0x210)]();},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x142)]=function(_0x49dc5a){const _0x3b2a43=_0x57fb66;if(!_0x49dc5a)return;_0x49dc5a['text']=this[_0x3b2a43(0x255)](_0x49dc5a[_0x3b2a43(0x16f)]),_0x49dc5a[_0x3b2a43(0x16f)]=Window_Base['prototype'][_0x3b2a43(0x148)]['call'](this,_0x49dc5a[_0x3b2a43(0x16f)]);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x148)]=function(_0x2203c3){return _0x2203c3;},Window_Message[_0x57fb66(0x20d)]['onNewPageMessageCore']=function(_0x505723){const _0x28f3d5=_0x57fb66;this['prepareForcedPositionEscapeCharacters'](_0x505723),this[_0x28f3d5(0x2a3)](_0x505723),this[_0x28f3d5(0x1c8)]();},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x2d4)]=Window_Message['prototype']['terminateMessage'],Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x145)]=function(){const _0x4f34ac=_0x57fb66;VisuMZ[_0x4f34ac(0x2b9)][_0x4f34ac(0x2d4)][_0x4f34ac(0x2a1)](this),this[_0x4f34ac(0xcd)]();if(this['_messagePositionReset'])this['messagePositionReset']();},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x1c8)]=function(){const _0x294a80=_0x57fb66;this[_0x294a80(0x21b)]=$gameSystem[_0x294a80(0x2ec)]()+this[_0x294a80(0x134)]();;this[_0x294a80(0x21b)]=Math[_0x294a80(0x2b5)](Graphics['width'],this[_0x294a80(0x21b)]);const _0x21bfd3=$gameSystem[_0x294a80(0x1aa)]();this[_0x294a80(0xdf)]=SceneManager['_scene'][_0x294a80(0x18b)](_0x21bfd3,![])+this[_0x294a80(0x282)](),this[_0x294a80(0xdf)]=Math['min'](Graphics[_0x294a80(0xdf)],this['height']);if($gameTemp['_centerMessageWindow'])this['resetPositionX']();},Window_Message['prototype']['addedWidth']=function(){return 0x0;},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x282)]=function(){return 0x0;},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x11d)]=function(){const _0x426458=_0x57fb66;this['x']=(Graphics[_0x426458(0x298)]-this[_0x426458(0x21b)])/0x2,$gameTemp[_0x426458(0xfd)]=undefined,this[_0x426458(0x253)]();},Window_Message['prototype'][_0x57fb66(0x202)]=function(){const _0x18cdf5=_0x57fb66,_0x11e035={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0x18cdf5(0x202)][_0x18cdf5(0x2a1)](this),this[_0x18cdf5(0x23d)](_0x11e035);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x168)]=function(){return!![];},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x23d)]=function(_0x5e2d00){const _0x10e4ff=_0x57fb66;this[_0x10e4ff(0x199)]&&(this[_0x10e4ff(0x199)]['x']+=this['x']-_0x5e2d00['x'],this[_0x10e4ff(0x199)]['y']+=this['y']-_0x5e2d00['y']);},Window_Message[_0x57fb66(0x20d)]['resetRect']=function(_0xaafdf7,_0x3cdd5a){const _0x2d6fd8=_0x57fb66;this[_0x2d6fd8(0x246)](this[_0x2d6fd8(0x1b5)]['x'],this['_positionType']*(Graphics['boxHeight']-this['height'])/0x2,this[_0x2d6fd8(0x1b5)][_0x2d6fd8(0x21b)],this[_0x2d6fd8(0x1b5)]['height'],_0xaafdf7,_0x3cdd5a);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x2b1)]=function(_0x1c0aff){const _0x1d8819=_0x57fb66,_0x5ca8a5=Window_Base['prototype'][_0x1d8819(0x2b1)]['call'](this,_0x1c0aff);_0x1c0aff[_0x1d8819(0x1ad)]&&(_0x1d8819(0x152)===_0x1d8819(0x2ba)?_0x4e5d31='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1d8819(0x173)](_0x1fc0cf,_0x53f70b):this[_0x1d8819(0x2b6)](_0x5ca8a5));},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x2b6)]=function(_0x28dea1){const _0x472eaf=_0x57fb66;if($gameParty['inBattle']()){}else'UrbJI'===_0x472eaf(0x83)?(_0x9185be=_0x58040d[_0x472eaf(0x147)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x517ead,_0x416dd4)=>{const _0x49590d=_0x472eaf;return this[_0x49590d(0x197)](_0x502ec0,!![],!![]),this[_0x49590d(0x116)]('battle\x20actor',_0x42bea1(_0x416dd4)||0x1),'';}),_0xc66b5d=_0x5b9b04[_0x472eaf(0x147)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x28788b,_0xef287a)=>{const _0xc209c6=_0x472eaf;return this[_0xc209c6(0x197)](_0x4aa440,!![],!![]),this[_0xc209c6(0x116)]('battle\x20party',_0x46156d(_0xef287a)||0x0),'';}),_0x58d450=_0x510708[_0x472eaf(0x147)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2fba2e,_0x4127f1)=>{const _0x285e28=_0x472eaf;return this['processAutoSize'](_0x3f6daa,!![],!![]),this[_0x285e28(0x116)](_0x285e28(0x1b2),_0x350488(_0x4127f1)||0x0),'';})):$gameMap[_0x472eaf(0x1ee)](_0x28dea1);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x25a)]=function(_0x5d70af){const _0x390f33=_0x57fb66;this[_0x390f33(0xd3)]--,this[_0x390f33(0xd3)]<=0x0&&(this[_0x390f33(0x22b)](_0x5d70af),Window_Base[_0x390f33(0x20d)]['processCharacter'][_0x390f33(0x2a1)](this,_0x5d70af));},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x22b)]=function(_0x1fe264){const _0x290a3a=_0x57fb66;this[_0x290a3a(0xd3)]=this[_0x290a3a(0x22f)];if(this[_0x290a3a(0x22f)]<=0x0)this['_showFast']=!![];},VisuMZ['MessageCore'][_0x57fb66(0x108)]=Window_Message['prototype'][_0x57fb66(0x204)],Window_Message[_0x57fb66(0x20d)]['processEscapeCharacter']=function(_0x1bb9c1,_0x463037){const _0xec0810=_0x57fb66;if(!_0x463037[_0xec0810(0x1ad)]){if(_0xec0810(0x224)===_0xec0810(0x224))Window_Base[_0xec0810(0x20d)][_0xec0810(0x204)][_0xec0810(0x2a1)](this,_0x1bb9c1,_0x463037);else{const _0x24732e=this[_0xec0810(0x2c9)],_0x2aa62a=_0x24732e?_0x24732e['y']:0x0,_0x1a3e51=_0x24732e?_0x24732e[_0xec0810(0xdf)]:0x0,_0x1750d1=_0x4b039d['boxHeight']/0x2;return _0x2aa62a<_0x1750d1&&_0x2aa62a+_0x1a3e51>_0x1750d1?0x4:_0xac122d[_0xec0810(0x107)]();}}else{if(_0xec0810(0x225)!==_0xec0810(0x117))VisuMZ['MessageCore'][_0xec0810(0x108)]['call'](this,_0x1bb9c1,_0x463037);else return this[_0xec0810(0x197)](_0x4d44c8,!![],!![]),this[_0xec0810(0x116)](_0xec0810(0x1e3),_0x1a32e8(_0x219dc6)||0x1),'';}},Window_Message[_0x57fb66(0x20d)]['prepareForcedPositionEscapeCharacters']=function(_0x26924d){const _0x1c2269=_0x57fb66;let _0x3d289a=_0x26924d['text'];this[_0x1c2269(0x2dd)]={};if(this['isWordWrapEnabled']())return _0x3d289a;_0x3d289a=_0x3d289a[_0x1c2269(0x147)](/<POSITION:[ ]*(.*)>/gi,(_0xc1cf7f,_0xcc6fd0)=>{const _0xa7d195=_0x1c2269;if('WVKLj'===_0xa7d195(0xcc))_0x17b327['MessageCore'][_0xa7d195(0xb3)]['call'](this),this[_0xa7d195(0x18e)](),this[_0xa7d195(0x290)](),this['clampPlacementPosition'](),this[_0xa7d195(0x26a)]();else{const _0x250531=_0xcc6fd0[_0xa7d195(0x18a)](',')[_0xa7d195(0x1ed)](_0x15f67b=>Number(_0x15f67b)||0x0);if(_0x250531[0x0]!==undefined)this[_0xa7d195(0x2dd)]['x']=Number(_0x250531[0x0]);if(_0x250531[0x1]!==undefined)this[_0xa7d195(0x2dd)]['y']=Number(_0x250531[0x1]);if(_0x250531[0x2]!==undefined)this[_0xa7d195(0x2dd)]['width']=Number(_0x250531[0x2]);if(_0x250531[0x3]!==undefined)this['_forcedPosition']['height']=Number(_0x250531[0x3]);return'';}}),_0x3d289a=_0x3d289a[_0x1c2269(0x147)](/<COORDINATES:[ ]*(.*)>/gi,(_0x197791,_0x21772a)=>{const _0x1ccf50=_0x1c2269,_0x3c903a=_0x21772a['split'](',')[_0x1ccf50(0x1ed)](_0x4478c6=>Number(_0x4478c6)||0x0);if(_0x3c903a[0x0]!==undefined)this[_0x1ccf50(0x2dd)]['x']=Number(_0x3c903a[0x0]);if(_0x3c903a[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x3c903a[0x1]);return'';}),_0x3d289a=_0x3d289a[_0x1c2269(0x147)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x22b7e4,_0x3f70a7)=>{const _0x349f66=_0x1c2269;if(_0x349f66(0x1a7)!=='baTIS'){const _0x15899d=_0x3f70a7[_0x349f66(0x18a)](',')['map'](_0xc7fa38=>Number(_0xc7fa38)||0x0);if(_0x15899d[0x0]!==undefined)this[_0x349f66(0x2dd)][_0x349f66(0x21b)]=Number(_0x15899d[0x2]);if(_0x15899d[0x1]!==undefined)this[_0x349f66(0x2dd)][_0x349f66(0xdf)]=Number(_0x15899d[0x3]);return'';}else return this[_0x349f66(0x197)](_0x309f92,!![],!![]),this['processAutoPosition']('battle\x20actor',_0x4c3918(_0x1c408a)||0x1),'';}),_0x26924d[_0x1c2269(0x16f)]=_0x3d289a;},Window_Message['prototype'][_0x57fb66(0x294)]=function(){const _0x3f15c6=_0x57fb66;this[_0x3f15c6(0x2dd)]=this[_0x3f15c6(0x2dd)]||{};const _0x3a0be9=['x','y',_0x3f15c6(0x21b),_0x3f15c6(0xdf)];for(const _0x1b9f10 of _0x3a0be9){this[_0x3f15c6(0x2dd)][_0x1b9f10]!==undefined&&(this[_0x1b9f10]=Number(this[_0x3f15c6(0x2dd)][_0x1b9f10]));}},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x2a3)]=function(_0x254878){const _0x3334ff=_0x57fb66;let _0x2a5838=_0x254878[_0x3334ff(0x16f)];_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x5f0830=_0x3334ff;if('APobB'==='APobB')return this[_0x5f0830(0x197)](_0x2a5838,!![],!![]),this['processAutoPosition'](_0x5f0830(0x21f)),'';else _0x2c38a1[_0x5f0830(0x11b)]=new _0x2ceaba('\x1b'+_0x23248e['Match']+_0x1c077c['Type'],'gi'),_0x251584[_0x5f0830(0x24f)]!==''&&_0x49cf70[_0x5f0830(0x24f)]!=='Undefined'?_0x4cac58['textCodeResult']=new _0xfd33f1(_0x5f0830(0x26b)+_0x7d03eb[_0x5f0830(0x24f)][_0x5f0830(0x147)](/\\/g,'\x1b')+'\x27'):_0x344ec6[_0x5f0830(0x12b)]=_0x47af62[_0x5f0830(0x236)];}),_0x2a5838=_0x2a5838['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1529ab=_0x3334ff;return _0x1529ab(0x88)!==_0x1529ab(0x287)?(this[_0x1529ab(0x197)](_0x2a5838,!![],![]),this[_0x1529ab(0x116)](_0x1529ab(0x21f)),''):(this['processAutoSize'](_0x372f7b,!![],!![]),this[_0x1529ab(0x116)](_0x1529ab(0x1b2),_0x19776c(_0x49d68b)||0x0),'');}),_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x144a6a=_0x3334ff;return this['processAutoSize'](_0x2a5838,![],!![]),this[_0x144a6a(0x116)]('none'),'';});if(SceneManager[_0x3334ff(0xab)]())_0x3334ff(0x17b)==='GATXn'?(_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x5e988c,_0x5657e3)=>{const _0x5d3b20=_0x3334ff;if(_0x5d3b20(0x20a)===_0x5d3b20(0x20a))return this[_0x5d3b20(0x197)](_0x2a5838,!![],!![]),this[_0x5d3b20(0x116)]('battle\x20actor',Number(_0x5657e3)||0x1),'';else{let _0x55e2c1=_0x50ff79['ceil'](_0x2576ad[_0x5d3b20(0xdf)]/this[_0x5d3b20(0x2e9)]());_0x1f9f49[_0x5d3b20(0x160)](_0x55e2c1);}}),_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x22d6f4,_0x3ee32d)=>{const _0x19d365=_0x3334ff;return this[_0x19d365(0x197)](_0x2a5838,!![],!![]),this[_0x19d365(0x116)](_0x19d365(0x14e),Number(_0x3ee32d)||0x0),'';}),_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x792e3,_0x512c0b)=>{const _0x55c722=_0x3334ff;return'SJbES'!=='rStRs'?(this[_0x55c722(0x197)](_0x2a5838,!![],!![]),this['processAutoPosition'](_0x55c722(0x1b2),Number(_0x512c0b)||0x0),''):(this[_0x55c722(0x164)]=_0x5910df,'');})):!_0x376acd[_0x3334ff(0x1b6)]?this[_0x3334ff(0x2e8)][_0x3334ff(0x2a0)](_0x36a9a0):_0x4e0052[_0x3334ff(0x250)]();else SceneManager[_0x3334ff(0x228)]()&&(_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x2df905,_0x3a651e)=>{const _0x445446=_0x3334ff;if('XaPYw'!=='lyqAB')return this[_0x445446(0x197)](_0x2a5838,!![],!![]),this[_0x445446(0x116)](_0x445446(0x242),0x0),'';else{_0x286d05[_0x445446(0x2b9)][_0x445446(0x17e)][_0x445446(0x2a1)](this,_0x27c496);const _0x13b314=_0x1ccb9f[_0x445446(0x2b9)][_0x445446(0x251)][_0x445446(0x1cd)];_0x4f19ed['MessageCore'][_0x445446(0x82)](_0x290b31,_0x13b314[_0x445446(0x29c)]);}}),_0x2a5838=_0x2a5838['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4f5473,_0x13dd4b)=>{const _0x157c13=_0x3334ff;return _0x157c13(0x2d1)!=='hLrUU'?(this[_0x157c13(0x197)](_0x2a5838,!![],!![]),this[_0x157c13(0x116)](_0x157c13(0x1e3),Number(_0x13dd4b)||0x1),''):(_0x1d1919=_0x26d812[_0x157c13(0x147)](/<LEFT>/gi,this['setRelativePosition'][_0x157c13(0x2fa)](this,0x0)),_0x206615=_0x5bb0d7[_0x157c13(0x147)](/<CENTER>/gi,this[_0x157c13(0xa3)][_0x157c13(0x2fa)](this,0x5)),_0x35857e=_0x2f30da[_0x157c13(0x147)](/<RIGHT>/gi,this[_0x157c13(0xa3)][_0x157c13(0x2fa)](this,0xa)),_0x4f71a0=_0x278681[_0x157c13(0x147)](/<POSITION:[ ](\d+)>/gi,(_0x5d4001,_0x31230e)=>this[_0x157c13(0xa3)](_0x1a646a(_0x31230e))),_0x3adb13=_0x371329[_0x157c13(0x147)](/<\/LEFT>/gi,''),_0x15ef69=_0x55ec84[_0x157c13(0x147)](/<\/CENTER>/gi,''),_0x115e93=_0x4827a4['replace'](/<\/RIGHT>/gi,''),_0x461062[_0x157c13(0x20d)][_0x157c13(0x11f)][_0x157c13(0x2a1)](this,_0xed44ae));}),_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x30b6ae,_0x1041d7)=>{const _0x241ce5=_0x3334ff;if(_0x241ce5(0x8d)!==_0x241ce5(0x8d)){!_0x236528&&(this[_0x241ce5(0x21b)]=_0x38e535[_0x241ce5(0x2b5)](this['width'],_0x549155[_0x241ce5(0x21b)]),this[_0x241ce5(0xdf)]=_0x1560f5[_0x241ce5(0x2b5)](this[_0x241ce5(0xdf)],_0xf23963['height']));if(!_0x44253f){const _0x1eb4ce=-(_0x2e66b5[_0x241ce5(0x1eb)](_0x760c77[_0x241ce5(0x21b)]-_0x45cb4a['boxWidth'])/0x2),_0x4bbc5c=_0x1eb4ce+_0x39febd[_0x241ce5(0x21b)]-this[_0x241ce5(0x21b)],_0x5a61eb=-(_0xbb64d7[_0x241ce5(0x1eb)](_0xf902cb[_0x241ce5(0xdf)]-_0x3e1c50[_0x241ce5(0x12c)])/0x2),_0x48200a=_0x5a61eb+_0x402a29[_0x241ce5(0xdf)]-this[_0x241ce5(0xdf)];this['x']=this['x'][_0x241ce5(0x14c)](_0x1eb4ce,_0x4bbc5c),this['y']=this['y'][_0x241ce5(0x14c)](_0x5a61eb,_0x48200a);}}else return this[_0x241ce5(0x197)](_0x2a5838,!![],!![]),this[_0x241ce5(0x116)](_0x241ce5(0x146),Number(_0x1041d7)||0x0),'';}),_0x2a5838=_0x2a5838[_0x3334ff(0x147)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x3f1220,_0xf033a5)=>{const _0x54a007=_0x3334ff;return this[_0x54a007(0x197)](_0x2a5838,!![],!![]),this[_0x54a007(0x116)](_0x54a007(0x20f),Number(_0xf033a5)||0x0),'';}));_0x254878['text']=_0x2a5838;},Window_Message[_0x57fb66(0x9b)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x57fb66(0xd6)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype']['processAutoSize']=function(_0x577227,_0x272fa3,_0xe58ec9){const _0x1d737d=_0x57fb66;_0x577227=_0x577227[_0x1d737d(0x147)](Window_Message[_0x1d737d(0x9b)],''),_0x577227=_0x577227['replace'](Window_Message[_0x1d737d(0xd6)],''),this[_0x1d737d(0x126)]=!![];const _0x3c9dad=this['textSizeEx'](_0x577227);if(_0x272fa3){let _0x327719=_0x3c9dad['width']+$gameSystem[_0x1d737d(0x1cb)]()*0x2+0x6;const _0xf59290=$gameMessage[_0x1d737d(0x219)]()!=='',_0x661f9a=ImageManager['faceWidth'],_0x113672=0x14;_0x327719+=_0xf59290?_0x661f9a+_0x113672:0x4;if(_0x327719%0x2!==0x0)_0x327719+=0x1;$gameSystem[_0x1d737d(0x169)](_0x327719);}if(_0xe58ec9){if(_0x1d737d(0x19f)===_0x1d737d(0x19f)){let _0x10afb2=Math[_0x1d737d(0x1f8)](_0x3c9dad['height']/this['lineHeight']());$gameSystem[_0x1d737d(0x160)](_0x10afb2);}else{let _0x419710='';if(_0x2e7d95)_0x419710+=_0x1d737d(0x1be)['format'](_0x5a65a6[_0x1d737d(0x71)]()[_0x1d737d(0x141)]);return _0x419710+=_0x1c18fb[_0x1d737d(0x71)]()[_0x1d737d(0x23f)],_0x419710;}}this[_0x1d737d(0x20c)](),this[_0x1d737d(0x126)]=![],this[_0x1d737d(0x1d0)]=!![];},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x20c)]=function(){const _0x495822=_0x57fb66;this[_0x495822(0x1c8)](),this['updatePlacement'](),this[_0x495822(0x11d)](),this[_0x495822(0x93)](),this[_0x495822(0xa2)][_0x495822(0x96)](),this[_0x495822(0x210)]();},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x116)]=function(_0x4b9638,_0x5d5556){const _0x4314c8=_0x57fb66;switch(_0x4b9638[_0x4314c8(0x2d0)]()[_0x4314c8(0x157)]()){case _0x4314c8(0x1fb):this[_0x4314c8(0x16e)]=$gameActors[_0x4314c8(0x1f5)](_0x5d5556);break;case _0x4314c8(0x14e):this[_0x4314c8(0x16e)]=$gameParty[_0x4314c8(0xb2)]()[_0x5d5556-0x1];break;case'battle\x20enemy':this[_0x4314c8(0x16e)]=$gameTroop[_0x4314c8(0xb2)]()[_0x5d5556-0x1];break;case _0x4314c8(0x242):this[_0x4314c8(0x16e)]=$gamePlayer;break;case _0x4314c8(0x1e3):const _0x58d861=$gameActors['actor'](_0x5d5556)[_0x4314c8(0xb7)]();_0x58d861===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x4314c8(0x16e)]=$gamePlayer[_0x4314c8(0xf7)]()['follower'](_0x58d861-0x1);break;case'map\x20party':_0x5d5556===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x4314c8(0x16e)]=$gamePlayer['followers']()['follower'](_0x5d5556-0x2);break;case _0x4314c8(0x20f):this[_0x4314c8(0x16e)]=$gameMap['event'](_0x5d5556);break;}this[_0x4314c8(0x16e)]&&this[_0x4314c8(0xa6)]();},VisuMZ['MessageCore']['Window_Message_synchronizeNameBox']=Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x188)],Window_Message[_0x57fb66(0x20d)]['synchronizeNameBox']=function(){const _0x3ea265=_0x57fb66;this[_0x3ea265(0xa6)](),VisuMZ[_0x3ea265(0x2b9)][_0x3ea265(0x13e)][_0x3ea265(0x2a1)](this);},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0xa6)]=function(){const _0x3ffce8=_0x57fb66;if(!this['_autoPositionTarget'])return;const _0x3c62c6=SceneManager[_0x3ffce8(0x1e8)];if(!_0x3c62c6)return;if(!_0x3c62c6[_0x3ffce8(0x1c1)])return;const _0x12266c=_0x3c62c6['_spriteset'][_0x3ffce8(0x27f)](this[_0x3ffce8(0x16e)]);if(!_0x12266c)return;let _0x35fc3a=_0x12266c['x'];_0x35fc3a-=this[_0x3ffce8(0x21b)]/0x2,_0x35fc3a-=(Graphics[_0x3ffce8(0x21b)]-Graphics[_0x3ffce8(0x298)])/0x2;let _0x1ae125=_0x12266c['y'];_0x1ae125-=this['height'],_0x1ae125-=(Graphics[_0x3ffce8(0xdf)]-Graphics['boxHeight'])/0x2,_0x1ae125-=_0x12266c['height']+0x8,this['x']=Math['round'](_0x35fc3a),this['y']=Math['round'](_0x1ae125),this['clampPlacementPosition'](!![],![]),this['_nameBoxWindow']['updatePlacement']();},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0xb6)]=function(){const _0x4a0053=_0x57fb66;this[_0x4a0053(0x1d0)]=![],this['_autoPositionTarget']=undefined,$gameSystem[_0x4a0053(0x15a)](),this[_0x4a0053(0x20c)](),this[_0x4a0053(0x11e)]=0x0;},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0x11f)]=function(_0x20e65c){const _0x31fa9c=_0x57fb66;return Window_Base[_0x31fa9c(0x20d)][_0x31fa9c(0x11f)][_0x31fa9c(0x2a1)](this,_0x20e65c);},Window_Message[_0x57fb66(0x20d)]['postConvertEscapeCharacters']=function(_0x55757d){const _0x496c90=_0x57fb66;return Window_Base[_0x496c90(0x20d)][_0x496c90(0x72)][_0x496c90(0x2a1)](this,_0x55757d);},Window_Message['prototype']['flushTextState']=function(_0x456bf5){const _0x23a52d=_0x57fb66;this[_0x23a52d(0xce)](_0x456bf5),Window_Base[_0x23a52d(0x20d)]['flushTextState'][_0x23a52d(0x2a1)](this,_0x456bf5),this[_0x23a52d(0xda)](_0x456bf5);},Window_Message['prototype'][_0x57fb66(0xce)]=function(_0x41af5b){},Window_Message[_0x57fb66(0x20d)][_0x57fb66(0xda)]=function(_0x3592ae){},Window_NameBox[_0x57fb66(0x20d)]['isAutoColorAffected']=function(){return![];},Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x111)]=function(){const _0x442443=_0x57fb66;Window_Base['prototype'][_0x442443(0x111)][_0x442443(0x2a1)](this),this[_0x442443(0x190)](this[_0x442443(0x21a)]());},Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x21a)]=function(){const _0x4371d5=_0x57fb66,_0x1e51fc=VisuMZ['MessageCore'][_0x4371d5(0x251)]['General'][_0x4371d5(0x270)];return ColorManager[_0x4371d5(0x2d8)](_0x1e51fc);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0xb3)]=Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x140)],Window_NameBox['prototype'][_0x57fb66(0x140)]=function(){const _0x24bce1=_0x57fb66;VisuMZ[_0x24bce1(0x2b9)]['Window_NameBox_updatePlacement'][_0x24bce1(0x2a1)](this),this[_0x24bce1(0x18e)](),this[_0x24bce1(0x290)](),this['clampPlacementPosition'](),this[_0x24bce1(0x26a)]();},Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x11f)]=function(_0x37b82b){const _0x382793=_0x57fb66;return _0x37b82b=_0x37b82b[_0x382793(0x147)](/<LEFT>/gi,this[_0x382793(0xa3)][_0x382793(0x2fa)](this,0x0)),_0x37b82b=_0x37b82b[_0x382793(0x147)](/<CENTER>/gi,this[_0x382793(0xa3)]['bind'](this,0x5)),_0x37b82b=_0x37b82b[_0x382793(0x147)](/<RIGHT>/gi,this[_0x382793(0xa3)][_0x382793(0x2fa)](this,0xa)),_0x37b82b=_0x37b82b[_0x382793(0x147)](/<POSITION:[ ](\d+)>/gi,(_0xba31b7,_0x14937a)=>this[_0x382793(0xa3)](parseInt(_0x14937a))),_0x37b82b=_0x37b82b['replace'](/<\/LEFT>/gi,''),_0x37b82b=_0x37b82b['replace'](/<\/CENTER>/gi,''),_0x37b82b=_0x37b82b[_0x382793(0x147)](/<\/RIGHT>/gi,''),Window_Base['prototype']['preConvertEscapeCharacters'][_0x382793(0x2a1)](this,_0x37b82b);},Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0xa3)]=function(_0xaa1208){const _0x29c83=_0x57fb66;return this[_0x29c83(0x164)]=_0xaa1208,'';},Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x18e)]=function(){const _0x45a192=_0x57fb66;if($gameMessage[_0x45a192(0x1c4)]())return;this[_0x45a192(0x164)]=this[_0x45a192(0x164)]||0x0;const _0x36a960=this[_0x45a192(0x2c9)],_0x5a6e61=Math['floor'](_0x36a960[_0x45a192(0x21b)]*this[_0x45a192(0x164)]/0xa);this['x']=_0x36a960['x']+_0x5a6e61-Math['floor'](this['width']/0x2),this['x']=this['x'][_0x45a192(0x14c)](_0x36a960['x'],_0x36a960['x']+_0x36a960['width']-this['width']);},Window_NameBox[_0x57fb66(0x20d)]['updateOffsetPosition']=function(){const _0x482e9a=_0x57fb66;if($gameMessage[_0x482e9a(0x1c4)]())return;this[_0x482e9a(0x164)]=this[_0x482e9a(0x164)]||0x0;const _0x32aac6=VisuMZ[_0x482e9a(0x2b9)][_0x482e9a(0x251)][_0x482e9a(0xc4)][_0x482e9a(0x79)],_0xd6d7e=VisuMZ[_0x482e9a(0x2b9)]['Settings'][_0x482e9a(0xc4)][_0x482e9a(0x2db)],_0x463e5a=(0x5-this[_0x482e9a(0x164)])/0x5;this['x']+=Math[_0x482e9a(0x1eb)](_0x32aac6*_0x463e5a),this['y']+=_0xd6d7e;},Window_NameBox[_0x57fb66(0x20d)]['updateOverlappingY']=function(){const _0x43288b=_0x57fb66,_0x4db22e=this['_messageWindow'],_0x5667d2=_0x4db22e['y'],_0x1cc83b=VisuMZ['MessageCore'][_0x43288b(0x251)][_0x43288b(0xc4)][_0x43288b(0x2db)];_0x5667d2>this['y']&&_0x5667d2<this['y']+this[_0x43288b(0xdf)]-_0x1cc83b&&(_0x43288b(0x185)!==_0x43288b(0x185)?_0x3912b9['x']=-_0x57209e['width']-_0x646f6a:this['y']=_0x4db22e['y']+_0x4db22e[_0x43288b(0xdf)]);},VisuMZ[_0x57fb66(0x2b9)][_0x57fb66(0x125)]=Window_NameBox[_0x57fb66(0x20d)]['refresh'],Window_NameBox[_0x57fb66(0x20d)][_0x57fb66(0x292)]=function(){const _0x664f7c=_0x57fb66;this[_0x664f7c(0x164)]=0x0,VisuMZ[_0x664f7c(0x2b9)][_0x664f7c(0x125)][_0x664f7c(0x2a1)](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x99)]=function(){return!![];},Window_ChoiceList[_0x57fb66(0x20d)]['itemHeight']=function(){const _0x599abe=_0x57fb66;return $gameSystem[_0x599abe(0x27a)]()+0x8;},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x13f)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x213)]=function(){const _0x15135e=_0x57fb66;this[_0x15135e(0x292)](),this['selectDefault'](),this[_0x15135e(0x110)](),this[_0x15135e(0x12a)]();},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x292)]=function(){const _0x96e5a9=_0x57fb66;this[_0x96e5a9(0x90)](),this[_0x96e5a9(0x21e)](),this['_messageWindow']&&(this[_0x96e5a9(0x140)](),this[_0x96e5a9(0x12d)]()),this[_0x96e5a9(0x210)](),this['updateBackground'](),this[_0x96e5a9(0xd1)](),Window_Selectable['prototype']['refresh'][_0x96e5a9(0x2a1)](this);},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x21e)]=function(){const _0x3134f5=_0x57fb66,_0x170859=$gameMessage[_0x3134f5(0x293)]();let _0x8cc016=0x0;for(let _0x5e0f14 of _0x170859){if(_0x3134f5(0x103)!==_0x3134f5(0x103))this['clear']();else{_0x5e0f14=this[_0x3134f5(0xf6)](_0x5e0f14);if(this[_0x3134f5(0x2ea)](_0x5e0f14)){if(_0x3134f5(0x1c5)==='SCVlS'){const _0x48194=this['parseChoiceText'](_0x5e0f14),_0x41d136=this[_0x3134f5(0x261)](_0x5e0f14);this['addCommand'](_0x48194,'choice',_0x41d136,_0x8cc016);}else{this[_0x3134f5(0xd3)]=this[_0x3134f5(0x22f)];if(this[_0x3134f5(0x22f)]<=0x0)this[_0x3134f5(0x149)]=!![];}}_0x8cc016++;}}},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0xf6)]=function(_0x3ad2d1){const _0x452cec=_0x57fb66;return Window_Base[_0x452cec(0x20d)]['convertTextMacros']['call'](this,_0x3ad2d1);},Window_ChoiceList['prototype'][_0x57fb66(0x2ea)]=function(_0x2c9f87){const _0x5e51fa=_0x57fb66;if(_0x2c9f87[_0x5e51fa(0x24e)](/<HIDE>/i))return![];if(_0x2c9f87['match'](/<SHOW>/i))return!![];if(_0x2c9f87[_0x5e51fa(0x24e)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc4cc70=JSON[_0x5e51fa(0x2a5)]('['+RegExp['$1'][_0x5e51fa(0x24e)](/\d+/g)+']');for(const _0x5eae49 of _0xc4cc70){if(_0x5e51fa(0xf3)!==_0x5e51fa(0x2f5)){if(!$gameSwitches[_0x5e51fa(0x105)](_0x5eae49))return![];}else{this['width']=_0xcde16a[_0x5e51fa(0x2ec)]()+this[_0x5e51fa(0x134)]();;this['width']=_0x5e05dc[_0x5e51fa(0x2b5)](_0x30ee02['width'],this['width']);const _0x17541e=_0x506220[_0x5e51fa(0x1aa)]();this['height']=_0xa94a36[_0x5e51fa(0x1e8)][_0x5e51fa(0x18b)](_0x17541e,![])+this[_0x5e51fa(0x282)](),this['height']=_0x4741e7[_0x5e51fa(0x2b5)](_0x24eabd[_0x5e51fa(0xdf)],this[_0x5e51fa(0xdf)]);if(_0x1637fb[_0x5e51fa(0xfd)])this[_0x5e51fa(0x11d)]();}}return!![];}if(_0x2c9f87[_0x5e51fa(0x24e)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5e51fa(0xbf)===_0x5e51fa(0xbf)){const _0x4b321b=JSON[_0x5e51fa(0x2a5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x24627e of _0x4b321b){if(_0x5e51fa(0xed)!==_0x5e51fa(0x28d)){if(!$gameSwitches[_0x5e51fa(0x105)](_0x24627e))return![];}else _0x8f0a68[_0x5e51fa(0x24e)](_0x3804d3[_0x5e51fa(0x11b)])&&(_0x4cf0c9=_0x4e4f01['replace'](_0x54a6c0['textCodeCheck'],_0x440222[_0x5e51fa(0x12b)][_0x5e51fa(0x2fa)](this)));}return!![];}else{const _0x2fc9aa=_0x5b3565['width']||this[_0x5e51fa(0x29f)],_0x473397=this[_0x5e51fa(0x226)]!==_0xe17833?this[_0x5e51fa(0x2b2)]():this[_0x5e51fa(0x28e)],_0x5af5fa=_0x2fc9aa/_0x49526a[_0x5e51fa(0x21b)],_0x1406c6=_0x473397/_0xdfaa65[_0x5e51fa(0xdf)],_0x1c82f7=_0x5dbf43[_0x5e51fa(0x2b5)](_0x5af5fa,_0x1406c6,0x1),_0x15e5a4=this[_0x5e51fa(0x226)]!==_0x29ef97?(this[_0x5e51fa(0x76)](0x0)[_0x5e51fa(0xdf)]-this[_0x5e51fa(0x2e9)]())/0x2:0x0,_0x3b123d=_0x404c1c[_0x5e51fa(0x21b)]*_0x1c82f7,_0x4ba06e=_0x2bf9e6[_0x5e51fa(0xdf)]*_0x1c82f7,_0x16ed8a=_0x3d91e9['floor']((_0x2fc9aa-_0x3b123d)/0x2)+_0x2a3ae3[_0x5e51fa(0xf2)],_0x3b2a27=_0x6e1602[_0x5e51fa(0x1eb)]((_0x473397-_0x4ba06e)/0x2)+_0x14626['startY']-_0x15e5a4*0x2;this[_0x5e51fa(0x1a3)]['paintOpacity']=_0x57b248,this[_0x5e51fa(0x1a3)]['blt'](_0x3f3f51,0x0,0x0,_0x29bcb2[_0x5e51fa(0x21b)],_0x3c7ea8[_0x5e51fa(0xdf)],_0x16ed8a,_0x3b2a27,_0x3b123d,_0x4ba06e),this[_0x5e51fa(0x1a3)][_0x5e51fa(0x2d5)]=0xff;}}if(_0x2c9f87[_0x5e51fa(0x24e)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x387f1f=JSON[_0x5e51fa(0x2a5)]('['+RegExp['$1'][_0x5e51fa(0x24e)](/\d+/g)+']');for(const _0xb3f481 of _0x387f1f){if($gameSwitches[_0x5e51fa(0x105)](_0xb3f481))return!![];}return![];}if(_0x2c9f87[_0x5e51fa(0x24e)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c7aac=JSON[_0x5e51fa(0x2a5)]('['+RegExp['$1'][_0x5e51fa(0x24e)](/\d+/g)+']');for(const _0xf6963b of _0x3c7aac){if(!$gameSwitches[_0x5e51fa(0x105)](_0xf6963b))return!![];}return![];}if(_0x2c9f87[_0x5e51fa(0x24e)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35ab6c=JSON[_0x5e51fa(0x2a5)]('['+RegExp['$1'][_0x5e51fa(0x24e)](/\d+/g)+']');for(const _0x2a31a9 of _0x35ab6c){if('oqJcW'===_0x5e51fa(0x2c3)){for(_0x259493 of _0x2c561e[_0x5e51fa(0x2b9)][_0x5e51fa(0x285)]){_0x421210=_0x448235[_0x5e51fa(0x147)](_0x120ba4[0x0],_0x4e2cd3[0x1]);}return _0x55412f;}else{if(!$gameSwitches[_0x5e51fa(0x105)](_0x2a31a9))return!![];}}return![];}if(_0x2c9f87[_0x5e51fa(0x24e)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32276b=JSON['parse']('['+RegExp['$1'][_0x5e51fa(0x24e)](/\d+/g)+']');for(const _0x5ebc34 of _0x32276b){if(_0x5e51fa(0xef)==='OlVGE'){if($gameSwitches[_0x5e51fa(0x105)](_0x5ebc34))return![];}else{if(this['_MessageCoreSettings']===_0x76dcde)this[_0x5e51fa(0x15a)]();if(this['_MessageCoreSettings'][_0x5e51fa(0x9a)]===_0x5711b8)this[_0x5e51fa(0x15a)]();this[_0x5e51fa(0x1dd)][_0x5e51fa(0x9a)]=_0x1fe539['toLowerCase']();}}return!![];}return!![];},Window_ChoiceList['prototype'][_0x57fb66(0x233)]=function(_0x107df0){const _0x55aeca=_0x57fb66;let _0x2689b1=_0x107df0;return _0x2689b1=_0x2689b1[_0x55aeca(0x147)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x2689b1=_0x2689b1[_0x55aeca(0x147)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x2689b1;},Window_ChoiceList['prototype'][_0x57fb66(0x261)]=function(_0xb2b815){const _0xbe66aa=_0x57fb66;if(_0xb2b815[_0xbe66aa(0x24e)](/<DISABLE>/i))return![];if(_0xb2b815[_0xbe66aa(0x24e)](/<ENABLE>/i))return!![];if(_0xb2b815['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xbe66aa(0x175)!=='gHGFb'){const _0x1c4ceb=JSON[_0xbe66aa(0x2a5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4b3dad of _0x1c4ceb){if(!$gameSwitches[_0xbe66aa(0x105)](_0x4b3dad))return![];}return!![];}else{const _0x372aac=_0xb32c3f[_0xbe66aa(0x2b5)](_0x2044e1[_0xbe66aa(0x21b)],_0x103c98['getMessageWindowWidth']()),_0x1fccb6=_0x483669[_0xbe66aa(0x1aa)](),_0x3cea73=this[_0xbe66aa(0x18b)](_0x1fccb6,![]),_0x57761d=(_0x44e320[_0xbe66aa(0x298)]-_0x372aac)/0x2,_0x18711f=0x0;return new _0x21c9cd(_0x57761d,_0x18711f,_0x372aac,_0x3cea73);}}if(_0xb2b815['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xbe66aa(0x258)==='tPKwD'){const _0x2e84f2=JSON['parse']('['+RegExp['$1'][_0xbe66aa(0x24e)](/\d+/g)+']');for(const _0x189e70 of _0x2e84f2){if(!$gameSwitches[_0xbe66aa(0x105)](_0x189e70))return![];}return!![];}else{const _0x373c44=this[_0xbe66aa(0x16a)](_0x3e526a);this[_0xbe66aa(0xa2)][_0xbe66aa(0x94)]=_0x373c44[_0xbe66aa(0x14c)](_0x40d56a['MessageCore'][_0xbe66aa(0x251)][_0xbe66aa(0xc4)][_0xbe66aa(0x2e3)],_0x5e1388[_0xbe66aa(0x2b9)][_0xbe66aa(0x251)][_0xbe66aa(0xc4)][_0xbe66aa(0x15b)]);}}if(_0xb2b815[_0xbe66aa(0x24e)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('mZWgF'===_0xbe66aa(0x8c)){const _0x49da14=JSON['parse']('['+RegExp['$1'][_0xbe66aa(0x24e)](/\d+/g)+']');for(const _0x57b014 of _0x49da14){if($gameSwitches['value'](_0x57b014))return!![];}return![];}else _0x322a69=_0x130c7d[_0xbe66aa(0x147)](_0x3d1672[_0xbe66aa(0x11b)],_0x4023a7[_0xbe66aa(0x12b)][_0xbe66aa(0x2fa)](this));}if(_0xb2b815[_0xbe66aa(0x24e)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xbe66aa(0x1f2)===_0xbe66aa(0x1d3))this['updateAutoPosition']();else{const _0x5be83d=JSON[_0xbe66aa(0x2a5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xdb8f83 of _0x5be83d){if(!$gameSwitches['value'](_0xdb8f83))return!![];}return![];}}if(_0xb2b815[_0xbe66aa(0x24e)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2ea4d4=JSON[_0xbe66aa(0x2a5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x44e4a7 of _0x2ea4d4){if('bcEzW'!==_0xbe66aa(0xac))_0x554e33['MessageCore'][_0xbe66aa(0x108)][_0xbe66aa(0x2a1)](this,_0x194bec,_0x415149);else{if(!$gameSwitches[_0xbe66aa(0x105)](_0x44e4a7))return!![];}}return![];}if(_0xb2b815[_0xbe66aa(0x24e)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4729b0=JSON['parse']('['+RegExp['$1'][_0xbe66aa(0x24e)](/\d+/g)+']');for(const _0xb50b55 of _0x4729b0){if(_0xbe66aa(0x24b)===_0xbe66aa(0x12f))_0x3a5cbf[_0xbe66aa(0x20d)]['resetTextColor'][_0xbe66aa(0x2a1)](this),this[_0xbe66aa(0x190)](this[_0xbe66aa(0x21a)]());else{if($gameSwitches[_0xbe66aa(0x105)](_0xb50b55))return![];}}return!![];}return!![];},VisuMZ[_0x57fb66(0x2b9)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x140)],Window_ChoiceList[_0x57fb66(0x20d)]['updatePlacement']=function(){const _0x2ea0bd=_0x57fb66;VisuMZ['MessageCore'][_0x2ea0bd(0x275)][_0x2ea0bd(0x2a1)](this),this[_0x2ea0bd(0x253)]();},Window_ChoiceList['prototype'][_0x57fb66(0x12d)]=function(){const _0x5da49c=_0x57fb66;if(!this[_0x5da49c(0x1d7)])return;const _0x2ca91d=0x8,_0x3ed93f=this[_0x5da49c(0x1d7)],_0x367e84=this['x']+this[_0x5da49c(0x21b)],_0x612b12=Math[_0x5da49c(0x1eb)]((Graphics[_0x5da49c(0x21b)]-Graphics[_0x5da49c(0x298)])/0x2);_0x367e84>=Graphics[_0x5da49c(0x298)]+_0x612b12-_0x3ed93f[_0x5da49c(0x21b)]+_0x2ca91d?_0x3ed93f['x']=-_0x3ed93f[_0x5da49c(0x21b)]-_0x2ca91d:_0x3ed93f['x']=this[_0x5da49c(0x21b)]+_0x2ca91d,_0x3ed93f['y']=this[_0x5da49c(0xdf)]/0x2-_0x3ed93f['height']/0x2;},VisuMZ[_0x57fb66(0x2b9)]['Window_ChoiceList_windowX']=Window_ChoiceList['prototype'][_0x57fb66(0x8b)],Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x8b)]=function(){const _0x208072=_0x57fb66;return this[_0x208072(0x2c9)]?this['messageCoreWindowX']():_0x208072(0x1c6)===_0x208072(0x1c6)?VisuMZ[_0x208072(0x2b9)][_0x208072(0x214)][_0x208072(0x2a1)](this):(this[_0x208072(0x197)](_0x4f2ec6,![],!![]),this[_0x208072(0x116)](_0x208072(0x21f)),'');},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x135)]=function(){const _0x4eb1a0=_0x57fb66,_0x34704b=$gameMessage[_0x4eb1a0(0x16b)]();if(_0x34704b===0x1)return(Graphics[_0x4eb1a0(0x298)]-this['windowWidth']())/0x2;else return _0x34704b===0x2?this[_0x4eb1a0(0x2c9)]['x']+this[_0x4eb1a0(0x2c9)]['width']-this[_0x4eb1a0(0x8a)]():this[_0x4eb1a0(0x2c9)]['x'];},Window_ChoiceList['prototype'][_0x57fb66(0x8a)]=function(){const _0x2d4a18=_0x57fb66,_0x5ac3d9=(this[_0x2d4a18(0x13d)]()+this[_0x2d4a18(0x247)]())*this[_0x2d4a18(0x13f)]()+this[_0x2d4a18(0xc7)]*0x2;return Math[_0x2d4a18(0x2b5)](_0x5ac3d9,Graphics[_0x2d4a18(0x21b)]);},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x1e5)]=function(){const _0x164182=_0x57fb66,_0x1ea3dd=$gameMessage[_0x164182(0x293)]()['map'](_0x5a3213=>this[_0x164182(0xf6)](_0x5a3213))[_0x164182(0x256)](_0x5c5ead=>this[_0x164182(0x2ea)](_0x5c5ead)),_0x2b4a80=Math[_0x164182(0x1f8)](_0x1ea3dd[_0x164182(0xd9)]/this['maxCols']());return Math[_0x164182(0x231)](0x1,Math[_0x164182(0x2b5)](_0x2b4a80,this[_0x164182(0x1c7)]()));},Window_ChoiceList['prototype'][_0x57fb66(0x1c7)]=function(){const _0x52edcc=_0x57fb66,_0x5fc32a=this[_0x52edcc(0x2c9)],_0x197e78=_0x5fc32a?_0x5fc32a['y']:0x0,_0x4bce5e=_0x5fc32a?_0x5fc32a[_0x52edcc(0xdf)]:0x0,_0x5ebd3f=Graphics[_0x52edcc(0x12c)]/0x2;if(_0x197e78<_0x5ebd3f&&_0x197e78+_0x4bce5e>_0x5ebd3f)return 0x4;else{if(_0x52edcc(0x6b)!==_0x52edcc(0x2ca))return $gameSystem[_0x52edcc(0x107)]();else this[_0x52edcc(0x1d8)]();}},Window_ChoiceList[_0x57fb66(0x20d)]['maxChoiceWidth']=function(){const _0x1c6e5a=_0x57fb66;let _0x2e3c2d=0x60;for(const _0x2b34b3 of this[_0x1c6e5a(0x97)]){const _0x23e152=_0x2b34b3['name'],_0x2ffceb=this[_0x1c6e5a(0xcb)](_0x23e152)[_0x1c6e5a(0x21b)],_0x385666=Math[_0x1c6e5a(0x1f8)](_0x2ffceb)+this['itemPadding']()*0x2;_0x2e3c2d<_0x385666&&(_0x2e3c2d=_0x385666);}return _0x2e3c2d;},Window_ChoiceList[_0x57fb66(0x20d)]['drawItem']=function(_0x208343){const _0x283a87=_0x57fb66,_0x2aaf8d=this['itemRectWithPadding'](_0x208343),_0x57173a=$gameSystem['getChoiceListTextAlign']()!==_0x283a87(0x8f)?_0x283a87(0x1ef)[_0x283a87(0x173)]($gameSystem[_0x283a87(0xc1)]()):'',_0xc641bf=_0x57173a+this[_0x283a87(0x27b)](_0x208343);this[_0x283a87(0xc5)](this['isCommandEnabled'](_0x208343));const _0x7c0a94=this[_0x283a87(0xcb)](_0xc641bf)[_0x283a87(0xdf)],_0x31d52f=Math['max'](_0x2aaf8d['y'],_0x2aaf8d['y']+Math[_0x283a87(0x1b9)]((_0x2aaf8d[_0x283a87(0xdf)]-_0x7c0a94)/0x2));this[_0x283a87(0xf5)](_0xc641bf,_0x2aaf8d['x'],_0x31d52f,_0x2aaf8d[_0x283a87(0x21b)]);},Window_ChoiceList[_0x57fb66(0x20d)][_0x57fb66(0x2f6)]=function(){const _0x2bc405=_0x57fb66;$gameMessage['onChoice'](this[_0x2bc405(0x7f)]()),this[_0x2bc405(0x2c9)][_0x2bc405(0x145)](),this[_0x2bc405(0x2ae)]();};