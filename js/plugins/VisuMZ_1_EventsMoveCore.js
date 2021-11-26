//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.29;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.29] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x255dc2=_0x2099;(function(_0x1c9fdf,_0x436564){const _0x314a64=_0x2099,_0x46483e=_0x1c9fdf();while(!![]){try{const _0x352147=-parseInt(_0x314a64(0x3ac))/0x1*(parseInt(_0x314a64(0x2bd))/0x2)+-parseInt(_0x314a64(0x503))/0x3+parseInt(_0x314a64(0x5fa))/0x4*(-parseInt(_0x314a64(0x219))/0x5)+parseInt(_0x314a64(0x476))/0x6+parseInt(_0x314a64(0x317))/0x7*(parseInt(_0x314a64(0x1d7))/0x8)+parseInt(_0x314a64(0x30c))/0x9*(-parseInt(_0x314a64(0x49b))/0xa)+parseInt(_0x314a64(0x49a))/0xb;if(_0x352147===_0x436564)break;else _0x46483e['push'](_0x46483e['shift']());}catch(_0x2f2378){_0x46483e['push'](_0x46483e['shift']());}}}(_0x5800,0x79df8));var label=_0x255dc2(0x1ab),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x255dc2(0x438)](function(_0x32303e){const _0x4fb8c2=_0x255dc2;return _0x32303e[_0x4fb8c2(0x509)]&&_0x32303e[_0x4fb8c2(0x1ff)][_0x4fb8c2(0x571)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x255dc2(0x2dc)]=function(_0x5753ac,_0x344163){const _0x2c8d89=_0x255dc2;for(const _0x35f250 in _0x344163){if(_0x2c8d89(0x386)==='TmxlB')return this['selfValue'](_0x339cfc);else{if(_0x35f250[_0x2c8d89(0x5ba)](/(.*):(.*)/i)){const _0x4073f0=String(RegExp['$1']),_0x1f19d=String(RegExp['$2'])[_0x2c8d89(0x242)]()[_0x2c8d89(0x458)]();let _0x3dc5d6,_0x55018d,_0x57d2ad;switch(_0x1f19d){case _0x2c8d89(0x1dd):_0x3dc5d6=_0x344163[_0x35f250]!==''?Number(_0x344163[_0x35f250]):0x0;break;case _0x2c8d89(0x57f):_0x55018d=_0x344163[_0x35f250]!==''?JSON['parse'](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d[_0x2c8d89(0x2cd)](_0x24994d=>Number(_0x24994d));break;case _0x2c8d89(0x208):_0x3dc5d6=_0x344163[_0x35f250]!==''?eval(_0x344163[_0x35f250]):null;break;case'ARRAYEVAL':_0x55018d=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d['map'](_0x5899c2=>eval(_0x5899c2));break;case _0x2c8d89(0x485):_0x3dc5d6=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):'';break;case _0x2c8d89(0x5d4):_0x55018d=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d[_0x2c8d89(0x2cd)](_0x89323=>JSON[_0x2c8d89(0x605)](_0x89323));break;case _0x2c8d89(0x591):_0x3dc5d6=_0x344163[_0x35f250]!==''?new Function(JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250])):new Function(_0x2c8d89(0x27a));break;case'ARRAYFUNC':_0x55018d=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d[_0x2c8d89(0x2cd)](_0x27a195=>new Function(JSON[_0x2c8d89(0x605)](_0x27a195)));break;case _0x2c8d89(0x45c):_0x3dc5d6=_0x344163[_0x35f250]!==''?String(_0x344163[_0x35f250]):'';break;case _0x2c8d89(0x25c):_0x55018d=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d[_0x2c8d89(0x2cd)](_0x3a3c6e=>String(_0x3a3c6e));break;case _0x2c8d89(0x2ef):_0x57d2ad=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):{},_0x5753ac[_0x4073f0]={},VisuMZ[_0x2c8d89(0x2dc)](_0x5753ac[_0x4073f0],_0x57d2ad);continue;case _0x2c8d89(0x45d):_0x55018d=_0x344163[_0x35f250]!==''?JSON[_0x2c8d89(0x605)](_0x344163[_0x35f250]):[],_0x3dc5d6=_0x55018d[_0x2c8d89(0x2cd)](_0x5323d7=>VisuMZ[_0x2c8d89(0x2dc)]({},JSON['parse'](_0x5323d7)));break;default:continue;}_0x5753ac[_0x4073f0]=_0x3dc5d6;}}}return _0x5753ac;},(_0x6b6849=>{const _0x5473eb=_0x255dc2,_0x142862=_0x6b6849[_0x5473eb(0x627)];for(const _0x3973d8 of dependencies){if(_0x5473eb(0x547)===_0x5473eb(0x55c))_0x53790f[_0x5473eb(0x44c)](_0x438aba[_0x5473eb(0x43a)],_0x27ea86[_0x5473eb(0x61d)]||_0x10d5e5[_0x5473eb(0x1d4)]());else{if(!Imported[_0x3973d8]){alert(_0x5473eb(0x641)[_0x5473eb(0x3eb)](_0x142862,_0x3973d8)),SceneManager[_0x5473eb(0x262)]();break;}}}const _0x29a1e=_0x6b6849[_0x5473eb(0x1ff)];if(_0x29a1e[_0x5473eb(0x5ba)](/\[Version[ ](.*?)\]/i)){if('qduyK'!==_0x5473eb(0x1d2)){const _0x214ee2=Number(RegExp['$1']);_0x214ee2!==VisuMZ[label][_0x5473eb(0x589)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x142862,_0x214ee2)),SceneManager[_0x5473eb(0x262)]());}else this[_0x5473eb(0x562)][_0x5473eb(0x4e2)]['x']=_0x26ab8c[_0x5473eb(0x335)](0x0,this[_0x5473eb(0x562)][_0x5473eb(0x4e2)]['x']-0.1),this[_0x5473eb(0x562)][_0x5473eb(0x4e2)]['y']=_0x5e4933['max'](0x0,this[_0x5473eb(0x562)]['scale']['y']-0.1);}if(_0x29a1e[_0x5473eb(0x5ba)](/\[Tier[ ](\d+)\]/i)){const _0x427217=Number(RegExp['$1']);_0x427217<tier?_0x5473eb(0x18f)!==_0x5473eb(0x3b7)?(alert(_0x5473eb(0x2d0)[_0x5473eb(0x3eb)](_0x142862,_0x427217,tier)),SceneManager[_0x5473eb(0x262)]()):(_0x1a7792[_0x5473eb(0x562)][_0x5473eb(0x2ed)]=this[_0x5473eb(0x2d8)](),_0x1d020e[_0x5473eb(0x562)][_0x5473eb(0x3b8)]=_0x1ab74[_0x5473eb(0x575)](_0x3f830c['_shadowSprite'][_0x5473eb(0x2ed)])):_0x5473eb(0x5ea)!=='TNrGD'?tier=Math[_0x5473eb(0x335)](_0x427217,tier):(this['_eventIcon'][_0x5473eb(0x17f)]=_0x3305b8(_0x453d56['$1']),this['_eventIcon'][_0x5473eb(0x5ad)]=_0x280b47(_0x17ccb6['$2']));}VisuMZ[_0x5473eb(0x2dc)](VisuMZ[label]['Settings'],_0x6b6849[_0x5473eb(0x297)]);})(pluginData),VisuMZ[_0x255dc2(0x586)]=function(_0x25b7ba,_0x3801bd,_0x2fbf88){switch(_0x2fbf88){case'=':return _0x3801bd;break;case'+':return _0x25b7ba+_0x3801bd;break;case'-':return _0x25b7ba-_0x3801bd;break;case'*':return _0x25b7ba*_0x3801bd;break;case'/':return _0x25b7ba/_0x3801bd;break;case'%':return _0x25b7ba%_0x3801bd;break;}return _0x25b7ba;},PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x2ca),_0x2aa08c=>{const _0xce8a9b=_0x255dc2;VisuMZ[_0xce8a9b(0x2dc)](_0x2aa08c,_0x2aa08c);switch(_0x2aa08c[_0xce8a9b(0x2e3)]){case'Allow':$gameSystem[_0xce8a9b(0x357)](!![]);break;case _0xce8a9b(0x408):$gameSystem[_0xce8a9b(0x357)](![]);break;case _0xce8a9b(0x63b):$gameSystem[_0xce8a9b(0x357)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],_0x255dc2(0x5ae),_0xe2180f=>{const _0x1b0350=_0x255dc2;VisuMZ['ConvertParams'](_0xe2180f,_0xe2180f);const _0x5c85ff=$gameTemp[_0x1b0350(0x402)](),_0xb6df05={'mapId':_0xe2180f[_0x1b0350(0x348)],'eventId':_0xe2180f['EventId']||_0x5c85ff['eventId'](),'pageId':_0xe2180f['PageId']};if(_0xb6df05['mapId']<=0x0)_0xb6df05['mapId']=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x1b0350(0x402)]()[_0x1b0350(0x461)](_0xb6df05);}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],_0x255dc2(0x295),_0x32aacd=>{const _0x39da36=_0x255dc2;VisuMZ[_0x39da36(0x2dc)](_0x32aacd,_0x32aacd);switch(_0x32aacd['Value']){case _0x39da36(0x4ef):$gameSystem[_0x39da36(0x36f)](!![]);break;case _0x39da36(0x352):$gameSystem[_0x39da36(0x36f)](![]);break;case _0x39da36(0x63b):$gameSystem[_0x39da36(0x36f)](!$gameSystem[_0x39da36(0x4ed)]());break;}}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x2d9),_0x35c794=>{const _0x117320=_0x255dc2;VisuMZ['ConvertParams'](_0x35c794,_0x35c794);const _0x5cb1e6=$gameTemp['getLastPluginCommandInterpreter']();_0x35c794['MapId']=_0x35c794[_0x117320(0x348)]||$gameMap[_0x117320(0x5ec)](),$gameSystem[_0x117320(0x53a)](_0x35c794['MapId'],_0x35c794[_0x117320(0x32d)]||_0x5cb1e6[_0x117320(0x1d4)](),_0x35c794[_0x117320(0x2cf)],_0x35c794['IconBufferX'],_0x35c794[_0x117320(0x33f)],_0x35c794['IconBlendMode']);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x5f0),_0x34dd4b=>{const _0x33445a=_0x255dc2;VisuMZ[_0x33445a(0x2dc)](_0x34dd4b,_0x34dd4b);const _0xd0b49=$gameTemp['getLastPluginCommandInterpreter']();_0x34dd4b[_0x33445a(0x348)]=_0x34dd4b[_0x33445a(0x348)]||$gameMap[_0x33445a(0x5ec)](),$gameSystem[_0x33445a(0x5c0)](_0x34dd4b['MapId'],_0x34dd4b['EventId']||_0xd0b49[_0x33445a(0x1d4)]());}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x25d),_0x46523b=>{if($gameMap)for(const _0x160426 of $gameMap['events']()){_0x160426['refresh']();}}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x478),_0x645a3e=>{const _0x2bd476=_0x255dc2;VisuMZ[_0x2bd476(0x2dc)](_0x645a3e,_0x645a3e);switch(_0x645a3e[_0x2bd476(0x254)]){case _0x2bd476(0x17c):$gameSystem[_0x2bd476(0x24a)](!![]);break;case'Hidden':$gameSystem[_0x2bd476(0x24a)](![]);break;case _0x2bd476(0x63b):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x2bd476(0x4f6)]());break;}}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x4fe),_0x5dab6c=>{const _0x141be6=_0x255dc2;VisuMZ['ConvertParams'](_0x5dab6c,_0x5dab6c);const _0x593db3=$gameTemp[_0x141be6(0x402)]();if(!$gameMap)return;const _0x2d8978=$gameMap['event'](_0x5dab6c['EventId']||_0x593db3['eventId']());if(_0x2d8978)_0x2d8978[_0x141be6(0x425)]();}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x43b),_0x4d9928=>{const _0x5c95e1=_0x255dc2;VisuMZ[_0x5c95e1(0x2dc)](_0x4d9928,_0x4d9928);const _0x3cb950=$gameTemp[_0x5c95e1(0x402)](),_0x50773b=_0x4d9928[_0x5c95e1(0x348)]||$gameMap['mapId'](),_0x16878d=_0x4d9928['EventId']||_0x3cb950['eventId'](),_0x273990=_0x4d9928[_0x5c95e1(0x18a)]||0x0,_0x34204f=_0x4d9928[_0x5c95e1(0x632)]||0x0,_0x3a5b48=_0x4d9928['Direction']||0x2,_0x52ad75=((_0x4d9928[_0x5c95e1(0x473)]||0x1)-0x1)[_0x5c95e1(0x46e)](0x0,0x13),_0x36202b=_0x4d9928['MoveRouteIndex']||0x0;$gameSystem[_0x5c95e1(0x33e)](_0x50773b,_0x16878d,_0x273990,_0x34204f,_0x3a5b48,_0x52ad75,_0x36202b);}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],'EventLocationDelete',_0x106fdf=>{const _0x33b057=_0x255dc2;VisuMZ[_0x33b057(0x2dc)](_0x106fdf,_0x106fdf);const _0x45670d=$gameTemp[_0x33b057(0x402)](),_0x4a78ee=_0x106fdf[_0x33b057(0x348)]||$gameMap[_0x33b057(0x5ec)](),_0x100818=_0x106fdf[_0x33b057(0x32d)]||_0x45670d[_0x33b057(0x1d4)]();$gameSystem[_0x33b057(0x292)](_0x4a78ee,_0x100818);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],'EventTimerExpireEvent',_0x807a3b=>{const _0x1d4e80=_0x255dc2;VisuMZ[_0x1d4e80(0x2dc)](_0x807a3b,_0x807a3b);const _0x149c12=_0x807a3b[_0x1d4e80(0x37f)];$gameTimer[_0x1d4e80(0x3df)](_0x149c12);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x36a),_0x4886e4=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],'EventTimerFramesGain',_0x410293=>{const _0x562af3=_0x255dc2;if(!$gameTimer[_0x562af3(0x400)]())return;VisuMZ[_0x562af3(0x2dc)](_0x410293,_0x410293);let _0x49228f=0x0;_0x49228f+=_0x410293[_0x562af3(0x475)],_0x49228f+=_0x410293[_0x562af3(0x40c)]*0x3c,_0x49228f+=_0x410293[_0x562af3(0x600)]*0x3c*0x3c,_0x49228f+=_0x410293[_0x562af3(0x291)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x49228f);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],'EventTimerFramesSet',_0x587f9f=>{const _0x484347=_0x255dc2;if(!$gameTimer['isWorking']())return;VisuMZ[_0x484347(0x2dc)](_0x587f9f,_0x587f9f);let _0x2cc615=0x0;_0x2cc615+=_0x587f9f[_0x484347(0x475)],_0x2cc615+=_0x587f9f[_0x484347(0x40c)]*0x3c,_0x2cc615+=_0x587f9f[_0x484347(0x600)]*0x3c*0x3c,_0x2cc615+=_0x587f9f[_0x484347(0x291)]*0x3c*0x3c*0x3c,$gameTimer[_0x484347(0x355)](_0x2cc615);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x199),_0x2cbba8=>{const _0x3786d5=_0x255dc2;if(!$gameTimer[_0x3786d5(0x400)]())return;$gameTimer[_0x3786d5(0x55a)]();}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x20d),_0x55fd4e=>{if(!$gameTimer['isWorking']())return;$gameTimer['resume']();}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x464),_0x28b975=>{const _0x53a3cc=_0x255dc2;VisuMZ[_0x53a3cc(0x2dc)](_0x28b975,_0x28b975);const _0x4ea9ee=_0x28b975[_0x53a3cc(0x588)]||0x0;$gameTimer['changeSpeed'](_0x4ea9ee);}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],_0x255dc2(0x2c6),_0x3fa4b0=>{const _0x287152=_0x255dc2;VisuMZ[_0x287152(0x2dc)](_0x3fa4b0,_0x3fa4b0);const _0xa813ba=!_0x3fa4b0[_0x287152(0x28e)];$gameSystem[_0x287152(0x304)](_0xa813ba);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x266),_0x216839=>{const _0x2c25ce=_0x255dc2;VisuMZ[_0x2c25ce(0x2dc)](_0x216839,_0x216839);const _0xd0f1b7=(_0x216839[_0x2c25ce(0x198)]||0x0)-0x1,_0x43d099=!_0x216839['Chase'],_0x413654=$gamePlayer[_0x2c25ce(0x34e)]()['follower'](_0xd0f1b7);if(_0x413654)_0x413654[_0x2c25ce(0x287)](_0x43d099);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x609),_0x4c3ca6=>{const _0x270edd=_0x255dc2;VisuMZ[_0x270edd(0x2dc)](_0x4c3ca6,_0x4c3ca6);const _0x5af330=_0x4c3ca6[_0x270edd(0x198)];$gameSystem[_0x270edd(0x22d)](_0x5af330);}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],_0x255dc2(0x532),_0x2bec7a=>{const _0x89ebed=_0x255dc2;VisuMZ[_0x89ebed(0x2dc)](_0x2bec7a,_0x2bec7a),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x89ebed(0x304)](![]);for(const _0x9e24b4 of $gamePlayer[_0x89ebed(0x34e)]()[_0x89ebed(0x1cc)]){if(_0x9e24b4)_0x9e24b4['setChaseOff'](![]);}}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x2c1),_0x3c4859=>{const _0x17aaf5=_0x255dc2;VisuMZ[_0x17aaf5(0x2dc)](_0x3c4859,_0x3c4859);const _0xf03f9a=$gameTemp[_0x17aaf5(0x402)]();_0x3c4859[_0x17aaf5(0x348)]=_0x3c4859['MapId']||$gameMap[_0x17aaf5(0x5ec)]();const _0x3cc140=[_0x3c4859[_0x17aaf5(0x348)],_0x3c4859[_0x17aaf5(0x32d)]||_0xf03f9a[_0x17aaf5(0x1d4)](),_0x3c4859['Letter']],_0x17f410=_0x3c4859[_0x17aaf5(0x625)],_0x36b9c1=$gameSelfSwitches[_0x17aaf5(0x2b3)](_0x3cc140)||![];$gameSwitches[_0x17aaf5(0x491)](_0x17f410,_0x36b9c1);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x303),_0x4a756b=>{const _0x5001d6=_0x255dc2;VisuMZ['ConvertParams'](_0x4a756b,_0x4a756b);const _0x47076d=$gameTemp[_0x5001d6(0x402)]();_0x4a756b[_0x5001d6(0x348)]=_0x4a756b['MapId']||$gameMap['mapId']();const _0x4b481e=[_0x4a756b['MapId'],_0x4a756b[_0x5001d6(0x32d)]||_0x47076d['eventId'](),_0x5001d6(0x545)[_0x5001d6(0x3eb)](_0x4a756b[_0x5001d6(0x459)])],_0xda79d8=_0x4a756b['TargetSwitchId'],_0x348a3f=$gameSelfSwitches['value'](_0x4b481e)||![];$gameSwitches[_0x5001d6(0x491)](_0xda79d8,_0x348a3f);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x4d9),_0x5ebbd0=>{const _0x4e7c3f=_0x255dc2;VisuMZ[_0x4e7c3f(0x2dc)](_0x5ebbd0,_0x5ebbd0);const _0x4351e9=$gameTemp[_0x4e7c3f(0x402)]();_0x5ebbd0[_0x4e7c3f(0x348)]=_0x5ebbd0[_0x4e7c3f(0x348)]||$gameMap[_0x4e7c3f(0x5ec)]();const _0x493959=[_0x5ebbd0['MapId'],_0x5ebbd0[_0x4e7c3f(0x32d)]||_0x4351e9['eventId'](),_0x4e7c3f(0x58d)[_0x4e7c3f(0x3eb)](_0x5ebbd0[_0x4e7c3f(0x5ff)])],_0x44bca0=_0x5ebbd0[_0x4e7c3f(0x2bb)],_0x136eba=$gameSelfSwitches[_0x4e7c3f(0x2b3)](_0x493959)||![];$gameVariables[_0x4e7c3f(0x491)](_0x44bca0,_0x136eba);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x36b),_0x8c7700=>{const _0x126e84=_0x255dc2;VisuMZ['ConvertParams'](_0x8c7700,_0x8c7700);if(!$gameMap)return;const _0x4718b5=$gameTemp[_0x126e84(0x402)](),_0x10553c=_0x8c7700[_0x126e84(0x4b0)];_0x8c7700[_0x126e84(0x4e6)]=_0x8c7700[_0x126e84(0x4e6)]||$gameMap[_0x126e84(0x5ec)](),_0x8c7700['Step2MapId']=_0x8c7700[_0x126e84(0x43a)]||$gameMap['mapId'](),_0x8c7700[_0x126e84(0x4a5)]=_0x8c7700['TemplateName'][_0x126e84(0x242)]()['trim']();if(!_0x10553c&&_0x8c7700[_0x126e84(0x4e6)]!==$gameMap[_0x126e84(0x5ec)]())return;if($gameMap[_0x126e84(0x5ec)]()===_0x8c7700[_0x126e84(0x4e6)]){if(_0x126e84(0x28d)===_0x126e84(0x28d)){const _0x559674=$gameMap['event'](_0x8c7700['Step1EventId']||_0x4718b5[_0x126e84(0x1d4)]());if(!_0x559674)return;_0x8c7700[_0x126e84(0x4a5)]!=='UNTITLED'?_0x559674[_0x126e84(0x3f9)](_0x8c7700[_0x126e84(0x4a5)]):_0x126e84(0x25a)===_0x126e84(0x25a)?_0x559674[_0x126e84(0x44c)](_0x8c7700[_0x126e84(0x43a)],_0x8c7700[_0x126e84(0x61d)]||_0x4718b5[_0x126e84(0x1d4)]()):_0x39347e+=_0x2ab729[_0x126e84(0x297)][0x0];}else{if(!this[_0x126e84(0x224)](this['_x'],this['_y'],_0x50a71c))return this[_0x126e84(0x471)](_0x396ad6);if(!this['canPass'](this['_x'],this['_y'],_0x76a1bf))return this[_0x126e84(0x471)](_0x4af48d);if(!this[_0x126e84(0x20a)](this['_x'],this['_y'],_0x4488dd,_0x41cca5)){let _0x299d79=_0x2383dd[_0x126e84(0x1ab)][_0x126e84(0x61c)][_0x126e84(0x3c5)][_0x126e84(0x623)]?_0x34a368:_0x5f55f9;return this[_0x126e84(0x471)](_0x299d79);}}}_0x10553c&&$gameSystem['savePreservedMorphEventDataKey'](_0x8c7700[_0x126e84(0x4e6)],_0x8c7700[_0x126e84(0x3a9)],_0x8c7700['TemplateName'],_0x8c7700[_0x126e84(0x43a)],_0x8c7700['Step2EventId']);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x5df),_0x31c93b=>{const _0x4b8fb1=_0x255dc2;VisuMZ[_0x4b8fb1(0x2dc)](_0x31c93b,_0x31c93b);if(!$gameMap)return;const _0x1d4863=$gameTemp['getLastPluginCommandInterpreter']();_0x31c93b['MapId']=_0x31c93b[_0x4b8fb1(0x348)]||$gameMap[_0x4b8fb1(0x5ec)]();if($gameMap[_0x4b8fb1(0x5ec)]()===_0x31c93b[_0x4b8fb1(0x348)]){const _0x22aa9d=$gameMap['event'](_0x31c93b['EventId']||_0x1d4863[_0x4b8fb1(0x1d4)]());_0x22aa9d['removeMorph']();}_0x31c93b['RemovePreserve']&&$gameSystem['deletePreservedMorphEventDataKey'](_0x31c93b['MapId'],_0x31c93b['EventId']||_0x1d4863[_0x4b8fb1(0x1d4)]());}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x3da),_0x7b5965=>{const _0x1b6b09=_0x255dc2;VisuMZ[_0x1b6b09(0x2dc)](_0x7b5965,_0x7b5965),$gameSystem[_0x1b6b09(0x311)](!_0x7b5965[_0x1b6b09(0x4ef)]);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x385),_0x371346=>{const _0x5e9e66=_0x255dc2;VisuMZ['ConvertParams'](_0x371346,_0x371346),$gameSystem[_0x5e9e66(0x3bf)](_0x371346[_0x5e9e66(0x31f)]);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x327),_0x1b1072=>{const _0x3f6c38=_0x255dc2;VisuMZ[_0x3f6c38(0x2dc)](_0x1b1072,_0x1b1072),$gameSystem[_0x3f6c38(0x1b9)]($gamePlayer,_0x1b1072['IconIndex'],_0x1b1072[_0x3f6c38(0x382)],_0x1b1072['IconBufferY'],_0x1b1072[_0x3f6c38(0x489)]);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x4f4),_0x30cffd=>{const _0x5d2230=_0x255dc2;VisuMZ[_0x5d2230(0x2dc)](_0x30cffd,_0x30cffd),$gameSystem[_0x5d2230(0x4b9)]($gamePlayer);}),PluginManager['registerCommand'](pluginData['name'],_0x255dc2(0x551),_0xd91634=>{const _0x22c28e=_0x255dc2;VisuMZ[_0x22c28e(0x2dc)](_0xd91634,_0xd91634);const _0x79a1c=$gameTemp[_0x22c28e(0x402)]();_0xd91634[_0x22c28e(0x348)]=_0xd91634[_0x22c28e(0x348)]||$gameMap['mapId']();const _0x3028aa=[_0xd91634[_0x22c28e(0x348)],_0xd91634[_0x22c28e(0x32d)]||_0x79a1c['eventId'](),_0xd91634[_0x22c28e(0x423)]];switch(_0xd91634[_0x22c28e(0x2e3)]){case'ON':$gameSelfSwitches[_0x22c28e(0x491)](_0x3028aa,!![]);break;case _0x22c28e(0x178):$gameSelfSwitches[_0x22c28e(0x491)](_0x3028aa,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x3028aa,!$gameSelfSwitches[_0x22c28e(0x2b3)](_0x3028aa));break;}}),PluginManager['registerCommand'](pluginData[_0x255dc2(0x627)],_0x255dc2(0x424),_0x3aad8e=>{const _0x28abaa=_0x255dc2;VisuMZ[_0x28abaa(0x2dc)](_0x3aad8e,_0x3aad8e);const _0x321e5f=$gameTemp[_0x28abaa(0x402)]();_0x3aad8e[_0x28abaa(0x348)]=_0x3aad8e[_0x28abaa(0x348)]||$gameMap[_0x28abaa(0x5ec)]();const _0x241a47=[_0x3aad8e[_0x28abaa(0x348)],_0x3aad8e[_0x28abaa(0x32d)]||_0x321e5f[_0x28abaa(0x1d4)](),_0x28abaa(0x545)['format'](_0x3aad8e[_0x28abaa(0x459)])];switch(_0x3aad8e[_0x28abaa(0x2e3)]){case'ON':$gameSelfSwitches['setValue'](_0x241a47,!![]);break;case _0x28abaa(0x178):$gameSelfSwitches[_0x28abaa(0x491)](_0x241a47,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x241a47,!$gameSelfSwitches[_0x28abaa(0x2b3)](_0x241a47));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x255dc2(0x5f2),_0x203e4e=>{const _0x3ae593=_0x255dc2;VisuMZ[_0x3ae593(0x2dc)](_0x203e4e,_0x203e4e);const _0x343592=$gameTemp[_0x3ae593(0x402)]();_0x203e4e[_0x3ae593(0x348)]=_0x203e4e[_0x3ae593(0x348)]||$gameMap[_0x3ae593(0x5ec)]();const _0x48b4f7=[_0x203e4e[_0x3ae593(0x348)],_0x203e4e[_0x3ae593(0x32d)]||_0x343592[_0x3ae593(0x1d4)](),_0x3ae593(0x58d)[_0x3ae593(0x3eb)](_0x203e4e[_0x3ae593(0x5ff)])],_0x46bf06=VisuMZ[_0x3ae593(0x586)]($gameSelfSwitches['value'](_0x48b4f7),_0x203e4e[_0x3ae593(0x2e3)],_0x203e4e[_0x3ae593(0x1b7)]);$gameSelfSwitches[_0x3ae593(0x491)](_0x48b4f7,_0x46bf06);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],'SpawnEventAtXY',_0x47c253=>{const _0x21aa6d=_0x255dc2;VisuMZ[_0x21aa6d(0x2dc)](_0x47c253,_0x47c253);const _0x2bfe45=$gameTemp['getLastPluginCommandInterpreter'](),_0x53131a={'template':_0x47c253[_0x21aa6d(0x4a5)],'mapId':_0x47c253['MapId']||$gameMap[_0x21aa6d(0x5ec)](),'eventId':_0x47c253[_0x21aa6d(0x32d)]||_0x2bfe45[_0x21aa6d(0x1d4)](),'x':_0x47c253[_0x21aa6d(0x18a)],'y':_0x47c253[_0x21aa6d(0x632)],'spawnPreserved':_0x47c253['Preserve'],'spawnEventId':$gameMap[_0x21aa6d(0x1c1)][_0x21aa6d(0x42c)]+0x3e8},_0x45d669=_0x47c253[_0x21aa6d(0x1e5)]||0x0;if(!VisuMZ[_0x21aa6d(0x3a1)][_0x53131a[_0x21aa6d(0x5ec)]]&&_0x53131a[_0x21aa6d(0x5ec)]!==$gameMap['mapId']()){let _0x3c9edd=_0x21aa6d(0x53f)[_0x21aa6d(0x3eb)](_0x53131a['mapId']);_0x3c9edd+=_0x21aa6d(0x2e4),_0x3c9edd+=_0x21aa6d(0x3cd),_0x3c9edd+=_0x21aa6d(0x314),_0x3c9edd+=_0x21aa6d(0x640)[_0x21aa6d(0x3eb)](_0x53131a[_0x21aa6d(0x5ec)]),alert(_0x3c9edd);return;}const _0x34bbfc=$gameMap[_0x21aa6d(0x37c)](_0x53131a,_0x47c253['Collision'],_0x47c253['Passability']);if(_0x45d669){if(_0x21aa6d(0x225)===_0x21aa6d(0x621)){_0xb0f312[_0x21aa6d(0x1ab)]['Game_Map_unlockEvent'][_0x21aa6d(0x4a2)](this,_0x30920e);if(_0x371b2b>=0x3e8){const _0x24b325=this[_0x21aa6d(0x1bb)](_0x6e560d);if(_0x24b325)_0x24b325[_0x21aa6d(0x5a0)]();}}else $gameSwitches[_0x21aa6d(0x491)](_0x45d669,!!_0x34bbfc);}}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],'SpawnEventAtRegion',_0x1f0864=>{const _0x5f0789=_0x255dc2;VisuMZ['ConvertParams'](_0x1f0864,_0x1f0864);const _0x495858=$gameTemp[_0x5f0789(0x402)](),_0x52f945={'template':_0x1f0864[_0x5f0789(0x4a5)],'mapId':_0x1f0864[_0x5f0789(0x348)]||$gameMap['mapId'](),'eventId':_0x1f0864[_0x5f0789(0x32d)]||_0x495858['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1f0864[_0x5f0789(0x300)],'spawnEventId':$gameMap[_0x5f0789(0x1c1)][_0x5f0789(0x42c)]+0x3e8},_0x542773=_0x1f0864[_0x5f0789(0x1e5)]||0x0;if(!VisuMZ[_0x5f0789(0x3a1)][_0x52f945[_0x5f0789(0x5ec)]]&&_0x52f945[_0x5f0789(0x5ec)]!==$gameMap['mapId']()){let _0x564843=_0x5f0789(0x53f)['format'](_0x52f945['mapId']);_0x564843+=_0x5f0789(0x2e4),_0x564843+=_0x5f0789(0x3cd),_0x564843+=_0x5f0789(0x314),_0x564843+=_0x5f0789(0x640)[_0x5f0789(0x3eb)](_0x52f945[_0x5f0789(0x5ec)]),alert(_0x564843);return;}const _0x275102=$gameMap[_0x5f0789(0x48d)](_0x52f945,_0x1f0864[_0x5f0789(0x52d)],_0x1f0864['Collision'],_0x1f0864[_0x5f0789(0x469)]);if(_0x542773){if(_0x5f0789(0x217)==='FYKjG')$gameSwitches[_0x5f0789(0x491)](_0x542773,!!_0x275102);else return this[_0x5f0789(0x37a)]()?this[_0x5f0789(0x4cd)]():_0x4489d8[_0x5f0789(0x1ab)][_0x5f0789(0x189)][_0x5f0789(0x4a2)](this);}}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x56a),_0x1fefea=>{const _0x3c7260=_0x255dc2;VisuMZ['ConvertParams'](_0x1fefea,_0x1fefea);const _0x482d73=$gameTemp['getLastPluginCommandInterpreter'](),_0x41d178={'template':_0x1fefea[_0x3c7260(0x4a5)],'mapId':_0x1fefea['MapId']||$gameMap[_0x3c7260(0x5ec)](),'eventId':_0x1fefea[_0x3c7260(0x32d)]||_0x482d73[_0x3c7260(0x1d4)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1fefea[_0x3c7260(0x300)],'spawnEventId':$gameMap[_0x3c7260(0x1c1)]['length']+0x3e8},_0x475cee=_0x1fefea['SuccessSwitchId']||0x0;if(!VisuMZ[_0x3c7260(0x3a1)][_0x41d178[_0x3c7260(0x5ec)]]&&_0x41d178[_0x3c7260(0x5ec)]!==$gameMap[_0x3c7260(0x5ec)]()){let _0x5e516c=_0x3c7260(0x53f)['format'](_0x41d178[_0x3c7260(0x5ec)]);_0x5e516c+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x5e516c+=_0x3c7260(0x3cd),_0x5e516c+=_0x3c7260(0x314),_0x5e516c+=_0x3c7260(0x640)[_0x3c7260(0x3eb)](_0x41d178[_0x3c7260(0x5ec)]),alert(_0x5e516c);return;}const _0x21119a=$gameMap[_0x3c7260(0x52b)](_0x41d178,_0x1fefea[_0x3c7260(0x30a)],_0x1fefea[_0x3c7260(0x2e6)],_0x1fefea[_0x3c7260(0x469)]);_0x475cee&&$gameSwitches[_0x3c7260(0x491)](_0x475cee,!!_0x21119a);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x5fb),_0x438e01=>{const _0x34f28f=_0x255dc2;VisuMZ[_0x34f28f(0x2dc)](_0x438e01,_0x438e01);const _0x475aa1=$gameTemp[_0x34f28f(0x402)]();$gameMap[_0x34f28f(0x5e8)](_0x438e01[_0x34f28f(0x268)]||_0x475aa1[_0x34f28f(0x1d4)]());}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],'SpawnEventDespawnAtXY',_0x47eafb=>{const _0x40ebd1=_0x255dc2;VisuMZ['ConvertParams'](_0x47eafb,_0x47eafb);const _0x20b464=_0x47eafb[_0x40ebd1(0x18a)],_0x287840=_0x47eafb[_0x40ebd1(0x632)];$gameMap[_0x40ebd1(0x2a2)](_0x20b464,_0x287840);}),PluginManager[_0x255dc2(0x611)](pluginData[_0x255dc2(0x627)],_0x255dc2(0x5e5),_0x3afb14=>{const _0x570e84=_0x255dc2;VisuMZ[_0x570e84(0x2dc)](_0x3afb14,_0x3afb14),$gameMap[_0x570e84(0x1ae)](_0x3afb14['Region']);}),PluginManager['registerCommand'](pluginData['name'],_0x255dc2(0x615),_0x5c1c1b=>{const _0x28df31=_0x255dc2;VisuMZ[_0x28df31(0x2dc)](_0x5c1c1b,_0x5c1c1b),$gameMap[_0x28df31(0x3bd)](_0x5c1c1b[_0x28df31(0x30a)]);}),PluginManager[_0x255dc2(0x611)](pluginData['name'],_0x255dc2(0x3c8),_0x1c2228=>{const _0x480912=_0x255dc2;VisuMZ[_0x480912(0x2dc)](_0x1c2228,_0x1c2228),$gameMap[_0x480912(0x29a)]();}),VisuMZ['EventsMoveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x255dc2(0x301)][_0x255dc2(0x4d4)],Scene_Boot['prototype'][_0x255dc2(0x4d4)]=function(){const _0x52a917=_0x255dc2;VisuMZ['EventsMoveCore'][_0x52a917(0x4a3)]['call'](this),this[_0x52a917(0x4dd)](),this[_0x52a917(0x1a7)]();if(VisuMZ[_0x52a917(0x1ab)]['CustomPageConditions'])VisuMZ[_0x52a917(0x1ab)][_0x52a917(0x1e9)][_0x52a917(0x407)]();},VisuMZ[_0x255dc2(0x3a1)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x255dc2(0x301)][_0x255dc2(0x4dd)]=function(){const _0x52e58c=_0x255dc2;if(DataManager[_0x52e58c(0x3fa)]()||DataManager[_0x52e58c(0x4b7)]())return;const _0x320535=VisuMZ[_0x52e58c(0x1ab)][_0x52e58c(0x61c)][_0x52e58c(0x324)],_0x4e4cdb=_0x320535[_0x52e58c(0x567)][_0x52e58c(0x296)](0x0);for(const _0x5b827e of _0x320535[_0x52e58c(0x52c)]){_0x5b827e['Name']=_0x5b827e[_0x52e58c(0x33d)][_0x52e58c(0x242)]()[_0x52e58c(0x458)](),VisuMZ[_0x52e58c(0x1f4)][_0x5b827e[_0x52e58c(0x33d)]]=_0x5b827e;if(!_0x4e4cdb[_0x52e58c(0x571)](_0x5b827e[_0x52e58c(0x451)]))_0x4e4cdb[_0x52e58c(0x2aa)](_0x5b827e[_0x52e58c(0x451)]);}for(const _0x2bc7e3 of _0x4e4cdb){if(VisuMZ[_0x52e58c(0x3a1)][_0x2bc7e3])continue;const _0xb33a46=_0x52e58c(0x568)[_0x52e58c(0x3eb)](_0x2bc7e3[_0x52e58c(0x4ab)](0x3)),_0x369a10='$preloadedMap_%1'[_0x52e58c(0x3eb)](_0x2bc7e3);DataManager[_0x52e58c(0x533)](_0x369a10,_0xb33a46),setTimeout(this[_0x52e58c(0x2a4)][_0x52e58c(0x2b5)](this,_0x2bc7e3,_0x369a10),0x64);}},Scene_Boot[_0x255dc2(0x301)][_0x255dc2(0x2a4)]=function(_0x5810e2,_0x584941){const _0x4ab903=_0x255dc2;window[_0x584941]?(VisuMZ[_0x4ab903(0x3a1)][_0x5810e2]=window[_0x584941],window[_0x584941]=undefined):setTimeout(this[_0x4ab903(0x2a4)]['bind'](this,_0x5810e2,_0x584941),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x255dc2(0x536)]=[],VisuMZ[_0x255dc2(0x470)]=[],VisuMZ[_0x255dc2(0x2f6)]=[],Scene_Boot['prototype'][_0x255dc2(0x1a7)]=function(){const _0x3e817e=_0x255dc2;for(let _0x2e9907=0x1;_0x2e9907<$dataSystem[_0x3e817e(0x44f)][_0x3e817e(0x42c)];_0x2e9907++){if('HKaYB'===_0x3e817e(0x3bc)){_0x50aaeb[_0x3e817e(0x2dc)](_0x348ee0,_0x17df76);const _0x15b91a=_0x20c99c['PosX'],_0x16c691=_0x253dbf[_0x3e817e(0x632)];_0x704367[_0x3e817e(0x2a2)](_0x15b91a,_0x16c691);}else{if($dataSystem[_0x3e817e(0x44f)][_0x2e9907]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3e817e(0x3d4)][_0x3e817e(0x2aa)](_0x2e9907);if($dataSystem['switches'][_0x2e9907][_0x3e817e(0x5ba)](/<SELF>/i))VisuMZ[_0x3e817e(0x536)][_0x3e817e(0x2aa)](_0x2e9907);}}for(let _0x4350fa=0x1;_0x4350fa<$dataSystem[_0x3e817e(0x31a)][_0x3e817e(0x42c)];_0x4350fa++){if(_0x3e817e(0x544)!==_0x3e817e(0x4cc)){if($dataSystem['variables'][_0x4350fa][_0x3e817e(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3e817e(0x470)][_0x3e817e(0x2aa)](_0x4350fa);if($dataSystem[_0x3e817e(0x31a)][_0x4350fa][_0x3e817e(0x5ba)](/<SELF>/i))VisuMZ['SelfVariables']['push'](_0x4350fa);}else{if(this['_PreservedEventMorphData']===_0x1a5ecb)this[_0x3e817e(0x460)]();const _0x183497=_0x3e817e(0x29e)[_0x3e817e(0x3eb)](_0x2c32e5,_0x3e21a4);this[_0x3e817e(0x3f6)][_0x183497]={'template':_0x12d0fb,'mapId':_0x1668d0,'eventId':_0x5926aa};}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1e9)]={},VisuMZ['EventsMoveCore']['CustomPageConditions']['initialize']=function(){const _0x5e8d74=_0x255dc2;this[_0x5e8d74(0x2a9)]=new Game_CPCInterpreter(),this[_0x5e8d74(0x4bb)]();},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1e9)][_0x255dc2(0x4bb)]=function(){const _0x17e51c=_0x255dc2;this[_0x17e51c(0x1b8)]=[];for(const _0x5b2be3 of $dataCommonEvents){if(!_0x5b2be3)continue;VisuMZ[_0x17e51c(0x1ab)]['CustomPageConditions'][_0x17e51c(0x284)](_0x5b2be3);if(_0x5b2be3[_0x17e51c(0x59d)]['length']>0x0)this[_0x17e51c(0x1b8)]['push'](_0x5b2be3['id']);}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1e9)][_0x255dc2(0x439)]=function(_0x3a942f,_0x15e668){const _0x268e82=_0x255dc2;return this['_interpreter'][_0x268e82(0x289)](_0x3a942f,_0x15e668),this['_interpreter'][_0x268e82(0x409)](),this[_0x268e82(0x2a9)][_0x268e82(0x353)];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1e9)]['loadCPC']=function(_0x53d60b){const _0x2130ed=_0x255dc2;let _0x3a155c=![];_0x53d60b[_0x2130ed(0x59d)]=[];for(const _0x451b57 of _0x53d60b['list']){if(_0x2130ed(0x3f2)==='ynSeT')return _0x35a822[_0x2130ed(0x216)](0x0,0x0,0x0,0x0);else{if([0x6c,0x198]['includes'](_0x451b57[_0x2130ed(0x2fe)])){const _0x4724b9=_0x451b57['parameters'][0x0];if(_0x4724b9[_0x2130ed(0x5ba)](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x2130ed(0x397)===_0x2130ed(0x267)){if(this[_0x2130ed(0x5dd)]===_0x4dc664)this[_0x2130ed(0x460)]();this[_0x2130ed(0x5dd)]=_0x417dd1;}else _0x3a155c=!![];}else{if(_0x4724b9[_0x2130ed(0x5ba)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x2130ed(0x31e)===_0x2130ed(0x31e))_0x3a155c=![];else{let _0x16d09f=_0x2130ed(0x53f)['format'](_0x176286[_0x2130ed(0x5ec)]);_0x16d09f+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x16d09f+=_0x2130ed(0x3cd),_0x16d09f+=_0x2130ed(0x314),_0x16d09f+=_0x2130ed(0x640)[_0x2130ed(0x3eb)](_0x2a8e7f[_0x2130ed(0x5ec)]),_0x59a62c(_0x16d09f);return;}}}}_0x3a155c&&(_0x2130ed(0x180)!==_0x2130ed(0x180)?this['_diagonalSupport']=!![]:_0x53d60b[_0x2130ed(0x59d)]['push'](_0x451b57));}}},getSelfSwitchValue=function(_0x3b6a29,_0xd67b53,_0x33a474){const _0x55586f=_0x255dc2;let _0x49aa58=[_0x3b6a29,_0xd67b53,_0x55586f(0x545)[_0x55586f(0x3eb)](_0x33a474)];return typeof _0x33a474===_0x55586f(0x2a0)&&(_0x49aa58=[_0x3b6a29,_0xd67b53,_0x33a474[_0x55586f(0x242)]()['trim']()]),$gameSelfSwitches[_0x55586f(0x2b3)](_0x49aa58);},getSelfVariableValue=function(_0x3ede54,_0x25b17a,_0x2eaac5){const _0xd1c7ec=_0x255dc2,_0x5b8650=[_0x3ede54,_0x25b17a,'Self\x20Variable\x20%1'['format'](_0x2eaac5)];return $gameSelfSwitches[_0xd1c7ec(0x2b3)](_0x5b8650);},setSelfSwitchValue=function(_0x4b177a,_0x4e8123,_0x47a2ba,_0x189c60){const _0x2118c8=_0x255dc2;let _0x24906d=[_0x4b177a,_0x4e8123,'Self\x20Switch\x20%1'[_0x2118c8(0x3eb)](_0x47a2ba)];typeof _0x47a2ba===_0x2118c8(0x2a0)&&(_0x24906d=[_0x4b177a,_0x4e8123,_0x47a2ba[_0x2118c8(0x242)]()[_0x2118c8(0x458)]()]),$gameSelfSwitches[_0x2118c8(0x491)](_0x24906d,_0x189c60);},setSelfVariableValue=function(_0x5aedb0,_0x10e48e,_0x66aca6,_0x18316b){const _0x3f7ff6=_0x255dc2,_0x2c9696=[_0x5aedb0,_0x10e48e,_0x3f7ff6(0x58d)[_0x3f7ff6(0x3eb)](_0x66aca6)];$gameSelfSwitches['setValue'](_0x2c9696,_0x18316b);},DataManager['isAdvancedSwitch']=function(_0x441ce7){const _0x219c05=_0x255dc2;if(SceneManager[_0x219c05(0x5f1)][_0x219c05(0x592)]===Scene_Debug)return![];return VisuMZ[_0x219c05(0x3d4)]['includes'](_0x441ce7);},DataManager[_0x255dc2(0x19d)]=function(_0x2fc677){const _0x1de5f=_0x255dc2;if(SceneManager[_0x1de5f(0x5f1)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x1de5f(0x470)][_0x1de5f(0x571)](_0x2fc677);},DataManager[_0x255dc2(0x585)]=function(_0x1ca446){const _0x507c3a=_0x255dc2;if(SceneManager[_0x507c3a(0x5f1)][_0x507c3a(0x592)]===Scene_Debug)return![];return VisuMZ[_0x507c3a(0x536)][_0x507c3a(0x571)](_0x1ca446);},DataManager['isSelfVariable']=function(_0xf64db6){const _0x2ceef9=_0x255dc2;if(SceneManager['_scene'][_0x2ceef9(0x592)]===Scene_Debug)return![];return VisuMZ[_0x2ceef9(0x2f6)][_0x2ceef9(0x571)](_0xf64db6);},VisuMZ['EventsMoveCore'][_0x255dc2(0x2d7)]=Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x638)],Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x638)]=function(_0x290266,_0x331bf0){const _0x19217e=_0x255dc2;if(this[_0x19217e(0x4bf)](_0x290266,_0x331bf0))return;VisuMZ[_0x19217e(0x1ab)]['Game_Temp_setDestination'][_0x19217e(0x4a2)](this,_0x290266,_0x331bf0);},Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x4bf)]=function(_0x24b647,_0x35bc31){const _0x2c9003=_0x255dc2,_0x1f8064=$gameMap[_0x2c9003(0x2f1)](_0x24b647,_0x35bc31);for(const _0x349822 of _0x1f8064){if(_0x2c9003(0x5cd)!==_0x2c9003(0x48c)){if(_0x349822&&_0x349822[_0x2c9003(0x18e)]())return _0x349822[_0x2c9003(0x5d0)](),!![];}else{const _0x403d1d=['',_0x2c9003(0x1af),_0x2c9003(0x521),_0x2c9003(0x604),'HEART','ANGER','SWEAT',_0x2c9003(0x3d8),_0x2c9003(0x214),_0x2c9003(0x3e4),'ZZZ','','','','',''][_0x488719];this[_0x2c9003(0x1cd)](_0x403d1d,_0x2833f7);}}return![];},Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x319)]=function(_0x20e955){const _0x1235bd=_0x255dc2;this[_0x1235bd(0x24c)]=_0x20e955;},Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x402)]=function(){const _0x1a053d=_0x255dc2;return this[_0x1a053d(0x24c)];},Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x5ca)]=function(_0x93422d){const _0x5e7be3=_0x255dc2;this[_0x5e7be3(0x603)]=_0x93422d;},Game_Temp['prototype']['clearSelfTarget']=function(){this['_selfTarget']=undefined;},Game_Temp[_0x255dc2(0x301)][_0x255dc2(0x426)]=function(){const _0x57a5b3=_0x255dc2;return this[_0x57a5b3(0x603)];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x519)]=Game_System['prototype']['initialize'],Game_System['prototype'][_0x255dc2(0x407)]=function(){const _0x78e332=_0x255dc2;VisuMZ[_0x78e332(0x1ab)]['Game_System_initialize'][_0x78e332(0x4a2)](this),this[_0x78e332(0x460)](),this[_0x78e332(0x293)]();},Game_System[_0x255dc2(0x301)][_0x255dc2(0x460)]=function(){const _0x5b1b3a=_0x255dc2;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x5b1b3a(0x61b)]={},this[_0x5b1b3a(0x5f7)]=[],this['_PreservedEventMorphData']={},this[_0x5b1b3a(0x500)]={},this[_0x5b1b3a(0x248)]=![],this['_PlayerDiagonalSetting']=_0x5b1b3a(0x56f);},Game_System['prototype']['isDashingEnabled']=function(){const _0x509337=_0x255dc2;if(this[_0x509337(0x501)]===undefined)this[_0x509337(0x460)]();if(this['_EventsMoveCoreSettings']['DashingEnable']===undefined)this[_0x509337(0x460)]();return this[_0x509337(0x501)]['DashingEnable'];},Game_System['prototype']['setDashingEnabled']=function(_0x576be1){const _0x4f201c=_0x255dc2;if(this[_0x4f201c(0x501)]===undefined)this[_0x4f201c(0x460)]();if(this[_0x4f201c(0x501)][_0x4f201c(0x1a2)]===undefined)this['initEventsMoveCore']();this[_0x4f201c(0x501)]['DashingEnable']=_0x576be1;},Game_System[_0x255dc2(0x301)][_0x255dc2(0x307)]=function(){const _0x50ee01=_0x255dc2;if(this[_0x50ee01(0x501)]===undefined)this[_0x50ee01(0x460)]();if(this[_0x50ee01(0x501)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();return this[_0x50ee01(0x501)]['EventAutoMovement'];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x357)]=function(_0x51b10e){const _0x5e5701=_0x255dc2;if(this[_0x5e5701(0x501)]===undefined)this[_0x5e5701(0x460)]();if(this[_0x5e5701(0x501)][_0x5e5701(0x5bf)]===undefined)this[_0x5e5701(0x460)]();this[_0x5e5701(0x501)][_0x5e5701(0x5bf)]=_0x51b10e;},Game_System['prototype'][_0x255dc2(0x4f6)]=function(){const _0x404238=_0x255dc2;if(this['_EventsMoveCoreSettings']===undefined)this[_0x404238(0x460)]();if(this[_0x404238(0x501)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();return this[_0x404238(0x501)]['VisibleEventLabels'];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x24a)]=function(_0x2cc601){const _0x3267c2=_0x255dc2;if(this[_0x3267c2(0x501)]===undefined)this[_0x3267c2(0x460)]();if(this[_0x3267c2(0x501)][_0x3267c2(0x222)]===undefined)this[_0x3267c2(0x460)]();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0x2cc601;},Game_System[_0x255dc2(0x301)][_0x255dc2(0x1fa)]=function(){const _0x66eefa=_0x255dc2;return this[_0x66eefa(0x248)]===undefined&&(this[_0x66eefa(0x248)]=![]),this[_0x66eefa(0x248)];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x311)]=function(_0x1e9ee3){const _0x28e49d=_0x255dc2;this[_0x28e49d(0x248)]=_0x1e9ee3;},Game_System[_0x255dc2(0x301)][_0x255dc2(0x21f)]=function(){const _0x2db089=_0x255dc2;return this[_0x2db089(0x639)];},Game_System[_0x255dc2(0x301)]['setPlayerDiagonalSetting']=function(_0x3c8770){const _0x37e7a6=_0x255dc2;this[_0x37e7a6(0x639)]=String(_0x3c8770)[_0x37e7a6(0x47a)]()[_0x37e7a6(0x458)]();},Game_System[_0x255dc2(0x301)][_0x255dc2(0x631)]=function(_0x124c17){const _0x202a5d=_0x255dc2;if(this[_0x202a5d(0x61b)]===undefined)this['initEventsMoveCore']();if(!_0x124c17)return null;if(_0x124c17===$gamePlayer){if('XhXtC'===_0x202a5d(0x270))return this[_0x202a5d(0x61b)][_0x202a5d(0x602)];else this[_0x202a5d(0x248)]=_0x140b69;}else{if('ICiMB'===_0x202a5d(0x57a)){const _0x4dec7d=VisuMZ['EventsMoveCore']['Settings'],_0xa28e05='Map%1-Event%2'[_0x202a5d(0x3eb)](_0x124c17[_0x202a5d(0x3c4)],_0x124c17[_0x202a5d(0x479)]);return this['_EventIcons'][_0xa28e05]=this[_0x202a5d(0x61b)][_0xa28e05]||{'iconIndex':0x0,'bufferX':_0x4dec7d[_0x202a5d(0x2be)][_0x202a5d(0x3c2)],'bufferY':_0x4dec7d[_0x202a5d(0x2be)]['BufferY'],'blendMode':_0x4dec7d[_0x202a5d(0x2be)][_0x202a5d(0x4fd)]},this[_0x202a5d(0x61b)][_0xa28e05];}else this[_0x202a5d(0x51e)](_0x7586d0,_0x208451);}},Game_System['prototype']['setEventIconData']=function(_0x3ccf0a,_0x2f78c8,_0x596658,_0x59a6bb,_0x1a272b){const _0xa05040=_0x255dc2;if(this[_0xa05040(0x61b)]===undefined)this[_0xa05040(0x460)]();const _0x28fcd0=_0x3ccf0a===$gamePlayer?_0xa05040(0x602):_0xa05040(0x29e)[_0xa05040(0x3eb)](_0x3ccf0a[_0xa05040(0x3c4)],_0x3ccf0a['_eventId']);this['_EventIcons'][_0x28fcd0]={'iconIndex':_0x2f78c8,'bufferX':_0x596658,'bufferY':_0x59a6bb,'blendMode':_0x1a272b};},Game_System[_0x255dc2(0x301)][_0x255dc2(0x53a)]=function(_0x118151,_0x539ef6,_0x5f0c32,_0x3aefc6,_0xf09927,_0x465bd0){const _0x23b4f4=_0x255dc2;if(this[_0x23b4f4(0x61b)]===undefined)this['initEventsMoveCore']();const _0x37374b=_0x23b4f4(0x29e)['format'](_0x118151,_0x539ef6);this[_0x23b4f4(0x61b)][_0x37374b]={'iconIndex':_0x5f0c32,'bufferX':_0x3aefc6,'bufferY':_0xf09927,'blendMode':_0x465bd0};},Game_System['prototype'][_0x255dc2(0x4b9)]=function(_0x5371d7){const _0x24f707=_0x255dc2;if(this[_0x24f707(0x61b)]===undefined)this[_0x24f707(0x460)]();if(!_0x5371d7)return null;if(_0x5371d7===$gamePlayer)delete this[_0x24f707(0x61b)][_0x24f707(0x602)];else{if(_0x24f707(0x363)!==_0x24f707(0x331))this[_0x24f707(0x5c0)](_0x5371d7['_mapId'],_0x5371d7[_0x24f707(0x479)]);else return _0xb224e1[_0x24f707(0x32e)];}},Game_System['prototype']['deleteIconsOnEventsDataKey']=function(_0x3be2db,_0x5ae71e){const _0x18e48f=_0x255dc2;if(this[_0x18e48f(0x61b)]===undefined)this['initEventsMoveCore']();const _0x138592=_0x18e48f(0x29e)[_0x18e48f(0x3eb)](_0x3be2db,_0x5ae71e);delete this[_0x18e48f(0x61b)][_0x138592];},Game_System['prototype']['getSavedEventLocation']=function(_0x1a8aea){const _0x1bb6c1=_0x255dc2;if(this[_0x1bb6c1(0x500)]===undefined)this[_0x1bb6c1(0x460)]();if(!_0x1a8aea)return null;const _0x3b3bfa=_0x1bb6c1(0x29e)[_0x1bb6c1(0x3eb)](_0x1a8aea[_0x1bb6c1(0x3c4)],_0x1a8aea[_0x1bb6c1(0x479)]);return this[_0x1bb6c1(0x500)][_0x3b3bfa];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x425)]=function(_0x12d828){const _0x2b480a=_0x255dc2;if(this[_0x2b480a(0x500)]===undefined)this[_0x2b480a(0x460)]();if(!_0x12d828)return;const _0x7b6ff3=_0x2b480a(0x29e)['format'](_0x12d828[_0x2b480a(0x3c4)],_0x12d828[_0x2b480a(0x479)]);this['_SavedEventLocations'][_0x7b6ff3]={'direction':_0x12d828[_0x2b480a(0x5d3)](),'x':Math[_0x2b480a(0x45e)](_0x12d828['x']),'y':Math[_0x2b480a(0x45e)](_0x12d828['y']),'pageIndex':_0x12d828[_0x2b480a(0x59c)],'moveRouteIndex':_0x12d828[_0x2b480a(0x484)]};},Game_System[_0x255dc2(0x301)][_0x255dc2(0x594)]=function(_0x2f7666){const _0x130a58=_0x255dc2;if(this['_SavedEventLocations']===undefined)this[_0x130a58(0x460)]();if(!_0x2f7666)return;this[_0x130a58(0x292)](_0x2f7666[_0x130a58(0x3c4)],_0x2f7666['_eventId']);},Game_System[_0x255dc2(0x301)][_0x255dc2(0x292)]=function(_0x4503ed,_0x352e9d){const _0x3ac4a5=_0x255dc2;if(this[_0x3ac4a5(0x500)]===undefined)this[_0x3ac4a5(0x460)]();const _0x4dcf67='Map%1-Event%2'[_0x3ac4a5(0x3eb)](_0x4503ed,_0x352e9d);delete this[_0x3ac4a5(0x500)][_0x4dcf67];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x33e)]=function(_0xbe8861,_0xdb764a,_0x43dbbd,_0x3c7e24,_0xdb5ab5,_0x1ad24e,_0x51b4da){const _0xb0fc4c=_0x255dc2;if(this[_0xb0fc4c(0x500)]===undefined)this[_0xb0fc4c(0x460)]();const _0x2f4936=_0xb0fc4c(0x29e)[_0xb0fc4c(0x3eb)](_0xbe8861,_0xdb764a);this[_0xb0fc4c(0x500)][_0x2f4936]={'direction':_0xdb5ab5,'x':Math[_0xb0fc4c(0x45e)](_0x43dbbd),'y':Math[_0xb0fc4c(0x45e)](_0x3c7e24),'pageIndex':_0x1ad24e,'moveRouteIndex':_0x51b4da};},Game_System[_0x255dc2(0x301)][_0x255dc2(0x32f)]=function(_0x54e5c4){const _0x177718=_0x255dc2;if(this[_0x177718(0x3f6)]===undefined)this[_0x177718(0x460)]();if(!_0x54e5c4)return;const _0x14b763=_0x177718(0x29e)[_0x177718(0x3eb)](_0x54e5c4[_0x177718(0x3c4)],_0x54e5c4[_0x177718(0x479)]);return this['_PreservedEventMorphData'][_0x14b763];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x496)]=function(_0x275fcc,_0x5bc254,_0x49891f,_0x153967,_0x3ed135){const _0x161898=_0x255dc2;if(this[_0x161898(0x3f6)]===undefined)this[_0x161898(0x460)]();const _0x2c82fd=_0x161898(0x29e)[_0x161898(0x3eb)](_0x275fcc,_0x5bc254);this[_0x161898(0x3f6)][_0x2c82fd]={'template':_0x49891f,'mapId':_0x153967,'eventId':_0x3ed135};},Game_System[_0x255dc2(0x301)][_0x255dc2(0x1d8)]=function(_0x30a55b,_0x17dd46){const _0x405dc5=_0x255dc2;if(this[_0x405dc5(0x3f6)]===undefined)this[_0x405dc5(0x460)]();const _0x5956d6=_0x405dc5(0x29e)[_0x405dc5(0x3eb)](_0x30a55b,_0x17dd46);delete this[_0x405dc5(0x3f6)][_0x5956d6];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x274)]=function(_0x636fe2){const _0x43a24d=_0x255dc2;if(this[_0x43a24d(0x5f7)]===undefined)this[_0x43a24d(0x460)]();return this[_0x43a24d(0x5f7)][_0x636fe2]=this[_0x43a24d(0x5f7)][_0x636fe2]||[],this[_0x43a24d(0x5f7)][_0x636fe2];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x256)]=function(_0x35eafd){const _0x193079=_0x255dc2,_0x4d5afc=this[_0x193079(0x274)](_0x35eafd);for(const _0x2f2251 of _0x4d5afc){if(!_0x2f2251)continue;if(_0x2f2251[_0x193079(0x1fd)])continue;const _0x5aad47=_0x4d5afc['indexOf'](_0x2f2251);_0x4d5afc[_0x5aad47]=null;}},Game_System[_0x255dc2(0x301)][_0x255dc2(0x293)]=function(){const _0x38b49f=_0x255dc2;this['_followerControlID']=0x0,this[_0x38b49f(0x456)]=![];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x34b)]=function(){const _0xd2ca69=_0x255dc2;if(this[_0xd2ca69(0x1e8)]===undefined)this['initFollowerController']();return this['_followerControlID'];},Game_System['prototype'][_0x255dc2(0x22d)]=function(_0x57dfac){const _0x1846fb=_0x255dc2;if(this[_0x1846fb(0x1e8)]===undefined)this[_0x1846fb(0x293)]();this[_0x1846fb(0x1e8)]=_0x57dfac;;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x5e4)]=Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x4c4)],Game_Interpreter['prototype']['character']=function(_0x2b99eb){const _0x22f24e=_0x255dc2;if(!$gameParty['inBattle']()&&_0x2b99eb<0x0){let _0x6ce263=$gameSystem[_0x22f24e(0x34b)]();if(_0x6ce263>0x0){if(_0x22f24e(0x38d)!==_0x22f24e(0x38d)){if(_0xc96741)this[_0x22f24e(0x4c6)](_0x3c2213['x'],_0xc450c['y']);}else return $gamePlayer[_0x22f24e(0x34e)]()[_0x22f24e(0x351)](_0x6ce263-0x1);}}return VisuMZ[_0x22f24e(0x1ab)][_0x22f24e(0x5e4)][_0x22f24e(0x4a2)](this,_0x2b99eb);},Game_System[_0x255dc2(0x301)][_0x255dc2(0x184)]=function(){const _0x2f6877=_0x255dc2;if(this['_followerChaseOff']===undefined)this['initFollowerController']();return this[_0x2f6877(0x456)];},Game_System[_0x255dc2(0x301)][_0x255dc2(0x304)]=function(_0x12e888){const _0x303d27=_0x255dc2;if(this[_0x303d27(0x456)]===undefined)this[_0x303d27(0x293)]();this['_followerChaseOff']=_0x12e888;;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x44e)]=Game_Timer['prototype'][_0x255dc2(0x407)],Game_Timer[_0x255dc2(0x301)]['initialize']=function(){const _0x19fc3d=_0x255dc2;VisuMZ[_0x19fc3d(0x1ab)][_0x19fc3d(0x44e)][_0x19fc3d(0x4a2)](this),this[_0x19fc3d(0x460)]();},Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x460)]=function(){const _0x396134=_0x255dc2;this[_0x396134(0x250)]=![],this['_speed']=-0x1,this[_0x396134(0x5dd)]=0x0;},Game_Timer[_0x255dc2(0x301)]['update']=function(_0x232955){const _0x5a1a44=_0x255dc2;if(!_0x232955)return;if(!this[_0x5a1a44(0x4c1)])return;if(this[_0x5a1a44(0x250)])return;if(this[_0x5a1a44(0x1dc)]<=0x0)return;if(this[_0x5a1a44(0x556)]===undefined)this[_0x5a1a44(0x460)]();this[_0x5a1a44(0x1dc)]+=this[_0x5a1a44(0x556)],this['_frames']<=0x0&&(_0x5a1a44(0x312)!==_0x5a1a44(0x312)?(this[_0x5a1a44(0x21e)]=![],this[_0x5a1a44(0x561)](),this['clearDashing'](),this[_0x5a1a44(0x60b)](),this[_0x5a1a44(0x227)]()):this[_0x5a1a44(0x46b)]());},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4ea)]=Game_Timer[_0x255dc2(0x301)]['start'],Game_Timer[_0x255dc2(0x301)]['start']=function(_0x22260f){const _0x153c58=_0x255dc2;VisuMZ[_0x153c58(0x1ab)][_0x153c58(0x4ea)]['call'](this,_0x22260f);if(this['_paused']===undefined)this[_0x153c58(0x460)]();this[_0x153c58(0x250)]=![];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4a6)]=Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x483)],Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x483)]=function(){const _0x431e2a=_0x255dc2;VisuMZ[_0x431e2a(0x1ab)][_0x431e2a(0x4a6)][_0x431e2a(0x4a2)](this);if(this[_0x431e2a(0x250)]===undefined)this['initEventsMoveCore']();this['_paused']=![];},Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x55a)]=function(){const _0x246c7a=_0x255dc2;if(this['_frames']<=0x0)return;this['_paused']=!![],this[_0x246c7a(0x4c1)]=!![];},Game_Timer['prototype'][_0x255dc2(0x4cb)]=function(){const _0x44a8c1=_0x255dc2;if(this[_0x44a8c1(0x1dc)]<=0x0)return;this[_0x44a8c1(0x250)]=![],this[_0x44a8c1(0x4c1)]=!![];},Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x1d3)]=function(_0x57d631){const _0xb392f8=_0x255dc2;this[_0xb392f8(0x1dc)]=this[_0xb392f8(0x1dc)]||0x0,this['_frames']+=_0x57d631,this[_0xb392f8(0x4c1)]=!![],this[_0xb392f8(0x1dc)]=Math[_0xb392f8(0x335)](0x1,this[_0xb392f8(0x1dc)]);},Game_Timer[_0x255dc2(0x301)]['setFrames']=function(_0x3b5d23){const _0x3c64b4=_0x255dc2;this[_0x3c64b4(0x1dc)]=this[_0x3c64b4(0x1dc)]||0x0,this['_frames']=_0x3b5d23,this[_0x3c64b4(0x4c1)]=!![],this[_0x3c64b4(0x1dc)]=Math[_0x3c64b4(0x335)](0x1,this['_frames']);},Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x493)]=function(_0x6cc5a6){const _0x1051b8=_0x255dc2;this[_0x1051b8(0x556)]=_0x6cc5a6,this[_0x1051b8(0x4c1)]=!![],_0x6cc5a6>0x0&&(this[_0x1051b8(0x1dc)]=Math['max'](this['_frames'],0x1));},Game_Timer[_0x255dc2(0x301)]['setCommonEvent']=function(_0x4f30cb){const _0x439696=_0x255dc2;if(this[_0x439696(0x5dd)]===undefined)this[_0x439696(0x460)]();this[_0x439696(0x5dd)]=_0x4f30cb;},VisuMZ['EventsMoveCore']['Game_Timer_onExpire']=Game_Timer[_0x255dc2(0x301)][_0x255dc2(0x46b)],Game_Timer[_0x255dc2(0x301)]['onExpire']=function(){const _0x3e93f6=_0x255dc2;if(this[_0x3e93f6(0x5dd)]===undefined)this[_0x3e93f6(0x460)]();this[_0x3e93f6(0x5dd)]?$gameTemp['reserveCommonEvent'](this[_0x3e93f6(0x5dd)]):'GgNxs'===_0x3e93f6(0x2fb)?_0x560470=![]:VisuMZ[_0x3e93f6(0x1ab)][_0x3e93f6(0x394)]['call'](this);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x590)]=Game_Message[_0x255dc2(0x301)][_0x255dc2(0x4e4)],Game_Message[_0x255dc2(0x301)][_0x255dc2(0x4e4)]=function(_0x53fe95){const _0x5f589=_0x255dc2;VisuMZ[_0x5f589(0x1ab)]['Game_Message_add'][_0x5f589(0x4a2)](this,_0x53fe95),this[_0x5f589(0x413)]=$gameTemp[_0x5f589(0x426)]();},Game_Message[_0x255dc2(0x301)][_0x255dc2(0x356)]=function(){const _0x5ea6d4=_0x255dc2;$gameTemp[_0x5ea6d4(0x5ca)](this[_0x5ea6d4(0x413)]);},VisuMZ[_0x255dc2(0x1ab)]['Game_Switches_value']=Game_Switches[_0x255dc2(0x301)]['value'],Game_Switches['prototype'][_0x255dc2(0x2b3)]=function(_0x239b58){const _0x282a83=_0x255dc2;if(DataManager[_0x282a83(0x465)](_0x239b58))return!!this[_0x282a83(0x206)](_0x239b58);else return DataManager[_0x282a83(0x585)](_0x239b58)?_0x282a83(0x40e)===_0x282a83(0x1d5)?this[_0x282a83(0x3a0)]():!!this[_0x282a83(0x497)](_0x239b58):VisuMZ['EventsMoveCore'][_0x282a83(0x3b6)][_0x282a83(0x4a2)](this,_0x239b58);},Game_Switches['advancedFunc']={},Game_Switches[_0x255dc2(0x301)][_0x255dc2(0x206)]=function(_0x3e1808){const _0x5b0d11=_0x255dc2;if(!Game_Switches[_0x5b0d11(0x433)][_0x3e1808]){$dataSystem[_0x5b0d11(0x44f)][_0x3e1808][_0x5b0d11(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5de91f=_0x5b0d11(0x2a7)[_0x5b0d11(0x3eb)](String(RegExp['$1']));Game_Switches[_0x5b0d11(0x433)][_0x3e1808]=new Function('switchId',_0x5de91f);}const _0x352577=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x5b0d11(0x433)][_0x3e1808][_0x5b0d11(0x4a2)](_0x352577,_0x3e1808);},Game_Switches['prototype'][_0x255dc2(0x497)]=function(_0x3ade64){const _0x8a87ac=_0x255dc2,_0x28d0bd=$gameTemp[_0x8a87ac(0x426)]()||this;if(_0x28d0bd[_0x8a87ac(0x592)]!==Game_Event){if('fLVaW'!=='fLVaW'){const _0x5bc968=_0x94bbdb['destinationX'](),_0x250d84=_0x1df5ed['destinationY'](),_0x3e4a7e=_0x4a315c[_0x8a87ac(0x4aa)](),_0x5ad140=_0x386224[_0x8a87ac(0x421)](_0x5bc968,_0x250d84),_0x1fdc2f=_0x5c4c1b[_0x8a87ac(0x3ba)](_0x5bc968,_0x250d84)[_0x8a87ac(0x42c)]<=0x0;_0x3e4a7e&&_0x5ad140&&_0x1fdc2f?_0x1fb9e0=this[_0x8a87ac(0x37b)](_0x5bc968,_0x250d84):_0x401af1=this[_0x8a87ac(0x40f)](_0x5bc968,_0x250d84);}else return VisuMZ[_0x8a87ac(0x1ab)][_0x8a87ac(0x3b6)][_0x8a87ac(0x4a2)](this,_0x3ade64);}else{const _0xd1158f=[_0x28d0bd['_mapId'],_0x28d0bd[_0x8a87ac(0x479)],_0x8a87ac(0x545)[_0x8a87ac(0x3eb)](_0x3ade64)];return $gameSelfSwitches[_0x8a87ac(0x2b3)](_0xd1158f);}},VisuMZ[_0x255dc2(0x1ab)]['Game_Switches_setValue']=Game_Switches[_0x255dc2(0x301)][_0x255dc2(0x491)],Game_Switches['prototype'][_0x255dc2(0x491)]=function(_0x1d084e,_0x3dda2d){const _0x5a1c33=_0x255dc2;DataManager[_0x5a1c33(0x585)](_0x1d084e)?this[_0x5a1c33(0x510)](_0x1d084e,_0x3dda2d):VisuMZ[_0x5a1c33(0x1ab)][_0x5a1c33(0x3e8)]['call'](this,_0x1d084e,_0x3dda2d);},Game_Switches[_0x255dc2(0x301)][_0x255dc2(0x510)]=function(_0x37d163,_0x27d73e){const _0x573b76=_0x255dc2,_0x40d993=$gameTemp[_0x573b76(0x426)]()||this;if(_0x40d993[_0x573b76(0x592)]!==Game_Event)_0x573b76(0x3cb)===_0x573b76(0x3cb)?VisuMZ[_0x573b76(0x1ab)][_0x573b76(0x3e8)][_0x573b76(0x4a2)](this,_0x37d163,_0x27d73e):this['executeMove'](_0x321753);else{if(_0x573b76(0x2eb)===_0x573b76(0x4f9)){const _0x5d2e9b=_0x5f1ed8['EventTemplates'][_0x56dfc1];if(!_0x5d2e9b)return;_0x5d2e9b[_0x573b76(0x492)][_0x573b76(0x4a2)](this,_0x122200,_0x1de59a,this);}else{const _0x4cfaf8=[_0x40d993[_0x573b76(0x3c4)],_0x40d993['_eventId'],_0x573b76(0x545)[_0x573b76(0x3eb)](_0x37d163)];$gameSelfSwitches[_0x573b76(0x491)](_0x4cfaf8,_0x27d73e);}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x32b)]=Game_Variables[_0x255dc2(0x301)]['value'],Game_Variables[_0x255dc2(0x301)][_0x255dc2(0x2b3)]=function(_0x165cf3){const _0x36f1a4=_0x255dc2;if(DataManager['isAdvancedVariable'](_0x165cf3))return this['advancedValue'](_0x165cf3);else{if(DataManager[_0x36f1a4(0x196)](_0x165cf3)){if(_0x36f1a4(0x4e1)!=='jnLpt')return this[_0x36f1a4(0x497)](_0x165cf3);else this[_0x36f1a4(0x5d2)]=0xff;}else return _0x36f1a4(0x316)==='GwePs'?VisuMZ[_0x36f1a4(0x1ab)][_0x36f1a4(0x32b)]['call'](this,_0x165cf3):_0x4b5be9[_0x36f1a4(0x1aa)]();}},Game_Variables['advancedFunc']={},Game_Variables[_0x255dc2(0x301)][_0x255dc2(0x206)]=function(_0xfe1fb7){const _0x58e58b=_0x255dc2;if(!Game_Variables[_0x58e58b(0x433)][_0xfe1fb7]){$dataSystem[_0x58e58b(0x31a)][_0xfe1fb7][_0x58e58b(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4dd3e5=_0x58e58b(0x2a7)['format'](String(RegExp['$1']));Game_Variables[_0x58e58b(0x433)][_0xfe1fb7]=new Function(_0x58e58b(0x3b9),_0x4dd3e5);}const _0x1e217e=$gameTemp[_0x58e58b(0x426)]()||this;return Game_Variables[_0x58e58b(0x433)][_0xfe1fb7][_0x58e58b(0x4a2)](_0x1e217e,_0xfe1fb7);},Game_Variables[_0x255dc2(0x301)][_0x255dc2(0x497)]=function(_0x2a39ea){const _0x3c7eff=_0x255dc2,_0x304bcd=$gameTemp[_0x3c7eff(0x426)]()||this;if(_0x304bcd[_0x3c7eff(0x592)]!==Game_Event){if(_0x3c7eff(0x30b)!==_0x3c7eff(0x54a))return VisuMZ['EventsMoveCore'][_0x3c7eff(0x32b)][_0x3c7eff(0x4a2)](this,_0x2a39ea);else{const _0x33328a=_0x20be5a['GetMoveSynchTarget'](this[_0x3c7eff(0x4c3)]()),_0x1fbf0a=this['reverseDir'](_0x33328a[_0x3c7eff(0x616)]());this[_0x3c7eff(0x63c)](this[_0x3c7eff(0x401)](_0x33328a[_0x3c7eff(0x5d3)]()));}}else{if('qFaaI'!==_0x3c7eff(0x5e3)){const _0x3d8c56=_0x1516bb[_0x3c7eff(0x605)]('['+_0x5ce406['$1'][_0x3c7eff(0x5ba)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x3c7eff(0x415)][_0x3c7eff(0x271)](_0x3d8c56),this[_0x3c7eff(0x415)][_0x3c7eff(0x269)](0x0);}else{const _0x21abcc=[_0x304bcd[_0x3c7eff(0x3c4)],_0x304bcd[_0x3c7eff(0x479)],_0x3c7eff(0x58d)[_0x3c7eff(0x3eb)](_0x2a39ea)];return $gameSelfSwitches[_0x3c7eff(0x2b3)](_0x21abcc);}}},VisuMZ['EventsMoveCore'][_0x255dc2(0x218)]=Game_Variables[_0x255dc2(0x301)][_0x255dc2(0x491)],Game_Variables[_0x255dc2(0x301)][_0x255dc2(0x491)]=function(_0x291d44,_0x45b928){const _0x59a472=_0x255dc2;if(DataManager[_0x59a472(0x196)](_0x291d44)){if(_0x59a472(0x321)==='nOmPV')this['setSelfValue'](_0x291d44,_0x45b928);else{_0x7d9753[_0x59a472(0x2dc)](_0x4e3b8a,_0x5e0f9c);const _0x26c8e2=_0x4b175c[_0x59a472(0x402)](),_0x4a52b6=_0x1e49d0['MapId']||_0x36b4a1[_0x59a472(0x5ec)](),_0x221bc3=_0x4351a8[_0x59a472(0x32d)]||_0x26c8e2[_0x59a472(0x1d4)](),_0x3a2bc7=_0x459e18[_0x59a472(0x18a)]||0x0,_0x934118=_0x48d8be[_0x59a472(0x632)]||0x0,_0xf20ee6=_0x3879f3[_0x59a472(0x2d4)]||0x2,_0x575d4e=((_0xa42a22[_0x59a472(0x473)]||0x1)-0x1)[_0x59a472(0x46e)](0x0,0x13),_0x1cbad6=_0x52769c['MoveRouteIndex']||0x0;_0x28746c[_0x59a472(0x33e)](_0x4a52b6,_0x221bc3,_0x3a2bc7,_0x934118,_0xf20ee6,_0x575d4e,_0x1cbad6);}}else VisuMZ[_0x59a472(0x1ab)]['Game_Variables_setValue'][_0x59a472(0x4a2)](this,_0x291d44,_0x45b928);},Game_Variables['prototype']['setSelfValue']=function(_0x45581c,_0x12cd23){const _0x1b80b0=_0x255dc2,_0x46288a=$gameTemp['getSelfTarget']()||this;if(_0x46288a[_0x1b80b0(0x592)]!==Game_Event)_0x1b80b0(0x534)===_0x1b80b0(0x61a)?_0x41a6ea=_0x4dcc3d:VisuMZ[_0x1b80b0(0x1ab)][_0x1b80b0(0x218)][_0x1b80b0(0x4a2)](this,_0x45581c,_0x12cd23);else{if(_0x1b80b0(0x18d)!==_0x1b80b0(0x26e)){const _0x56e8fd=[_0x46288a[_0x1b80b0(0x3c4)],_0x46288a[_0x1b80b0(0x479)],_0x1b80b0(0x58d)[_0x1b80b0(0x3eb)](_0x45581c)];$gameSelfSwitches[_0x1b80b0(0x491)](_0x56e8fd,_0x12cd23);}else{const _0x45c30d=this[_0x1b80b0(0x59c)];_0x92ab61['EventsMoveCore'][_0x1b80b0(0x4d5)][_0x1b80b0(0x4a2)](this),_0x45c30d!==this[_0x1b80b0(0x59c)]&&this[_0x1b80b0(0x608)]();}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3d6)]=Game_SelfSwitches['prototype'][_0x255dc2(0x2b3)],Game_SelfSwitches['prototype']['value']=function(_0x1177ba){const _0x5da197=_0x255dc2;if(_0x1177ba[0x2][_0x5da197(0x5ba)](/SELF/i)){if('LyeWh'!=='LyeWh'){const _0x47dc78=['',_0x5da197(0x30f),_0x5da197(0x5b2),_0x5da197(0x2b4),_0x5da197(0x3e3),'',_0x5da197(0x21b),_0x5da197(0x5c6),'UP',_0x5da197(0x232)],_0x1d4c0c=_0x47dc78[_0x5da197(0x2f9)](_0xc5fc04[_0x5da197(0x242)]()[_0x5da197(0x458)]());if(_0x1d4c0c<=0x0)return;if(_0x5d57ff)_0x326a0a[_0x5da197(0x2fa)]=!![];if(this[_0x5da197(0x224)](this['x'],this['y'],_0x1d4c0c)){if(_0x48d198)_0x370bcb[_0x5da197(0x2fa)]=![];this[_0x5da197(0x63c)](_0x1d4c0c),this[_0x5da197(0x484)]-=0x1;}if(_0x566b4a)_0x17839d[_0x5da197(0x2fa)]=![];}else return this['selfValue'](_0x1177ba);}else{return VisuMZ['EventsMoveCore'][_0x5da197(0x3d6)][_0x5da197(0x4a2)](this,_0x1177ba);;}},Game_SelfSwitches[_0x255dc2(0x301)][_0x255dc2(0x497)]=function(_0x26b566){const _0x1314e0=_0x255dc2;return _0x26b566[0x2][_0x1314e0(0x5ba)](/VAR/i)?this['_data'][_0x26b566]||0x0:!!this[_0x1314e0(0x1cc)][_0x26b566];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x47b)]=Game_SelfSwitches[_0x255dc2(0x301)][_0x255dc2(0x491)],Game_SelfSwitches['prototype'][_0x255dc2(0x491)]=function(_0x58dc11,_0x35a6b8){const _0x203cce=_0x255dc2;if(_0x58dc11[0x2][_0x203cce(0x5ba)](/SELF/i))this[_0x203cce(0x510)](_0x58dc11,_0x35a6b8);else{if(_0x203cce(0x5cf)!==_0x203cce(0x5cf))return _0x590a28[_0x203cce(0x1ab)]['CustomPageConditions'][_0x203cce(0x1b8)][_0x203cce(0x571)](this[_0x203cce(0x3ce)]);else VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue'][_0x203cce(0x4a2)](this,_0x58dc11,_0x35a6b8);}},Game_SelfSwitches[_0x255dc2(0x301)][_0x255dc2(0x510)]=function(_0x1d7617,_0x43b6fa){const _0x1480b7=_0x255dc2;this[_0x1480b7(0x1cc)][_0x1d7617]=_0x1d7617[0x2][_0x1480b7(0x5ba)](/VAR/i)?_0x43b6fa:!!_0x43b6fa,this[_0x1480b7(0x60f)]();},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x523)]=Game_Enemy[_0x255dc2(0x301)][_0x255dc2(0x4b4)],Game_Enemy[_0x255dc2(0x301)][_0x255dc2(0x4b4)]=function(_0x4e790c){const _0x353d80=_0x255dc2;$gameTemp['registerSelfTarget'](this);const _0xed2207=VisuMZ[_0x353d80(0x1ab)]['Game_Enemy_meetsSwitchCondition'][_0x353d80(0x4a2)](this,_0x4e790c);return $gameTemp['clearSelfTarget'](),_0xed2207;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x46a)]=Game_Troop[_0x255dc2(0x301)][_0x255dc2(0x205)],Game_Troop[_0x255dc2(0x301)][_0x255dc2(0x205)]=function(_0x33f145){const _0x17782f=_0x255dc2;$gameTemp[_0x17782f(0x5ca)](this);const _0x392294=VisuMZ[_0x17782f(0x1ab)]['Game_Troop_meetsConditions'][_0x17782f(0x4a2)](this,_0x33f145);return $gameTemp[_0x17782f(0x192)](),_0x392294;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4d2)]=Game_Map[_0x255dc2(0x301)][_0x255dc2(0x289)],Game_Map['prototype'][_0x255dc2(0x289)]=function(_0x54a450){const _0x442138=_0x255dc2;this[_0x442138(0x256)](_0x54a450),this[_0x442138(0x427)](),VisuMZ[_0x442138(0x1ab)]['Game_Map_setup'][_0x442138(0x4a2)](this,_0x54a450),this[_0x442138(0x427)](),this[_0x442138(0x26f)](),this[_0x442138(0x328)](),this[_0x442138(0x49e)](),this[_0x442138(0x452)](),this[_0x442138(0x427)]();},VisuMZ[_0x255dc2(0x1ab)]['Game_Map_setupEvents']=Game_Map[_0x255dc2(0x301)][_0x255dc2(0x58a)],Game_Map[_0x255dc2(0x301)][_0x255dc2(0x58a)]=function(){const _0x407c0c=_0x255dc2;VisuMZ[_0x407c0c(0x1ab)][_0x407c0c(0x40a)][_0x407c0c(0x4a2)](this),this[_0x407c0c(0x31c)]();},Game_Map[_0x255dc2(0x629)]=0xc8,Game_Map[_0x255dc2(0x301)][_0x255dc2(0x414)]=function(){const _0x3a9f45=_0x255dc2,_0x57a644=Game_Map[_0x3a9f45(0x629)];this[_0x3a9f45(0x27f)]=this[_0x3a9f45(0x457)]()['length']>_0x57a644;if(this[_0x3a9f45(0x27f)]&&$gameTemp[_0x3a9f45(0x4bd)]()){}},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x3c6)]=function(){const _0x4b1937=_0x255dc2;return this[_0x4b1937(0x27f)];},Game_Map['prototype'][_0x255dc2(0x427)]=function(){const _0x456359=_0x255dc2;this[_0x456359(0x1ba)]=undefined;},Game_Map['prototype'][_0x255dc2(0x26f)]=function(){const _0x4ef77c=_0x255dc2;this[_0x4ef77c(0x1b3)]=VisuMZ[_0x4ef77c(0x1ab)]['Settings']['Movement'][_0x4ef77c(0x60a)];const _0x4a8206=$dataMap[_0x4ef77c(0x50d)]||'';if(_0x4a8206[_0x4ef77c(0x5ba)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x4ef77c(0x1b3)]=!![];else _0x4a8206[_0x4ef77c(0x5ba)](/<DIAGONAL MOVEMENT: OFF>/i)&&(_0x4ef77c(0x4ba)!=='gJEoO'?(this[_0x4ef77c(0x5fe)]=new _0x18992c(),this[_0x4ef77c(0x5fe)][_0x4ef77c(0x3b8)]=_0x5a005d[_0x4ef77c(0x575)](_0x4ef77c(0x54c)),this[_0x4ef77c(0x5fe)]['bitmap']['smooth']=![],this[_0x4ef77c(0x5fe)][_0x4ef77c(0x216)](0x0,0x0,0x0,0x0),this[_0x4ef77c(0x5fe)]['anchor']['x']=0.5,this[_0x4ef77c(0x5fe)][_0x4ef77c(0x446)]['y']=0x1,this[_0x4ef77c(0x3ea)](this[_0x4ef77c(0x5fe)])):this[_0x4ef77c(0x1b3)]=![]);},Game_Map['prototype'][_0x255dc2(0x4aa)]=function(){const _0x2401ba=_0x255dc2,_0x54e992=$gameSystem[_0x2401ba(0x21f)]();if(_0x54e992===_0x2401ba(0x60e))return!![];if(_0x54e992==='disable')return![];if(this['_diagonalSupport']===undefined)this[_0x2401ba(0x26f)]();return this[_0x2401ba(0x1b3)];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x56b)]=function(_0xb2692c,_0x30b3c6){const _0x43077c=_0x255dc2;if([0x1,0x4,0x7][_0x43077c(0x571)](_0x30b3c6))_0xb2692c-=0x1;if([0x3,0x6,0x9]['includes'](_0x30b3c6))_0xb2692c+=0x1;return this[_0x43077c(0x54b)](_0xb2692c);},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x193)]=function(_0x4edda0,_0x1e557f){const _0x321cd9=_0x255dc2;if([0x1,0x2,0x3][_0x321cd9(0x571)](_0x1e557f))_0x4edda0+=0x1;if([0x7,0x8,0x9]['includes'](_0x1e557f))_0x4edda0-=0x1;return this[_0x321cd9(0x261)](_0x4edda0);},Game_Map['prototype'][_0x255dc2(0x1e4)]=function(_0x476ccf,_0x4d77d9,_0xa528ee,_0x1eaad7){const _0x4307c6=_0x255dc2;return Math[_0x4307c6(0x335)](Math[_0x4307c6(0x37d)](this[_0x4307c6(0x5c5)](_0x476ccf,_0xa528ee)),Math[_0x4307c6(0x37d)](this['deltaY'](_0x4d77d9,_0x1eaad7)));},Game_Map['prototype'][_0x255dc2(0x328)]=function(){const _0x4a024f=_0x255dc2,_0x372d0e=VisuMZ[_0x4a024f(0x1ab)]['Settings'][_0x4a024f(0x52d)],_0x5e3cc0={},_0x12f59b=[_0x4a024f(0x525),'Forbid',_0x4a024f(0x4ac)],_0xcf2052=['All','Walk',_0x4a024f(0x602),_0x4a024f(0x5af),_0x4a024f(0x5ee),'Boat','Ship',_0x4a024f(0x238)];for(const _0x5b9ce5 of _0x12f59b){for(const _0x48ed79 of _0xcf2052){const _0xfd372=_0x4a024f(0x4e9)[_0x4a024f(0x3eb)](_0x48ed79,_0x5b9ce5);if(_0x372d0e[_0xfd372]){if(_0x4a024f(0x49c)!==_0x4a024f(0x49c))return this[_0x4a024f(0x5b7)](_0x51f054);else _0x5e3cc0[_0xfd372]=_0x372d0e[_0xfd372]['slice'](0x0);}}}const _0x20876c=$dataMap[_0x4a024f(0x50d)]||'',_0xcc1e73=_0x20876c[_0x4a024f(0x5ba)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0xcc1e73)for(const _0x109a25 of _0xcc1e73){if('SzCLW'==='SzCLW'){_0x109a25[_0x4a024f(0x5ba)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x5e78dc=String(RegExp['$1'])[_0x4a024f(0x47a)]()[_0x4a024f(0x458)](),_0x3b8c53=String(RegExp['$2'])[_0x4a024f(0x47a)]()[_0x4a024f(0x458)]();const _0x40c38f=JSON[_0x4a024f(0x605)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x5e78dc=_0x5e78dc[_0x4a024f(0x4f5)](0x0)[_0x4a024f(0x242)]()+_0x5e78dc[_0x4a024f(0x296)](0x1),_0x3b8c53=_0x3b8c53['charAt'](0x0)[_0x4a024f(0x242)]()+_0x3b8c53['slice'](0x1);const _0x56fd43=_0x4a024f(0x4e9)['format'](_0x5e78dc,_0x3b8c53);if(_0x5e3cc0[_0x56fd43])_0x5e3cc0[_0x56fd43]=_0x5e3cc0[_0x56fd43][_0x4a024f(0x271)](_0x40c38f);}else{_0x899a75['ConvertParams'](_0x26744f,_0x13c5a7);const _0x4b9817=_0x5ce666['FollowerID'];_0x4481bd[_0x4a024f(0x22d)](_0x4b9817);}}this[_0x4a024f(0x5a2)]=_0x5e3cc0;},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x56e)]=function(_0x4aa4b4,_0x5081be,_0x5add13,_0x48eb73){const _0x2146b4=_0x255dc2,_0x1a8f44=this[_0x2146b4(0x56b)](_0x4aa4b4,_0x5add13),_0x54cf92=this['roundYWithDirection'](_0x5081be,_0x5add13),_0x24b2c0=this['regionId'](_0x1a8f44,_0x54cf92),_0x4247db=this[_0x2146b4(0x5a2)];if(_0x4247db['AllAllow'][_0x2146b4(0x571)](_0x24b2c0))return!![];else{if(_0x48eb73===_0x2146b4(0x5f3))return _0x4247db['PlayerAllow'][_0x2146b4(0x571)](_0x24b2c0)||_0x4247db[_0x2146b4(0x203)][_0x2146b4(0x571)](_0x24b2c0);else{if(_0x48eb73===_0x2146b4(0x1bb))return _0x4247db[_0x2146b4(0x25f)][_0x2146b4(0x571)](_0x24b2c0)||_0x4247db[_0x2146b4(0x203)][_0x2146b4(0x571)](_0x24b2c0);else{if(_0x4247db[_0x2146b4(0x46d)][_0x2146b4(0x571)](_0x24b2c0))return!![];else{if('bhPTU'!==_0x2146b4(0x260)){const _0x214562=_0x2146b4(0x392)[_0x2146b4(0x3eb)](_0x48eb73[_0x2146b4(0x4f5)](0x0)[_0x2146b4(0x242)]()+_0x48eb73[_0x2146b4(0x296)](0x1));if(_0x4247db[_0x214562])return _0x4247db[_0x214562][_0x2146b4(0x571)](_0x24b2c0);}else _0xbb7ccb[_0x2146b4(0x2aa)](0x1,0x3,0x7,0x9);}}}}return![];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x5b9)]=function(_0x259236,_0x4e7e6d,_0x28b187,_0x525cb8){const _0x5b412f=_0x255dc2,_0x1bfd06=this[_0x5b412f(0x56b)](_0x259236,_0x28b187),_0x3ffb22=this[_0x5b412f(0x193)](_0x4e7e6d,_0x28b187),_0x237f4c=this[_0x5b412f(0x22e)](_0x1bfd06,_0x3ffb22),_0x197bac=this[_0x5b412f(0x5a2)];if(_0x197bac[_0x5b412f(0x39a)]['includes'](_0x237f4c))return!![];else{if(_0x525cb8===_0x5b412f(0x5f3)){if(_0x5b412f(0x5a9)!==_0x5b412f(0x5a9))this[_0x5b412f(0x1be)](),_0x7cc0de[_0x5b412f(0x1ab)][_0x5b412f(0x1e2)][_0x5b412f(0x4a2)](this,_0x2013db);else return _0x197bac[_0x5b412f(0x3ad)][_0x5b412f(0x571)](_0x237f4c)||_0x197bac['WalkForbid']['includes'](_0x237f4c);}else{if(_0x525cb8==='event')return _0x197bac[_0x5b412f(0x5dc)][_0x5b412f(0x571)](_0x237f4c)||_0x197bac[_0x5b412f(0x5fd)][_0x5b412f(0x571)](_0x237f4c);else{if(_0x197bac['VehicleForbid']['includes'](_0x237f4c))return!![];else{if(_0x5b412f(0x1cf)!==_0x5b412f(0x1cf)){if(this[_0x5b412f(0x395)]()){const _0x51a977=['',_0x5b412f(0x1af),_0x5b412f(0x521),_0x5b412f(0x604),'HEART',_0x5b412f(0x4a1),_0x5b412f(0x3f0),_0x5b412f(0x3d8),'SILENCE','LIGHT\x20BULB','ZZZ','','','','',''][_0x18f685];this[_0x5b412f(0x1cd)](_0x51a977,_0x3f21c6);}}else{const _0x277666='%1Forbid'[_0x5b412f(0x3eb)](_0x525cb8[_0x5b412f(0x4f5)](0x0)[_0x5b412f(0x242)]()+_0x525cb8[_0x5b412f(0x296)](0x1));if(_0x197bac[_0x277666])return _0x197bac[_0x277666][_0x5b412f(0x571)](_0x237f4c);}}}}}return![];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x179)]=function(_0xb69a6d,_0xcc262d,_0x40236c,_0x40a2c6){const _0x35e764=_0x255dc2;_0x40236c=_0x40a2c6==='airship'?0x5:_0x40236c;const _0x2139d2=this[_0x35e764(0x56b)](_0xb69a6d,_0x40236c),_0x40689a=this[_0x35e764(0x193)](_0xcc262d,_0x40236c),_0x4caf4b=this['regionId'](_0x2139d2,_0x40689a),_0x4bab1d=this['_regionRules'];if(_0x4bab1d[_0x35e764(0x258)][_0x35e764(0x571)](_0x4caf4b)){if(_0x35e764(0x618)==='QDMHM')this['_pose']=_0x1f4b6a[_0x35e764(0x242)]()[_0x35e764(0x458)](),this[_0x35e764(0x3c1)]=_0x12a422||_0xa3a89c;else return!![];}else{if(_0x35e764(0x412)===_0x35e764(0x412)){const _0x2c1f31=_0x35e764(0x630)[_0x35e764(0x3eb)](_0x40a2c6[_0x35e764(0x4f5)](0x0)[_0x35e764(0x242)]()+_0x40a2c6[_0x35e764(0x296)](0x1));if(_0x4bab1d[_0x2c1f31])return _0x4bab1d[_0x2c1f31][_0x35e764(0x571)](_0x4caf4b);}else return _0x56e603>0x0?0x6:0x4;}return![];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x5b8)]=Game_Map[_0x255dc2(0x301)][_0x255dc2(0x36e)],Game_Map[_0x255dc2(0x301)][_0x255dc2(0x36e)]=function(){const _0x4a9e7a=_0x255dc2;VisuMZ[_0x4a9e7a(0x1ab)]['Game_Map_refresh'][_0x4a9e7a(0x4a2)](this),this[_0x4a9e7a(0x550)]();},Game_Map['prototype'][_0x255dc2(0x550)]=function(){const _0x122358=_0x255dc2;this[_0x122358(0x2d5)]=![];if(this['events']()[_0x122358(0x3ff)](_0x26a638=>_0x26a638[_0x122358(0x1c2)]())){this[_0x122358(0x2d5)]=!![];return;}if(this[_0x122358(0x457)]()[_0x122358(0x3ff)](_0x27bf4d=>_0x27bf4d[_0x122358(0x387)]())){this[_0x122358(0x2d5)]=!![];return;}if(this[_0x122358(0x1b8)][_0x122358(0x3ff)](_0x479572=>_0x479572[_0x122358(0x1c2)]())){if(_0x122358(0x35b)!=='cjrPA'){this['_needsPeriodicRefresh']=!![];return;}else{const _0x362e70=this['getDirectionFromPoint'](_0x343ac1,_0x16b39d,![]);if(_0x362e70)this[_0x122358(0x450)](_0x362e70);}}if(this[_0x122358(0x1b8)][_0x122358(0x3ff)](_0x5286f1=>_0x5286f1[_0x122358(0x387)]())){if(_0x122358(0x3ca)!==_0x122358(0x3cf)){this['_needsPeriodicRefresh']=!![];return;}else{const _0x2e43a4=_0x5ed3ea[_0x122358(0x629)];this[_0x122358(0x27f)]=this[_0x122358(0x457)]()[_0x122358(0x42c)]>_0x2e43a4;if(this[_0x122358(0x27f)]&&_0x3b412f[_0x122358(0x4bd)]()){}}}},VisuMZ[_0x255dc2(0x1ab)]['Game_Map_update']=Game_Map[_0x255dc2(0x301)][_0x255dc2(0x62d)],Game_Map[_0x255dc2(0x301)][_0x255dc2(0x62d)]=function(_0x49768a){const _0x4e369b=_0x255dc2;this[_0x4e369b(0x1be)](),VisuMZ[_0x4e369b(0x1ab)][_0x4e369b(0x1e2)]['call'](this,_0x49768a);},Game_Map['prototype'][_0x255dc2(0x1be)]=function(){const _0x1b563f=_0x255dc2;if(!this[_0x1b563f(0x2d5)])return;this[_0x1b563f(0x54e)]=this[_0x1b563f(0x54e)]||0x3c,this[_0x1b563f(0x54e)]--;if(this[_0x1b563f(0x54e)]<=0x0){if(_0x1b563f(0x4f7)!==_0x1b563f(0x4f7)){if(_0x58553f)this[_0x1b563f(0x3c0)](_0x115658['x'],_0x20a9e8['y']);}else this['requestRefresh'](),this[_0x1b563f(0x54e)]=0x3c;}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1f2)]=Game_Map[_0x255dc2(0x301)]['isDashDisabled'],Game_Map[_0x255dc2(0x301)][_0x255dc2(0x42e)]=function(){const _0x38d067=_0x255dc2;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x38d067(0x1ab)]['Game_Map_isDashDisabled'][_0x38d067(0x4a2)](this);},Game_Map[_0x255dc2(0x301)]['setupSaveEventLocations']=function(){const _0x1f5fdf=_0x255dc2;this[_0x1f5fdf(0x3bb)]=![];const _0x4d2504=$dataMap['note']||'';_0x4d2504[_0x1f5fdf(0x5ba)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1f5fdf(0x3bb)]=!![]);},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x362)]=function(){const _0x177a2a=_0x255dc2;if(this['_saveEventLocations']===undefined)this[_0x177a2a(0x49e)]();return this[_0x177a2a(0x3bb)];},Game_Map['prototype'][_0x255dc2(0x256)]=function(_0x4838c1){const _0x31fcc2=_0x255dc2;_0x4838c1!==this[_0x31fcc2(0x5ec)]()&&$gamePlayer&&$gameSystem[_0x31fcc2(0x256)](this[_0x31fcc2(0x5ec)]());},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x452)]=function(){const _0x415b4b=_0x255dc2;this[_0x415b4b(0x1c1)]=$gameSystem['getMapSpawnedEventData'](this['mapId']()),this[_0x415b4b(0x506)]=!![];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x364)]=Game_Map[_0x255dc2(0x301)][_0x255dc2(0x457)],Game_Map['prototype'][_0x255dc2(0x457)]=function(){const _0xf31a06=_0x255dc2;if(this[_0xf31a06(0x1ba)])return this['_eventCache'];const _0x42a2a8=VisuMZ[_0xf31a06(0x1ab)][_0xf31a06(0x364)][_0xf31a06(0x4a2)](this),_0xd7b635=_0x42a2a8['concat'](this[_0xf31a06(0x1c1)]||[]);return this['_eventCache']=_0xd7b635[_0xf31a06(0x438)](_0x164095=>!!_0x164095),this[_0xf31a06(0x1ba)];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x58f)]=Game_Map['prototype'][_0x255dc2(0x1bb)],Game_Map['prototype'][_0x255dc2(0x1bb)]=function(_0xf35d0e){const _0x30aacb=_0x255dc2;return _0xf35d0e>=0x3e8?(_0xf35d0e-=0x3e8,this['_spawnedEvents'][_0xf35d0e]):VisuMZ[_0x30aacb(0x1ab)][_0x30aacb(0x58f)][_0x30aacb(0x4a2)](this,_0xf35d0e);},Game_Map[_0x255dc2(0x301)]['eraseEvent']=function(_0xba5b09){const _0x4e7013=this['event'](_0xba5b09);if(_0x4e7013)_0x4e7013['erase']();},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x29d)]=function(){const _0x230f9d=_0x255dc2,_0x3a0f8f={'template':_0x230f9d(0x23a),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x230f9d(0x1c1)][_0x230f9d(0x42c)]+0x3e8};this[_0x230f9d(0x4d8)](_0x3a0f8f);},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x580)]=function(_0x3a14ae,_0x3d8d07){const _0x2f42c1=_0x255dc2;if(this['eventsXy'](_0x3a14ae,_0x3d8d07)[_0x2f42c1(0x42c)]>0x0)return!![];if($gamePlayer['x']===_0x3a14ae&&$gamePlayer['y']===_0x3d8d07)return!![];if(this[_0x2f42c1(0x440)]()['posNt'](_0x3a14ae,_0x3d8d07))return!![];if(this[_0x2f42c1(0x237)]()[_0x2f42c1(0x468)](_0x3a14ae,_0x3d8d07))return!![];return![];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x3d5)]=function(_0x4c5b27,_0x3e280f,_0x4191db){const _0x37c202=_0x255dc2;$gameTemp['_spawnData']=_0x4c5b27;const _0x4e8f5b=new Game_Event(_0x4c5b27['mapId'],_0x4c5b27['eventId']);$gameTemp[_0x37c202(0x31b)]=undefined,_0x4e8f5b[_0x37c202(0x36e)]();let _0x5a872e=_0x3e280f-_0x4e8f5b[_0x37c202(0x43f)]['left'],_0x22c757=_0x3e280f+_0x4e8f5b[_0x37c202(0x43f)][_0x37c202(0x3a5)],_0x10ec70=_0x4191db-_0x4e8f5b['_addedHitbox']['up'],_0x345cec=_0x4191db+_0x4e8f5b[_0x37c202(0x43f)][_0x37c202(0x25e)];for(let _0xce2b54=_0x5a872e;_0xce2b54<=_0x22c757;_0xce2b54++){if(_0x37c202(0x498)!==_0x37c202(0x498))return this[_0x37c202(0x444)](0x3,_0x13734c(_0x28f426['$1']));else for(let _0x42e1f4=_0x10ec70;_0x42e1f4<=_0x345cec;_0x42e1f4++){if(_0x37c202(0x298)==='XztkK'){if(this[_0x37c202(0x580)](_0xce2b54,_0x42e1f4))return![];}else return _0x24f1d7[_0x37c202(0x1ab)]['CustomPageConditions'][_0x37c202(0x439)](this[_0x37c202(0x1bb)]()[_0x37c202(0x59d)],this[_0x37c202(0x3ce)]);}}return!![];},Game_Map[_0x255dc2(0x301)]['createSpawnedEventWithData']=function(_0xb51a7c){const _0x35eaed=_0x255dc2;$gameTemp[_0x35eaed(0x31b)]=_0xb51a7c;const _0x2147e9=new Game_Event(_0xb51a7c[_0x35eaed(0x5ec)],_0xb51a7c[_0x35eaed(0x1d4)]);$gameTemp[_0x35eaed(0x31b)]=undefined,this['_spawnedEvents'][_0x35eaed(0x2aa)](_0x2147e9),_0x2147e9['setupSpawn'](_0xb51a7c),this[_0x35eaed(0x427)]();},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x37c)]=function(_0x15c236,_0x2a8d63,_0x546ad1){const _0x81a860=_0x255dc2,_0x114863=_0x15c236['template'][_0x81a860(0x242)]()[_0x81a860(0x458)]();if(_0x114863!==_0x81a860(0x5da)){const _0xe19be0=VisuMZ[_0x81a860(0x1f4)][_0x114863];_0xe19be0&&(_0x15c236[_0x81a860(0x5ec)]=_0xe19be0[_0x81a860(0x451)],_0x15c236[_0x81a860(0x1d4)]=_0xe19be0[_0x81a860(0x268)]);}const _0x14d55b=_0x15c236['x'],_0x3de182=_0x15c236['y'];if(!this['isValid'](_0x14d55b,_0x3de182))return![];if(_0x2a8d63){if(this[_0x81a860(0x580)](_0x14d55b,_0x3de182))return![];if(!this[_0x81a860(0x3d5)](_0x15c236,_0x14d55b,_0x3de182))return![];}if(_0x546ad1){if(!this[_0x81a860(0x421)](_0x14d55b,_0x3de182))return![];}return this[_0x81a860(0x4d8)](_0x15c236),!![];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x48d)]=function(_0x573b38,_0x378bd4,_0x467084,_0x3c94b3){const _0x7b0223=_0x255dc2,_0x325eaa=[],_0x1107fd=this[_0x7b0223(0x2d3)](),_0x2052d8=this[_0x7b0223(0x1a0)]();for(let _0x2019fd=0x0;_0x2019fd<_0x1107fd;_0x2019fd++){if('UiugP'!==_0x7b0223(0x583)){if(this['moveSynchTarget']()>=0x0){const _0x52bfad=_0x3bf458[_0x7b0223(0x422)](this[_0x7b0223(0x4c3)]());if(_0x52bfad)return _0x52bfad[_0x7b0223(0x3e5)]();}return _0x226a63[_0x7b0223(0x301)][_0x7b0223(0x3e5)][_0x7b0223(0x4a2)](this);}else for(let _0x14ec23=0x0;_0x14ec23<_0x2052d8;_0x14ec23++){if(!_0x378bd4[_0x7b0223(0x571)](this['regionId'](_0x2019fd,_0x14ec23)))continue;if(!this[_0x7b0223(0x4ca)](_0x2019fd,_0x14ec23))continue;if(_0x467084){if(this[_0x7b0223(0x580)](_0x2019fd,_0x14ec23))continue;if(!this[_0x7b0223(0x3d5)](_0x573b38,_0x2019fd,_0x14ec23))continue;}if(_0x3c94b3){if(!this[_0x7b0223(0x421)](_0x2019fd,_0x14ec23))continue;}_0x325eaa[_0x7b0223(0x2aa)]([_0x2019fd,_0x14ec23]);}}if(_0x325eaa[_0x7b0223(0x42c)]>0x0){if(_0x7b0223(0x223)!==_0x7b0223(0x2c5)){const _0x567564=_0x325eaa[Math[_0x7b0223(0x24b)](_0x325eaa[_0x7b0223(0x42c)])];return _0x573b38['x']=_0x567564[0x0],_0x573b38['y']=_0x567564[0x1],this['createSpawnedEventWithData'](_0x573b38),!![];}else return 0x0;}return![];},Game_Map['prototype'][_0x255dc2(0x52b)]=function(_0x477203,_0x4dd4c5,_0x114699,_0x2640ac){const _0x46a2f5=_0x255dc2,_0x703dc3=[],_0x1011ee=this[_0x46a2f5(0x2d3)](),_0x33129e=this[_0x46a2f5(0x1a0)]();for(let _0x3afa9d=0x0;_0x3afa9d<_0x1011ee;_0x3afa9d++){if('HmAio'===_0x46a2f5(0x419))this[_0x46a2f5(0x447)][_0x46a2f5(0x441)]=![];else for(let _0x5ca148=0x0;_0x5ca148<_0x33129e;_0x5ca148++){if('pkJof'===_0x46a2f5(0x634)){if(!_0x4dd4c5['includes'](this[_0x46a2f5(0x406)](_0x3afa9d,_0x5ca148)))continue;if(!this[_0x46a2f5(0x4ca)](_0x3afa9d,_0x5ca148))continue;if(_0x114699){if(this[_0x46a2f5(0x580)](_0x3afa9d,_0x5ca148))continue;if(!this[_0x46a2f5(0x3d5)](_0x477203,_0x3afa9d,_0x5ca148))continue;}if(_0x2640ac){if(!this[_0x46a2f5(0x421)](_0x3afa9d,_0x5ca148))continue;}_0x703dc3[_0x46a2f5(0x2aa)]([_0x3afa9d,_0x5ca148]);}else{const _0x3e514b=this[_0x46a2f5(0x401)](this[_0x46a2f5(0x5d3)]());return _0x2a1e6b[_0x46a2f5(0x56b)](this['x'],_0x3e514b);}}}if(_0x703dc3[_0x46a2f5(0x42c)]>0x0){const _0xced893=_0x703dc3[Math[_0x46a2f5(0x24b)](_0x703dc3[_0x46a2f5(0x42c)])];return _0x477203['x']=_0xced893[0x0],_0x477203['y']=_0xced893[0x1],this['createSpawnedEventWithData'](_0x477203),!![];}return![];},Game_Map[_0x255dc2(0x301)]['isPassableByAnyDirection']=function(_0x566703,_0x4ef994){const _0x4d8f06=_0x255dc2;if(this[_0x4d8f06(0x20b)](_0x566703,_0x4ef994,0x2))return!![];if(this[_0x4d8f06(0x20b)](_0x566703,_0x4ef994,0x4))return!![];if(this[_0x4d8f06(0x20b)](_0x566703,_0x4ef994,0x6))return!![];if(this[_0x4d8f06(0x20b)](_0x566703,_0x4ef994,0x8))return!![];return![];},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x5e8)]=function(_0x5d016e){const _0x3420eb=_0x255dc2;if(_0x5d016e<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x36cbf0=this['event'](_0x5d016e);_0x36cbf0[_0x3420eb(0x51e)](-0x1,-0x1),_0x36cbf0[_0x3420eb(0x61e)](),this['_spawnedEvents'][_0x5d016e-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x530)]=function(){const _0x18bc10=_0x255dc2;for(const _0x242842 of this[_0x18bc10(0x1c1)]){if(_0x18bc10(0x577)===_0x18bc10(0x253)){_0x4bfd77+=this[_0x18bc10(0x5a8)],this[_0x18bc10(0x490)](_0x20b17a[_0x18bc10(0x46e)](0x0,0xff));if(this[_0x18bc10(0x5a8)]<0xff)this['_moveRouteIndex']--;}else{if(_0x242842)return _0x242842;}}return null;},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x3f1)]=function(){const _0x4f76c2=_0x255dc2,_0x12df50=this[_0x4f76c2(0x530)]();return _0x12df50?_0x12df50[_0x4f76c2(0x479)]:0x0;},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x462)]=function(){const _0x318f03=_0x255dc2,_0x38f764=this['_spawnedEvents']['slice'](0x0)[_0x318f03(0x46c)]();for(const _0x4e8925 of _0x38f764){if(_0x4e8925)return _0x4e8925;}return null;},Game_Map[_0x255dc2(0x301)]['lastSpawnedEventID']=function(){const _0x135a55=_0x255dc2,_0x168d89=this[_0x135a55(0x462)]();return _0x168d89?_0x168d89[_0x135a55(0x479)]:0x0;},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x2a2)]=function(_0x1611fd,_0x10ff47){const _0x4d6592=_0x255dc2,_0x19380d=this[_0x4d6592(0x2f1)](_0x1611fd,_0x10ff47);for(const _0x1609af of _0x19380d){if(!_0x1609af)continue;if(_0x1609af['isSpawnedEvent']())this['despawnEventId'](_0x1609af[_0x4d6592(0x479)]);}},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x1ae)]=function(_0x42eaeb){const _0x53be3b=_0x255dc2;for(const _0x53fa6e of this[_0x53be3b(0x1c1)]){if(!_0x53fa6e)continue;if(_0x42eaeb[_0x53be3b(0x571)](_0x53fa6e[_0x53be3b(0x22e)]())){if(_0x53be3b(0x4b5)!=='SGEbE'){let _0x43f482=_0x3a08fd['EventsMoveCore'][_0x53be3b(0x61c)]['Movement'][_0x53be3b(0x623)]?_0x58d7c3:_0xc87a4;return this[_0x53be3b(0x471)](_0x43f482);}else this[_0x53be3b(0x5e8)](_0x53fa6e[_0x53be3b(0x479)]);}}},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x3bd)]=function(_0x4ed053){const _0x83d77=_0x255dc2;for(const _0xe86480 of this[_0x83d77(0x1c1)]){if(_0x83d77(0x55d)===_0x83d77(0x55d)){if(!_0xe86480)continue;_0x4ed053[_0x83d77(0x571)](_0xe86480['terrainTag']())&&this['despawnEventId'](_0xe86480[_0x83d77(0x479)]);}else{const _0xae62a=this['event'](_0x36c77d);if(_0xae62a)_0xae62a[_0x83d77(0x61e)]();}}},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x29a)]=function(){const _0xfc3774=_0x255dc2;for(const _0x1d5964 of this[_0xfc3774(0x1c1)]){if(!_0x1d5964)continue;this[_0xfc3774(0x5e8)](_0x1d5964[_0xfc3774(0x479)]);}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x480)]=Game_Map['prototype'][_0x255dc2(0x330)],Game_Map[_0x255dc2(0x301)][_0x255dc2(0x330)]=function(_0x1fa3ee){const _0x4b5713=_0x255dc2;VisuMZ['EventsMoveCore'][_0x4b5713(0x480)][_0x4b5713(0x4a2)](this,_0x1fa3ee);if(_0x1fa3ee>=0x3e8){if(_0x4b5713(0x3f7)!==_0x4b5713(0x3f7))return this['clearDashing']();else{const _0x575a22=this['event'](_0x1fa3ee);if(_0x575a22)_0x575a22[_0x4b5713(0x5a0)]();}}},Game_CommonEvent[_0x255dc2(0x301)][_0x255dc2(0x1c2)]=function(){const _0x218b88=_0x255dc2,_0x35394c=this[_0x218b88(0x1bb)]();return this[_0x218b88(0x22c)]()&&_0x35394c['trigger']>=0x1&&DataManager[_0x218b88(0x465)](_0x35394c[_0x218b88(0x2e9)]);},Game_CommonEvent[_0x255dc2(0x301)][_0x255dc2(0x387)]=function(){const _0x15ea67=_0x255dc2;return VisuMZ[_0x15ea67(0x1ab)]['CustomPageConditions'][_0x15ea67(0x1b8)][_0x15ea67(0x571)](this[_0x15ea67(0x3ce)]);},VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive']=Game_CommonEvent['prototype'][_0x255dc2(0x22c)],Game_CommonEvent['prototype'][_0x255dc2(0x22c)]=function(){const _0x203245=_0x255dc2;return VisuMZ['EventsMoveCore'][_0x203245(0x635)][_0x203245(0x4a2)](this)?!![]:VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x203245(0x439)](this['event']()[_0x203245(0x59d)],this[_0x203245(0x3ce)]);},VisuMZ['EventsMoveCore'][_0x255dc2(0x381)]=Game_Map[_0x255dc2(0x301)]['parallelCommonEvents'],Game_Map[_0x255dc2(0x301)]['parallelCommonEvents']=function(){const _0x2cf53e=_0x255dc2,_0x2ed037=VisuMZ[_0x2cf53e(0x1ab)][_0x2cf53e(0x381)][_0x2cf53e(0x4a2)](this),_0x329060=VisuMZ['EventsMoveCore'][_0x2cf53e(0x1e9)]['_commonEvents'][_0x2cf53e(0x2cd)](_0x341db6=>$dataCommonEvents[_0x341db6]);return _0x2ed037['concat'](_0x329060)['filter']((_0x4ab772,_0x3356bc,_0x46dca5)=>_0x46dca5[_0x2cf53e(0x2f9)](_0x4ab772)===_0x3356bc);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x53d)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x47f)],Game_CharacterBase['prototype']['initMembers']=function(){const _0x757f2d=_0x255dc2;VisuMZ['EventsMoveCore'][_0x757f2d(0x53d)]['call'](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x472)]=function(){const _0x8814d8=_0x255dc2;this[_0x8814d8(0x21e)]=![],this[_0x8814d8(0x561)](),this[_0x8814d8(0x207)](),this[_0x8814d8(0x60b)](),this['clearStepPattern']();},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x395)]=function(){const _0x3891fd=_0x255dc2;if(this[_0x3891fd(0x592)]===Game_Player&&this[_0x3891fd(0x5b0)]())return this[_0x3891fd(0x436)]()['characterName']()[_0x3891fd(0x5ba)](/\[VS8\]/i);else return Imported[_0x3891fd(0x243)]&&this[_0x3891fd(0x376)]()?!![]:this[_0x3891fd(0x35e)]()[_0x3891fd(0x5ba)](/\[VS8\]/i);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x43e)]=Game_CharacterBase['prototype'][_0x255dc2(0x5d3)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x5d3)]=function(){const _0x1bc978=_0x255dc2;if(this[_0x1bc978(0x3a6)]()&&!this[_0x1bc978(0x24d)]()&&this[_0x1bc978(0x395)]()){if(_0x1bc978(0x49f)!=='PyRGd')this[_0x1bc978(0x353)]=!![];else return this[_0x1bc978(0x428)]();}else{if(this[_0x1bc978(0x3a6)]()&&!this['isJumping']())return 0x8;else return this[_0x1bc978(0x37a)]()&&this[_0x1bc978(0x395)]()?this['getPosingCharacterDirection']():VisuMZ[_0x1bc978(0x1ab)]['Game_CharacterBase_direction']['call'](this);}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x278)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x450)],Game_CharacterBase[_0x255dc2(0x301)]['setDirection']=function(_0x53bc96){const _0x5774af=_0x255dc2;if(!this[_0x5774af(0x395)]())_0x53bc96=this['correctFacingDirection'](_0x53bc96);VisuMZ[_0x5774af(0x1ab)][_0x5774af(0x278)]['call'](this,_0x53bc96);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x272)]=function(_0x5bfe86){const _0x275051=_0x255dc2;if(_0x5bfe86===0x1)return this[_0x275051(0x224)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x5bfe86===0x3)return this[_0x275051(0x224)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x5bfe86===0x7)return this[_0x275051(0x224)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x5bfe86===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x5bfe86;},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x5b1)]=function(_0x1b2716){const _0x56dea0=_0x255dc2;return[0x1,0x3,0x5,0x7,0x9][_0x56dea0(0x571)](_0x1b2716);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x616)]=function(){const _0x3736de=_0x255dc2;return this[_0x3736de(0x1b1)]||0x0;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3e7)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x471)],Game_CharacterBase['prototype'][_0x255dc2(0x471)]=function(_0x1f7403){const _0x3346ce=_0x255dc2;this['_lastMovedDirection']=_0x1f7403,VisuMZ['EventsMoveCore'][_0x3346ce(0x3e7)][_0x3346ce(0x4a2)](this,_0x1f7403);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x63c)]=function(_0x4f0ee0){const _0xa1ca02=_0x255dc2;if(!this[_0xa1ca02(0x5b1)](_0x4f0ee0))return this[_0xa1ca02(0x471)](_0x4f0ee0);let _0x27744c=0x0,_0x3d5607=0x0;switch(_0x4f0ee0){case 0x1:_0x27744c=0x4,_0x3d5607=0x2;break;case 0x3:_0x27744c=0x6,_0x3d5607=0x2;break;case 0x7:_0x27744c=0x4,_0x3d5607=0x8;break;case 0x9:_0x27744c=0x6,_0x3d5607=0x8;break;}if(VisuMZ[_0xa1ca02(0x1ab)][_0xa1ca02(0x61c)][_0xa1ca02(0x3c5)]['StrictCollision']){if(_0xa1ca02(0x29c)===_0xa1ca02(0x29c)){if(!this[_0xa1ca02(0x224)](this['_x'],this['_y'],_0x27744c)){if('uHgZT'!==_0xa1ca02(0x1ea)){const _0x1717bc=_0x42e7ef[_0xa1ca02(0x1ab)][_0xa1ca02(0x61c)][_0xa1ca02(0x3c5)];if(_0x7cfac2[_0xa1ca02(0x5f5)]()&&_0x1717bc['StopAutoMoveEvents'])return!![];if(_0x55658a[_0xa1ca02(0x418)]()&&_0x1717bc['StopAutoMoveMessages'])return!![];if(!_0x3776db[_0xa1ca02(0x307)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];}else return this[_0xa1ca02(0x471)](_0x3d5607);}if(!this['canPass'](this['_x'],this['_y'],_0x3d5607))return this[_0xa1ca02(0x471)](_0x27744c);if(!this[_0xa1ca02(0x20a)](this['_x'],this['_y'],_0x27744c,_0x3d5607)){let _0x46d006=VisuMZ[_0xa1ca02(0x1ab)]['Settings'][_0xa1ca02(0x3c5)][_0xa1ca02(0x623)]?_0x27744c:_0x3d5607;return this[_0xa1ca02(0x471)](_0x46d006);}}else _0x3ab74a=this[_0xa1ca02(0x37b)](_0x5e9f0d,_0x3572ed);}this[_0xa1ca02(0x1b1)]=_0x4f0ee0,this[_0xa1ca02(0x21a)](_0x27744c,_0x3d5607);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2f2)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x3e5)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x3e5)]=function(){const _0x4b7992=_0x255dc2;let _0x19d950=this[_0x4b7992(0x204)];return this[_0x4b7992(0x1aa)]()&&(_0x19d950+=this['dashSpeedModifier']()),this[_0x4b7992(0x411)](_0x19d950);},Game_CharacterBase['prototype'][_0x255dc2(0x5f4)]=function(){const _0x2a2de9=_0x255dc2,_0xcbc451=VisuMZ['EventsMoveCore'][_0x2a2de9(0x61c)][_0x2a2de9(0x3c5)];if(_0xcbc451['DashModifier']!==undefined)return _0xcbc451[_0x2a2de9(0x1fb)];else{if('reVwy'==='reVwy')return VisuMZ['EventsMoveCore'][_0x2a2de9(0x2f2)][_0x2a2de9(0x4a2)](this)-this[_0x2a2de9(0x204)];else _0x143102=_0x583bb0;}},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x411)]=function(_0x17f96b){const _0x1a5522=_0x255dc2,_0x5ec14b=VisuMZ[_0x1a5522(0x1ab)][_0x1a5522(0x61c)][_0x1a5522(0x3c5)];if(!_0x5ec14b['SlowerSpeed'])return _0x17f96b;if([0x1,0x3,0x7,0x9][_0x1a5522(0x571)](this[_0x1a5522(0x1b1)])){if(_0x1a5522(0x1f9)===_0x1a5522(0x59f))return this['_selfTarget'];else _0x17f96b*=_0x5ec14b[_0x1a5522(0x263)]||0.01;}return _0x17f96b;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x429)]=Game_CharacterBase[_0x255dc2(0x301)]['isDashing'],Game_CharacterBase['prototype']['isDashing']=function(){const _0x35663d=_0x255dc2;if(this['_forceDashing'])return!![];return VisuMZ[_0x35663d(0x1ab)][_0x35663d(0x429)][_0x35663d(0x4a2)](this);},Game_CharacterBase['prototype'][_0x255dc2(0x548)]=function(){const _0x5cc1d0=_0x255dc2;return this[_0x5cc1d0(0x1aa)]();},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x189)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x1b5)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x1b5)]=function(){const _0x19b4f7=_0x255dc2;if(this[_0x19b4f7(0x37a)]()){if('CJkpc'!=='JKYal')return this[_0x19b4f7(0x4cd)]();else _0x29088a=_0x2f807d[_0x19b4f7(0x1c0)](_0xa931f3,(_0x14691b,_0x313bae)=>_0x29e572[_0x19b4f7(0x2b3)](_0x461ede(_0x313bae)));}else return VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern'][_0x19b4f7(0x4a2)](this);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4d3)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x336)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x336)]=function(){const _0xc55bfe=_0x255dc2;VisuMZ[_0xc55bfe(0x1ab)]['Game_CharacterBase_increaseSteps'][_0xc55bfe(0x4a2)](this),this[_0xc55bfe(0x561)]();},VisuMZ[_0x255dc2(0x1ab)]['Game_CharacterBase_characterIndex']=Game_CharacterBase['prototype']['characterIndex'],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x486)]=function(){const _0x34d6da=_0x255dc2;if(this[_0x34d6da(0x395)]())return this['characterIndexVS8']();return VisuMZ[_0x34d6da(0x1ab)][_0x34d6da(0x1a5)]['call'](this);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x2f7)]=function(){const _0xa72bd3=_0x255dc2,_0x5c4ff9=this[_0xa72bd3(0x5d3)]();if(this[_0xa72bd3(0x24d)]()){if(_0xa72bd3(0x5a7)!=='LUuCf')return this[_0xa72bd3(0x2c3)]();else{if([0x2,0x4,0x6,0x8]['includes'](_0x5c4ff9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x5c4ff9))return 0x5;}}else{if(this[_0xa72bd3(0x3a6)]())return 0x6;else{if(this['isPosing']())return _0xa72bd3(0x5f9)!==_0xa72bd3(0x63e)?this[_0xa72bd3(0x3a0)]():this['isOnLadder']()&&this[_0xa72bd3(0x406)]()===_0x2788dd[_0xa72bd3(0x1ab)][_0xa72bd3(0x61c)][_0xa72bd3(0x2ea)][_0xa72bd3(0x50b)];else{if(this[_0xa72bd3(0x3ed)]){if([0x2,0x4,0x6,0x8][_0xa72bd3(0x571)](_0x5c4ff9))return 0x4;if([0x1,0x3,0x7,0x9][_0xa72bd3(0x571)](_0x5c4ff9))return 0x5;}else{if(this[_0xa72bd3(0x4eb)]()&&this[_0xa72bd3(0x5bc)]()){if([0x2,0x4,0x6,0x8][_0xa72bd3(0x571)](_0x5c4ff9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x5c4ff9))return 0x5;}else{if(this['isDashingAndMoving']()){if(_0xa72bd3(0x420)==='lozyy')_0x4c3ddd=[_0x289b4b,_0x207669,_0x23e804[_0xa72bd3(0x242)]()[_0xa72bd3(0x458)]()];else{if([0x2,0x4,0x6,0x8]['includes'](_0x5c4ff9))return 0x2;if([0x1,0x3,0x7,0x9][_0xa72bd3(0x571)](_0x5c4ff9))return 0x3;}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x5c4ff9))return 0x0;if([0x1,0x3,0x7,0x9][_0xa72bd3(0x571)](_0x5c4ff9))return 0x1;}}}}}}},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x5bc)]=function(){const _0x933f21=_0x255dc2;return VisuMZ['EventsMoveCore']['Settings'][_0x933f21(0x574)]['CarryPose'];},Game_CharacterBase['prototype'][_0x255dc2(0x383)]=function(){const _0x1feba5=_0x255dc2;return this[_0x1feba5(0x3a6)]()&&this[_0x1feba5(0x406)]()===VisuMZ[_0x1feba5(0x1ab)]['Settings'][_0x1feba5(0x2ea)]['Rope'];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x428)]=function(){const _0xdae77e=_0x255dc2;if(this[_0xdae77e(0x383)]()){if(_0xdae77e(0x35f)==='DIAHx')return 0x4;else{const _0x2f47eb=_0x4a2099(_0x1b5969['$1']);_0x2f47eb<_0x4d6a52?(_0x2bd53e('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xdae77e(0x3eb)](_0x254b05,_0x2f47eb,_0x1fb5ad)),_0x56ca3e[_0xdae77e(0x262)]()):_0x23746d=_0x4cb140[_0xdae77e(0x335)](_0x2f47eb,_0x17e568);}}else return 0x2;},VisuMZ['EventsMoveCore'][_0x255dc2(0x1e3)]=Game_CharacterBase['prototype'][_0x255dc2(0x62d)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x62d)]=function(){const _0x4f2a18=_0x255dc2;VisuMZ[_0x4f2a18(0x1ab)][_0x4f2a18(0x1e3)][_0x4f2a18(0x4a2)](this),this[_0x4f2a18(0x416)]();},Game_CharacterBase['prototype'][_0x255dc2(0x416)]=function(){const _0x4b0d60=_0x255dc2;this['_poseDuration']=this[_0x4b0d60(0x3c1)]||0x0;if(this[_0x4b0d60(0x3c1)]>0x0){if(_0x4b0d60(0x403)!==_0x4b0d60(0x403))return this[_0x4b0d60(0x444)](0x2,_0x511da6(_0x26b016['$1']));else{this[_0x4b0d60(0x3c1)]--;if(this[_0x4b0d60(0x3c1)]<=0x0&&this[_0x4b0d60(0x3d2)]!==_0x4b0d60(0x36d))this[_0x4b0d60(0x561)]();}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x27c)]=Game_CharacterBase['prototype']['moveDiagonally'],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x21a)]=function(_0x3fa1f0,_0x661168){const _0x279958=_0x255dc2;VisuMZ[_0x279958(0x1ab)]['Game_CharacterBase_moveDiagonally'][_0x279958(0x4a2)](this,_0x3fa1f0,_0x661168);if(this['isSpriteVS8dir']())this[_0x279958(0x390)](_0x3fa1f0,_0x661168);},Game_CharacterBase[_0x255dc2(0x301)]['setDiagonalDirection']=function(_0x42d55a,_0x353402){const _0xb55cab=_0x255dc2;if(_0x42d55a===0x4&&_0x353402===0x2)this[_0xb55cab(0x450)](0x1);if(_0x42d55a===0x6&&_0x353402===0x2)this['setDirection'](0x3);if(_0x42d55a===0x4&&_0x353402===0x8)this[_0xb55cab(0x450)](0x7);if(_0x42d55a===0x6&&_0x353402===0x8)this[_0xb55cab(0x450)](0x9);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x5e2)]=Game_CharacterBase['prototype'][_0x255dc2(0x540)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x540)]=function(){const _0x3bd02b=_0x255dc2;if(this[_0x3bd02b(0x37a)]()&&this[_0x3bd02b(0x244)]()===_0x3bd02b(0x36d))return!![];return VisuMZ[_0x3bd02b(0x1ab)]['Game_CharacterBase_hasStepAnime']['call'](this);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x1cd)]=function(_0xefc12f,_0x164581){const _0x1d2351=_0x255dc2;if(_0xefc12f[_0x1d2351(0x5ba)](/Z/i))_0xefc12f=_0x1d2351(0x36d);if(_0xefc12f[_0x1d2351(0x5ba)](/SLEEP/i))_0xefc12f=_0x1d2351(0x36d);this[_0x1d2351(0x395)]()&&(this['_pose']=_0xefc12f[_0x1d2351(0x242)]()[_0x1d2351(0x458)](),this[_0x1d2351(0x3c1)]=_0x164581||Infinity);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x244)]=function(){const _0x4487b3=_0x255dc2;if(this[_0x4487b3(0x395)]())return(this[_0x4487b3(0x3d2)]||'')['toUpperCase']()['trim']();else{if(_0x4487b3(0x524)===_0x4487b3(0x524))return''[_0x4487b3(0x242)]()[_0x4487b3(0x458)]();else _0x3b4d6d['registerSelfTarget'](_0xd5d4bb[_0x4487b3(0x442)]),_0xaa83c2[_0x4487b3(0x1ab)]['Window_NumberInput_start']['call'](this),_0x5f39ec[_0x4487b3(0x192)]();}},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x22b)]=function(_0x1d95ff,_0x522647){const _0xd55e5a=_0x255dc2;if(this['isSpriteVS8dir']()){if(_0xd55e5a(0x185)!==_0xd55e5a(0x2b1)){const _0x3c34a9=['','EXCLAMATION','QUESTION','MUSIC\x20NOTE',_0xd55e5a(0x538),_0xd55e5a(0x4a1),'SWEAT','COBWEB',_0xd55e5a(0x214),_0xd55e5a(0x3e4),_0xd55e5a(0x36d),'','','','',''][_0x1d95ff];this['setPose'](_0x3c34a9,_0x522647);}else return _0x5d0616[_0xd55e5a(0x53c)][_0xd55e5a(0x571)](_0x1e75a2)||_0x3fffeb[_0xd55e5a(0x203)][_0xd55e5a(0x571)](_0x14206a);}},Game_CharacterBase['prototype'][_0x255dc2(0x561)]=function(){const _0x1ae467=_0x255dc2;this[_0x1ae467(0x3d2)]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x37a)]=function(){const _0x3652a2=_0x255dc2;return this[_0x3652a2(0x395)]()&&!!this['_pose'];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x3a0)]=function(){const _0x386c17=_0x255dc2,_0x10e6f1=this['_pose'][_0x386c17(0x242)]();switch(this[_0x386c17(0x3d2)][_0x386c17(0x242)]()['trim']()){case'ITEM':case _0x386c17(0x40b):case _0x386c17(0x1a8):case _0x386c17(0x50e):case _0x386c17(0x1c7):case _0x386c17(0x27d):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x255dc2(0x51b)]=function(){const _0x2ed5a1=_0x255dc2;switch(this[_0x2ed5a1(0x3d2)][_0x2ed5a1(0x242)]()){case _0x2ed5a1(0x1af):case _0x2ed5a1(0x521):case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x2ed5a1(0x538):case'ANGER':case _0x2ed5a1(0x3f0):return 0x4;break;case _0x2ed5a1(0x3a2):case _0x2ed5a1(0x40b):case _0x2ed5a1(0x1a8):case'COBWEB':case'SILENCE':case _0x2ed5a1(0x3e4):return 0x6;break;case _0x2ed5a1(0x50e):case _0x2ed5a1(0x1c7):case'COLLAPSE':case _0x2ed5a1(0x36d):case _0x2ed5a1(0x5ed):return 0x8;break;default:return VisuMZ[_0x2ed5a1(0x1ab)]['Game_CharacterBase_setDirection'][_0x2ed5a1(0x4a2)](this);break;}},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x4cd)]=function(){const _0x5fd0c8=_0x255dc2;switch(this['_pose']['toUpperCase']()){case'ITEM':case'HURT':case _0x5fd0c8(0x1af):case'!':case _0x5fd0c8(0x538):case _0x5fd0c8(0x3d8):return 0x0;break;case'HMPH':case _0x5fd0c8(0x1c7):case'QUESTION':case'?':case _0x5fd0c8(0x4a1):case _0x5fd0c8(0x214):return 0x1;break;case _0x5fd0c8(0x1a8):case _0x5fd0c8(0x27d):case _0x5fd0c8(0x604):case _0x5fd0c8(0x3f0):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern']['call'](this);break;}},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x2af)]=function(){const _0x2faba0=_0x255dc2;this[_0x2faba0(0x3ed)]=!![];},Game_CharacterBase[_0x255dc2(0x301)]['clearCarrying']=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x255dc2(0x301)]['forceDashing']=function(){const _0x309072=_0x255dc2;this[_0x309072(0x1ca)]=!![];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x207)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x5b5)]=function(){const _0x3d3d1c=_0x255dc2;if(this['isTile']())return![];if(this[_0x3d3d1c(0x1bf)])return![];if(this[_0x3d3d1c(0x188)])return![];if(this[_0x3d3d1c(0x367)]==='')return![];if(this[_0x3d3d1c(0x592)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype'][_0x255dc2(0x2b6)]=function(){const _0x67f016=_0x255dc2;if(this[_0x67f016(0x3a6)]())return!![];if(this[_0x67f016(0x592)]===Game_Player&&this[_0x67f016(0x5b0)]())return!![];return![];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x2d8)]=function(){const _0x2dec47=_0x255dc2;return VisuMZ[_0x2dec47(0x1ab)][_0x2dec47(0x61c)]['Movement'][_0x2dec47(0x374)];},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x4d0)]=function(){const _0x102acd=_0x255dc2;return this[_0x102acd(0x4a8)]();},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x48a)]=function(){const _0x4f75d8=_0x255dc2;return this['screenY']()+this[_0x4f75d8(0x1c3)]()+this[_0x4f75d8(0x34c)]();},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x37b)]=function(_0x4985a4,_0xd65b48){const _0x3fcab7=_0x255dc2,_0xdcb02e=this[_0x3fcab7(0x337)](),_0x35ae7c=$gameMap[_0x3fcab7(0x2d3)](),_0x52d924=[],_0x11b8dd=[],_0x1fd69d=[],_0x442cce={};let _0x8f9dae=_0x442cce;if(this['x']===_0x4985a4&&this['y']===_0xd65b48)return 0x0;_0x442cce[_0x3fcab7(0x5c4)]=null,_0x442cce['x']=this['x'],_0x442cce['y']=this['y'],_0x442cce['g']=0x0,_0x442cce['f']=$gameMap[_0x3fcab7(0x3c3)](_0x442cce['x'],_0x442cce['y'],_0x4985a4,_0xd65b48),_0x52d924['push'](_0x442cce),_0x11b8dd[_0x3fcab7(0x2aa)](_0x442cce['y']*_0x35ae7c+_0x442cce['x']);while(_0x52d924[_0x3fcab7(0x42c)]>0x0){if(_0x3fcab7(0x564)!=='FSRdW')return![];else{let _0x20ec5e=0x0;for(let _0x4146e3=0x0;_0x4146e3<_0x52d924[_0x3fcab7(0x42c)];_0x4146e3++){if(_0x52d924[_0x4146e3]['f']<_0x52d924[_0x20ec5e]['f']){if(_0x3fcab7(0x62e)!==_0x3fcab7(0x62e)){if(!_0x594b64['isWorking']())return;_0x248d2c[_0x3fcab7(0x55a)]();}else _0x20ec5e=_0x4146e3;}}const _0x4d14e2=_0x52d924[_0x20ec5e],_0x28a469=_0x4d14e2['x'],_0x3aba90=_0x4d14e2['y'],_0xc5113f=_0x3aba90*_0x35ae7c+_0x28a469,_0xe33e78=_0x4d14e2['g'];_0x52d924['splice'](_0x20ec5e,0x1),_0x11b8dd[_0x3fcab7(0x343)](_0x11b8dd[_0x3fcab7(0x2f9)](_0xc5113f),0x1),_0x1fd69d['push'](_0xc5113f);if(_0x4d14e2['x']===_0x4985a4&&_0x4d14e2['y']===_0xd65b48){_0x8f9dae=_0x4d14e2;break;}if(_0xe33e78>=_0xdcb02e){if(_0x3fcab7(0x35c)!==_0x3fcab7(0x35c)){if(this['canPass'](this['x'],this['y'],_0x5ed058))_0x54d819[_0x3fcab7(0x2aa)](_0x1ee508);}else continue;}const _0x518561=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x2f0622=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x19c268=0x1;_0x19c268<0xa;_0x19c268++){if(_0x3fcab7(0x404)===_0x3fcab7(0x51c))_0x34a286[_0x10e2df]?(_0x46f633['PreloadedMaps'][_0x170b07]=_0x53a09a[_0x2a6320],_0x1120a0[_0x412878]=_0x47921a):_0x4ac892(this[_0x3fcab7(0x2a4)]['bind'](this,_0x2777df,_0x3f4389),0x64);else{if(_0x19c268===0x5)continue;const _0xc724af=_0x19c268,_0x27a580=_0x518561[_0x19c268],_0x4d2d5f=_0x2f0622[_0x19c268],_0x165c2a=$gameMap[_0x3fcab7(0x56b)](_0x28a469,_0xc724af),_0x23a194=$gameMap[_0x3fcab7(0x193)](_0x3aba90,_0xc724af),_0x79df96=_0x23a194*_0x35ae7c+_0x165c2a;if(_0x1fd69d[_0x3fcab7(0x571)](_0x79df96))continue;if(this[_0x3fcab7(0x592)]===Game_Player&&VisuMZ[_0x3fcab7(0x1ab)][_0x3fcab7(0x61c)][_0x3fcab7(0x3c5)]['StrictCollision']){if(!this[_0x3fcab7(0x224)](_0x28a469,_0x3aba90,_0x27a580))continue;if(!this['canPass'](_0x28a469,_0x3aba90,_0x4d2d5f))continue;}if(!this['canPassDiagonally'](_0x28a469,_0x3aba90,_0x27a580,_0x4d2d5f))continue;const _0x65ed54=_0xe33e78+0x1,_0x2fc639=_0x11b8dd['indexOf'](_0x79df96);if(_0x2fc639<0x0||_0x65ed54<_0x52d924[_0x2fc639]['g']){if('bOFNY'!==_0x3fcab7(0x1f1))return!![];else{let _0x1f0b34={};_0x2fc639>=0x0?_0x3fcab7(0x4c9)===_0x3fcab7(0x3dd)?this[_0x3fcab7(0x195)]['text']=_0x30b383(_0x46cf17['$1'])[_0x3fcab7(0x458)]():_0x1f0b34=_0x52d924[_0x2fc639]:'zgUVo'!=='zgUVo'?_0x9d0198=this['findDirectionTo'](_0x422be1,_0x1d41dd):(_0x52d924[_0x3fcab7(0x2aa)](_0x1f0b34),_0x11b8dd['push'](_0x79df96)),_0x1f0b34[_0x3fcab7(0x5c4)]=_0x4d14e2,_0x1f0b34['x']=_0x165c2a,_0x1f0b34['y']=_0x23a194,_0x1f0b34['g']=_0x65ed54,_0x1f0b34['f']=_0x65ed54+$gameMap[_0x3fcab7(0x3c3)](_0x165c2a,_0x23a194,_0x4985a4,_0xd65b48),(!_0x8f9dae||_0x1f0b34['f']-_0x1f0b34['g']<_0x8f9dae['f']-_0x8f9dae['g'])&&(_0x3fcab7(0x5ce)!==_0x3fcab7(0x5ce)?this[_0x3fcab7(0x59e)]['iconIndex']=_0x42ae1c(_0x5525f7['$1']):_0x8f9dae=_0x1f0b34);}}}}}}let _0x840f97=_0x8f9dae;while(_0x840f97[_0x3fcab7(0x5c4)]&&_0x840f97['parent']!==_0x442cce){_0x840f97=_0x840f97[_0x3fcab7(0x5c4)];}const _0x553487=$gameMap['deltaX'](_0x840f97['x'],_0x442cce['x']),_0x1d67a2=$gameMap[_0x3fcab7(0x2d6)](_0x840f97['y'],_0x442cce['y']);if(_0x553487<0x0&&_0x1d67a2>0x0)return 0x1;if(_0x553487>0x0&&_0x1d67a2>0x0)return 0x3;if(_0x553487<0x0&&_0x1d67a2<0x0)return 0x7;if(_0x553487>0x0&&_0x1d67a2<0x0)return 0x9;if(_0x1d67a2>0x0)return 0x2;if(_0x553487<0x0)return 0x4;if(_0x553487>0x0)return 0x6;if(_0x1d67a2<0x0)return 0x8;const _0x2298d2=this[_0x3fcab7(0x56c)](_0x4985a4),_0x4bc68c=this[_0x3fcab7(0x517)](_0xd65b48);if(Math['abs'](_0x2298d2)>Math[_0x3fcab7(0x37d)](_0x4bc68c))return _0x2298d2>0x0?0x4:0x6;else{if(_0x4bc68c!==0x0)return _0x4bc68c>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4e3)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x224)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x224)]=function(_0x3d8047,_0x42b248,_0x4dffca){const _0x593688=_0x255dc2;return this[_0x593688(0x240)]===_0x593688(0x3d0)?this[_0x593688(0x436)]()[_0x593688(0x431)](_0x3d8047,_0x42b248,_0x4dffca):VisuMZ[_0x593688(0x1ab)]['Game_CharacterBase_canPass'][_0x593688(0x4a2)](this,_0x3d8047,_0x42b248,_0x4dffca);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x60b)]=function(){const _0x3ea7a4=_0x255dc2;this['_spriteOffsetX']=0x0,this[_0x3ea7a4(0x1eb)]=0x0;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x606)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x4a8)],Game_CharacterBase[_0x255dc2(0x301)]['screenX']=function(){const _0x308f6c=_0x255dc2;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX'][_0x308f6c(0x4a2)](this)+(this[_0x308f6c(0x4d1)]||0x0);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x601)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x1da)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x1da)]=function(){const _0x2e7a6a=_0x255dc2;return VisuMZ[_0x2e7a6a(0x1ab)][_0x2e7a6a(0x601)][_0x2e7a6a(0x4a2)](this)+(this[_0x2e7a6a(0x1eb)]||0x0);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x227)]=function(){const _0x26e44a=_0x255dc2;this[_0x26e44a(0x1a9)]='';},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2e0)]=Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x569)],Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x569)]=function(){const _0x4e56a6=_0x255dc2;if(this[_0x4e56a6(0x21e)])return;if(this[_0x4e56a6(0x48f)]())return;VisuMZ['EventsMoveCore'][_0x4e56a6(0x2e0)]['call'](this);},Game_CharacterBase['prototype'][_0x255dc2(0x48f)]=function(){const _0x22e898=_0x255dc2;if(!this[_0x22e898(0x540)]()&&this['_stopCount']>0x0)return![];switch(String(this[_0x22e898(0x1a9)])[_0x22e898(0x242)]()[_0x22e898(0x458)]()){case _0x22e898(0x191):this[_0x22e898(0x259)]+=0x1;if(this[_0x22e898(0x259)]>0x2)this[_0x22e898(0x2f4)](0x0);break;case _0x22e898(0x3fb):this[_0x22e898(0x259)]-=0x1;if(this[_0x22e898(0x259)]<0x0)this[_0x22e898(0x2f4)](0x2);break;case _0x22e898(0x1a3):case _0x22e898(0x3b2):this['turnRight90']();break;case _0x22e898(0x528):case'SPIN\x20CCW':case _0x22e898(0x246):case _0x22e898(0x53b):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x255dc2(0x631)]=function(){const _0x2fab01=_0x255dc2;return $gameSystem[_0x2fab01(0x631)](this);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x4eb)]=function(){const _0x302426=_0x255dc2,_0x102e03=this[_0x302426(0x631)]();if(!_0x102e03)return![];return _0x102e03[_0x302426(0x27b)]>0x0;},Game_CharacterBase['prototype'][_0x255dc2(0x4d6)]=function(){const _0x4472d3=_0x255dc2,_0x570a2a=this[_0x4472d3(0x5d3)]();return $gameMap[_0x4472d3(0x56b)](this['x'],_0x570a2a);},Game_CharacterBase['prototype'][_0x255dc2(0x504)]=function(){const _0x362b4c=_0x255dc2,_0x3f1d41=this[_0x362b4c(0x5d3)]();return $gameMap[_0x362b4c(0x193)](this['y'],_0x3f1d41);},Game_CharacterBase[_0x255dc2(0x301)]['backX']=function(){const _0x5d5f79=_0x255dc2,_0x5059fd=this[_0x5d5f79(0x401)](this[_0x5d5f79(0x5d3)]());return $gameMap[_0x5d5f79(0x56b)](this['x'],_0x5059fd);},Game_CharacterBase[_0x255dc2(0x301)][_0x255dc2(0x3e1)]=function(){const _0x17b4b3=_0x255dc2,_0x418bc6=this[_0x17b4b3(0x401)](this[_0x17b4b3(0x5d3)]());return $gameMap[_0x17b4b3(0x193)](this['y'],_0x418bc6);},VisuMZ['EventsMoveCore'][_0x255dc2(0x229)]=Game_Character['prototype'][_0x255dc2(0x613)],Game_Character['prototype'][_0x255dc2(0x613)]=function(_0x39db9e){const _0x211f15=_0x255dc2;route=JsonEx['makeDeepCopy'](_0x39db9e),VisuMZ[_0x211f15(0x1ab)][_0x211f15(0x229)][_0x211f15(0x4a2)](this,route);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3ab)]=Game_Character[_0x255dc2(0x301)][_0x255dc2(0x236)],Game_Character['prototype'][_0x255dc2(0x236)]=function(_0x5db117){const _0x3b5b68=_0x255dc2;route=JsonEx[_0x3b5b68(0x3f8)](_0x5db117),VisuMZ['EventsMoveCore']['Game_Character_forceMoveRoute'][_0x3b5b68(0x4a2)](this,route);},VisuMZ['EventsMoveCore'][_0x255dc2(0x1b6)]=Game_Character[_0x255dc2(0x301)]['processMoveCommand'],Game_Character[_0x255dc2(0x301)]['processMoveCommand']=function(_0xd3ea7){const _0x30c0b9=_0x255dc2,_0x5b9b7f=Game_Character,_0x2c4474=_0xd3ea7[_0x30c0b9(0x297)];if(_0xd3ea7['code']===_0x5b9b7f[_0x30c0b9(0x3c9)]){if(_0x30c0b9(0x47e)!==_0x30c0b9(0x47e)){const _0x1c2dbc=/\\SELFVAR\[(\d+)\]/gi;while(_0xf55b7f[_0x30c0b9(0x5ba)](_0x1c2dbc)){_0x4a48e6=_0x18e18f[_0x30c0b9(0x1c0)](_0x1c2dbc,(_0x45eaad,_0x7ad45a)=>_0x3f3413(this[_0x30c0b9(0x3c4)],this[_0x30c0b9(0x479)],_0x224577(_0x7ad45a)));}return _0x41271e;}else{let _0x2f32fd=_0xd3ea7[_0x30c0b9(0x297)][0x0];_0x2f32fd=this['convertVariableValuesInScriptCall'](_0x2f32fd),_0x2f32fd=this['convertSelfVariableValuesInScriptCall'](_0x2f32fd),this[_0x30c0b9(0x36c)](_0xd3ea7,_0x2f32fd);}}else VisuMZ[_0x30c0b9(0x1ab)][_0x30c0b9(0x1b6)][_0x30c0b9(0x4a2)](this,_0xd3ea7);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x4a0)]=function(_0x21e02c){const _0x37d741=_0x255dc2,_0x99be8a=/\$gameVariables\.value\((\d+)\)/gi,_0x459315=/\\V\[(\d+)\]/gi;while(_0x21e02c['match'](_0x99be8a)){_0x21e02c=_0x21e02c[_0x37d741(0x1c0)](_0x99be8a,(_0x45c4ca,_0x382a2b)=>$gameVariables[_0x37d741(0x2b3)](parseInt(_0x382a2b)));}while(_0x21e02c[_0x37d741(0x5ba)](_0x459315)){_0x21e02c=_0x21e02c[_0x37d741(0x1c0)](_0x459315,(_0xb37bd7,_0x2c4e1d)=>$gameVariables[_0x37d741(0x2b3)](parseInt(_0x2c4e1d)));}return _0x21e02c;},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x1c6)]=function(_0x27b9e3){const _0x71f2ce=_0x255dc2,_0x3cc689=/\\SELFVAR\[(\d+)\]/gi;while(_0x27b9e3[_0x71f2ce(0x5ba)](_0x3cc689)){if(_0x71f2ce(0x2a1)!==_0x71f2ce(0x2a1)){if(_0x5de58e[_0x71f2ce(0x5f1)][_0x71f2ce(0x592)]===_0xbe5ade)return![];return _0x229f62['SelfVariables'][_0x71f2ce(0x571)](_0xf71496);}else _0x27b9e3=_0x27b9e3[_0x71f2ce(0x1c0)](_0x3cc689,(_0x1ea5c9,_0x496f8c)=>getSelfVariableValue(this[_0x71f2ce(0x3c4)],this[_0x71f2ce(0x479)],parseInt(_0x496f8c)));}return _0x27b9e3;},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x36c)]=function(_0x1ff26f,_0x70efe3){const _0x390868=_0x255dc2;if(_0x70efe3[_0x390868(0x5ba)](/ANIMATION:[ ](\d+)/i))return this[_0x390868(0x4df)](Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/BALLOON:[ ](.*)/i)){if('OCKMb'!==_0x390868(0x285))return this[_0x390868(0x2ab)](String(RegExp['$1']));else _0x528f00=_0x50f696[_0x390868(0x1c0)](_0x400f78,(_0x56b1ee,_0x531c7b)=>_0x57ae07(this[_0x390868(0x3c4)],this[_0x390868(0x479)],_0x5529d3(_0x531c7b)));}if(_0x70efe3[_0x390868(0x5ba)](/FADE IN:[ ](\d+)/i)){if(_0x390868(0x47d)!=='VulMC')_0x1afabc[_0x390868(0x1ab)]['CustomPageConditions'][_0x390868(0x284)](_0x32c04f);else return this[_0x390868(0x340)](Number(RegExp['$1']));}if(_0x70efe3[_0x390868(0x5ba)](/FADE OUT:[ ](\d+)/i))return this[_0x390868(0x51d)](Number(RegExp['$1']));if(_0x70efe3['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x390868(0x2af)]();if(_0x70efe3[_0x390868(0x5ba)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x390868(0x637)!=='dkzKa')return this[_0x390868(0x2c3)]();else{const _0x540b05=this[_0x390868(0x3be)](_0x28a5b3,_0x3a20e0,!![]);if(_0x540b05)this[_0x390868(0x63c)](_0x540b05);}}if(_0x70efe3['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x390868(0x4e7)]();if(_0x70efe3[_0x390868(0x5ba)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x390868(0x207)]();if(_0x70efe3[_0x390868(0x5ba)](/HUG:[ ]LEFT/i)){if(_0x390868(0x1c5)===_0x390868(0x1c5))return this[_0x390868(0x4e0)]('left');else{_0x211a00[_0x390868(0x2dc)](_0x5103d4,_0x33490d);const _0x33f68a=_0x4e6cb9[_0x390868(0x37f)];_0x6bd596['setCommonEvent'](_0x33f68a);}}if(_0x70efe3[_0x390868(0x5ba)](/HUG:[ ]RIGHT/i))return'XhMBY'===_0x390868(0x182)?this[_0x390868(0x4e0)]('right'):(_0x47f83a-=0x3e8,this[_0x390868(0x1c1)][_0x228601]);if(_0x70efe3[_0x390868(0x5ba)](/INDEX:[ ](\d+)/i))return'EswlT'===_0x390868(0x396)?!![]:this[_0x390868(0x3fc)](Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x5919b7=this[_0x390868(0x1b4)]+Number(RegExp['$1']);return this[_0x390868(0x3fc)](_0x5919b7);}if(_0x70efe3[_0x390868(0x5ba)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x390868(0x3dc)](Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x390868(0x310)==='UlVGp'){if(this[_0x390868(0x3f6)]===_0x12bc38)this['initEventsMoveCore']();if(!_0x53ae47)return;const _0xa414c7=_0x390868(0x29e)[_0x390868(0x3eb)](_0x276f75[_0x390868(0x3c4)],_0x555806['_eventId']);return this[_0x390868(0x3f6)][_0xa414c7];}else return this[_0x390868(0x4c6)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x70efe3[_0x390868(0x5ba)](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x390868(0x5c1)===_0x390868(0x507)){const _0x515b6e=_0x2a10b2['EventsMoveCore'][_0x390868(0x61c)][_0x390868(0x3c5)];if(!_0x515b6e[_0x390868(0x1d6)])return![];if(_0x80352a['isDestinationValid']())return![];if(this['isDashing']()||this[_0x390868(0x474)]()||this[_0x390868(0x3a6)]())return![];return this[_0x390868(0x350)]<_0x515b6e[_0x390868(0x28a)];}else{const _0x147ef9=$gameMap['event'](Number(RegExp['$1']));return this[_0x390868(0x1df)](_0x147ef9);}}if(_0x70efe3[_0x390868(0x5ba)](/JUMP TO PLAYER/i)){if(_0x390868(0x1f8)===_0x390868(0x3e2))this[_0x390868(0x248)]=![];else return this['processMoveRouteJumpToCharacter']($gamePlayer);}if(_0x70efe3[_0x390868(0x5ba)](/JUMP TO HOME/i)&&this['eventId']){if('YtSZq'!=='YtSZq')return _0x3bc895[_0x390868(0x1ab)]['Game_Vehicle_isLandOk']['call'](this,_0x43b978,_0x2daf03,_0x266419);else{const _0x5ae0c7=this[_0x390868(0x2ce)],_0x19e790=this[_0x390868(0x63a)];return this[_0x390868(0x4c6)](_0x5ae0c7,_0x19e790);}}if(_0x70efe3['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x390868(0x30e)!=='Nduww'){const _0x4aa050=String(RegExp['$1']),_0x3debc8=this[_0x390868(0x2de)](_0x70efe3);return this[_0x390868(0x5c3)](_0x4aa050,_0x3debc8);}else return _0x527290[_0x390868(0x1ab)][_0x390868(0x43e)][_0x390868(0x4a2)](this);}if(_0x70efe3[_0x390868(0x5ba)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x356bba=Number(RegExp['$1']),_0x48b86a=Number(RegExp['$2']),_0x44dea6=this[_0x390868(0x2de)](_0x70efe3);return this[_0x390868(0x239)](_0x356bba,_0x48b86a,_0x44dea6);}if(_0x70efe3[_0x390868(0x5ba)](/MOVE TO EVENT:[ ](\d+)/i)){if('yXGYV'!=='LXKxE'){const _0x4d0c26=$gameMap[_0x390868(0x1bb)](Number(RegExp['$1'])),_0x4f7419=this[_0x390868(0x2de)](_0x70efe3);return this[_0x390868(0x1fe)](_0x4d0c26,_0x4f7419);}else{if(_0x5c8b87)this['processMoveRouteTeleportTo'](_0x3851bf['x'],_0x26d62d['y']);}}if(_0x70efe3['match'](/MOVE TO PLAYER/i)){if('edDSB'!==_0x390868(0x5e1)){const _0x554bc1=this[_0x390868(0x2de)](_0x70efe3);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x554bc1);}else return _0x2c0352[_0x390868(0x301)][_0x390868(0x5fc)][_0x390868(0x4a2)](this,_0x4f8a13,_0x257c5e);}if(_0x70efe3[_0x390868(0x5ba)](/MOVE TO HOME/i)&&this[_0x390868(0x1d4)]){if('ZZfDt'===_0x390868(0x2ad)){_0x251d20[_0x390868(0x31a)][_0x3d3259][_0x390868(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x50910f='return\x20%1'['format'](_0x4985bf(_0x17f011['$1']));_0xb044a2[_0x390868(0x433)][_0x31ebee]=new _0xe898e2(_0x390868(0x3b9),_0x50910f);}else{const _0x258b1a=this[_0x390868(0x2ce)],_0x144f0a=this['_randomHomeY'],_0x10305c=this[_0x390868(0x2de)](_0x70efe3);return this['processMoveRouteMoveTo'](_0x258b1a,_0x144f0a,_0x10305c);}}if(_0x70efe3[_0x390868(0x5ba)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x390868(0x444)](0x1,Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/MOVE DOWN:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));if(_0x70efe3['match'](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x70efe3['match'](/MOVE RIGHT:[ ](\d+)/i)){if(_0x390868(0x347)!==_0x390868(0x347)){const _0x4c3bf7=_0x587ee4[_0x390868(0x3ba)](_0x454a3f,_0x20ff50)[_0x390868(0x438)](_0x4b8824=>_0x4b8824!==this&&_0x4b8824['isNormalPriority']());return _0x4c3bf7[_0x390868(0x42c)]>0x0;}else return this[_0x390868(0x444)](0x6,Number(RegExp['$1']));}if(_0x70efe3['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/MOVE UP:[ ](\d+)/i)){if(_0x390868(0x612)!==_0x390868(0x384))return this[_0x390868(0x444)](0x8,Number(RegExp['$1']));else this[_0x390868(0x1ca)]=![];}if(_0x70efe3[_0x390868(0x5ba)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x390868(0x444)](0x9,Number(RegExp['$1']));if(_0x70efe3['match'](/OPACITY:[ ](\d+)([%％])/i)){if(_0x390868(0x39d)!==_0x390868(0x39d)){const _0x2dafba=_0x219077['floor'](this[_0x390868(0x1f0)]/0x3c/0x3c),_0x4772b7=_0x25341f[_0x390868(0x389)](this['_seconds']/0x3c)%0x3c,_0xdd2858=this[_0x390868(0x1f0)]%0x3c;let _0xefb57a=_0x4772b7[_0x390868(0x4ab)](0x2)+':'+_0xdd2858[_0x390868(0x4ab)](0x2);if(_0x2dafba>0x0)_0xefb57a=_0x390868(0x365)[_0x390868(0x3eb)](_0x2dafba,_0xefb57a);return _0xefb57a;}else{const _0x45e95d=Math[_0x390868(0x45e)](Number(RegExp['$1'])/0x64*0xff);return this[_0x390868(0x490)](_0x45e95d[_0x390868(0x46e)](0x0,0xff));}}if(_0x70efe3['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if('BMEWi'===_0x390868(0x5a5)){const _0x246f96=this[_0x390868(0x5a8)]+Math[_0x390868(0x45e)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x246f96['clamp'](0x0,0xff));}else return _0x426893[_0x390868(0x1ab)][_0x390868(0x58f)][_0x390868(0x4a2)](this,_0x4a4564);}if(_0x70efe3[_0x390868(0x5ba)](/OPACITY:[ ]([\+\-]\d+)/i)){if(_0x390868(0x54f)!==_0x390868(0x41a)){const _0x55411f=this[_0x390868(0x5a8)]+Number(RegExp['$1']);return this[_0x390868(0x490)](_0x55411f['clamp'](0x0,0xff));}else{const _0x301777=this[_0x390868(0x5d3)]();return _0x3983c2[_0x390868(0x56b)](this['x'],_0x301777);}}if(_0x70efe3['match'](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x70efe3[_0x390868(0x5ba)](/PATTERN UNLOCK/i)){if(_0x390868(0x539)===_0x390868(0x306)){const _0x55a604=_0x152b63[_0x390868(0x1f4)][_0x763f44];if(!_0x55a604)return;_0x227d24=_0x55a604[_0x390868(0x451)],_0x246f53=_0x55a604[_0x390868(0x268)];}else return this[_0x390868(0x21e)]=![];}if(_0x70efe3['match'](/POSE:[ ](.*)/i)){const _0x448f75=String(RegExp['$1'])['toUpperCase']()[_0x390868(0x458)]();return this['setPose'](_0x448f75);}if(_0x70efe3['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x390868(0x4e8)!=='lTAJc'){_0x26c41a[_0x390868(0x31b)]=_0x407bbe;const _0x1f3c0d=new _0x5660a9(_0x403c84['mapId'],_0x3a6ebc[_0x390868(0x1d4)]);_0x2fd208[_0x390868(0x31b)]=_0x58b2a3,this['_spawnedEvents'][_0x390868(0x2aa)](_0x1f3c0d),_0x1f3c0d['setupSpawn'](_0x51acd3),this['clearEventCache']();}else{const _0x33b076=Number(RegExp['$1']),_0x448938=Number(RegExp['$2']);return this[_0x390868(0x1e7)](_0x33b076,_0x448938);}}if(_0x70efe3[_0x390868(0x5ba)](/STEP TOWARD EVENT:[ ](\d+)/i)){if('bOmrZ'!==_0x390868(0x280))this[_0x390868(0x194)]();else{const _0x2786eb=$gameMap['event'](Number(RegExp['$1']));return this[_0x390868(0x5b7)](_0x2786eb);}}if(_0x70efe3['match'](/STEP TOWARD PLAYER/i))return this[_0x390868(0x5b7)]($gamePlayer);if(_0x70efe3['match'](/STEP TOWARD HOME/i)&&this['eventId']){const _0x27dd2e=this['_randomHomeX'],_0x3d8ccc=this[_0x390868(0x63a)];return this[_0x390868(0x1e7)](_0x27dd2e,_0x3d8ccc);}if(_0x70efe3[_0x390868(0x5ba)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x390868(0x1c4)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x70efe3[_0x390868(0x5ba)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if('FzGPw'!==_0x390868(0x62f)){const _0x50de5b=$gameMap[_0x390868(0x1bb)](Number(RegExp['$1']));return this[_0x390868(0x63f)](_0x50de5b);}else this[_0x390868(0x4de)][_0x390868(0x1e0)]=_0x69768d(_0x5328a2['$1']);}if(_0x70efe3[_0x390868(0x5ba)](/STEP AWAY FROM PLAYER/i))return this[_0x390868(0x63f)]($gamePlayer);if(_0x70efe3[_0x390868(0x5ba)](/STEP AWAY FROM HOME/i)&&this[_0x390868(0x1d4)]){if(_0x390868(0x230)!==_0x390868(0x560)){const _0xb14c58=this[_0x390868(0x2ce)],_0x219931=this[_0x390868(0x63a)];return this[_0x390868(0x1c4)](_0xb14c58,_0x219931);}else{const _0x20ee31=_0xc5274['distance'](this['x'],this['y'],this['_randomHomeX'],this[_0x390868(0x63a)]),_0x2981a0=_0x20ee31*(this['_randomMoveWeight']||0x0);_0x618bc0['random']()>=_0x2981a0?_0x4664b8[_0x390868(0x1ab)][_0x390868(0x29b)]['call'](this):this[_0x390868(0x344)]();}}if(_0x70efe3[_0x390868(0x5ba)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x390868(0x3ee)==='aWplU'){if(this[_0x390868(0x61b)]===_0x2e9aab)this[_0x390868(0x460)]();const _0x523702=_0x390868(0x29e)[_0x390868(0x3eb)](_0x33b35b,_0x649c44);delete this[_0x390868(0x61b)][_0x523702];}else return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x70efe3['match'](/TURN TO EVENT:[ ](\d+)/i)){if(_0x390868(0x502)===_0x390868(0x502)){const _0x3a11ec=$gameMap[_0x390868(0x1bb)](Number(RegExp['$1']));return this[_0x390868(0x26b)](_0x3a11ec);}else this[_0x390868(0x195)][_0x390868(0x1c9)]=_0x196396(_0x4a31c1['$1'])['trim']();}if(_0x70efe3[_0x390868(0x5ba)](/TURN TO PLAYER/i)){if('MKVlY'===_0x390868(0x38c)){if(!this[_0x390868(0x33a)](_0x1ed4c3))return;const _0x3c22a0=new _0x156c70(_0x48dc48);_0x3c22a0['z']=0x8,_0x3c22a0[_0x390868(0x55e)]=_0x543c55['_counter']++,this[_0x390868(0x48b)][_0x390868(0x3ea)](_0x3c22a0),this[_0x390868(0x4b8)][_0x390868(0x2aa)](_0x3c22a0);}else return this[_0x390868(0x26b)]($gamePlayer);}if(_0x70efe3[_0x390868(0x5ba)](/TURN TO HOME/i)&&this[_0x390868(0x1d4)]){if('AHGQM'!==_0x390868(0x584)){const _0x4c3791=this['_randomHomeX'],_0x452d6a=this[_0x390868(0x63a)];return this[_0x390868(0x5cb)](_0x4c3791,_0x452d6a);}else this[_0x390868(0x29f)]();}if(_0x70efe3[_0x390868(0x5ba)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x390868(0x3c0)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x70efe3[_0x390868(0x5ba)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if(_0x390868(0x359)===_0x390868(0x359)){const _0x5b3f1b=$gameMap[_0x390868(0x1bb)](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x5b3f1b);}else{_0x13d973['EventsMoveCore'][_0x390868(0x4a6)]['call'](this);if(this['_paused']===_0x4edac6)this[_0x390868(0x460)]();this[_0x390868(0x250)]=![];}}if(_0x70efe3[_0x390868(0x5ba)](/TURN AWAY FROM PLAYER/i))return this[_0x390868(0x56d)]($gamePlayer);if(_0x70efe3['match'](/TURN AWAY FROM HOME/i)&&this['eventId']){if(_0x390868(0x617)===_0x390868(0x526)){const _0x183111=this[_0x390868(0x2ce)],_0x302bf9=this[_0x390868(0x63a)];return this['moveAwayFromPoint'](_0x183111,_0x302bf9);}else{const _0x3b4eaf=this[_0x390868(0x2ce)],_0x2958f1=this[_0x390868(0x63a)];return this[_0x390868(0x3c0)](_0x3b4eaf,_0x2958f1);}}if(_0x70efe3['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x70efe3[_0x390868(0x5ba)](/TURN LOWER RIGHT/i)){if(_0x390868(0x2c9)===_0x390868(0x614)){_0x9ad7aa['ConvertParams'](_0x4f22ea,_0x16aa45);const _0x108305=_0x1c3440[_0x390868(0x402)](),_0x28a0fd={'template':_0x17202a[_0x390868(0x4a5)],'mapId':_0x24ea21[_0x390868(0x348)]||_0x372f82['mapId'](),'eventId':_0x19914f[_0x390868(0x32d)]||_0x108305[_0x390868(0x1d4)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x3e15cb[_0x390868(0x300)],'spawnEventId':_0x3de63c['_spawnedEvents'][_0x390868(0x42c)]+0x3e8},_0x4bb9f0=_0xad2fb6[_0x390868(0x1e5)]||0x0;if(!_0x230173[_0x390868(0x3a1)][_0x28a0fd[_0x390868(0x5ec)]]&&_0x28a0fd['mapId']!==_0x58a876[_0x390868(0x5ec)]()){let _0x5d3060=_0x390868(0x53f)[_0x390868(0x3eb)](_0x28a0fd[_0x390868(0x5ec)]);_0x5d3060+=_0x390868(0x2e4),_0x5d3060+=_0x390868(0x3cd),_0x5d3060+=_0x390868(0x314),_0x5d3060+=_0x390868(0x640)[_0x390868(0x3eb)](_0x28a0fd[_0x390868(0x5ec)]),_0xe8179a(_0x5d3060);return;}const _0x3adcf1=_0x49a376[_0x390868(0x48d)](_0x28a0fd,_0x18ec7e[_0x390868(0x52d)],_0x48716a[_0x390868(0x2e6)],_0x2708bd['Passability']);_0x4bb9f0&&_0x59ecc5[_0x390868(0x491)](_0x4bb9f0,!!_0x3adcf1);}else return this[_0x390868(0x450)](0x3);}if(_0x70efe3[_0x390868(0x5ba)](/TURN UPPER LEFT/i))return this[_0x390868(0x450)](0x7);if(_0x70efe3[_0x390868(0x5ba)](/TURN UPPER RIGHT/i)){if('kVhCo'===_0x390868(0x197))return this[_0x390868(0x450)](0x9);else _0x405011[_0x390868(0x1ab)][_0x390868(0x543)][_0x390868(0x4a2)](this),this['initMembersEventsMoveCore'](),this['createIconSprite']();}if(_0x70efe3['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x390868(0x467)](RegExp['$1'],RegExp['$2']);if(_0x70efe3[_0x390868(0x5ba)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x390868(0x325)==='HqKBB')this[_0x390868(0x50c)]();else return this[_0x390868(0x5f8)](RegExp['$1'],RegExp['$2']);}if(_0x70efe3[_0x390868(0x5ba)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x390868(0x241)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x70efe3[_0x390868(0x5ba)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x6e7280=$gameMap[_0x390868(0x1bb)](Number(RegExp['$1']));return this[_0x390868(0x391)](_0x6e7280);}if(_0x70efe3['match'](/TELEPORT TO PLAYER/i))return this[_0x390868(0x391)]($gamePlayer);if(_0x70efe3['match'](/TELEPORT TO HOME/i)&&this[_0x390868(0x1d4)]){const _0x21e432=this['_randomHomeX'],_0x16551e=this['_randomHomeY'];return this[_0x390868(0x241)](_0x21e432,_0x16551e);}try{_0x390868(0x3fe)!==_0x390868(0x3fe)?(this[_0x390868(0x3db)]=!![],_0x4e3649[_0x390868(0x1ab)][_0x390868(0x5db)][_0x390868(0x4a2)](this),this['setupEventsMoveCoreEffects'](),this['_activationProximityAutoTriggerBypass']=![]):VisuMZ[_0x390868(0x1ab)][_0x390868(0x1b6)][_0x390868(0x4a2)](this,_0x1ff26f);}catch(_0x193534){if($gameTemp['isPlaytest']())console[_0x390868(0x48e)](_0x193534);}},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x4df)]=function(_0x9800ec){$gameTemp['requestAnimation']([this],_0x9800ec);},Game_Character[_0x255dc2(0x301)]['processMoveRouteBalloon']=function(_0x49406f){const _0x56c509=_0x255dc2;let _0x3d651e=0x0;switch(_0x49406f[_0x56c509(0x242)]()[_0x56c509(0x458)]()){case'!':case _0x56c509(0x1af):_0x3d651e=0x1;break;case'?':case _0x56c509(0x521):_0x3d651e=0x2;break;case _0x56c509(0x38a):case _0x56c509(0x186):case'MUSIC\x20NOTE':case'MUSIC-NOTE':case'MUSICNOTE':_0x3d651e=0x3;break;case'HEART':case _0x56c509(0x565):_0x3d651e=0x4;break;case _0x56c509(0x4a1):_0x3d651e=0x5;break;case'SWEAT':_0x3d651e=0x6;break;case _0x56c509(0x3d8):case'ANNOYED':case _0x56c509(0x2cb):_0x3d651e=0x7;break;case _0x56c509(0x214):case _0x56c509(0x42b):_0x3d651e=0x8;break;case _0x56c509(0x3a7):case _0x56c509(0x2b8):case'LIGHT\x20BULB':case _0x56c509(0x249):case _0x56c509(0x626):_0x3d651e=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x56c509(0x5ed):_0x3d651e=0xa;break;case _0x56c509(0x566):_0x3d651e=0xb;break;case _0x56c509(0x58e):_0x3d651e=0xc;break;case'USER-DEFINED\x203':_0x3d651e=0xd;break;case _0x56c509(0x520):_0x3d651e=0xe;break;case _0x56c509(0x445):_0x3d651e=0xf;break;}$gameTemp[_0x56c509(0x183)](this,_0x3d651e);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x340)]=function(_0xd50955){const _0x27cdf4=_0x255dc2;_0xd50955+=this[_0x27cdf4(0x5a8)],this[_0x27cdf4(0x490)](_0xd50955['clamp'](0x0,0xff));if(this['_opacity']<0xff)this[_0x27cdf4(0x484)]--;},Game_Character[_0x255dc2(0x301)]['processMoveRouteFadeOut']=function(_0x22fe09){const _0x1a0070=_0x255dc2;_0x22fe09=this[_0x1a0070(0x5a8)]-_0x22fe09,this[_0x1a0070(0x490)](_0x22fe09[_0x1a0070(0x46e)](0x0,0xff));if(this['_opacity']>0x0)this[_0x1a0070(0x484)]--;},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x4e0)]=function(_0x20ba1d){const _0x49e64a=_0x255dc2,_0x519b3b=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3802e4=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x3724da=this[_0x49e64a(0x5d3)](),_0x4d3c12=(_0x20ba1d===_0x49e64a(0x3a5)?_0x519b3b:_0x3802e4)[_0x3724da],_0xbacf69=(_0x20ba1d===_0x49e64a(0x3a5)?_0x3802e4:_0x519b3b)[_0x3724da];if(this['canPass'](this['x'],this['y'],_0x4d3c12)){if(_0x20ba1d===_0x49e64a(0x3a5)){if(_0x49e64a(0x5a1)===_0x49e64a(0x5a1))this[_0x49e64a(0x377)]();else{if(!this['bitmap'])return;this[_0x49e64a(0x3b8)][_0x49e64a(0x546)]=!!_0xf980ca[_0x49e64a(0x1ab)][_0x49e64a(0x61c)][_0x49e64a(0x3c5)][_0x49e64a(0x2ee)];}}else this[_0x49e64a(0x410)]();}else{if(!this[_0x49e64a(0x224)](this['x'],this['y'],this['direction']())){if(this['canPass'](this['x'],this['y'],_0xbacf69)){if(_0x20ba1d===_0x49e64a(0x3a5))this[_0x49e64a(0x410)]();else{if(_0x49e64a(0x1d0)!==_0x49e64a(0x24e))this[_0x49e64a(0x377)]();else{if(_0x114e49[_0x49e64a(0x2fa)])return![];return _0x523362['EventsMoveCore'][_0x49e64a(0x5ab)][_0x49e64a(0x4a2)](this,_0x5c36ca,_0x556c6a);}}}else _0x49e64a(0x42d)!==_0x49e64a(0x342)?this['turn180']():(_0x5a72a5[_0x49e64a(0x2dc)](_0x41d5d8,_0x3e7bd3),_0x1581d3[_0x49e64a(0x3bf)](_0x50f197[_0x49e64a(0x31f)]));}}this[_0x49e64a(0x224)](this['x'],this['y'],this[_0x49e64a(0x5d3)]())&&this[_0x49e64a(0x39f)]();},Game_Character['prototype'][_0x255dc2(0x3fc)]=function(_0x44867){const _0x4278d8=_0x255dc2;if(ImageManager[_0x4278d8(0x1ef)](this[_0x4278d8(0x367)]))return;_0x44867=_0x44867[_0x4278d8(0x46e)](0x0,0x7),this[_0x4278d8(0x2a6)](this[_0x4278d8(0x367)],_0x44867);},Game_Character['prototype'][_0x255dc2(0x3dc)]=function(_0x20a605){const _0x59a3e2=_0x255dc2;switch(this['direction']()){case 0x1:this[_0x59a3e2(0x1e1)](-_0x20a605,_0x20a605);break;case 0x2:this[_0x59a3e2(0x1e1)](0x0,_0x20a605);break;case 0x3:this[_0x59a3e2(0x1e1)](_0x20a605,_0x20a605);break;case 0x4:this[_0x59a3e2(0x1e1)](-_0x20a605,0x0);break;case 0x6:this[_0x59a3e2(0x1e1)](_0x20a605,0x0);break;case 0x7:this['jump'](-_0x20a605,-_0x20a605);break;case 0x8:this[_0x59a3e2(0x1e1)](0x0,-_0x20a605);break;case 0x9:this[_0x59a3e2(0x1e1)](_0x20a605,-_0x20a605);break;}},Game_Character[_0x255dc2(0x301)]['processMoveRouteJumpTo']=function(_0x2337ef,_0x22f035){const _0x39bb6d=_0x255dc2,_0x5c23fc=Math[_0x39bb6d(0x45e)](_0x2337ef-this['x']),_0x51b08f=Math[_0x39bb6d(0x45e)](_0x22f035-this['y']);this['jump'](_0x5c23fc,_0x51b08f);},Game_Character['prototype'][_0x255dc2(0x1df)]=function(_0x4bc3e6){const _0xd4532=_0x255dc2;if(_0x4bc3e6)this[_0xd4532(0x4c6)](_0x4bc3e6['x'],_0x4bc3e6['y']);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x1e7)]=function(_0x14a858,_0x189380,_0x2385d8){const _0x14a49b=_0x255dc2;let _0x26c32e=0x0;if(_0x2385d8)$gameTemp[_0x14a49b(0x2fa)]=!![];$gameMap[_0x14a49b(0x4aa)]()?_0x26c32e=this[_0x14a49b(0x37b)](_0x14a858,_0x189380):_0x14a49b(0x245)!==_0x14a49b(0x245)?this[_0x14a49b(0x1eb)]=_0x55f089(_0x5a56fb['$1']):_0x26c32e=this[_0x14a49b(0x40f)](_0x14a858,_0x189380);if(_0x2385d8)$gameTemp[_0x14a49b(0x2fa)]=![];this[_0x14a49b(0x63c)](_0x26c32e),this[_0x14a49b(0x1a6)](!![]);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x5b7)]=function(_0x243a41){const _0x720814=_0x255dc2;if(_0x243a41)this[_0x720814(0x1e7)](_0x243a41['x'],_0x243a41['y']);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x3ae)]=function(_0x2b165f,_0x670832){const _0x3a5c44=_0x255dc2,_0x398b8e=this[_0x3a5c44(0x56c)](_0x2b165f),_0x2be927=this['deltaYFrom'](_0x670832);},Game_Character[_0x255dc2(0x301)]['checkCollisionKeywords']=function(_0x6a2af5){const _0x2cd6d2=_0x255dc2;if(_0x6a2af5[_0x2cd6d2(0x5ba)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x6a2af5[_0x2cd6d2(0x5ba)](/(?:AVOID|EVADE|DODGE)/i)){if('BgTqw'!==_0x2cd6d2(0x572)){if(_0x5b3ed3[_0x2cd6d2(0x465)](_0x347ea5))return!!this[_0x2cd6d2(0x206)](_0x2bc7b8);else return _0x156723['isSelfSwitch'](_0x55480a)?!!this[_0x2cd6d2(0x497)](_0x2a1a84):_0x429505[_0x2cd6d2(0x1ab)]['Game_Switches_value'][_0x2cd6d2(0x4a2)](this,_0x38a0be);}else return![];}else return![];}},VisuMZ['EventsMoveCore']['Game_Event_isCollidedWithPlayerCharacters']=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x233)],Game_Event['prototype'][_0x255dc2(0x233)]=function(_0xa3fc1e,_0x33f105){const _0x76d0d4=_0x255dc2;if($gameTemp[_0x76d0d4(0x2fa)])return![];return VisuMZ[_0x76d0d4(0x1ab)][_0x76d0d4(0x5ab)][_0x76d0d4(0x4a2)](this,_0xa3fc1e,_0x33f105);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x5c3)]=function(_0x2468e4,_0x348d0d){const _0x505694=_0x255dc2,_0xfb236c=['',_0x505694(0x30f),_0x505694(0x5b2),'LOWER\x20RIGHT',_0x505694(0x3e3),'',_0x505694(0x21b),_0x505694(0x5c6),'UP',_0x505694(0x232)],_0x2ebaa6=_0xfb236c[_0x505694(0x2f9)](_0x2468e4['toUpperCase']()[_0x505694(0x458)]());if(_0x2ebaa6<=0x0)return;if(_0x348d0d)$gameTemp[_0x505694(0x2fa)]=!![];if(this[_0x505694(0x224)](this['x'],this['y'],_0x2ebaa6)){if(_0x348d0d)$gameTemp[_0x505694(0x2fa)]=![];this[_0x505694(0x63c)](_0x2ebaa6),this[_0x505694(0x484)]-=0x1;}if(_0x348d0d)$gameTemp[_0x505694(0x2fa)]=![];},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x239)]=function(_0x19ff48,_0x338dc0,_0x536e10){const _0x3001d6=_0x255dc2;this[_0x3001d6(0x1e7)](_0x19ff48,_0x338dc0,_0x536e10);if(this['x']!==_0x19ff48||this['y']!==_0x338dc0)this[_0x3001d6(0x484)]--;},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x1fe)]=function(_0x327795,_0x3c8a16){const _0x40cfeb=_0x255dc2;if(_0x327795)this[_0x40cfeb(0x239)](_0x327795['x'],_0x327795['y'],_0x3c8a16);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x444)]=function(_0x1340da,_0x175e69){const _0x234b2c=_0x255dc2;_0x175e69=_0x175e69||0x0;const _0x73d61b={'code':0x1,'indent':null,'parameters':[]};_0x73d61b['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1340da],this[_0x234b2c(0x3a8)][_0x234b2c(0x593)][this[_0x234b2c(0x484)]][_0x234b2c(0x297)][0x0]='';while(_0x175e69--){_0x234b2c(0x51f)===_0x234b2c(0x51f)?this[_0x234b2c(0x3a8)][_0x234b2c(0x593)]['splice'](this[_0x234b2c(0x484)]+0x1,0x0,_0x73d61b):_0x1c4f6b[_0x234b2c(0x48e)](_0x234b2c(0x1f6)[_0x234b2c(0x3eb)](_0x5d4616));}},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x505)]=function(_0x8a3b31){const _0x52d3c7=_0x255dc2;this[_0x52d3c7(0x21e)]=!![],this[_0x52d3c7(0x2f4)](_0x8a3b31);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x467)]=function(_0x116589,_0x12027b){const _0x533e10=_0x255dc2;if(this===$gamePlayer)return;const _0x46c3fb=[this[_0x533e10(0x3c4)],this['_eventId'],'A'];_0x116589[_0x533e10(0x5ba)](/\b[ABCD]\b/i)?_0x46c3fb[0x2]=String(_0x116589)[_0x533e10(0x4f5)](0x0)[_0x533e10(0x242)]()[_0x533e10(0x458)]():_0x46c3fb[0x2]=_0x533e10(0x545)['format'](_0x116589);switch(_0x12027b[_0x533e10(0x242)]()[_0x533e10(0x458)]()){case'ON':case _0x533e10(0x4b3):$gameSelfSwitches[_0x533e10(0x491)](_0x46c3fb,!![]);break;case _0x533e10(0x178):case'FALSE':$gameSelfSwitches['setValue'](_0x46c3fb,![]);break;case _0x533e10(0x63b):$gameSelfSwitches[_0x533e10(0x491)](_0x46c3fb,!$gameSelfSwitches[_0x533e10(0x2b3)](_0x46c3fb));break;}},Game_Character[_0x255dc2(0x301)]['processMoveRouteSelfVariable']=function(_0x8f8345,_0x52342e){const _0x52213e=_0x255dc2;if(this===$gamePlayer)return;const _0x4524c4=[this[_0x52213e(0x3c4)],this[_0x52213e(0x479)],_0x52213e(0x58d)[_0x52213e(0x3eb)](switchId)];$gameSelfSwitches['setValue'](_0x4524c4,Number(_0x52342e));},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x241)]=function(_0x27a19e,_0x403d77){const _0x362f74=_0x255dc2;this[_0x362f74(0x51e)](_0x27a19e,_0x403d77);},Game_Character['prototype'][_0x255dc2(0x391)]=function(_0x4fd02d){if(_0x4fd02d)this['processMoveRouteTeleportTo'](_0x4fd02d['x'],_0x4fd02d['y']);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x410)]=function(){const _0x6b67d2=_0x255dc2;switch(this[_0x6b67d2(0x5d3)]()){case 0x1:this[_0x6b67d2(0x450)](0x7);break;case 0x2:this[_0x6b67d2(0x450)](0x4);break;case 0x3:this[_0x6b67d2(0x450)](0x1);break;case 0x4:this[_0x6b67d2(0x450)](0x8);break;case 0x6:this[_0x6b67d2(0x450)](0x2);break;case 0x7:this[_0x6b67d2(0x450)](0x9);break;case 0x8:this[_0x6b67d2(0x450)](0x6);break;case 0x9:this[_0x6b67d2(0x450)](0x3);break;}},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x377)]=function(){const _0x1cd3cc=_0x255dc2;switch(this['direction']()){case 0x1:this[_0x1cd3cc(0x450)](0x3);break;case 0x2:this[_0x1cd3cc(0x450)](0x6);break;case 0x3:this[_0x1cd3cc(0x450)](0x9);break;case 0x4:this[_0x1cd3cc(0x450)](0x2);break;case 0x6:this[_0x1cd3cc(0x450)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x1cd3cc(0x450)](0x7);break;}},Game_Character['prototype'][_0x255dc2(0x3be)]=function(_0x334a5c,_0x34028d,_0x5e7add){const _0x8fadc7=_0x255dc2,_0x103f97=this[_0x8fadc7(0x56c)](_0x334a5c),_0x1dcd12=this[_0x8fadc7(0x517)](_0x34028d);if($gameMap[_0x8fadc7(0x4aa)]()){if(_0x5e7add||this['isSpriteVS8dir']()){if(_0x103f97>0x0&&_0x1dcd12<0x0)return 0x1;if(_0x103f97<0x0&&_0x1dcd12<0x0)return 0x3;if(_0x103f97>0x0&&_0x1dcd12>0x0)return 0x7;if(_0x103f97<0x0&&_0x1dcd12>0x0)return 0x9;}}if(Math[_0x8fadc7(0x37d)](_0x103f97)>Math[_0x8fadc7(0x37d)](_0x1dcd12))return _0x103f97>0x0?0x4:0x6;else{if(_0x1dcd12!==0x0)return _0x1dcd12>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x2a3)]=function(_0x5a57cd,_0x193a17,_0x422e1e){const _0x15173a=_0x255dc2,_0x4ee814=this[_0x15173a(0x56c)](_0x5a57cd),_0x3281d3=this['deltaYFrom'](_0x193a17);if($gameMap['isSupportDiagonalMovement']()){if(_0x15173a(0x5e9)==='gFTzg'){if(_0x24cc44[_0x15173a(0x573)]&&this[_0x15173a(0x398)]())return this['checkSmartEventCollision'](_0x9162f5,_0xed1a49);else{const _0x3767b4=_0x51d8d9[_0x15173a(0x3ba)](_0x18327f,_0x3990cc)[_0x15173a(0x438)](_0x2d352f=>_0x2d352f!==this);return _0x3767b4[_0x15173a(0x42c)]>0x0;}}else{if(_0x422e1e||this[_0x15173a(0x395)]()){if(_0x4ee814>0x0&&_0x3281d3<0x0)return 0x9;if(_0x4ee814<0x0&&_0x3281d3<0x0)return 0x7;if(_0x4ee814>0x0&&_0x3281d3>0x0)return 0x3;if(_0x4ee814<0x0&&_0x3281d3>0x0)return 0x1;}}}if(Math[_0x15173a(0x37d)](_0x4ee814)>Math[_0x15173a(0x37d)](_0x3281d3))return _0x4ee814>0x0?0x6:0x4;else{if(_0x3281d3!==0x0){if(_0x15173a(0x5b3)!==_0x15173a(0x5b3)){const _0x5d1c7e=[_0x31b3c4[_0x15173a(0x3c4)],_0xa6b0c3['_eventId'],'Self\x20Switch\x20%1'[_0x15173a(0x3eb)](_0x2121ac)];_0x2f70bb[_0x15173a(0x491)](_0x5d1c7e,_0x2a3d23);}else return _0x3281d3>0x0?0x2:0x8;}}return 0x0;},Game_Character['prototype'][_0x255dc2(0x5cb)]=function(_0x19be83,_0x54dff9){const _0x1ea61f=_0x255dc2,_0x116041=this[_0x1ea61f(0x3be)](_0x19be83,_0x54dff9,!![]);if(_0x116041)this[_0x1ea61f(0x63c)](_0x116041);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x1c4)]=function(_0x16d541,_0x24274b){const _0x53b1b0=_0x255dc2,_0x26c0df=this[_0x53b1b0(0x2a3)](_0x16d541,_0x24274b,!![]);if(_0x26c0df)this[_0x53b1b0(0x63c)](_0x26c0df);},Game_Character[_0x255dc2(0x301)]['turnTowardPoint']=function(_0x14551f,_0x14fe5d){const _0x23db74=_0x255dc2,_0x1701ea=this[_0x23db74(0x3be)](_0x14551f,_0x14fe5d,![]);if(_0x1701ea)this[_0x23db74(0x450)](_0x1701ea);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x3c0)]=function(_0x780e8c,_0x168d31){const _0x2810e8=_0x255dc2,_0x5715c7=this[_0x2810e8(0x2a3)](_0x780e8c,_0x168d31,![]);if(_0x5715c7)this['setDirection'](_0x5715c7);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x22a)]=function(_0x5cb11a){const _0xfe4470=_0x255dc2;if(_0x5cb11a)this[_0xfe4470(0x5cb)](_0x5cb11a['x'],_0x5cb11a['y']);},Game_Character['prototype'][_0x255dc2(0x63f)]=function(_0x319e4d){const _0x40189c=_0x255dc2;if(_0x319e4d)this[_0x40189c(0x1c4)](_0x319e4d['x'],_0x319e4d['y']);},Game_Character[_0x255dc2(0x301)][_0x255dc2(0x26b)]=function(_0x74d5af){const _0x186ca2=_0x255dc2;if(_0x74d5af)this[_0x186ca2(0x1ed)](_0x74d5af['x'],_0x74d5af['y']);},Game_Character['prototype'][_0x255dc2(0x56d)]=function(_0x8c7457){const _0x1cddd0=_0x255dc2;if(_0x8c7457)this[_0x1cddd0(0x3c0)](_0x8c7457['x'],_0x8c7457['y']);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x5f6)]=Game_Player[_0x255dc2(0x301)]['isDashing'],Game_Player[_0x255dc2(0x301)][_0x255dc2(0x1aa)]=function(){const _0x323f59=_0x255dc2;if(this[_0x323f59(0x1ca)])return!![];return VisuMZ[_0x323f59(0x1ab)][_0x323f59(0x5f6)][_0x323f59(0x4a2)](this);},Game_Player['prototype'][_0x255dc2(0x548)]=function(){const _0x2a22a2=_0x255dc2;return this[_0x2a22a2(0x1aa)]()&&(this[_0x2a22a2(0x474)]()||this[_0x2a22a2(0x354)]()!==0x0&&this[_0x2a22a2(0x224)](this['_x'],this['_y'],this['getInputDirection']())||$gameTemp[_0x2a22a2(0x276)]());},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x581)]=Game_Player[_0x255dc2(0x301)][_0x255dc2(0x354)],Game_Player[_0x255dc2(0x301)]['getInputDirection']=function(){const _0x2e37a4=_0x255dc2;return $gameMap[_0x2e37a4(0x4aa)]()?this['getInputDir8']():VisuMZ[_0x2e37a4(0x1ab)][_0x2e37a4(0x581)][_0x2e37a4(0x4a2)](this);},Game_Player['prototype'][_0x255dc2(0x28c)]=function(){const _0x22a9ee=_0x255dc2;return Input[_0x22a9ee(0x32e)];},Game_Player['prototype'][_0x255dc2(0x5bd)]=function(){const _0x4de077=_0x255dc2;if($gameSystem[_0x4de077(0x1fa)]())return 0x0;if(!this[_0x4de077(0x474)]()&&this[_0x4de077(0x2b2)]()){let _0xc9c84b=this[_0x4de077(0x354)]();if(_0xc9c84b>0x0){if(_0x4de077(0x54d)===_0x4de077(0x54d))$gameTemp['clearDestination']();else{_0x1ab773[_0x4de077(0x2dc)](_0x14f5ef,_0x36e987);const _0x1ca990=_0x4abd44[_0x4de077(0x402)]();_0x253a94['MapId']=_0x221028[_0x4de077(0x348)]||_0x4bc6e6[_0x4de077(0x5ec)]();const _0xeeb40b=[_0x35dfe7[_0x4de077(0x348)],_0x320239[_0x4de077(0x32d)]||_0x1ca990['eventId'](),'Self\x20Variable\x20%1'[_0x4de077(0x3eb)](_0x108643['VariableId'])],_0x7d7f02=_0x172843[_0x4de077(0x586)](_0x1b39db[_0x4de077(0x2b3)](_0xeeb40b),_0x5a4ef[_0x4de077(0x2e3)],_0x5b7378[_0x4de077(0x1b7)]);_0x151188[_0x4de077(0x491)](_0xeeb40b,_0x7d7f02);}}else{if($gameTemp['isDestinationValid']()){const _0x257e01=$gameTemp[_0x4de077(0x40d)](),_0xcddfaf=$gameTemp[_0x4de077(0x3b5)](),_0xde36f6=$gameMap[_0x4de077(0x4aa)](),_0x28f3a3=$gameMap['isPassableByAnyDirection'](_0x257e01,_0xcddfaf),_0x22c687=$gameMap[_0x4de077(0x3ba)](_0x257e01,_0xcddfaf)['length']<=0x0;_0xde36f6&&_0x28f3a3&&_0x22c687?_0xc9c84b=this['findDiagonalDirectionTo'](_0x257e01,_0xcddfaf):_0x4de077(0x53e)===_0x4de077(0x53e)?_0xc9c84b=this['findDirectionTo'](_0x257e01,_0xcddfaf):(this[_0x4de077(0x350)]=this[_0x4de077(0x350)]||0x0,this[_0x4de077(0x5d8)]()?this['setDirection'](_0x2ce360):this['executeMove'](_0x2a103a),this[_0x4de077(0x350)]++);}}if(_0xc9c84b>0x0){this[_0x4de077(0x350)]=this[_0x4de077(0x350)]||0x0;if(this[_0x4de077(0x5d8)]())this[_0x4de077(0x450)](_0xc9c84b);else{if('IMaMp'===_0x4de077(0x38e))this[_0x4de077(0x20e)](_0xc9c84b);else return this[_0x4de077(0x340)](_0x17f4ac(_0x498315['$1']));}this[_0x4de077(0x350)]++;}else this[_0x4de077(0x350)]=0x0;}},Game_Player[_0x255dc2(0x301)][_0x255dc2(0x5d8)]=function(){const _0x137275=_0x255dc2,_0x1abcbe=VisuMZ[_0x137275(0x1ab)][_0x137275(0x61c)]['Movement'];if(!_0x1abcbe[_0x137275(0x1d6)])return![];if($gameTemp['isDestinationValid']())return![];if(this['isDashing']()||this['isMoving']()||this[_0x137275(0x3a6)]())return![];return this[_0x137275(0x350)]<_0x1abcbe[_0x137275(0x28a)];},VisuMZ['EventsMoveCore'][_0x255dc2(0x5b6)]=Game_Player[_0x255dc2(0x301)]['executeMove'],Game_Player[_0x255dc2(0x301)]['executeMove']=function(_0x34695a){const _0x5b487f=_0x255dc2;if($gameMap[_0x5b487f(0x4aa)]())this[_0x5b487f(0x63c)](_0x34695a);else{if('mxiru'!==_0x5b487f(0x4da))VisuMZ[_0x5b487f(0x1ab)][_0x5b487f(0x5b6)][_0x5b487f(0x4a2)](this,_0x34695a);else return this[_0x5b487f(0x61b)][_0x5b487f(0x602)];}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4c2)]=Game_Player[_0x255dc2(0x301)][_0x255dc2(0x202)],Game_Player[_0x255dc2(0x301)][_0x255dc2(0x202)]=function(_0x167876,_0x3adfcb,_0x547f9f){const _0x22ad91=_0x255dc2;if($gameMap[_0x22ad91(0x56e)](_0x167876,_0x3adfcb,_0x547f9f,_0x22ad91(0x5f3))){if(this['isInVehicle']()&&this['vehicle']())return this[_0x22ad91(0x436)]()[_0x22ad91(0x202)](_0x167876,_0x3adfcb,_0x547f9f);else{if('CkUOO'!==_0x22ad91(0x482))_0x5b232c[_0x22ad91(0x3f9)](_0x31146e['TemplateName']);else return!![];}}if($gameMap[_0x22ad91(0x5b9)](_0x167876,_0x3adfcb,_0x547f9f,'player'))return![];return VisuMZ['EventsMoveCore'][_0x22ad91(0x4c2)]['call'](this,_0x167876,_0x3adfcb,_0x547f9f);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x31d)]=Game_Player[_0x255dc2(0x301)][_0x255dc2(0x43c)],Game_Player['prototype'][_0x255dc2(0x43c)]=function(_0x2a9766){const _0x3cbb59=_0x255dc2;VisuMZ[_0x3cbb59(0x1ab)][_0x3cbb59(0x31d)]['call'](this,_0x2a9766);if(this[_0x3cbb59(0x3b0)]()){if(_0x3cbb59(0x370)===_0x3cbb59(0x235)){if(_0x5dc02d[this[_0x3cbb59(0x21d)]])this['_waitMode']='',this[_0x3cbb59(0x50c)]();else return!![];}else{this[_0x3cbb59(0x24f)](_0x2a9766);if(_0x2a9766['includes'](0x0)&&this[_0x3cbb59(0x28f)]()===_0x3cbb59(0x3ef))this[_0x3cbb59(0x2bc)](this['x'],this['y']);else(_0x2a9766[_0x3cbb59(0x571)](0x1)||_0x2a9766[_0x3cbb59(0x571)](0x2))&&this[_0x3cbb59(0x194)]();}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2bf)]=Game_Player['prototype'][_0x255dc2(0x5bb)],Game_Player[_0x255dc2(0x301)]['checkEventTriggerThere']=function(_0x9e2605){const _0x99091c=_0x255dc2;VisuMZ[_0x99091c(0x1ab)][_0x99091c(0x2bf)][_0x99091c(0x4a2)](this,_0x9e2605);if(this[_0x99091c(0x3b0)]()&&_0x9e2605[_0x99091c(0x571)](0x0)&&this['startMapCommonEventOnOKTarget']()==='front'){const _0x379dba=this[_0x99091c(0x5d3)](),_0x4152b2=$gameMap['roundXWithDirection'](this['x'],_0x379dba),_0x52ca41=$gameMap[_0x99091c(0x193)](this['y'],_0x379dba);this[_0x99091c(0x2bc)](_0x4152b2,_0x52ca41);}},Game_Player[_0x255dc2(0x301)][_0x255dc2(0x24f)]=function(_0x683695){const _0x4533fe=_0x255dc2;if($gameMap[_0x4533fe(0x5f5)]())return;if($gameMap[_0x4533fe(0x52a)]())return;const _0x24cf01=$gameMap['events']();for(const _0x10d912 of _0x24cf01){if(!_0x10d912)continue;if(!_0x10d912[_0x4533fe(0x610)](_0x683695))continue;if(this['meetActivationRegionConditions'](_0x10d912))return _0x10d912[_0x4533fe(0x257)]();if(this[_0x4533fe(0x62b)](_0x10d912))return _0x10d912[_0x4533fe(0x257)]();}},Game_Player[_0x255dc2(0x301)][_0x255dc2(0x26c)]=function(_0x4ec137){const _0x352a05=_0x255dc2;if($gameMap[_0x352a05(0x5f5)]())return![];if($gameMap[_0x352a05(0x52a)]())return![];return _0x4ec137['activationRegionList']()[_0x352a05(0x571)](this[_0x352a05(0x22e)]());},Game_Player[_0x255dc2(0x301)][_0x255dc2(0x62b)]=function(_0x47a117){const _0x150f0f=_0x255dc2;if($gameMap[_0x150f0f(0x5f5)]())return![];if($gameMap[_0x150f0f(0x52a)]())return![];if(['none',_0x150f0f(0x3e9)][_0x150f0f(0x571)](_0x47a117[_0x150f0f(0x23e)]()))return![];const _0x30c750=_0x47a117[_0x150f0f(0x23e)](),_0x21f9a8=_0x47a117['activationProximityDistance']();switch(_0x30c750){case _0x150f0f(0x5cc):const _0xea624d=$gameMap['distance'](this['x'],this['y'],_0x47a117['x'],_0x47a117['y']);return _0x47a117[_0x150f0f(0x622)]()>=_0xea624d;break;case _0x150f0f(0x2d2):return _0x21f9a8>=Math[_0x150f0f(0x37d)](_0x47a117[_0x150f0f(0x56c)](this['x']))&&_0x21f9a8>=Math['abs'](_0x47a117[_0x150f0f(0x517)](this['y']));break;case _0x150f0f(0x320):return _0x21f9a8>=Math[_0x150f0f(0x37d)](_0x47a117[_0x150f0f(0x517)](this['y']));break;case _0x150f0f(0x51a):return _0x21f9a8>=Math[_0x150f0f(0x37d)](_0x47a117[_0x150f0f(0x56c)](this['x']));break;case _0x150f0f(0x56f):return![];break;}},Game_Player['prototype']['startMapCommonEventOnOK']=function(_0x5a442d,_0x8402e2){const _0x4a21b9=_0x255dc2;if($gameMap[_0x4a21b9(0x5f5)]())return;if($gameMap[_0x4a21b9(0x52a)]())return;let _0x4c36da=VisuMZ[_0x4a21b9(0x1ab)][_0x4a21b9(0x61c)][_0x4a21b9(0x5e0)],_0x151818=$gameMap[_0x4a21b9(0x22e)](_0x5a442d,_0x8402e2);const _0x16a894='Region%1'[_0x4a21b9(0x3eb)](_0x151818);if(_0x4c36da[_0x16a894]){if(_0x4a21b9(0x537)!=='rxquc')$gameTemp['reserveCommonEvent'](_0x4c36da[_0x16a894]);else{_0x4a2994[_0x4a21b9(0x1ab)][_0x4a21b9(0x3ec)][_0x4a21b9(0x4a2)](this);const _0x2b5c3f=_0x459f5e[_0x4a21b9(0x1ab)]['Settings']['Movement'];if(this[_0x4a21b9(0x220)]()){if(_0x2b5c3f['BoatSpeed'])this[_0x4a21b9(0x2f0)](_0x2b5c3f[_0x4a21b9(0x264)]);}else{if(this[_0x4a21b9(0x18c)]()){if(_0x2b5c3f[_0x4a21b9(0x4ee)])this[_0x4a21b9(0x2f0)](_0x2b5c3f['ShipSpeed']);}else{if(this['isAirship']()){if(_0x2b5c3f[_0x4a21b9(0x358)])this['setMoveSpeed'](_0x2b5c3f[_0x4a21b9(0x358)]);}}}}}},Game_Player[_0x255dc2(0x301)][_0x255dc2(0x28f)]=function(){const _0x4acd06=_0x255dc2;return VisuMZ[_0x4acd06(0x1ab)][_0x4acd06(0x61c)][_0x4acd06(0x4cf)];},Game_Player['prototype'][_0x255dc2(0x194)]=function(){const _0x13eac0=_0x255dc2;if($gameMap[_0x13eac0(0x5f5)]())return;if($gameMap[_0x13eac0(0x52a)]())return;let _0x88fd15=VisuMZ['EventsMoveCore'][_0x13eac0(0x61c)]['RegionTouch'];const _0x588d9b=_0x13eac0(0x1ec)[_0x13eac0(0x3eb)](this['regionId']());_0x88fd15[_0x588d9b]&&$gameTemp['reserveCommonEvent'](_0x88fd15[_0x588d9b]);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1ad)]=Game_Player['prototype'][_0x255dc2(0x336)],Game_Player['prototype'][_0x255dc2(0x336)]=function(){const _0x443e69=_0x255dc2;VisuMZ[_0x443e69(0x1ab)]['Game_Player_increaseSteps'][_0x443e69(0x4a2)](this),VisuMZ[_0x443e69(0x2a5)](0x0);},VisuMZ[_0x255dc2(0x1ab)]['Game_Follower_initialize']=Game_Follower[_0x255dc2(0x301)]['initialize'],Game_Follower[_0x255dc2(0x301)][_0x255dc2(0x407)]=function(_0x1d288d){const _0x251bc9=_0x255dc2;VisuMZ[_0x251bc9(0x1ab)][_0x251bc9(0x247)]['call'](this,_0x1d288d),this[_0x251bc9(0x607)]=![];},Game_Follower['prototype'][_0x255dc2(0x1aa)]=function(){const _0x3236cb=_0x255dc2;return $gamePlayer[_0x3236cb(0x1aa)]();},Game_Follower[_0x255dc2(0x301)]['isDashingAndMoving']=function(){const _0x2d5b62=_0x255dc2;return $gamePlayer[_0x2d5b62(0x548)]();},Game_Follower[_0x255dc2(0x301)][_0x255dc2(0x3e5)]=function(){const _0x44d017=_0x255dc2;return $gamePlayer[_0x44d017(0x3e5)]();},Game_Follower[_0x255dc2(0x301)][_0x255dc2(0x287)]=function(_0x125280){const _0x4688be=_0x255dc2;this[_0x4688be(0x607)]=_0x125280;},VisuMZ['EventsMoveCore'][_0x255dc2(0x338)]=Game_Follower['prototype']['chaseCharacter'],Game_Follower[_0x255dc2(0x301)]['chaseCharacter']=function(_0x24f39c){const _0x52279f=_0x255dc2;if(this[_0x52279f(0x607)])return;if($gameSystem[_0x52279f(0x184)]())return;VisuMZ[_0x52279f(0x1ab)]['Game_Follower_chaseCharacter'][_0x52279f(0x4a2)](this,_0x24f39c);},VisuMZ[_0x255dc2(0x1ab)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x255dc2(0x301)]['isMapPassable'],Game_Vehicle[_0x255dc2(0x301)]['isMapPassable']=function(_0x565021,_0x291843,_0x442ec5){const _0x364a8d=_0x255dc2;if($gameMap[_0x364a8d(0x56e)](_0x565021,_0x291843,_0x442ec5,this[_0x364a8d(0x4ff)]))return!![];if($gameMap[_0x364a8d(0x5b9)](_0x565021,_0x291843,_0x442ec5,this[_0x364a8d(0x4ff)]))return![];return VisuMZ[_0x364a8d(0x1ab)][_0x364a8d(0x19b)][_0x364a8d(0x4a2)](this,_0x565021,_0x291843,_0x442ec5);},Game_Vehicle[_0x255dc2(0x301)][_0x255dc2(0x431)]=function(_0x3668b5,_0x25e98d,_0x284ece){const _0x5d34e5=_0x255dc2;if($gameMap['isRegionAllowPass'](_0x3668b5,_0x25e98d,_0x284ece,this[_0x5d34e5(0x4ff)]))return!![];if($gameMap[_0x5d34e5(0x5b9)](_0x3668b5,_0x25e98d,_0x284ece,this['_type']))return![];return VisuMZ[_0x5d34e5(0x1ab)][_0x5d34e5(0x4e3)]['call']($gamePlayer,_0x3668b5,_0x25e98d,_0x284ece);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x512)]=Game_Vehicle[_0x255dc2(0x301)][_0x255dc2(0x39c)],Game_Vehicle['prototype']['isLandOk']=function(_0x2ffd06,_0xf9c7b9,_0x4dd9bc){const _0x286f89=_0x255dc2;if($gameMap['isRegionDockable'](_0x2ffd06,_0xf9c7b9,_0x4dd9bc,this[_0x286f89(0x4ff)]))return!![];const _0x17c449=this[_0x286f89(0x4ff)]['charAt'](0x0)[_0x286f89(0x242)]()+this[_0x286f89(0x4ff)]['slice'](0x1),_0x2fe4a8=_0x286f89(0x63d)[_0x286f89(0x3eb)](_0x17c449);return VisuMZ['EventsMoveCore']['Settings']['Region'][_0x2fe4a8]?![]:VisuMZ[_0x286f89(0x1ab)]['Game_Vehicle_isLandOk']['call'](this,_0x2ffd06,_0xf9c7b9,_0x4dd9bc);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3ec)]=Game_Vehicle[_0x255dc2(0x301)][_0x255dc2(0x443)],Game_Vehicle['prototype'][_0x255dc2(0x443)]=function(){const _0x4c4a5a=_0x255dc2;VisuMZ[_0x4c4a5a(0x1ab)][_0x4c4a5a(0x3ec)][_0x4c4a5a(0x4a2)](this);const _0x43ef71=VisuMZ[_0x4c4a5a(0x1ab)][_0x4c4a5a(0x61c)]['Movement'];if(this[_0x4c4a5a(0x220)]()){if(_0x43ef71['BoatSpeed'])this[_0x4c4a5a(0x2f0)](_0x43ef71[_0x4c4a5a(0x264)]);}else{if(this[_0x4c4a5a(0x18c)]()){if(_0x43ef71['ShipSpeed'])this['setMoveSpeed'](_0x43ef71[_0x4c4a5a(0x4ee)]);}else{if(this[_0x4c4a5a(0x417)]()){if(_0x4c4a5a(0x511)===_0x4c4a5a(0x511)){if(_0x43ef71[_0x4c4a5a(0x358)])this[_0x4c4a5a(0x2f0)](_0x43ef71['AirshipSpeed']);}else this[_0x4c4a5a(0x17b)]();}}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3f3)]=Game_Event[_0x255dc2(0x301)]['initialize'],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x407)]=function(_0x692d3a,_0x42240a){const _0x2cfc6f=_0x255dc2;VisuMZ['EventsMoveCore'][_0x2cfc6f(0x3f3)][_0x2cfc6f(0x4a2)](this,_0x692d3a,_0x42240a),this['setupCopyEvent'](),this['setupMorphEvent'](),this[_0x2cfc6f(0x50f)]();},Game_Map[_0x255dc2(0x301)][_0x255dc2(0x281)]=function(_0x520f28,_0x30196b){const _0x869848=_0x255dc2;return _0x520f28===$gameMap[_0x869848(0x5ec)]()?$dataMap[_0x869848(0x457)][_0x30196b]:VisuMZ[_0x869848(0x3a1)][_0x520f28][_0x869848(0x457)][_0x30196b];},VisuMZ['EventsMoveCore'][_0x255dc2(0x58b)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x1bb)],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x1bb)]=function(){const _0x174172=_0x255dc2;if(this[_0x174172(0x531)]!==undefined){if(_0x174172(0x2c7)===_0x174172(0x2c7)){const _0x3f361d=this[_0x174172(0x531)]['mapId'],_0x189716=this['_eventMorphData'][_0x174172(0x1d4)];return $gameMap[_0x174172(0x281)](_0x3f361d,_0x189716);}else{_0x5708a8[_0x174172(0x44f)][_0x4cf284][_0x174172(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3704a1='return\x20%1'[_0x174172(0x3eb)](_0xb5716e(_0x3d8a6b['$1']));_0x3b4fa4[_0x174172(0x433)][_0x41fcd4]=new _0x45f69c(_0x174172(0x2e9),_0x3704a1);}}if(this['_eventCopyData']!==undefined){const _0x3d88e9=this['_eventCopyData']['mapId'],_0x4b6264=this['_eventCopyData'][_0x174172(0x1d4)];return $gameMap[_0x174172(0x281)](_0x3d88e9,_0x4b6264);}if(this[_0x174172(0x597)]!==undefined){const _0x4da96f=this[_0x174172(0x597)][_0x174172(0x5ec)],_0x234ea0=this[_0x174172(0x597)][_0x174172(0x1d4)];return $gameMap['referEvent'](_0x4da96f,_0x234ea0);}if($gameTemp[_0x174172(0x31b)]!==undefined){if(_0x174172(0x231)!==_0x174172(0x231))[0x6c,0x198][_0x174172(0x571)](_0x467cda[_0x174172(0x2fe)])&&(_0x291f5c+=_0x1b7cde[_0x174172(0x297)][0x0]);else{const _0xe9a687=$gameTemp['_spawnData'][_0x174172(0x5ec)],_0x558ba4=$gameTemp[_0x174172(0x31b)]['eventId'];return $gameMap[_0x174172(0x281)](_0xe9a687,_0x558ba4);}}return VisuMZ['EventsMoveCore'][_0x174172(0x58b)][_0x174172(0x4a2)](this);},Game_Event['prototype'][_0x255dc2(0x527)]=function(_0x392e14,_0x5d742c){const _0xbca395=_0x255dc2;if(_0x392e14===0x0||_0x5d742c===0x0)return![];if(!VisuMZ[_0xbca395(0x3a1)][_0x392e14]&&_0x392e14!==$gameMap[_0xbca395(0x5ec)]()){if($gameTemp[_0xbca395(0x4bd)]()){if(_0xbca395(0x553)!=='BPilc')console[_0xbca395(0x48e)](_0xbca395(0x1f6)[_0xbca395(0x3eb)](_0x392e14));else{if(this[_0xbca395(0x3a6)]())return!![];if(this['constructor']===_0x3e6f07&&this[_0xbca395(0x5b0)]())return!![];return![];}}return![];}return!![];},VisuMZ[_0x255dc2(0x1ab)]['Game_Event_start']=Game_Event['prototype'][_0x255dc2(0x257)],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x257)]=function(){const _0x11b304=_0x255dc2;VisuMZ['EventsMoveCore'][_0x11b304(0x181)]['call'](this);if(Imported[_0x11b304(0x2d1)]&&Input[_0x11b304(0x345)](VisuMZ[_0x11b304(0x20f)][_0x11b304(0x61c)][_0x11b304(0x4c5)][_0x11b304(0x515)])){if(_0x11b304(0x322)!==_0x11b304(0x22f))Input['clear']();else return this['processMoveRouteMoveRepeat'](0x6,_0x487cd5(_0x182d23['$1']));}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x226)]=function(){const _0x46db16=_0x255dc2,_0x26505c=this[_0x46db16(0x1bb)]()['note'];if(_0x26505c==='')return;if(DataManager[_0x46db16(0x3fa)]()||DataManager[_0x46db16(0x4b7)]())return;const _0x155077=VisuMZ[_0x46db16(0x1ab)][_0x46db16(0x61c)]['Template'];let _0x299210=null,_0x2682b1=0x0,_0x1cde99=0x0;if(_0x26505c['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x46db16(0x5d5)!=='AZpof'){let _0x18a4d4={};_0x452208>=0x0?_0x18a4d4=_0x24a590[_0x4f3c94]:(_0x153b3a['push'](_0x18a4d4),_0x35e1b3['push'](_0x3fd924)),_0x18a4d4[_0x46db16(0x5c4)]=_0x4ee765,_0x18a4d4['x']=_0x468748,_0x18a4d4['y']=_0x1b96c5,_0x18a4d4['g']=_0x12af22,_0x18a4d4['f']=_0x517296+_0x317b07[_0x46db16(0x3c3)](_0x2c18ef,_0x4a7e21,_0x56d37d,_0xd9736c),(!_0x181724||_0x18a4d4['f']-_0x18a4d4['g']<_0x35a0be['f']-_0x3a4575['g'])&&(_0x102c42=_0x18a4d4);}else _0x2682b1=Number(RegExp['$1']),_0x1cde99=Number(RegExp['$2']);}else{if(_0x26505c['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x2682b1=Number(RegExp['$1']),_0x1cde99=Number(RegExp['$2']);else{if(_0x26505c[_0x46db16(0x5ba)](/<COPY EVENT:[ ](.*?)>/i)){if('Dgijj'==='Dgijj'){const _0x326537=String(RegExp['$1'])[_0x46db16(0x242)]()[_0x46db16(0x458)]();_0x299210=VisuMZ[_0x46db16(0x1f4)][_0x326537];if(!_0x299210)return;_0x2682b1=_0x299210[_0x46db16(0x451)],_0x1cde99=_0x299210[_0x46db16(0x268)];}else _0x1fe1b5[_0x46db16(0x2ac)]();}}}if(!this[_0x46db16(0x527)](_0x2682b1,_0x1cde99))return;_0x155077['PreCopyJS'][_0x46db16(0x4a2)](this,_0x2682b1,_0x1cde99,this);if(_0x299210)_0x299210[_0x46db16(0x27e)][_0x46db16(0x4a2)](this,_0x2682b1,_0x1cde99,this);this['_eventCopyData']={'mapId':_0x2682b1,'eventId':_0x1cde99},this['_pageIndex']=-0x2,this[_0x46db16(0x36e)](),_0x155077['PostCopyJS'][_0x46db16(0x4a2)](this,_0x2682b1,_0x1cde99,this);if(_0x299210)_0x299210[_0x46db16(0x559)][_0x46db16(0x4a2)](this,_0x2682b1,_0x1cde99,this);$gameMap[_0x46db16(0x427)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x454)]=function(){const _0x59aaab=_0x255dc2,_0x248b51=$gameSystem[_0x59aaab(0x32f)](this);if(!_0x248b51)return;const _0x49980a=_0x248b51['template']['toUpperCase']()[_0x59aaab(0x458)]();if(_0x49980a!==_0x59aaab(0x5da))_0x59aaab(0x4b1)===_0x59aaab(0x5ef)?(this[_0x59aaab(0x4d1)]=0x0,this[_0x59aaab(0x1eb)]=0x0):this[_0x59aaab(0x3f9)](_0x49980a,!![]);else{if(_0x59aaab(0x552)===_0x59aaab(0x41c)){const _0x43c02b=this[_0x59aaab(0x1ac)](_0x14bb7b),_0x36b130=_0xadfffe[_0x59aaab(0x389)]((this[_0x59aaab(0x60c)]-_0x43c02b[_0x59aaab(0x2d3)])/0x2);this['drawTextEx'](_0x5ae4de,_0x36b130,_0x544ea8),_0x4eb38d+=_0x43c02b[_0x59aaab(0x1a0)];}else this[_0x59aaab(0x44c)](_0x248b51[_0x59aaab(0x5ec)],_0x248b51[_0x59aaab(0x1d4)],!![]);}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x44c)]=function(_0x10610b,_0x3be1cb,_0x9ab98e){const _0x5aac32=_0x255dc2;if(!this[_0x5aac32(0x527)](_0x10610b,_0x3be1cb))return;const _0x2a101c=VisuMZ[_0x5aac32(0x1ab)][_0x5aac32(0x61c)][_0x5aac32(0x324)];if(!_0x9ab98e)_0x2a101c[_0x5aac32(0x449)][_0x5aac32(0x4a2)](this,_0x10610b,_0x3be1cb,this);this[_0x5aac32(0x531)]={'mapId':_0x10610b,'eventId':_0x3be1cb},this[_0x5aac32(0x59c)]=-0x2,this['refresh']();if(!_0x9ab98e)_0x2a101c[_0x5aac32(0x4bc)][_0x5aac32(0x4a2)](this,_0x10610b,_0x3be1cb,this);$gameMap[_0x5aac32(0x427)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x3f9)]=function(_0x412162,_0x3ded1c){const _0x17f27f=_0x255dc2;_0x412162=_0x412162[_0x17f27f(0x242)]()['trim']();const _0x4498d9=VisuMZ[_0x17f27f(0x1f4)][_0x412162];if(!_0x4498d9)return;const _0x478895=_0x4498d9[_0x17f27f(0x451)],_0x2b3913=_0x4498d9[_0x17f27f(0x268)];if(!this[_0x17f27f(0x527)](_0x478895,_0x2b3913))return;if(!_0x3ded1c)_0x4498d9[_0x17f27f(0x449)]['call'](this,_0x478895,_0x2b3913,this);this[_0x17f27f(0x44c)](_0x478895,_0x2b3913,_0x3ded1c);if(!_0x3ded1c)_0x4498d9[_0x17f27f(0x4bc)]['call'](this,_0x478895,_0x2b3913,this);if($gameMap)$gameMap[_0x17f27f(0x427)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x2f5)]=function(){const _0x15ff8b=_0x255dc2;this[_0x15ff8b(0x531)]=undefined,this['_pageIndex']=-0x2,this[_0x15ff8b(0x36e)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x518)]=function(_0x3b1b73){const _0x89c7ea=_0x255dc2,_0x4f595b=VisuMZ[_0x89c7ea(0x1ab)][_0x89c7ea(0x61c)][_0x89c7ea(0x324)],_0x25794f=_0x3b1b73[_0x89c7ea(0x23f)][_0x89c7ea(0x242)]()[_0x89c7ea(0x458)](),_0x4b3972=!['',_0x89c7ea(0x5da)][_0x89c7ea(0x571)](_0x25794f);let _0x222b10=0x0,_0x563bab=0x0;if(_0x4b3972){const _0xabef83=VisuMZ[_0x89c7ea(0x1f4)][_0x25794f];if(!_0xabef83)return;_0x222b10=_0xabef83[_0x89c7ea(0x451)],_0x563bab=_0xabef83[_0x89c7ea(0x268)];}else _0x222b10=_0x3b1b73[_0x89c7ea(0x5ec)],_0x563bab=_0x3b1b73['eventId'];if(!this[_0x89c7ea(0x527)](_0x222b10,_0x563bab))return;if(_0x4b3972){const _0x2b9699=VisuMZ[_0x89c7ea(0x1f4)][_0x25794f];_0x2b9699[_0x89c7ea(0x542)]['call'](this,_0x222b10,_0x563bab,this);}_0x4f595b[_0x89c7ea(0x542)]['call'](this,_0x222b10,_0x563bab,this),this[_0x89c7ea(0x597)]=_0x3b1b73,this[_0x89c7ea(0x59c)]=-0x2,this[_0x89c7ea(0x3c4)]=$gameMap[_0x89c7ea(0x5ec)](),this[_0x89c7ea(0x479)]=_0x3b1b73[_0x89c7ea(0x481)],this[_0x89c7ea(0x1fd)]=_0x3b1b73['spawnPreserved'],this[_0x89c7ea(0x51e)](_0x3b1b73['x'],_0x3b1b73['y']),this[_0x89c7ea(0x450)](_0x3b1b73[_0x89c7ea(0x5d3)]),this[_0x89c7ea(0x36e)]();if(_0x4b3972){const _0x5ed4de=VisuMZ[_0x89c7ea(0x1f4)][_0x25794f];if(!_0x5ed4de)return;_0x5ed4de[_0x89c7ea(0x492)][_0x89c7ea(0x4a2)](this,_0x222b10,_0x563bab,this);}_0x4f595b['PostSpawnJS'][_0x89c7ea(0x4a2)](this,_0x222b10,_0x563bab,this);const _0x5c0f96=SceneManager['_scene'];if(_0x5c0f96&&_0x5c0f96[_0x89c7ea(0x1d1)])_0x5c0f96[_0x89c7ea(0x1d1)][_0x89c7ea(0x2e7)](this);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x563)]=function(){const _0x51b58a=_0x255dc2;return!!this[_0x51b58a(0x597)];},VisuMZ['EventsMoveCore'][_0x255dc2(0x4d5)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x36e)],Game_Event[_0x255dc2(0x301)]['refresh']=function(){const _0x1ed942=_0x255dc2,_0x23e63c=this[_0x1ed942(0x59c)];VisuMZ[_0x1ed942(0x1ab)][_0x1ed942(0x4d5)]['call'](this),_0x23e63c!==this[_0x1ed942(0x59c)]&&this['setupEventsMoveCoreEffects']();},VisuMZ['EventsMoveCore'][_0x255dc2(0x2e1)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x334)],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x334)]=function(){const _0x5552d3=_0x255dc2;VisuMZ['EventsMoveCore'][_0x5552d3(0x2e1)][_0x5552d3(0x4a2)](this),this[_0x5552d3(0x361)]();},VisuMZ['EventsMoveCore'][_0x255dc2(0x5db)]=Game_Event[_0x255dc2(0x301)]['setupPageSettings'],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x323)]=function(){const _0x1bd699=_0x255dc2;this[_0x1bd699(0x3db)]=!![],VisuMZ['EventsMoveCore']['Game_Event_setupPageSettings'][_0x1bd699(0x4a2)](this),this['setupEventsMoveCoreEffects'](),this[_0x1bd699(0x3db)]=![];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x608)]=function(){const _0x155f67=_0x255dc2;if(!this['event']())return;this[_0x155f67(0x361)](),this['setupEventsMoveCoreNotetags'](),this['setupEventsMoveCoreCommentTags'](),this[_0x155f67(0x587)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x38f)]=function(){const _0x34d0a5=_0x255dc2,_0x2443f0=this[_0x34d0a5(0x1bb)]()[_0x34d0a5(0x50d)];if(_0x2443f0==='')return;this[_0x34d0a5(0x4e5)](_0x2443f0);},Game_Event['prototype']['setupEventsMoveCoreCommentTags']=function(){const _0x4a6e81=_0x255dc2;if(!this[_0x4a6e81(0x5a6)]())return;const _0xfd8ef1=this[_0x4a6e81(0x593)]();let _0xd42b58='';for(const _0x3f351a of _0xfd8ef1){if(_0x4a6e81(0x2da)===_0x4a6e81(0x2da)){if([0x6c,0x198]['includes'](_0x3f351a[_0x4a6e81(0x2fe)])){if(_0xd42b58!=='')_0xd42b58+='\x0a';_0xd42b58+=_0x3f351a[_0x4a6e81(0x297)][0x0];}}else return this[_0x4a6e81(0x41f)];}this['checkEventsMoveCoreStringTags'](_0xd42b58);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x361)]=function(){const _0x4e8834=_0x255dc2,_0x12f735=VisuMZ['EventsMoveCore'][_0x4e8834(0x61c)];this['_activationProximity']={'type':_0x4e8834(0x582),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this['_clickTrigger']=![],this[_0x4e8834(0x43f)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem[_0x4e8834(0x631)](this),this[_0x4e8834(0x195)]={'text':'','visibleRange':_0x12f735['Label'][_0x4e8834(0x34f)],'offsetX':_0x12f735[_0x4e8834(0x45b)]['OffsetX'],'offsetY':_0x12f735[_0x4e8834(0x45b)][_0x4e8834(0x378)]},this[_0x4e8834(0x415)]=[],this['_moveSynch']={'target':-0x1,'type':_0x4e8834(0x41d),'delay':0x1},this[_0x4e8834(0x2f3)]=_0x12f735[_0x4e8834(0x3c5)]['RandomMoveWeight']??0x0,this['_saveEventLocation']=![],this[_0x4e8834(0x447)]={'visible':!![],'filename':_0x12f735[_0x4e8834(0x3c5)][_0x4e8834(0x374)]},this[_0x4e8834(0x60b)](),this[_0x4e8834(0x227)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4e5)]=function(_0x348cf3){const _0x4d333a=_0x255dc2;if(_0x348cf3[_0x4d333a(0x5ba)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4d333a(0x5d1)!==_0x4d333a(0x5d1))return _0x4284fb[_0x4d333a(0x301)]['getEventIconData'][_0x4d333a(0x4a2)](this);else this['_activationProximity'][_0x4d333a(0x55b)]=JSON['parse']('['+RegExp['$1'][_0x4d333a(0x5ba)](/\d+/g)+']'),this[_0x4d333a(0x4c0)][_0x4d333a(0x4a4)]=_0x4d333a(0x3e9);}else _0x348cf3['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x4d333a(0x458)](),this[_0x4d333a(0x4c0)][_0x4d333a(0x4a4)]=type,this[_0x4d333a(0x4c0)][_0x4d333a(0x3c3)]=Number(RegExp['$2']));_0x348cf3[_0x4d333a(0x5ba)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this['_alwaysUpdateMove']=!![]);_0x348cf3[_0x4d333a(0x5ba)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x13e798=_0x348cf3[_0x4d333a(0x5ba)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x13e798){if(_0x4d333a(0x595)!=='wCRgE')for(const _0x49c6e9 of _0x13e798){if(_0x49c6e9[_0x4d333a(0x5ba)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x198ab0=String(RegExp['$1'])['toLowerCase']()[_0x4d333a(0x458)](),_0x202712=Number(RegExp['$2']);this[_0x4d333a(0x43f)][_0x198ab0]=_0x202712;}}else{const _0xf529d1=_0x14709e[_0x4ff444[_0x4d333a(0x24b)](_0x1ee9d9[_0x4d333a(0x42c)])];return _0x195201['x']=_0xf529d1[0x0],_0x296e7b['y']=_0xf529d1[0x1],this['createSpawnedEventWithData'](_0x406099),!![];}}_0x348cf3['match'](/<ICON:[ ](\d+)>/i)&&(_0x4d333a(0x62c)===_0x4d333a(0x33b)?_0x11f73f==='left'?this[_0x4d333a(0x377)]():this[_0x4d333a(0x410)]():this[_0x4d333a(0x59e)]['iconIndex']=Number(RegExp['$1']));_0x348cf3[_0x4d333a(0x5ba)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferX']=Number(RegExp['$1']));_0x348cf3['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x4d333a(0x59e)][_0x4d333a(0x5ad)]=Number(RegExp['$1']));_0x348cf3[_0x4d333a(0x5ba)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x4d333a(0x59e)][_0x4d333a(0x17f)]=Number(RegExp['$1']),this[_0x4d333a(0x59e)][_0x4d333a(0x5ad)]=Number(RegExp['$2']));if(_0x348cf3[_0x4d333a(0x5ba)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x515855=String(RegExp['$1'])[_0x4d333a(0x242)]()[_0x4d333a(0x458)](),_0x3503c4=[_0x4d333a(0x45a),_0x4d333a(0x368),_0x4d333a(0x1b2),'SCREEN'];this[_0x4d333a(0x59e)]['blendMode']=_0x3503c4[_0x4d333a(0x2f9)](_0x515855)['clamp'](0x0,0x3);}_0x348cf3['match'](/<LABEL:[ ](.*?)>/i)&&(this[_0x4d333a(0x195)][_0x4d333a(0x1c9)]=String(RegExp['$1'])[_0x4d333a(0x458)]());_0x348cf3[_0x4d333a(0x5ba)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x4d333a(0x195)][_0x4d333a(0x1c9)]=String(RegExp['$1'])[_0x4d333a(0x458)]());_0x348cf3[_0x4d333a(0x5ba)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x4d333a(0x195)][_0x4d333a(0x332)]=Number(RegExp['$1']));_0x348cf3[_0x4d333a(0x5ba)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x4d333a(0x195)][_0x4d333a(0x555)]=Number(RegExp['$1']));_0x348cf3[_0x4d333a(0x5ba)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x4d333a(0x2fd)===_0x4d333a(0x2fd)?(this['_labelWindow']['offsetX']=Number(RegExp['$1']),this[_0x4d333a(0x195)]['offsetY']=Number(RegExp['$2'])):this[_0x4d333a(0x5e8)](_0x17325f[_0x4d333a(0x479)]));$gameTemp[_0x4d333a(0x5ca)](this);for(;;){if(this[_0x4d333a(0x195)]['text']['match'](/\\V\[(\d+)\]/gi))this[_0x4d333a(0x195)][_0x4d333a(0x1c9)]=this[_0x4d333a(0x195)][_0x4d333a(0x1c9)][_0x4d333a(0x1c0)](/\\V\[(\d+)\]/gi,(_0x143b53,_0x298b47)=>$gameVariables[_0x4d333a(0x2b3)](parseInt(_0x298b47)));else break;}$gameTemp[_0x4d333a(0x192)]();_0x348cf3[_0x4d333a(0x5ba)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x4d333a(0x195)][_0x4d333a(0x19f)]=Number(RegExp['$1']));if(_0x348cf3[_0x4d333a(0x5ba)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4d333a(0x21c)!==_0x4d333a(0x255)){const _0x2c3118=JSON['parse']('['+RegExp['$1'][_0x4d333a(0x5ba)](/\d+/g)+']');this[_0x4d333a(0x415)]=this[_0x4d333a(0x415)][_0x4d333a(0x271)](_0x2c3118),this['_moveOnlyRegions'][_0x4d333a(0x269)](0x0);}else{_0x3bb8d1[_0x4d333a(0x1ab)][_0x4d333a(0x31d)]['call'](this,_0x4ff754);if(this[_0x4d333a(0x3b0)]()){this[_0x4d333a(0x24f)](_0x54fe4f);if(_0x3c62b1[_0x4d333a(0x571)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x4d333a(0x3ef))this[_0x4d333a(0x2bc)](this['x'],this['y']);else(_0x3a97db[_0x4d333a(0x571)](0x1)||_0xf3fcac[_0x4d333a(0x571)](0x2))&&this[_0x4d333a(0x194)]();}}}if(_0x348cf3['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x5741b9=String(RegExp['$1']);if(_0x5741b9[_0x4d333a(0x5ba)](/PLAYER/i))this['_moveSynch']['target']=0x0;else _0x5741b9[_0x4d333a(0x5ba)](/EVENT[ ](\d+)/i)&&(this['_moveSynch']['target']=Number(RegExp['$1']));}_0x348cf3[_0x4d333a(0x5ba)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x4d333a(0x4de)]['type']=String(RegExp['$1'])[_0x4d333a(0x47a)]()[_0x4d333a(0x458)]());_0x348cf3['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x4d333a(0x23c)!==_0x4d333a(0x23c)?(_0x171751[_0x4d333a(0x1ab)][_0x4d333a(0x32a)][_0x4d333a(0x4a2)](this,_0x51ad69,_0xfcde8),_0x29ae5d[_0x4d333a(0x1ab)][_0x4d333a(0x61c)][_0x4d333a(0x574)][_0x4d333a(0x508)]&&this['_target'][_0x4d333a(0x3de)][_0x4d333a(0x22b)](_0x1c6df2,this['_duration'])):this[_0x4d333a(0x4de)][_0x4d333a(0x5c8)]=Number(RegExp['$1']));if(_0x348cf3['match'](/<TRUE RANDOM MOVE>/i)){if(_0x4d333a(0x308)!==_0x4d333a(0x1bd))this[_0x4d333a(0x2f3)]=0x0;else return _0x58a2a9>0x0?0x4:0x6;}else{if(_0x348cf3[_0x4d333a(0x5ba)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if('MUtDe'!=='Zzzyc')this[_0x4d333a(0x2f3)]=Number(RegExp['$1'])||0x0;else{_0x1ab1ed['ConvertParams'](_0x10385f,_0xd0f795);const _0x32076f=_0x5ef543[_0x4d333a(0x402)](),_0x562dab=_0x3060b2['MapId']||_0x4568cf[_0x4d333a(0x5ec)](),_0x1e2009=_0x41cf6f[_0x4d333a(0x32d)]||_0x32076f[_0x4d333a(0x1d4)]();_0x24ca8b[_0x4d333a(0x292)](_0x562dab,_0x1e2009);}}}_0x348cf3[_0x4d333a(0x5ba)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(_0x4d333a(0x3cc)===_0x4d333a(0x3cc)?this[_0x4d333a(0x41b)]=!![]:this[_0x4d333a(0x48b)][_0x4d333a(0x315)](_0x97750c['_shadowSprite']));_0x348cf3[_0x4d333a(0x5ba)](/<HIDE SHADOW>/i)&&(this[_0x4d333a(0x447)][_0x4d333a(0x441)]=![]);_0x348cf3[_0x4d333a(0x5ba)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x4d333a(0x447)][_0x4d333a(0x4d7)]=String(RegExp['$1']));_0x348cf3[_0x4d333a(0x5ba)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x4d333a(0x4d1)]=Number(RegExp['$1']));if(_0x348cf3['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if('KTCsp'!=='NOUfY')this[_0x4d333a(0x1eb)]=Number(RegExp['$1']);else return this[_0x4d333a(0x395)]()&&!!this['_pose'];}_0x348cf3[_0x4d333a(0x5ba)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x4d333a(0x3f4)===_0x4d333a(0x5d7)?this[_0x4d333a(0x46b)]():(this[_0x4d333a(0x4d1)]=Number(RegExp['$1']),this[_0x4d333a(0x1eb)]=Number(RegExp['$2']))),_0x348cf3[_0x4d333a(0x5ba)](/<STEP PATTERN:[ ](.*)>/i)&&(_0x4d333a(0x279)!==_0x4d333a(0x326)?this[_0x4d333a(0x1a9)]=String(RegExp['$1'])['toUpperCase']()[_0x4d333a(0x458)]():_0x335567[_0x4d333a(0x4aa)]()?this[_0x4d333a(0x63c)](_0x340577):_0x3f4225[_0x4d333a(0x1ab)]['Game_Player_executeMove'][_0x4d333a(0x4a2)](this,_0x2c5d7f));},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x587)]=function(){this['updateShadowChanges']();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x3af)]=function(){const _0x668a15=_0x255dc2;if(this[_0x668a15(0x463)])return!![];return Game_Character['prototype'][_0x668a15(0x3af)][_0x668a15(0x4a2)](this);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x41e)]=Game_Event[_0x255dc2(0x301)]['updateSelfMovement'],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x495)]=function(){const _0x1639f7=_0x255dc2;if(this[_0x1639f7(0x2fc)]())return;VisuMZ[_0x1639f7(0x1ab)][_0x1639f7(0x41e)][_0x1639f7(0x4a2)](this),this[_0x1639f7(0x474)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x1639f7(0x479)]);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x2fc)]=function(){const _0xf64bd1=_0x255dc2,_0x5727fe=VisuMZ[_0xf64bd1(0x1ab)][_0xf64bd1(0x61c)][_0xf64bd1(0x3c5)];if($gameMap[_0xf64bd1(0x5f5)]()&&_0x5727fe[_0xf64bd1(0x5b4)])return!![];if($gameMessage[_0xf64bd1(0x418)]()&&_0x5727fe['StopAutoMoveMessages'])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0xf64bd1(0x4c3)]()>=0x0)return!![];return![];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x488)]=function(){const _0x1aea19=_0x255dc2,_0x258aa3=SceneManager[_0x1aea19(0x5f1)][_0x1aea19(0x1d1)];if(_0x258aa3){if('ccaJd'==='ccaJd'){const _0x31a8e8=_0x258aa3[_0x1aea19(0x39b)](this);_0x31a8e8&&_0x31a8e8[_0x1aea19(0x562)]&&_0x31a8e8[_0x1aea19(0x562)][_0x1aea19(0x2ed)]!==this['shadowFilename']()&&(_0x31a8e8[_0x1aea19(0x562)]['_filename']=this[_0x1aea19(0x2d8)](),_0x31a8e8[_0x1aea19(0x562)][_0x1aea19(0x3b8)]=ImageManager['loadSystem'](_0x31a8e8['_shadowSprite'][_0x1aea19(0x2ed)]));}else this['turnLeft90']();}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x2d8)]=function(){const _0x338849=_0x255dc2;return this[_0x338849(0x447)][_0x338849(0x4d7)];},Game_Event[_0x255dc2(0x301)]['isShadowVisible']=function(){const _0x2b4859=_0x255dc2;if(!this[_0x2b4859(0x447)]['visible'])return![];return Game_CharacterBase[_0x2b4859(0x301)]['isShadowVisible']['call'](this);},Game_Event['prototype'][_0x255dc2(0x275)]=function(){const _0x133b50=_0x255dc2;return this['_labelWindow'][_0x133b50(0x1c9)];},Game_Event[_0x255dc2(0x301)]['labelWindowRange']=function(){const _0x12b4a0=_0x255dc2;return this['_labelWindow'][_0x12b4a0(0x19f)];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x202)]=function(_0x33e688,_0x5938be,_0x267097){const _0x3e6ae8=_0x255dc2;if(this['hasMoveOnlyRegions']())return this[_0x3e6ae8(0x44b)](_0x33e688,_0x5938be,_0x267097);if($gameMap[_0x3e6ae8(0x56e)](_0x33e688,_0x5938be,_0x267097,_0x3e6ae8(0x1bb)))return!![];if($gameMap[_0x3e6ae8(0x5b9)](_0x33e688,_0x5938be,_0x267097,'event'))return![];return Game_Character['prototype'][_0x3e6ae8(0x202)][_0x3e6ae8(0x4a2)](this,_0x33e688,_0x5938be,_0x267097);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x23d)]=function(){const _0x11bb8e=_0x255dc2;if(this[_0x11bb8e(0x415)]===undefined)this[_0x11bb8e(0x361)]();return this['_moveOnlyRegions']['length']>0x0;},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x44b)]=function(_0x2f2c7c,_0x5314d9,_0x47e1ce){const _0x5e3b78=_0x255dc2,_0x97f0b9=$gameMap[_0x5e3b78(0x56b)](_0x2f2c7c,_0x47e1ce),_0x53c91f=$gameMap[_0x5e3b78(0x193)](_0x5314d9,_0x47e1ce),_0x144b7d=$gameMap[_0x5e3b78(0x22e)](_0x97f0b9,_0x53c91f);return this[_0x5e3b78(0x415)][_0x5e3b78(0x571)](_0x144b7d);},VisuMZ[_0x255dc2(0x1ab)]['Game_Event_findProperPageIndex']=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x1e6)],Game_Event[_0x255dc2(0x301)]['findProperPageIndex']=function(){const _0x103a6e=_0x255dc2;return this[_0x103a6e(0x596)]=![],this[_0x103a6e(0x2c2)]=![],this[_0x103a6e(0x1bb)]()?VisuMZ['EventsMoveCore'][_0x103a6e(0x1c8)][_0x103a6e(0x4a2)](this):-0x1;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x265)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x205)],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x205)]=function(_0x2bff9b){const _0x46ce9b=_0x255dc2;this['checkAdvancedSwitchVariablePresent'](_0x2bff9b),$gameTemp[_0x46ce9b(0x5ca)](this);const _0x4c3094=VisuMZ[_0x46ce9b(0x1ab)][_0x46ce9b(0x265)][_0x46ce9b(0x4a2)](this,_0x2bff9b);return $gameTemp[_0x46ce9b(0x192)](),_0x4c3094;},Game_Event['prototype'][_0x255dc2(0x1c2)]=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x2c8)]=function(_0x5b8ca9){const _0xb62de4=_0x255dc2,_0x40409e=_0x5b8ca9['conditions'];if(_0x40409e[_0xb62de4(0x494)]&&DataManager[_0xb62de4(0x465)](_0x40409e['switch1Id']))this[_0xb62de4(0x596)]=!![];else{if(_0x40409e[_0xb62de4(0x35a)]&&DataManager[_0xb62de4(0x465)](_0x40409e[_0xb62de4(0x628)]))_0xb62de4(0x5eb)===_0xb62de4(0x448)?_0x1a147f=_0x3c1a6e[_0xb62de4(0x5c4)]:this[_0xb62de4(0x596)]=!![];else _0x40409e[_0xb62de4(0x579)]&&DataManager['isAdvancedVariable'](_0x40409e['variableId'])&&(this[_0xb62de4(0x596)]=!![]);}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x18e)]=function(){const _0x2212bd=_0x255dc2;if(this[_0x2212bd(0x541)])return![];return this['_clickTrigger'];},Game_Event[_0x255dc2(0x301)]['onClickTrigger']=function(){const _0x26a782=_0x255dc2;$gameTemp['clearDestination'](),this[_0x26a782(0x257)]();},Game_Event['prototype'][_0x255dc2(0x5fc)]=function(_0x3f54a3,_0x437ed4){const _0x4af58a=_0x255dc2;if(this[_0x4af58a(0x43f)])return this[_0x4af58a(0x4c7)](_0x3f54a3,_0x437ed4);else{if('yCVtZ'!==_0x4af58a(0x369)){let _0x3f9661=_0x4af58a(0x53f)[_0x4af58a(0x3eb)](_0x30db74['mapId']);_0x3f9661+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x3f9661+=_0x4af58a(0x3cd),_0x3f9661+=_0x4af58a(0x314),_0x3f9661+=_0x4af58a(0x640)[_0x4af58a(0x3eb)](_0xdfa62d[_0x4af58a(0x5ec)]),_0x1955fd(_0x3f9661);return;}else return Game_Character[_0x4af58a(0x301)]['pos'][_0x4af58a(0x4a2)](this,_0x3f54a3,_0x437ed4);}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4c7)]=function(_0x5a7d32,_0x5a77bb){const _0x4cf8bd=_0x255dc2;var _0x501bd0=this['x']-this[_0x4cf8bd(0x43f)][_0x4cf8bd(0x3a5)],_0x586212=this['x']+this[_0x4cf8bd(0x43f)][_0x4cf8bd(0x5e6)],_0x3526f7=this['y']-this[_0x4cf8bd(0x43f)]['up'],_0x89acdd=this['y']+this[_0x4cf8bd(0x43f)][_0x4cf8bd(0x25e)];return _0x501bd0<=_0x5a7d32&&_0x5a7d32<=_0x586212&&_0x3526f7<=_0x5a77bb&&_0x5a77bb<=_0x89acdd;},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x224)]=function(_0x585a6c,_0x37096a,_0x25af2d){const _0x36d339=_0x255dc2;for(let _0x550edf=-this[_0x36d339(0x43f)][_0x36d339(0x3a5)];_0x550edf<=this['_addedHitbox']['right'];_0x550edf++){for(let _0x2b0382=-this[_0x36d339(0x43f)]['up'];_0x2b0382<=this[_0x36d339(0x43f)][_0x36d339(0x25e)];_0x2b0382++){if(!Game_Character['prototype'][_0x36d339(0x224)][_0x36d339(0x4a2)](this,_0x585a6c+_0x550edf,_0x37096a+_0x2b0382,_0x25af2d)){if('hkLmV'!==_0x36d339(0x57d))return![];else{const _0x44c52f=this[_0x36d339(0x631)]();if(!_0x44c52f)return![];return _0x44c52f[_0x36d339(0x27b)]>0x0;}}}}return!![];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4ce)]=function(_0x9948cf,_0x450936){const _0x4bf998=_0x255dc2;if(Imported[_0x4bf998(0x573)]&&this[_0x4bf998(0x398)]())return this[_0x4bf998(0x4a9)](_0x9948cf,_0x450936);else{const _0x1180c2=$gameMap[_0x4bf998(0x3ba)](_0x9948cf,_0x450936)[_0x4bf998(0x438)](_0x5a01d3=>_0x5a01d3!==this);return _0x1180c2[_0x4bf998(0x42c)]>0x0;}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4a9)]=function(_0x20cd30,_0x13b666){const _0x48fd97=_0x255dc2;if(!this['isNormalPriority']())return![];else{const _0x10fc26=$gameMap['eventsXyNt'](_0x20cd30,_0x13b666)[_0x48fd97(0x438)](_0x34d62c=>_0x34d62c!==this&&_0x34d62c[_0x48fd97(0x18b)]());return _0x10fc26[_0x48fd97(0x42c)]>0x0;}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x23e)]=function(){const _0x22e6ef=_0x255dc2;return this['_activationProximity'][_0x22e6ef(0x4a4)]||_0x22e6ef(0x582);},Game_Event['prototype'][_0x255dc2(0x622)]=function(){const _0x1406ae=_0x255dc2;return this['_activationProximity'][_0x1406ae(0x3c3)]||0x0;},Game_Event['prototype'][_0x255dc2(0x43d)]=function(){const _0x40408f=_0x255dc2;return this[_0x40408f(0x4c0)][_0x40408f(0x55b)]||[];},Game_Event['prototype']['increaseSteps']=function(){const _0x1aa882=_0x255dc2;Game_Character['prototype']['increaseSteps'][_0x1aa882(0x4a2)](this);if([_0x1aa882(0x582),_0x1aa882(0x3e9)]['includes'](this[_0x1aa882(0x23e)]()))return;$gamePlayer[_0x1aa882(0x24f)]([0x2]);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3e0)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x388)],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x388)]=function(){const _0x3cd126=_0x255dc2;if(this[_0x3cd126(0x215)]!==0x3)return;if(this[_0x3cd126(0x3db)])return;if(!this[_0x3cd126(0x4b2)](![]))return;if(!this[_0x3cd126(0x4a7)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x3cd126(0x4a2)](this);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x294)]=Game_Event[_0x255dc2(0x301)]['updateParallel'],Game_Event['prototype'][_0x255dc2(0x212)]=function(){const _0x3ef1a4=_0x255dc2;if(!this['_interpreter'])return;if(!this[_0x3ef1a4(0x4b2)](!![]))return;if(!this[_0x3ef1a4(0x4a7)](!![]))return;VisuMZ['EventsMoveCore'][_0x3ef1a4(0x294)][_0x3ef1a4(0x4a2)](this);},Game_Event['prototype'][_0x255dc2(0x4b2)]=function(_0x5d0829){const _0x4a97b6=_0x255dc2;if(!_0x5d0829&&$gameMap[_0x4a97b6(0x5f5)]())return![];if(!_0x5d0829&&$gameMap[_0x4a97b6(0x52a)]())return![];if(this[_0x4a97b6(0x43d)]()<=0x0)return!![];return $gamePlayer[_0x4a97b6(0x26c)](this);},Game_Event['prototype'][_0x255dc2(0x4a7)]=function(_0x2ae261){const _0x31776f=_0x255dc2;if(!_0x2ae261&&$gameMap[_0x31776f(0x5f5)]())return![];if(!_0x2ae261&&$gameMap[_0x31776f(0x52a)]())return![];if([_0x31776f(0x582),'region']['includes'](this[_0x31776f(0x23e)]()))return!![];return $gamePlayer[_0x31776f(0x62b)](this);},VisuMZ[_0x255dc2(0x2a5)]=function(_0x4b60e1){const _0x40a473=_0x255dc2;for(const _0xcacc6c of $gameMap['events']()){if(!_0xcacc6c)continue;_0xcacc6c[_0x40a473(0x4c3)]()===_0x4b60e1&&_0xcacc6c[_0x40a473(0x4ae)]();}},VisuMZ[_0x255dc2(0x422)]=function(_0x58fee0){const _0x359bd9=_0x255dc2;if(_0x58fee0===0x0)return $gamePlayer;return $gameMap[_0x359bd9(0x1bb)](_0x58fee0);},Game_Event[_0x255dc2(0x301)]['moveSynchTarget']=function(){const _0x24352f=_0x255dc2;return this['_moveSynch'][_0x24352f(0x1e0)];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4ad)]=function(){return this['_moveSynch']['type'];},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x3e5)]=function(){const _0x30dfb2=_0x255dc2;if(this[_0x30dfb2(0x4c3)]()>=0x0){const _0x33e50a=VisuMZ[_0x30dfb2(0x422)](this[_0x30dfb2(0x4c3)]());if(_0x33e50a)return _0x33e50a[_0x30dfb2(0x3e5)]();}return Game_Character[_0x30dfb2(0x301)][_0x30dfb2(0x3e5)][_0x30dfb2(0x4a2)](this);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x4ae)]=function(){const _0x4d2d95=_0x255dc2;this['_moveSynch'][_0x4d2d95(0x58c)]=this[_0x4d2d95(0x4de)][_0x4d2d95(0x58c)]||0x0,this[_0x4d2d95(0x4de)][_0x4d2d95(0x58c)]--;if(this[_0x4d2d95(0x4de)][_0x4d2d95(0x58c)]>0x0)return;this[_0x4d2d95(0x4de)]['timer']=this[_0x4d2d95(0x4de)][_0x4d2d95(0x5c8)],this[_0x4d2d95(0x26d)]();},Game_Event['prototype'][_0x255dc2(0x26d)]=function(){const _0x19ec15=_0x255dc2;switch(this[_0x19ec15(0x4ad)]()){case _0x19ec15(0x41d):this['processMoveSynchRandom']();break;case _0x19ec15(0x620):this[_0x19ec15(0x578)]();break;case _0x19ec15(0x1ce):this['processMoveSynchAway']();break;case'custom':this[_0x19ec15(0x380)]();break;case _0x19ec15(0x228):case'copy':this[_0x19ec15(0x405)]();break;case _0x19ec15(0x3d7):case _0x19ec15(0x535):this['processMoveSynchReverseMimic']();break;case'mirror\x20horizontal':case _0x19ec15(0x1ee):case _0x19ec15(0x549):case'horz\x20mirror':this['processMoveSynchMirrorHorz']();break;case _0x19ec15(0x349):case _0x19ec15(0x17a):case _0x19ec15(0x5d6):case _0x19ec15(0x373):this[_0x19ec15(0x19e)]();break;default:this[_0x19ec15(0x346)]();break;}this[_0x19ec15(0x62d)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x346)]=function(){const _0x2104ac=_0x255dc2,_0x40aafa=[0x2,0x4,0x6,0x8];if($gameMap[_0x2104ac(0x4aa)]()){if(_0x2104ac(0x234)==='XvngT')_0x40aafa[_0x2104ac(0x2aa)](0x1,0x3,0x7,0x9);else{const _0x57dfda=[_0x2a9999,_0x170c20,_0x2104ac(0x58d)[_0x2104ac(0x3eb)](_0x14b725)];_0x153a18[_0x2104ac(0x491)](_0x57dfda,_0xa430d);}}const _0x5cb4e8=[];for(const _0x131e9e of _0x40aafa){if(_0x2104ac(0x455)!==_0x2104ac(0x5d9)){if(this['canPass'](this['x'],this['y'],_0x131e9e))_0x5cb4e8[_0x2104ac(0x2aa)](_0x131e9e);}else _0x461820['EventsMoveCore'][_0x2104ac(0x181)]['call'](this),_0x5ed5e4[_0x2104ac(0x2d1)]&&_0x4a0717[_0x2104ac(0x345)](_0x21e3a6[_0x2104ac(0x20f)][_0x2104ac(0x61c)][_0x2104ac(0x4c5)][_0x2104ac(0x515)])&&_0x34bd40[_0x2104ac(0x3d3)]();}if(_0x5cb4e8[_0x2104ac(0x42c)]>0x0){const _0x4d8ac4=_0x5cb4e8[Math[_0x2104ac(0x24b)](_0x5cb4e8[_0x2104ac(0x42c)])];this[_0x2104ac(0x63c)](_0x4d8ac4);}},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x578)]=function(){const _0x42f625=_0x255dc2,_0x5ace0a=VisuMZ[_0x42f625(0x422)](this[_0x42f625(0x4c3)]());this[_0x42f625(0x22a)](_0x5ace0a);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x55f)]=function(){const _0x383a2c=_0x255dc2,_0x315b42=VisuMZ['GetMoveSynchTarget'](this[_0x383a2c(0x4c3)]());this['moveAwayFromCharacter'](_0x315b42);},Game_Event[_0x255dc2(0x301)]['processMoveSynchCustom']=function(){const _0x4ee5bd=_0x255dc2;this[_0x4ee5bd(0x37e)]();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x405)]=function(){const _0x2a30b4=_0x255dc2,_0x24ded1=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this['executeMoveDir8'](_0x24ded1[_0x2a30b4(0x616)]());},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x1f3)]=function(){const _0x173852=_0x255dc2,_0x41ec80=VisuMZ[_0x173852(0x422)](this[_0x173852(0x4c3)]()),_0x2b5185=this[_0x173852(0x401)](_0x41ec80['lastMovedDirection']());this[_0x173852(0x63c)](this[_0x173852(0x401)](_0x41ec80[_0x173852(0x5d3)]()));},Game_Event[_0x255dc2(0x301)]['processMoveSynchMirrorHorz']=function(){const _0x3b54b9=_0x255dc2,_0x5a3375=VisuMZ[_0x3b54b9(0x422)](this['moveSynchTarget']()),_0x2f991c=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x5a3375[_0x3b54b9(0x616)]()];this[_0x3b54b9(0x63c)](_0x2f991c);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x19e)]=function(){const _0x809f68=_0x255dc2,_0x4ed2a5=VisuMZ[_0x809f68(0x422)](this[_0x809f68(0x4c3)]()),_0x3f7c7e=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4ed2a5[_0x809f68(0x616)]()];this[_0x809f68(0x63c)](_0x3f7c7e);},Game_Event[_0x255dc2(0x301)]['restoreSavedEventPosition']=function(){const _0x2fae9d=_0x255dc2,_0x3f3fd5=$gameSystem['getSavedEventLocation'](this);if(!_0x3f3fd5)return;this[_0x2fae9d(0x51e)](_0x3f3fd5['x'],_0x3f3fd5['y']),this[_0x2fae9d(0x450)](_0x3f3fd5[_0x2fae9d(0x5d3)]);if(this[_0x2fae9d(0x59c)]===_0x3f3fd5[_0x2fae9d(0x3b1)]){if(_0x2fae9d(0x514)===_0x2fae9d(0x42f)){const _0x488489=_0x34f9a8[_0x2fae9d(0x426)]()||this;if(_0x488489['constructor']!==_0x5c3c40)return _0x700425[_0x2fae9d(0x1ab)]['Game_Variables_value']['call'](this,_0xcaa58b);else{const _0x3330e1=[_0x488489[_0x2fae9d(0x3c4)],_0x488489[_0x2fae9d(0x479)],'Self\x20Variable\x20%1'['format'](_0x200738)];return _0x35ab7d['value'](_0x3330e1);}}else this[_0x2fae9d(0x484)]=_0x3f3fd5[_0x2fae9d(0x282)];}},Game_Event['prototype'][_0x255dc2(0x4af)]=function(){const _0xaccf4e=_0x255dc2;Game_Character[_0xaccf4e(0x301)][_0xaccf4e(0x4af)]['call'](this),this['autosaveEventLocation']();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x1a1)]=function(){const _0x14ad6e=_0x255dc2;if($gameMap[_0x14ad6e(0x362)]())return!![];return this[_0x14ad6e(0x41b)];},Game_Event['prototype'][_0x255dc2(0x52e)]=function(){if(!this['isSaveEventLocation']())return;this['saveEventLocation']();},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x425)]=function(){$gameSystem['saveEventLocation'](this);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x2df)]=function(){const _0x448305=_0x255dc2;$gameSystem[_0x448305(0x594)](this);},Game_Event['prototype'][_0x255dc2(0x631)]=function(){const _0x5b0721=_0x255dc2;if($gameSystem[_0x5b0721(0x631)](this))return'NTaJA'===_0x5b0721(0x213)?this[_0x5b0721(0x5cb)](_0x2b4330(_0x5980bc['$1']),_0x660a38(_0xc5cba8['$2'])):Game_Character[_0x5b0721(0x301)][_0x5b0721(0x631)][_0x5b0721(0x4a2)](this);else{if(_0x5b0721(0x4b6)===_0x5b0721(0x318))_0x14f3c6=[-_0x89d2e2['TiltVert'],0x0,_0x5d3348[_0x5b0721(0x437)]][this[_0x5b0721(0x3de)][_0x5b0721(0x1b5)]()];else return{'iconIndex':0x0,'bufferX':settings[_0x5b0721(0x2be)][_0x5b0721(0x3c2)],'bufferY':settings[_0x5b0721(0x2be)][_0x5b0721(0x522)],'blendMode':settings[_0x5b0721(0x2be)]['BlendMode']};}},Game_Event['prototype'][_0x255dc2(0x387)]=function(){return this['_CPCs'];},VisuMZ['EventsMoveCore']['Game_Event_meetsConditionsCPC']=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x205)],Game_Event['prototype']['meetsConditions']=function(_0x4adba8){const _0x395a10=_0x255dc2,_0x46c73f=VisuMZ[_0x395a10(0x1ab)]['Game_Event_meetsConditionsCPC'][_0x395a10(0x4a2)](this,_0x4adba8);if(!_0x46c73f)return![];return this[_0x395a10(0x557)](_0x4adba8);},Game_Event[_0x255dc2(0x301)][_0x255dc2(0x557)]=function(_0x317f07){const _0x4134ea=_0x255dc2;VisuMZ[_0x4134ea(0x1ab)][_0x4134ea(0x1e9)][_0x4134ea(0x284)](_0x317f07),this[_0x4134ea(0x2c2)]=_0x317f07[_0x4134ea(0x59d)][_0x4134ea(0x42c)]>0x0;_0x317f07[_0x4134ea(0x59d)]===undefined&&VisuMZ[_0x4134ea(0x1ab)][_0x4134ea(0x1e9)][_0x4134ea(0x284)](_0x317f07);if(_0x317f07['CPC']['length']>0x0)return $gameMap['event'](this['_eventId'])&&VisuMZ[_0x4134ea(0x1ab)]['CustomPageConditions']['metCPC'](_0x317f07['CPC'],this['_eventId']);return!![];},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditionsCPC']=Game_Troop[_0x255dc2(0x301)]['meetsConditions'],Game_Troop['prototype'][_0x255dc2(0x205)]=function(_0x327376){const _0x3da84d=_0x255dc2;var _0x55a726=VisuMZ[_0x3da84d(0x1ab)][_0x3da84d(0x209)]['call'](this,_0x327376);return _0x55a726&&this[_0x3da84d(0x19a)](_0x327376);},Game_Troop[_0x255dc2(0x301)][_0x255dc2(0x19a)]=function(_0x275364){const _0x9defeb=_0x255dc2;_0x275364[_0x9defeb(0x59d)]===undefined&&VisuMZ[_0x9defeb(0x1ab)][_0x9defeb(0x1e9)][_0x9defeb(0x284)](_0x275364);if(_0x275364[_0x9defeb(0x59d)]['length']>0x0){if(_0x9defeb(0x273)!==_0x9defeb(0x2ae))return VisuMZ[_0x9defeb(0x1ab)]['CustomPageConditions'][_0x9defeb(0x439)](_0x275364['CPC'],0x0);else{if(this['_SavedEventLocations']===_0x2b4705)this['initEventsMoveCore']();const _0x2b588c='Map%1-Event%2'[_0x9defeb(0x3eb)](_0x2f391d,_0x7c16a3);delete this['_SavedEventLocations'][_0x2b588c];}}return!![];},VisuMZ[_0x255dc2(0x1ab)]['Game_Event_locate']=Game_Event[_0x255dc2(0x301)]['locate'],Game_Event[_0x255dc2(0x301)][_0x255dc2(0x51e)]=function(_0x49f09d,_0x4e74f){const _0x3e61e6=_0x255dc2;VisuMZ[_0x3e61e6(0x1ab)][_0x3e61e6(0x44a)][_0x3e61e6(0x4a2)](this,_0x49f09d,_0x4e74f),this[_0x3e61e6(0x2ce)]=_0x49f09d,this['_randomHomeY']=_0x4e74f;},VisuMZ['EventsMoveCore'][_0x255dc2(0x29b)]=Game_Event[_0x255dc2(0x301)][_0x255dc2(0x19c)],Game_Event[_0x255dc2(0x301)]['moveTypeRandom']=function(){const _0x3a9e71=_0x255dc2,_0x387f8a=$gameMap[_0x3a9e71(0x3c3)](this['x'],this['y'],this['_randomHomeX'],this['_randomHomeY']),_0x132a85=_0x387f8a*(this['_randomMoveWeight']||0x0);Math[_0x3a9e71(0x41d)]()>=_0x132a85?VisuMZ[_0x3a9e71(0x1ab)][_0x3a9e71(0x29b)][_0x3a9e71(0x4a2)](this):this[_0x3a9e71(0x344)]();},Game_Event['prototype'][_0x255dc2(0x344)]=function(){const _0x4ed47c=_0x255dc2,_0x30a647=this[_0x4ed47c(0x56c)](this[_0x4ed47c(0x2ce)]),_0xc776a7=this[_0x4ed47c(0x517)](this[_0x4ed47c(0x63a)]);if(Math[_0x4ed47c(0x37d)](_0x30a647)>Math['abs'](_0xc776a7))this[_0x4ed47c(0x471)](_0x30a647>0x0?0x4:0x6),!this[_0x4ed47c(0x251)]()&&_0xc776a7!==0x0&&this[_0x4ed47c(0x471)](_0xc776a7>0x0?0x8:0x2);else{if(_0xc776a7!==0x0){if(_0x4ed47c(0x25b)!==_0x4ed47c(0x25b))return this[_0x4ed47c(0x436)]()[_0x4ed47c(0x35e)]()[_0x4ed47c(0x5ba)](/\[VS8\]/i);else this['moveStraight'](_0xc776a7>0x0?0x8:0x2),!this[_0x4ed47c(0x251)]()&&_0x30a647!==0x0&&this[_0x4ed47c(0x471)](_0x30a647>0x0?0x4:0x6);}}},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x4fc)]=Game_Interpreter['prototype'][_0x255dc2(0x62a)],Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x62a)]=function(){const _0x15e4f5=_0x255dc2;if(this['_waitMode']===_0x15e4f5(0x5ae)){if(window[this[_0x15e4f5(0x21d)]]){if(_0x15e4f5(0x1f7)===_0x15e4f5(0x34a)){if(_0x45cf63[_0x15e4f5(0x5f5)]())return;if(_0x3dcb49[_0x15e4f5(0x52a)]())return;let _0xb71d4d=_0x53431c[_0x15e4f5(0x1ab)][_0x15e4f5(0x61c)][_0x15e4f5(0x313)];const _0x5361ff=_0x15e4f5(0x1ec)[_0x15e4f5(0x3eb)](this[_0x15e4f5(0x22e)]());_0xb71d4d[_0x5361ff]&&_0x2ee668['reserveCommonEvent'](_0xb71d4d[_0x5361ff]);}else this[_0x15e4f5(0x17e)]='',this[_0x15e4f5(0x50c)]();}else return!![];}else return VisuMZ['EventsMoveCore'][_0x15e4f5(0x4fc)]['call'](this);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x487)]=Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x33c)],Game_Interpreter['prototype']['executeCommand']=function(){const _0x29d55d=_0x255dc2,_0x35f27b=$gameMap&&this[_0x29d55d(0x479)]?$gameMap[_0x29d55d(0x1bb)](this[_0x29d55d(0x479)]):null;$gameTemp[_0x29d55d(0x5ca)](_0x35f27b);const _0x329064=VisuMZ[_0x29d55d(0x1ab)]['Game_Interpreter_executeCommand'][_0x29d55d(0x4a2)](this);return $gameTemp[_0x29d55d(0x192)](),_0x329064;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x619)]=Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x3b4)],Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x3b4)]=function(_0x2e8f32){const _0x36db00=_0x255dc2;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x36db00(0x1ab)][_0x36db00(0x619)][_0x36db00(0x4a2)](this,_0x2e8f32);},Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x461)]=function(_0x2311ec){const _0x64fc3d=_0x255dc2;this[_0x64fc3d(0x339)]=_0x2311ec;const _0x5a012e='Map%1.json'[_0x64fc3d(0x3eb)](_0x2311ec[_0x64fc3d(0x5ec)][_0x64fc3d(0x4ab)](0x3));this['_callEventMap']=_0x64fc3d(0x624)+Graphics['frameCount']+'_'+this[_0x64fc3d(0x1d4)](),DataManager['loadDataFile'](this[_0x64fc3d(0x21d)],_0x5a012e);if(window[this[_0x64fc3d(0x21d)]])this['startCallEvent']();else{if('OfGgN'==='EKcmG')return this['processMoveRouteSetIndex'](_0x361838(_0x4a0521['$1']));else this[_0x64fc3d(0x1de)](_0x64fc3d(0x5ae));}},Game_Interpreter[_0x255dc2(0x301)][_0x255dc2(0x50c)]=function(){const _0x751ece=_0x255dc2,_0x101019=this['_callEventData'],_0x5e235e=window[this[_0x751ece(0x21d)]],_0x56cec7=_0x5e235e[_0x751ece(0x457)][_0x101019['eventId']];if(_0x56cec7&&_0x56cec7[_0x751ece(0x299)][_0x101019['pageId']-0x1]){if('esZPj'!==_0x751ece(0x4fa)){const _0x2ea772=_0x56cec7[_0x751ece(0x299)][_0x101019[_0x751ece(0x393)]-0x1][_0x751ece(0x593)];this[_0x751ece(0x1a4)](_0x2ea772,this[_0x751ece(0x1d4)]());}else{if(this[_0x751ece(0x501)]===_0xb3a203)this['initEventsMoveCore']();if(this[_0x751ece(0x501)][_0x751ece(0x5bf)]===_0x593a08)this[_0x751ece(0x460)]();this['_EventsMoveCoreSettings'][_0x751ece(0x5bf)]=_0x4b5194;}}window[this[_0x751ece(0x21d)]]=undefined,this[_0x751ece(0x21d)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x2b3826=_0x255dc2;this[_0x2b3826(0x407)]['apply'](this,arguments);}function _0x2099(_0x1f07d3,_0x4e7772){const _0x580045=_0x5800();return _0x2099=function(_0x209947,_0x1d84e7){_0x209947=_0x209947-0x178;let _0x3d0a9a=_0x580045[_0x209947];return _0x3d0a9a;},_0x2099(_0x1f07d3,_0x4e7772);};Game_CPCInterpreter[_0x255dc2(0x301)]=Object['create'](Game_Interpreter[_0x255dc2(0x301)]),Game_CPCInterpreter[_0x255dc2(0x301)][_0x255dc2(0x592)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x255dc2(0x3d3)]=function(){const _0x456ebd=_0x255dc2;Game_Interpreter[_0x456ebd(0x301)][_0x456ebd(0x3d3)]['call'](this),this[_0x456ebd(0x353)]=![];},Game_CPCInterpreter[_0x255dc2(0x301)]['execute']=function(){const _0x427422=_0x255dc2;while(this['isRunning']()){if(_0x427422(0x432)!==_0x427422(0x3e6))this['executeCommand']();else return 0x8;}},Game_CPCInterpreter[_0x255dc2(0x301)]['command108']=function(_0x21861d){const _0x5a95c6=_0x255dc2;Game_Interpreter[_0x5a95c6(0x301)]['command108'][_0x5a95c6(0x4a2)](this,_0x21861d);if(this[_0x5a95c6(0x57e)][_0x5a95c6(0x3ff)](_0x27c405=>_0x27c405['match'](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x5a95c6(0x57b)!==_0x5a95c6(0x5be))this[_0x5a95c6(0x353)]=!![];else{if(!_0x367ad8[_0x5a95c6(0x400)]())return;_0x31b3ab[_0x5a95c6(0x2dc)](_0x237ee1,_0x302b62);let _0x485b72=0x0;_0x485b72+=_0x4bd5f7[_0x5a95c6(0x475)],_0x485b72+=_0x5f59b2[_0x5a95c6(0x40c)]*0x3c,_0x485b72+=_0x396853[_0x5a95c6(0x600)]*0x3c*0x3c,_0x485b72+=_0x311241[_0x5a95c6(0x291)]*0x3c*0x3c*0x3c,_0x12cdd1[_0x5a95c6(0x355)](_0x485b72);}}return!![];},VisuMZ[_0x255dc2(0x1ab)]['Scene_Map_startEncounterEffect']=Scene_Map[_0x255dc2(0x301)]['startEncounterEffect'],Scene_Map[_0x255dc2(0x301)]['startEncounterEffect']=function(){const _0x1712cb=_0x255dc2;VisuMZ[_0x1712cb(0x1ab)][_0x1712cb(0x4db)]['call'](this),this[_0x1712cb(0x1d1)][_0x1712cb(0x499)]();},VisuMZ[_0x255dc2(0x1ab)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x255dc2(0x301)]['onLoadSuccess'],Scene_Load['prototype'][_0x255dc2(0x2db)]=function(){const _0x3a27d0=_0x255dc2;if($gameMap)$gameMap[_0x3a27d0(0x427)]();VisuMZ[_0x3a27d0(0x1ab)][_0x3a27d0(0x333)][_0x3a27d0(0x4a2)](this);},VisuMZ[_0x255dc2(0x1ab)]['Sprite_Character_initMembers']=Sprite_Character[_0x255dc2(0x301)]['initMembers'],Sprite_Character['prototype'][_0x255dc2(0x47f)]=function(){const _0x5c0883=_0x255dc2;VisuMZ[_0x5c0883(0x1ab)][_0x5c0883(0x543)][_0x5c0883(0x4a2)](this),this[_0x5c0883(0x329)](),this[_0x5c0883(0x45f)]();},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x329)]=function(){const _0x51ba9c=_0x255dc2;this[_0x51ba9c(0x5d2)]=0xff;},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x45f)]=function(){const _0xc811af=_0x255dc2;this[_0xc811af(0x5fe)]=new Sprite(),this[_0xc811af(0x5fe)]['bitmap']=ImageManager[_0xc811af(0x575)](_0xc811af(0x54c)),this[_0xc811af(0x5fe)]['bitmap']['smooth']=![],this[_0xc811af(0x5fe)][_0xc811af(0x216)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0xc811af(0x446)]['x']=0.5,this[_0xc811af(0x5fe)]['anchor']['y']=0x1,this[_0xc811af(0x3ea)](this[_0xc811af(0x5fe)]);},Sprite_Character[_0x255dc2(0x301)]['isSpriteVS8dir']=function(){const _0x39898e=_0x255dc2;return this[_0x39898e(0x367)]&&this[_0x39898e(0x367)]['match'](/\[VS8\]/i);},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x3d9)]=function(){const _0x4e2d5a=_0x255dc2;return this[_0x4e2d5a(0x395)]()&&VisuMZ['EventsMoveCore']['Settings']['VS8'][_0x4e2d5a(0x3aa)];},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2e5)]=Sprite_Character[_0x255dc2(0x301)]['update'],Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x62d)]=function(){const _0x468d9c=_0x255dc2;VisuMZ[_0x468d9c(0x1ab)]['Sprite_Character_update']['call'](this),VisuMZ[_0x468d9c(0x1ab)]['Settings'][_0x468d9c(0x3c5)]['EnableDashTilt']&&this[_0x468d9c(0x4fb)](),this['_shadowSprite']&&this[_0x468d9c(0x29f)](),this['_eventIconSprite']&&this[_0x468d9c(0x309)]();},VisuMZ['EventsMoveCore'][_0x255dc2(0x44d)]=Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x5c9)],Sprite_Character['prototype']['setTileBitmap']=function(){const _0x285608=_0x255dc2;VisuMZ[_0x285608(0x1ab)][_0x285608(0x44d)][_0x285608(0x4a2)](this),this[_0x285608(0x3b8)][_0x285608(0x366)](this['updateBitmapSmoothing'][_0x285608(0x2b5)](this));},VisuMZ[_0x255dc2(0x1ab)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x32c)],Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x32c)]=function(){const _0x2f931d=_0x255dc2;VisuMZ[_0x2f931d(0x1ab)][_0x2f931d(0x5ac)][_0x2f931d(0x4a2)](this),this['bitmap'][_0x2f931d(0x366)](this['updateBitmapSmoothing']['bind'](this));},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x49d)]=function(){const _0x4af131=_0x255dc2;if(!this[_0x4af131(0x3b8)])return;this['bitmap'][_0x4af131(0x546)]=!!VisuMZ[_0x4af131(0x1ab)][_0x4af131(0x61c)][_0x4af131(0x3c5)][_0x4af131(0x2ee)];},VisuMZ[_0x255dc2(0x1ab)]['Sprite_Character_characterPatternY']=Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x1b0)],Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x1b0)]=function(){const _0x5bddc7=_0x255dc2;if(this[_0x5bddc7(0x395)]())return this[_0x5bddc7(0x529)]();else{if(_0x5bddc7(0x360)==='SrmMv'){const _0x57a28e=this[_0x5bddc7(0x2de)](_0x1e1fbd);return this[_0x5bddc7(0x1fe)](_0x4bae76,_0x57a28e);}else return VisuMZ[_0x5bddc7(0x1ab)][_0x5bddc7(0x2b0)][_0x5bddc7(0x4a2)](this);}},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x529)]=function(){const _0x44c5bb=_0x255dc2,_0x276082=this[_0x44c5bb(0x3de)][_0x44c5bb(0x5d3)](),_0x45cd98=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x45cd98[_0x276082]-0x2)/0x2;},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x4fb)]=function(){const _0x542c50=_0x255dc2;this[_0x542c50(0x34d)]=0x0;if(this[_0x542c50(0x2ec)]()){const _0x26a54c=VisuMZ[_0x542c50(0x1ab)][_0x542c50(0x61c)][_0x542c50(0x3c5)],_0x3c8406=this[_0x542c50(0x3de)][_0x542c50(0x5d3)]();let _0x488859=0x0;if([0x1,0x4,0x7][_0x542c50(0x571)](_0x3c8406))_0x488859=_0x26a54c[_0x542c50(0x59a)];if([0x3,0x6,0x9]['includes'](_0x3c8406))_0x488859=_0x26a54c[_0x542c50(0x28b)];[0x2,0x8][_0x542c50(0x571)](_0x3c8406)&&(_0x542c50(0x2dd)===_0x542c50(0x23b)?this[_0x542c50(0x2cc)]=0x0:_0x488859=[-_0x26a54c['TiltVert'],0x0,_0x26a54c[_0x542c50(0x437)]][this[_0x542c50(0x3de)][_0x542c50(0x1b5)]()]);if(this[_0x542c50(0x4c8)])_0x488859*=-0x1;this[_0x542c50(0x34d)]=_0x488859;}},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x2ec)]=function(){const _0x219ea5=_0x255dc2;if(this['_dragonbones'])return![];return this[_0x219ea5(0x3de)][_0x219ea5(0x548)]()&&!this[_0x219ea5(0x3de)][_0x219ea5(0x3a6)]()&&!this[_0x219ea5(0x3de)]['isPosing']()&&this[_0x219ea5(0x3b3)]()===0x0;},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x29f)]=function(){const _0x588bc4=_0x255dc2;this[_0x588bc4(0x562)]['x']=this[_0x588bc4(0x3de)][_0x588bc4(0x4d0)](),this['_shadowSprite']['y']=this[_0x588bc4(0x3de)][_0x588bc4(0x48a)](),this[_0x588bc4(0x562)][_0x588bc4(0x26a)]=this[_0x588bc4(0x26a)],this[_0x588bc4(0x562)][_0x588bc4(0x441)]=this['_character'][_0x588bc4(0x5b5)](),this[_0x588bc4(0x562)]['_hidden']=this[_0x588bc4(0x221)];if(!this[_0x588bc4(0x3de)][_0x588bc4(0x2b6)]()){if(_0x588bc4(0x2c0)===_0x588bc4(0x2c0))this[_0x588bc4(0x562)]['scale']['x']=Math[_0x588bc4(0x516)](0x1,this[_0x588bc4(0x562)][_0x588bc4(0x4e2)]['x']+0.1),this[_0x588bc4(0x562)][_0x588bc4(0x4e2)]['y']=Math[_0x588bc4(0x516)](0x1,this['_shadowSprite'][_0x588bc4(0x4e2)]['y']+0.1);else{if(!_0x598945['advancedFunc'][_0x583bd0]){_0x5ba001[_0x588bc4(0x31a)][_0x2cd266]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x537924=_0x588bc4(0x2a7)[_0x588bc4(0x3eb)](_0x2de18c(_0x202507['$1']));_0x4cde44[_0x588bc4(0x433)][_0x4128c]=new _0x4c5229('variableId',_0x537924);}const _0x251555=_0x25461e[_0x588bc4(0x426)]()||this;return _0x248098['advancedFunc'][_0x3153d4][_0x588bc4(0x4a2)](_0x251555,_0x2679b6);}}else this[_0x588bc4(0x562)][_0x588bc4(0x4e2)]['x']=Math[_0x588bc4(0x335)](0x0,this[_0x588bc4(0x562)][_0x588bc4(0x4e2)]['x']-0.1),this[_0x588bc4(0x562)][_0x588bc4(0x4e2)]['y']=Math['max'](0x0,this[_0x588bc4(0x562)]['scale']['y']-0.1);},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x309)]=function(){const _0x4e9a97=_0x255dc2,_0x333209=this[_0x4e9a97(0x5fe)],_0x22d9f0=this[_0x4e9a97(0x3b3)]();if(_0x22d9f0<=0x0)return _0x333209[_0x4e9a97(0x216)](0x0,0x0,0x0,0x0);else{const _0x483852=ImageManager['iconWidth'],_0x535fc4=ImageManager['iconHeight'],_0x33522c=_0x22d9f0%0x10*_0x483852,_0x525ccc=Math['floor'](_0x22d9f0/0x10)*_0x535fc4;_0x333209[_0x4e9a97(0x216)](_0x33522c,_0x525ccc,_0x483852,_0x535fc4),this[_0x4e9a97(0x441)]=!![];}const _0x3e18b1=this['_character']['getEventIconData']();if(this[_0x4e9a97(0x3d9)]()){if(_0x4e9a97(0x57c)===_0x4e9a97(0x57c))this['autoEventIconBuffer'](_0x333209);else{const _0x42e470=/\$gameVariables\.value\((\d+)\)/gi,_0x392079=/\\V\[(\d+)\]/gi;while(_0x5da11a[_0x4e9a97(0x5ba)](_0x42e470)){_0x138853=_0x1ae5f2[_0x4e9a97(0x1c0)](_0x42e470,(_0x120393,_0x2b93d9)=>_0x1b338a[_0x4e9a97(0x2b3)](_0x151d71(_0x2b93d9)));}while(_0x18ab0e[_0x4e9a97(0x5ba)](_0x392079)){_0x1c4128=_0x5d716f[_0x4e9a97(0x1c0)](_0x392079,(_0x32412e,_0x55e4c7)=>_0x42bafc[_0x4e9a97(0x2b3)](_0x236594(_0x55e4c7)));}return _0x245a5b;}}else _0x333209['x']=_0x3e18b1?_0x3e18b1[_0x4e9a97(0x17f)]:0x0,_0x333209['y']=_0x3e18b1?-this[_0x4e9a97(0x1a0)]+_0x3e18b1[_0x4e9a97(0x5ad)]:0x0;_0x333209['blendMode']=_0x3e18b1?_0x3e18b1[_0x4e9a97(0x290)]:0x0,this[_0x4e9a97(0x315)](_0x333209),this[_0x4e9a97(0x3ea)](_0x333209),_0x333209['rotation']=-this[_0x4e9a97(0x34d)];},Sprite_Character['prototype'][_0x255dc2(0x5c7)]=function(_0x18e02c){const _0x85518a=_0x255dc2;_0x18e02c['x']=0x0,_0x18e02c['y']=-this[_0x85518a(0x1a0)]+this['height']*0x2/0x5,this[_0x85518a(0x3de)][_0x85518a(0x1b5)]()!==0x1&&(_0x18e02c['y']+=0x1);},Sprite_Character[_0x255dc2(0x301)][_0x255dc2(0x3b3)]=function(){const _0x12994b=_0x255dc2;if(!this[_0x12994b(0x3de)])return 0x0;if(this[_0x12994b(0x3de)]['_erased'])return 0x0;const _0x4ab94f=this['_character'][_0x12994b(0x631)]();return _0x4ab94f?_0x4ab94f[_0x12994b(0x27b)]||0x0:0x0;},VisuMZ['EventsMoveCore']['Sprite_Balloon_setup']=Sprite_Balloon[_0x255dc2(0x301)][_0x255dc2(0x289)],Sprite_Balloon[_0x255dc2(0x301)]['setup']=function(_0x568bae,_0x1932b1){const _0x282223=_0x255dc2;VisuMZ[_0x282223(0x1ab)][_0x282223(0x32a)]['call'](this,_0x568bae,_0x1932b1),VisuMZ['EventsMoveCore'][_0x282223(0x61c)][_0x282223(0x574)]['AutoBalloon']&&this['_target'][_0x282223(0x3de)][_0x282223(0x22b)](_0x1932b1,this[_0x282223(0x2ba)]);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x1bc)]=Sprite_Balloon[_0x255dc2(0x301)][_0x255dc2(0x4dc)],Sprite_Balloon[_0x255dc2(0x301)]['updatePosition']=function(){const _0x34b61b=_0x255dc2;VisuMZ[_0x34b61b(0x1ab)][_0x34b61b(0x1bc)][_0x34b61b(0x4a2)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x255dc2(0x301)]['updateVS8BalloonOffsets']=function(){const _0x1a67ca=_0x255dc2;if(this[_0x1a67ca(0x30d)][_0x1a67ca(0x3de)][_0x1a67ca(0x395)]()){if(_0x1a67ca(0x4be)==='rOYyI'){const _0x47fe38=_0x4f2850[_0x1a67ca(0x32f)](this);if(!_0x47fe38)return;const _0x116a70=_0x47fe38['template']['toUpperCase']()[_0x1a67ca(0x458)]();_0x116a70!=='UNTITLED'?this[_0x1a67ca(0x3f9)](_0x116a70,!![]):this[_0x1a67ca(0x44c)](_0x47fe38['mapId'],_0x47fe38['eventId'],!![]);}else this['x']+=VisuMZ[_0x1a67ca(0x1ab)][_0x1a67ca(0x61c)][_0x1a67ca(0x574)][_0x1a67ca(0x430)],this['y']+=VisuMZ['EventsMoveCore']['Settings'][_0x1a67ca(0x574)][_0x1a67ca(0x38b)];}},Sprite_Timer[_0x255dc2(0x301)][_0x255dc2(0x435)]=function(){const _0x108314=_0x255dc2;this[_0x108314(0x3b8)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this[_0x108314(0x3b8)][_0x108314(0x200)]=this[_0x108314(0x200)](),this['bitmap']['fontSize']=this[_0x108314(0x42a)](),this[_0x108314(0x3b8)][_0x108314(0x372)]=ColorManager[_0x108314(0x372)]();},Sprite_Timer[_0x255dc2(0x301)]['timerText']=function(){const _0x29bfb8=_0x255dc2,_0x565d53=Math[_0x29bfb8(0x389)](this[_0x29bfb8(0x1f0)]/0x3c/0x3c),_0x5c91f6=Math[_0x29bfb8(0x389)](this[_0x29bfb8(0x1f0)]/0x3c)%0x3c,_0x322991=this[_0x29bfb8(0x1f0)]%0x3c;let _0x5c7553=_0x5c91f6[_0x29bfb8(0x4ab)](0x2)+':'+_0x322991[_0x29bfb8(0x4ab)](0x2);if(_0x565d53>0x0)_0x5c7553=_0x29bfb8(0x365)[_0x29bfb8(0x3eb)](_0x565d53,_0x5c7553);return _0x5c7553;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2b7)]=Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x3c7)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x325a92=_0x255dc2;VisuMZ[_0x325a92(0x1ab)][_0x325a92(0x2b7)]['call'](this),this[_0x325a92(0x201)]();},VisuMZ['EventsMoveCore'][_0x255dc2(0x341)]=Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x2f8)],Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x2f8)]=function(){const _0x548993=_0x255dc2;VisuMZ[_0x548993(0x1ab)][_0x548993(0x341)][_0x548993(0x4a2)](this),this['createShadows']();},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x1fc)]=function(){const _0x1ee374=_0x255dc2;if(!VisuMZ['EventsMoveCore']['Settings']['Movement'][_0x1ee374(0x2a8)])return;for(const _0x4e35ce of this[_0x1ee374(0x5e7)]){this['createCharacterShadow'](_0x4e35ce);}},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x466)]=function(_0x9c45d3){const _0x302524=_0x255dc2;_0x9c45d3[_0x302524(0x562)]=new Sprite(),_0x9c45d3[_0x302524(0x562)][_0x302524(0x2ed)]=_0x9c45d3['_character'][_0x302524(0x2d8)](),_0x9c45d3[_0x302524(0x562)][_0x302524(0x3b8)]=ImageManager['loadSystem'](_0x9c45d3[_0x302524(0x562)][_0x302524(0x2ed)]),_0x9c45d3[_0x302524(0x562)][_0x302524(0x446)]['x']=0.5,_0x9c45d3['_shadowSprite'][_0x302524(0x446)]['y']=0x1,_0x9c45d3[_0x302524(0x562)]['z']=0x0,this[_0x302524(0x48b)][_0x302524(0x3ea)](_0x9c45d3[_0x302524(0x562)]);},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x499)]=function(){const _0x4c6115=_0x255dc2;if(!VisuMZ[_0x4c6115(0x1ab)][_0x4c6115(0x61c)][_0x4c6115(0x3c5)]['ShowShadows'])return;for(const _0x1c21c6 of this['_characterSprites']){if(_0x4c6115(0x17d)!==_0x4c6115(0x371))this[_0x4c6115(0x48b)]['removeChild'](_0x1c21c6['_shadowSprite']);else{const _0xa82445=_0x1b2085['round'](_0x478b3c(_0x520f21['$1'])/0x64*0xff);return this[_0x4c6115(0x490)](_0xa82445[_0x4c6115(0x46e)](0x0,0xff));}}},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x201)]=function(){const _0x438fc3=_0x255dc2;this[_0x438fc3(0x4b8)]=[];for(const _0xacbab5 of $gameMap['events']()){_0x438fc3(0x5a3)!=='YjRvn'?this[_0x438fc3(0x2b9)](_0xacbab5):(_0x3e753c[_0x438fc3(0x2dc)](_0x3a6174,_0x1ac4de),_0x5207da['despawnTerrainTags'](_0x2f0379[_0x438fc3(0x30a)]));}},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x2b9)]=function(_0xecb260){const _0xc02b53=_0x255dc2;if(!this[_0xc02b53(0x33a)](_0xecb260))return;const _0x5577f5=new Window_EventLabel(_0xecb260);_0x5577f5['z']=0x8,_0x5577f5[_0xc02b53(0x55e)]=Sprite[_0xc02b53(0x5aa)]++,this[_0xc02b53(0x48b)][_0xc02b53(0x3ea)](_0x5577f5),this[_0xc02b53(0x4b8)][_0xc02b53(0x2aa)](_0x5577f5);},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x33a)]=function(_0x57c736){const _0x46acdc=_0x255dc2,_0x11aca4=_0x57c736[_0x46acdc(0x1bb)]();if(_0x11aca4[_0x46acdc(0x50d)][_0x46acdc(0x5ba)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x11aca4[_0x46acdc(0x50d)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x572b6c of _0x11aca4[_0x46acdc(0x299)]){let _0x5d6751='';for(const _0x40fdcc of _0x572b6c[_0x46acdc(0x593)]){if([0x6c,0x198][_0x46acdc(0x571)](_0x40fdcc['code'])){if('iIFxw'==='iIFxw')_0x5d6751+=_0x40fdcc[_0x46acdc(0x297)][0x0];else return![];}}if(_0x5d6751['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5d6751[_0x46acdc(0x5ba)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x255dc2(0x301)][_0x255dc2(0x2e7)]=function(_0x18cb3f){const _0x3c95e0=_0x255dc2;this[_0x3c95e0(0x5e7)]=this[_0x3c95e0(0x5e7)]||[];const _0x389d2d=new Sprite_Character(_0x18cb3f);this['_characterSprites']['push'](_0x389d2d),this['_tilemap'][_0x3c95e0(0x3ea)](_0x389d2d),this['createCharacterShadow'](_0x389d2d),this['createLabelWindowForTarget'](_0x18cb3f),_0x389d2d[_0x3c95e0(0x62d)]();},VisuMZ[_0x255dc2(0x1ab)]['Game_Message_setNumberInput']=Game_Message['prototype']['setNumberInput'],Game_Message[_0x255dc2(0x301)][_0x255dc2(0x283)]=function(_0xe99250,_0x26e4b5){const _0x16f094=_0x255dc2;this['_selfTargetNumberInput']=$gameTemp[_0x16f094(0x426)](),VisuMZ[_0x16f094(0x1ab)]['Game_Message_setNumberInput'][_0x16f094(0x4a2)](this,_0xe99250,_0x26e4b5);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3d1)]=Window_NumberInput[_0x255dc2(0x301)][_0x255dc2(0x257)],Window_NumberInput[_0x255dc2(0x301)]['start']=function(){const _0x51d71d=_0x255dc2;$gameTemp[_0x51d71d(0x5ca)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x51d71d(0x1ab)]['Window_NumberInput_start'][_0x51d71d(0x4a2)](this),$gameTemp[_0x51d71d(0x192)]();},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x375)]=Window_NumberInput[_0x255dc2(0x301)][_0x255dc2(0x5a4)],Window_NumberInput[_0x255dc2(0x301)]['processOk']=function(){const _0x13e973=_0x255dc2;$gameTemp[_0x13e973(0x5ca)]($gameMessage[_0x13e973(0x442)]),VisuMZ[_0x13e973(0x1ab)][_0x13e973(0x375)][_0x13e973(0x4a2)](this),$gameTemp[_0x13e973(0x192)](),$gameMessage[_0x13e973(0x442)]=undefined;},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x2e8)]=Game_Message['prototype']['setItemChoice'],Game_Message['prototype'][_0x255dc2(0x46f)]=function(_0x471f2c,_0xad75de){const _0x5efafe=_0x255dc2;this[_0x5efafe(0x4f1)]=$gameTemp[_0x5efafe(0x426)](),VisuMZ['EventsMoveCore'][_0x5efafe(0x2e8)][_0x5efafe(0x4a2)](this,_0x471f2c,_0xad75de);},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x3f5)]=Window_EventItem[_0x255dc2(0x301)][_0x255dc2(0x1db)],Window_EventItem['prototype'][_0x255dc2(0x1db)]=function(){const _0x500fc3=_0x255dc2;$gameTemp[_0x500fc3(0x5ca)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x500fc3(0x1ab)][_0x500fc3(0x3f5)][_0x500fc3(0x4a2)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x500fc3(0x4f1)]=undefined;},VisuMZ[_0x255dc2(0x1ab)]['Window_EventItem_onCancel']=Window_EventItem[_0x255dc2(0x301)][_0x255dc2(0x5de)],Window_EventItem[_0x255dc2(0x301)][_0x255dc2(0x5de)]=function(){const _0x3d78c2=_0x255dc2;$gameTemp[_0x3d78c2(0x5ca)]($gameMessage[_0x3d78c2(0x4f1)]),VisuMZ[_0x3d78c2(0x1ab)][_0x3d78c2(0x477)][_0x3d78c2(0x4a2)](this),$gameTemp[_0x3d78c2(0x192)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore'][_0x255dc2(0x3a3)]=Window_Message[_0x255dc2(0x301)][_0x255dc2(0x211)],Window_Message[_0x255dc2(0x301)][_0x255dc2(0x211)]=function(){const _0x2f2112=_0x255dc2;$gameMessage[_0x2f2112(0x356)](),VisuMZ[_0x2f2112(0x1ab)][_0x2f2112(0x3a3)][_0x2f2112(0x4a2)](this),$gameTemp[_0x2f2112(0x192)]();},VisuMZ[_0x255dc2(0x1ab)][_0x255dc2(0x288)]=Window_ScrollText[_0x255dc2(0x301)][_0x255dc2(0x211)],Window_ScrollText[_0x255dc2(0x301)][_0x255dc2(0x211)]=function(){const _0x532b91=_0x255dc2;$gameMessage['registerSelfEvent'](),VisuMZ[_0x532b91(0x1ab)][_0x532b91(0x288)][_0x532b91(0x4a2)](this),$gameTemp[_0x532b91(0x192)]();};function _0x5800(){const _0x82c70e=['Game_Troop_meetsConditions','onExpire','reverse','VehicleAllow','clamp','setItemChoice','AdvancedVariables','moveStraight','initEventsMoveCoreSettings','PageId','isMoving','Frames','3410646Aamvpa','Window_EventItem_onCancel','EventLabelVisible','_eventId','toLowerCase','Game_SelfSwitches_setValue','_visiblePlayerX','VulMC','BkXyc','initMembers','Game_Map_unlockEvent','spawnEventId','CkUOO','stop','_moveRouteIndex','JSON','characterIndex','Game_Interpreter_executeCommand','updateShadowChanges','IconBlendMode','shadowY','_tilemap','dGzPU','prepareSpawnedEventAtRegion','log','updatePatternEventsMoveCore','setOpacity','setValue','PostSpawnJS','changeSpeed','switch1Valid','updateSelfMovement','savePreservedMorphEventDataKey','selfValue','yMTSw','hideShadows','9074153NVKVlb','10kqIawC','XVgOE','updateBitmapSmoothing','setupSaveEventLocations','PyRGd','convertVariableValuesInScriptCall','ANGER','call','Scene_Boot_onDatabaseLoaded','type','TemplateName','Game_Timer_stop','checkActivationProximity','screenX','checkSmartEventCollision','isSupportDiagonalMovement','padZero','Dock','moveSynchType','updateMoveSynch','updateMove','Step2Preserve','mtJbF','checkRegionEventTrigger','TRUE','meetsSwitchCondition','SGEbE','JAyDY','isEventTest','_labelWindows','deleteIconsOnEventsData','gJEoO','determineCommonEventsWithCPC','PostMorphJS','isPlaytest','FCuYT','isEventClickTriggered','_activationProximity','_working','Game_Player_isMapPassable','moveSynchTarget','character','General','processMoveRouteJumpTo','posEventsMoveCore','_reflection','BJdki','isValid','resume','UmhSy','getPosingCharacterPattern','isCollidedWithEvents','RegionOkTarget','shadowX','_spriteOffsetX','Game_Map_setup','Game_CharacterBase_increaseSteps','onDatabaseLoaded','Game_Event_refresh','frontX','filename','createSpawnedEventWithData','VariableGetSelfVariableID','VtcCc','Scene_Map_startEncounterEffect','updatePosition','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_moveSynch','processMoveRouteAnimation','processMoveRouteHugWall','lSWvT','scale','Game_CharacterBase_canPass','add','checkEventsMoveCoreStringTags','Step1MapId','forceDashing','lTAJc','%1%2','Game_Timer_start','hasEventIcon','OpacitySpeed','isDashingEnabled','ShipSpeed','Enable','FontSize','_selfTargetItemChoice','drawTextEx','contents','PlayerIconDelete','charAt','eventLabelsVisible','pjfKS','_eventPageIndex','rnhYW','llZSj','updateTilt','Game_Interpreter_updateWaitMode','BlendMode','EventLocationSave','_type','_SavedEventLocations','_EventsMoveCoreSettings','orboQ','1163916NDHcPP','frontY','processMoveRoutePatternLock','_needsRefresh','rNgJB','AutoBalloon','status','drawing','Rope','startCallEvent','note','HURT','restoreSavedEventPosition','setSelfValue','YWLCS','Game_Vehicle_isLandOk','_visibleEventX','ACHDC','FastForwardKey','min','deltaYFrom','setupSpawn','Game_System_initialize','column','getPosingCharacterDirection','FGERN','processMoveRouteFadeOut','locate','yjpQy','USER-DEFINED\x204','QUESTION','BufferY','Game_Enemy_meetsSwitchCondition','LSLnw','Allow','wERTB','checkValidEventerMap','SPIN\x20COUNTERCLOCKWISE','characterPatternYVS8','isAnyEventStarting','prepareSpawnedEventAtTerrainTag','List','Region','autosaveEventLocation','_text','firstSpawnedEvent','_eventMorphData','FollowerReset','loadDataFile','iUWqX','reverse\x20copy','SelfSwitches','NcncV','HEART','jizmR','setEventIconDataKey','SPIN\x20ACW','PlayerAllow','Game_CharacterBase_initMembers','cRypJ','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','hasStepAnime','_erased','PreSpawnJS','Sprite_Character_initMembers','PwkPY','Self\x20Switch\x20%1','smooth','wuSvn','isDashingAndMoving','mirror\x20horz','oXEFf','roundX','IconSet','ATGKy','_periodicRefreshTimer','DwTZs','checkNeedForPeriodicRefresh','SelfSwitchABCD','rRbPR','njrve','_eventErased','offsetY','_speed','meetsCPC','isLabelVisible','PostCopyJS','pause','regionList','xVHlN','gzEPK','spriteId','processMoveSynchAway','eBoaZ','clearPose','_shadowSprite','isSpawnedEvent','FSRdW','LOVE','USER-DEFINED\x201','PreloadMaps','Map%1.json','updatePattern','SpawnEventAtTerrainTag','roundXWithDirection','deltaXFrom','turnAwayFromCharacter','isRegionAllowPass','default','updateOpacity','includes','BgTqw','VisuMZ_0_CoreEngine','VS8','loadSystem','_cacheSystemVisible','tlLpg','processMoveSynchApproach','variableValid','ICiMB','ODxhk','HdJps','RKUMT','_comments','ARRAYNUM','checkExistingEntitiesAt','Game_Player_getInputDirection','none','UiugP','EKTFM','isSelfSwitch','OperateValues','updateEventsMoveCoreTagChanges','Speed','version','setupEvents','Game_Event_event','timer','Self\x20Variable\x20%1','USER-DEFINED\x202','Game_Map_event','Game_Message_add','FUNC','constructor','list','deleteSavedEventLocation','WUJam','_advancedSwitchVariable','_eventSpawnData','_eventScreenX','_eventScreenY','TiltLeft','itemPadding','_pageIndex','CPC','_eventIcon','lbvWN','unlock','lZlzC','_regionRules','SkRyU','processOk','BMEWi','page','LUuCf','_opacity','ebDpP','_counter','Game_Event_isCollidedWithPlayerCharacters','Sprite_Character_setCharacterBitmap','bufferY','CallEvent','Event','isInVehicle','isDiagonalDirection','DOWN','xXqbN','StopAutoMoveEvents','isShadowVisible','Game_Player_executeMove','processMoveRouteStepToCharacter','Game_Map_refresh','isRegionForbidPass','match','checkEventTriggerThere','useCarryPoseForIcons','moveByInput','aaacR','EventAutoMovement','deleteIconsOnEventsDataKey','qwYxQ','blt','processMoveRouteMoveUntilStop','parent','deltaX','UPPER\x20LEFT','autoEventIconBuffer','delay','setTileBitmap','registerSelfTarget','moveTowardPoint','radius','IukOd','IvNgo','afNTY','onClickTrigger','xigcF','_shadowOpacity','direction','ARRAYJSON','AZpof','mirror\x20vert','LmfBo','isTurnInPlace','Yhcnx','UNTITLED','Game_Event_setupPageSettings','EventForbid','_expireCommonEvent','onCancel','MorphEventRemove','RegionOk','OfDbo','Game_CharacterBase_hasStepAnime','qFaaI','Game_Interpreter_character','SpawnEventDespawnRegions','right','_characterSprites','despawnEventId','JPCHh','RgZcb','ztoAV','mapId','SLEEP','Vehicle','uGCiY','EventIconDelete','_scene','SelfVariableID','player','dashSpeedModifier','isEventRunning','Game_Player_isDashing','_MapSpawnedEventData','processMoveRouteSelfVariable','oinak','244XkJNTk','SpawnEventDespawnEventID','pos','WalkForbid','_eventIconSprite','VariableId','Minutes','Game_CharacterBase_screenY','Player','_selfTarget','MUSIC\x20NOTE','parse','Game_CharacterBase_screenX','_chaseOff','setupEventsMoveCoreEffects','FollowerSetControl','EnableDir8','clearSpriteOffsets','innerWidth','defaultFontSize','enable','onChange','isTriggerIn','registerCommand','STJFG','setMoveRoute','OhcSM','SpawnEventDespawnTerrainTags','lastMovedDirection','tMEOq','pNNWB','Game_Interpreter_PluginCommand','Ozpwa','_EventIcons','Settings','Step2EventId','erase','_visiblePlayerY','approach','bzqJO','activationProximityDistance','FavorHorz','$callEventMap','TargetSwitchId','LIGHTBULB','name','switch2Id','_eventOverloadThreshold','updateWaitMode','meetActivationProximityConditions','pFqdu','update','hzfKg','RrsnW','%1Dock','getEventIconData','PosY','updateScale','pkJof','Game_CommonEvent_isActive','drawIcon','ciFXm','setDestination','_PlayerDiagonalSetting','_randomHomeY','Toggle','executeMoveDir8','%1DockRegionOnly','dnbwp','moveAwayFromCharacter','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','OFF','isRegionDockable','vertical\x20mirror','turn180','Visible','slCRE','_waitMode','bufferX','zLBpo','Game_Event_start','XhMBY','requestBalloon','isStopFollowerChasing','CUeoY','NOTE','_eventLabelOffsetY','_transparent','Game_CharacterBase_pattern','PosX','isNormalPriority','isShip','McWJj','hasClickTrigger','aHVEv','iconSize','LEFT\x20TO\x20RIGHT','clearSelfTarget','roundYWithDirection','startMapCommonEventOnTouch','_labelWindow','isSelfVariable','kVhCo','FollowerID','EventTimerPause','CPCsMet','Game_Vehicle_isMapPassable','moveTypeRandom','isAdvancedVariable','processMoveSynchMirrorVert','visibleRange','height','isSaveEventLocation','DashingEnable','SPIN\x20CLOCKWISE','setupChild','Game_CharacterBase_characterIndex','setMovementSuccess','process_VisuMZ_EventsMoveCore_Switches_Variables','VICTORY','_stepPattern','isDashing','EventsMoveCore','textSizeEx','Game_Player_increaseSteps','despawnRegions','EXCLAMATION','characterPatternY','_lastMovedDirection','MULTIPLY','_diagonalSupport','_characterIndex','pattern','Game_Character_processMoveCommand','Operation','_commonEvents','setEventIconData','_eventCache','event','Sprite_Balloon_updatePosition','uFrxL','updatePeriodicRefresh','_isObjectCharacter','replace','_spawnedEvents','hasAdvancedSwitchVariable','shiftY','moveAwayFromPoint','HJeYY','convertSelfVariableValuesInScriptCall','KNEEL','Game_Event_findProperPageIndex','text','_forceDashing','boxWidth','_data','setPose','away','AnJWA','KAQED','_spriteset','pYxct','gainFrames','eventId','kmCPR','EnableTurnInPlace','1336ZOjLpz','deletePreservedMorphEventDataKey','IconSize','screenY','onOk','_frames','NUM','setWaitMode','processMoveRouteJumpToCharacter','target','jump','Game_Map_update','Game_CharacterBase_update','absDistance','SuccessSwitchId','findProperPageIndex','processMoveRouteStepTo','_followerControlID','CustomPageConditions','uHgZT','_spriteOffsetY','Region%1','turnTowardPoint','horizontal\x20mirror','isBigCharacter','_seconds','bOFNY','Game_Map_isDashDisabled','processMoveSynchReverseMimic','EventTemplates','_eventLabelOffsetX','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','mBHHo','tDfuA','mWAYg','isPlayerControlDisabled','DashModifier','createShadows','_spawnPreserved','processMoveRouteMoveToCharacter','description','fontFace','createLabelWindows','isMapPassable','WalkAllow','_moveSpeed','meetsConditions','advancedValue','clearDashing','EVAL','Game_Troop_meetsConditionsCPC','canPassDiagonally','isPassable','_event','EventTimerResume','executeMove','MessageCore','iconWidth','startMessage','updateParallel','ReMrg','SILENCE','_trigger','setFrame','FYKjG','Game_Variables_setValue','55355vhgRNx','moveDiagonally','RIGHT','QEFmF','_callEventMap','_patternLocked','getPlayerDiagonalSetting','isBoat','_hidden','VisibleEventLabels','gLKPJ','canPass','efVSc','setupCopyEvent','clearStepPattern','mimic','Game_Character_setMoveRoute','moveTowardCharacter','setBalloonPose','isActive','setControlledFollowerID','regionId','UMFpj','enyas','jCxab','UPPER\x20RIGHT','isCollidedWithPlayerCharacters','XvngT','LyGKD','forceMoveRoute','ship','Airship','processMoveRouteMoveTo','Button','ZyEAR','nJcbq','hasMoveOnlyRegions','activationProximityType','template','_vehicleType','processMoveRouteTeleportTo','toUpperCase','VisuMZ_2_DragonbonesUnion','getPose','aBOJe','SPIN\x20ANTICLOCKWISE','Game_Follower_initialize','_DisablePlayerControl','LIGHT-BULB','setEventLabelsVisible','randomInt','_lastPluginCommandInterpreter','isJumping','NplyG','checkEventTriggerEventsMoveCore','_paused','isMovementSucceeded','needsUpdate','eSfuU','Visibility','MCcVZ','removeTemporaryMapSpawnedEvents','start','VehicleDock','_pattern','NtHIZ','isKtE','ARRAYSTR','EventLabelRefresh','down','EventAllow','cPolA','roundY','exit','DiagonalSpeedMultiplier','BoatSpeed','Game_Event_meetsConditions','FollowerSetTargetChase','LtYBC','EventID','remove','opacity','turnTowardCharacter','meetActivationRegionConditions','processMoveSynch','YGokH','setupDiagonalSupport','XhXtC','concat','correctFacingDirection','hWKVv','getMapSpawnedEventData','labelWindowText','isDestinationValid','JTGVz','Game_CharacterBase_setDirection','IXMSD','return\x200','iconIndex','Game_CharacterBase_moveDiagonally','COLLAPSE','PreCopyJS','_eventOverload','bOmrZ','referEvent','moveRouteIndex','setNumberInput','loadCPC','GKJwX','YwmAG','setChaseOff','Window_ScrollText_startMessage','setup','TurnInPlaceDelay','TiltRight','getInputDir8','ICOQG','Chase','startMapCommonEventOnOKTarget','blendMode','Hours','deleteSavedEventLocationKey','initFollowerController','Game_Event_updateParallel','DashEnableToggle','slice','parameters','XztkK','pages','despawnEverything','Game_Event_moveTypeRandom','gLUlg','setupSpawnTest','Map%1-Event%2','updateShadow','string','xaSTB','despawnAtXY','getDirectionFromPoint','VisuMZ_Setup_Preload_Map','MoveAllSynchTargets','setImage','return\x20%1','ShowShadows','_interpreter','push','processMoveRouteBalloon','clearDestination','HUbsU','KkkcA','forceCarrying','Sprite_Character_characterPatternY','dcGfV','canMove','value','LOWER\x20RIGHT','bind','isShadowShrink','Spriteset_Map_createLowerLayer','BULB','createLabelWindowForTarget','_duration','TargetVariableId','startMapCommonEventOnOK','226vcrkGs','Icon','Game_Player_checkEventTriggerThere','SVrMl','SwitchGetSelfSwitchABCD','_CPCs','clearCarrying','updateText','orCkU','FollowerSetGlobalChase','iALYH','checkAdvancedSwitchVariablePresent','EZanS','AutoMoveEvents','FRUSTRATION','contentsOpacity','map','_randomHomeX','IconIndex','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VisuMZ_1_MessageCore','square','width','Direction','_needsPeriodicRefresh','deltaY','Game_Temp_setDestination','shadowFilename','EventIconChange','IxAJs','onLoadSuccess','ConvertParams','NBLoe','checkCollisionKeywords','deleteEventLocation','Game_CharacterBase_updatePattern','Game_Event_clearPageSettings','lineHeight','Value','of\x20Preloaded\x20Maps.\x0a\x0a','Sprite_Character_update','Collision','createSpawnedEvent','Game_Message_setItemChoice','switchId','TerrainTag','gHSiw','isAllowCharacterTilt','_filename','BitmapSmoothing','STRUCT','setMoveSpeed','eventsXy','Game_CharacterBase_realMoveSpeed','_randomMoveWeight','setPattern','removeMorph','SelfVariables','characterIndexVS8','createShadow','indexOf','_moveAllowPlayerCollision','zqNwx','isPreventSelfMovement','NEWqZ','code','windowPadding','Preserve','prototype','_visibleEventY','SwitchGetSelfSwitchID','setStopFollowerChasing','pErXX','ikPWO','isAllowEventAutoMovement','meYCz','updateEventIconSprite','TerrainTags','PVOIc','881541sCKZZN','_target','sSZGp','LOWER\x20LEFT','NaAMP','setPlayerControlDisable','cxMul','RegionTouch','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','removeChild','GwePs','40803CDHXim','NGAMX','setLastPluginCommandInterpreter','variables','_spawnData','refreshIfNeeded','Game_Player_checkEventTriggerHere','yDlwd','Setting','row','nOmPV','qGQdf','setupPageSettings','Template','WBnWR','FNIDN','PlayerIconChange','setupRegionRestrictions','initMembersEventsMoveCore','Sprite_Balloon_setup','Game_Variables_value','setCharacterBitmap','EventId','dir8','getPreservedMorphEventData','unlockEvent','TlmnX','offsetX','Scene_Load_onLoadSuccess','clearPageSettings','max','increaseSteps','searchLimit','Game_Follower_chaseCharacter','_callEventData','isTargetEventValidForLabelWindow','Ijxtr','executeCommand','Name','createSaveEventLocationData','IconBufferY','processMoveRouteFadeIn','Spriteset_Map_createShadow','ZbHCM','splice','moveBackToRandomHome','isPressed','processMoveSynchRandom','iMYGk','MapId','mirror\x20vertical','dbpCG','getControlledFollowerID','jumpHeight','rotation','followers','VisibleRange','_inputTime','follower','Disable','_cpc','getInputDirection','setFrames','registerSelfEvent','setAllowEventAutoMovement','AirshipSpeed','HHQWb','switch2Valid','YXjVv','gIAtq','zoomScale','characterName','DIAHx','JwxZp','initEventsMoveCoreEffects','isSaveEventLocations','PlXlL','Game_Map_events','%1:%2','addLoadListener','_characterName','ADDITIVE','yCVtZ','EventTimerExpireClear','MorphEventTo','processMoveCommandEventsMoveCore','ZZZ','refresh','setDashingEnabled','zNANl','hRKfA','outlineColor','vert\x20mirror','DefaultShadow','Window_NumberInput_processOk','hasDragonbones','turnLeft90','OffsetY','setBackgroundType','isPosing','findDiagonalDirectionTo','prepareSpawnedEventAtXY','abs','updateRoutineMove','CommonEventID','processMoveSynchCustom','Game_Map_parallelCommonEvents','IconBufferX','isOnRope','QUKJA','PlayerMovementDiagonal','IKSpt','hasCPCs','checkEventTriggerAuto','floor','MUSIC','BalloonOffsetY','oxkkk','HkdkI','IMaMp','setupEventsMoveCoreNotetags','setDiagonalDirection','processMoveRouteTeleportToCharacter','%1Allow','pageId','Game_Timer_onExpire','isSpriteVS8dir','QvBVp','zadJU','isSmartEventCollisionOn','LineHeight','AllForbid','findTargetSprite','isLandOk','KfKkH','pOhmL','moveForward','getPosingCharacterIndex','PreloadedMaps','ITEM','Window_Message_startMessage','_encounterEffectDuration','left','isOnLadder','LIGHT','_moveRoute','Step1EventId','AutoBuffer','Game_Character_forceMoveRoute','6251uDbWfK','PlayerForbid','processMoveRouteStepFrom','isNearTheScreen','canStartLocalEvents','pageIndex','SPIN\x20CW','getEventIconIndex','command357','destinationY','Game_Switches_value','hivPM','bitmap','variableId','eventsXyNt','_saveEventLocations','SQFfS','despawnTerrainTags','getDirectionToPoint','setPlayerDiagonalSetting','turnAwayFromPoint','_poseDuration','BufferX','distance','_mapId','Movement','isEventOverloaded','createLowerLayer','SpawnEventDespawnEverything','ROUTE_SCRIPT','nYYht','SYgPT','Zkckt','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','_commonEventId','FlpIP','airship','Window_NumberInput_start','_pose','clear','AdvancedSwitches','isSpawnHitboxCollisionOk','Game_SelfSwitches_value','reverse\x20mimic','COBWEB','isAutoBufferIcon','PlayerMovementChange','_activationProximityAutoTriggerBypass','processMoveRouteJumpForward','sPLnB','_character','setCommonEvent','Game_Event_checkEventTriggerAuto','backY','IRfPv','LEFT','LIGHT\x20BULB','realMoveSpeed','gWMLA','Game_CharacterBase_moveStraight','Game_Switches_setValue','region','addChild','format','Game_Vehicle_initMoveSpeed','_forceCarrying','QYuvB','standing','SWEAT','firstSpawnedEventID','nQnFV','Game_Event_initialize','EoEdF','Window_EventItem_onOk','_PreservedEventMorphData','pcTDG','makeDeepCopy','morphIntoTemplate','isBattleTest','RIGHT\x20TO\x20LEFT','processMoveRouteSetIndex','fittingHeight','ZUrLl','some','isWorking','reverseDir','getLastPluginCommandInterpreter','Hixtq','OXlAi','processMoveSynchMimic','terrainTag','initialize','Stop','execute','Game_Map_setupEvents','HMPH','Seconds','destinationX','EgDec','findDirectionTo','turnRight90','adjustDir8MovementSpeed','TYCtW','_selfEvent','determineEventOverload','_moveOnlyRegions','updatePose','isAirship','isBusy','GLmXh','LtWRU','_saveEventLocation','ycIdE','random','Game_Event_updateSelfMovement','_cacheVisibility','fPSoA','isPassableByAnyDirection','GetMoveSynchTarget','Letter','SelfSwitchID','saveEventLocation','getSelfTarget','clearEventCache','directionOnLadderSpriteVS8dir','Game_CharacterBase_isDashing','fontSize','...','length','qIwCb','isDashDisabled','aFosI','BalloonOffsetX','isAirshipPassable','HrExM','advancedFunc','_screenZoomScale','createBitmap','vehicle','TiltVert','filter','metCPC','Step2MapId','EventLocationCreate','checkEventTriggerHere','activationRegionList','Game_CharacterBase_direction','_addedHitbox','boat','visible','_selfTargetNumberInput','initMoveSpeed','processMoveRouteMoveRepeat','USER-DEFINED\x205','anchor','_shadowGraphic','ZfDvD','PreMorphJS','Game_Event_locate','isMoveOnlyRegionPassable','morphInto','Sprite_Character_setTileBitmap','Game_Timer_initialize','switches','setDirection','MapID','setupSpawnedEvents','opacitySpeed','setupMorphEvent','dpEHR','_followerChaseOff','events','trim','SwitchId','NORMAL','Label','STR','ARRAYSTRUCT','round','createIconSprite','initEventsMoveCore','pluginCommandCallEvent','lastSpawnedEvent','_alwaysUpdateMove','EventTimerSpeed','isAdvancedSwitch','createCharacterShadow','processMoveRouteSelfSwitch','posNt','Passability'];_0x5800=function(){return _0x82c70e;};return _0x5800();}function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base['prototype']),Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x592)]=Window_EventLabel,Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x407)]=function(_0x330bbc){const _0x114f91=_0x255dc2;this[_0x114f91(0x20c)]=_0x330bbc;const _0x4c79e8=new Rectangle(0x0,0x0,Graphics[_0x114f91(0x1cb)]/0x4,this[_0x114f91(0x3fd)](0x1));this[_0x114f91(0x47f)](),Window_Base[_0x114f91(0x301)][_0x114f91(0x407)][_0x114f91(0x4a2)](this,_0x4c79e8),this['contentsOpacity']=0x0,this[_0x114f91(0x379)](0x2),this['_text']='';},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x47f)]=function(){const _0x576926=_0x255dc2;this['_eventErased']=![],this[_0x576926(0x434)]=$gameScreen[_0x576926(0x35d)](),this[_0x576926(0x598)]=this[_0x576926(0x20c)][_0x576926(0x4a8)](),this[_0x576926(0x599)]=this['_event'][_0x576926(0x1da)](),this[_0x576926(0x1f5)]=this[_0x576926(0x20c)]['_labelWindow'][_0x576926(0x332)],this[_0x576926(0x187)]=this[_0x576926(0x20c)]['_labelWindow']['offsetY'],this['_eventPageIndex']=this[_0x576926(0x20c)]['_pageIndex'],this[_0x576926(0x41f)]=this['isLabelVisible'](),this[_0x576926(0x576)]=$gameSystem[_0x576926(0x4f6)](),this[_0x576926(0x47c)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x576926(0x513)]=this['_event']['x'],this[_0x576926(0x302)]=this['_event']['y'];},Window_EventLabel['prototype']['update']=function(){const _0x30ae6a=_0x255dc2;Window_Base[_0x30ae6a(0x301)][_0x30ae6a(0x62d)]['call'](this);if(!this[_0x30ae6a(0x252)]())return;this[_0x30ae6a(0x2c4)](),this['updateScale'](),this['updatePosition'](),this[_0x30ae6a(0x570)]();},Window_EventLabel[_0x255dc2(0x301)]['needsUpdate']=function(){const _0x32a925=_0x255dc2;if(!this[_0x32a925(0x20c)])return![];if(!this['_event'][_0x32a925(0x195)])return![];if(this[_0x32a925(0x4f8)]!==this[_0x32a925(0x20c)][_0x32a925(0x59c)])return!![];if(this[_0x32a925(0x20c)][_0x32a925(0x541)]&&!this[_0x32a925(0x554)])return!![];if(this[_0x32a925(0x20c)]['_labelWindow'][_0x32a925(0x1c9)]==='')return![];if(this[_0x32a925(0x434)]!==$gameScreen[_0x32a925(0x35d)]())return!![];if(this[_0x32a925(0x598)]!==this[_0x32a925(0x20c)]['screenX']())return!![];if(this[_0x32a925(0x599)]!==this[_0x32a925(0x20c)]['screenY']())return!![];if(this[_0x32a925(0x1f5)]!==this[_0x32a925(0x20c)][_0x32a925(0x195)][_0x32a925(0x332)])return!![];if(this[_0x32a925(0x187)]!==this[_0x32a925(0x20c)][_0x32a925(0x195)][_0x32a925(0x555)])return!![];if(this[_0x32a925(0x47c)]!==$gamePlayer['x'])return!![];if(this[_0x32a925(0x61f)]!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this['_event']['x'])return!![];if(this[_0x32a925(0x302)]!==this['_event']['y'])return!![];if(this[_0x32a925(0x576)]!==$gameSystem[_0x32a925(0x4f6)]())return!![];if(this['_cacheVisibility']&&this[_0x32a925(0x2cc)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x32a925(0x2cc)]>0x0)return!![];if(SceneManager[_0x32a925(0x5f1)][_0x32a925(0x3a4)]>0x0)return!![];return![];},Window_EventLabel[_0x255dc2(0x301)]['updateText']=function(){const _0xd06f04=_0x255dc2;this['_event'][_0xd06f04(0x275)]()!==this['_text']&&(this[_0xd06f04(0x52f)]=this[_0xd06f04(0x20c)]['labelWindowText'](),this[_0xd06f04(0x36e)]());},Window_EventLabel['prototype'][_0x255dc2(0x633)]=function(){const _0x48349b=_0x255dc2;this[_0x48349b(0x4e2)]['x']=0x1/$gameScreen[_0x48349b(0x35d)](),this['scale']['y']=0x1/$gameScreen[_0x48349b(0x35d)](),this[_0x48349b(0x434)]=$gameScreen[_0x48349b(0x35d)]();},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x4dc)]=function(){const _0x56a43a=_0x255dc2;if(!SceneManager[_0x56a43a(0x5f1)])return;if(!SceneManager[_0x56a43a(0x5f1)][_0x56a43a(0x1d1)])return;const _0x543bcc=SceneManager[_0x56a43a(0x5f1)]['_spriteset'][_0x56a43a(0x39b)](this[_0x56a43a(0x20c)]);if(!_0x543bcc)return;this['x']=Math[_0x56a43a(0x45e)](this[_0x56a43a(0x20c)][_0x56a43a(0x4a8)]()-Math[_0x56a43a(0x389)](this[_0x56a43a(0x2d3)]*this['scale']['x']/0x2)),this['x']+=this[_0x56a43a(0x20c)][_0x56a43a(0x195)][_0x56a43a(0x332)],this['y']=this[_0x56a43a(0x20c)]['screenY']()-_0x543bcc[_0x56a43a(0x1a0)],this['y']+=Math[_0x56a43a(0x45e)]($gameSystem[_0x56a43a(0x2ff)]()*0.5),this['y']-=Math[_0x56a43a(0x45e)](this[_0x56a43a(0x1a0)]*this[_0x56a43a(0x4e2)]['y']),this['y']+=this[_0x56a43a(0x20c)][_0x56a43a(0x195)]['offsetY'],this[_0x56a43a(0x554)]=this[_0x56a43a(0x20c)][_0x56a43a(0x541)],this[_0x56a43a(0x598)]=this[_0x56a43a(0x20c)][_0x56a43a(0x4a8)](),this[_0x56a43a(0x599)]=this[_0x56a43a(0x20c)][_0x56a43a(0x1da)](),this[_0x56a43a(0x1f5)]=this[_0x56a43a(0x20c)][_0x56a43a(0x195)][_0x56a43a(0x332)],this['_eventLabelOffsetY']=this[_0x56a43a(0x20c)]['_labelWindow']['offsetY'],this[_0x56a43a(0x4f8)]=this['_event'][_0x56a43a(0x59c)],this['_eventErased']&&(this['contentsOpacity']=0x0);},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x570)]=function(){const _0xf873f8=_0x255dc2;if(this[_0xf873f8(0x558)]())this[_0xf873f8(0x2cc)]+=this[_0xf873f8(0x453)]();else{if(SceneManager[_0xf873f8(0x5f1)][_0xf873f8(0x3a4)]>0x0){if('pOhmL'===_0xf873f8(0x39e))this[_0xf873f8(0x2cc)]=0x0;else{const _0x46ee95=this['lastSpawnedEvent']();return _0x46ee95?_0x46ee95[_0xf873f8(0x479)]:0x0;}}else{if(_0xf873f8(0x277)!=='JTGVz')return!![];else this[_0xf873f8(0x2cc)]-=this[_0xf873f8(0x453)]();}}},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x558)]=function(){const _0xbdb706=_0x255dc2;if(!$gameSystem[_0xbdb706(0x4f6)]())return![];if(this[_0xbdb706(0x20c)]?.['_erased'])return![];if(SceneManager[_0xbdb706(0x5f1)][_0xbdb706(0x3a4)]>0x0)return![];const _0x31d672=$gamePlayer['x'],_0x3f0cac=$gamePlayer['y'],_0x4cc8e5=this[_0xbdb706(0x20c)]['x'],_0x47db1e=this[_0xbdb706(0x20c)]['y'];if(this[_0xbdb706(0x47c)]===_0x31d672&&this[_0xbdb706(0x61f)]===_0x3f0cac&&this[_0xbdb706(0x513)]===_0x4cc8e5&&this[_0xbdb706(0x302)]===_0x47db1e){if(_0xbdb706(0x286)!=='YwmAG'){if(this[_0xbdb706(0x500)]===_0x533d86)this[_0xbdb706(0x460)]();const _0x5d8399='Map%1-Event%2'[_0xbdb706(0x3eb)](_0x4eb722,_0xc5142b);this[_0xbdb706(0x500)][_0x5d8399]={'direction':_0x20c730,'x':_0xb2ab90[_0xbdb706(0x45e)](_0x5ed6ad),'y':_0x4bcf76[_0xbdb706(0x45e)](_0x2ce24d),'pageIndex':_0x3c4a28,'moveRouteIndex':_0x3422fe};}else return this[_0xbdb706(0x41f)];}this['_visiblePlayerX']=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0xbdb706(0x513)]=this[_0xbdb706(0x20c)]['x'],this[_0xbdb706(0x302)]=this['_event']['y'];if($gameMap[_0xbdb706(0x1e4)](_0x31d672,_0x3f0cac,_0x4cc8e5,_0x47db1e)>this[_0xbdb706(0x20c)]['labelWindowRange']())return this[_0xbdb706(0x41f)]=![],![];return this[_0xbdb706(0x41f)]=!![],!![];},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x453)]=function(){const _0x4e930c=_0x255dc2;return VisuMZ[_0x4e930c(0x1ab)][_0x4e930c(0x61c)][_0x4e930c(0x45b)][_0x4e930c(0x4ec)];},Window_EventLabel['prototype']['resizeWindow']=function(){const _0x32a607=_0x255dc2,_0x338920=this[_0x32a607(0x1ac)](this[_0x32a607(0x52f)]);this[_0x32a607(0x2d3)]=_0x338920['width']+($gameSystem[_0x32a607(0x2ff)]()+this[_0x32a607(0x59b)]())*0x2,this['height']=Math[_0x32a607(0x335)](this[_0x32a607(0x2e2)](),_0x338920[_0x32a607(0x1a0)])+$gameSystem[_0x32a607(0x2ff)]()*0x2,this['createContents']();},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x2e2)]=function(){const _0x722692=_0x255dc2;return VisuMZ['EventsMoveCore'][_0x722692(0x61c)][_0x722692(0x45b)][_0x722692(0x399)];},Window_EventLabel['prototype']['resetFontSettings']=function(){const _0x9bc6df=_0x255dc2;Window_Base[_0x9bc6df(0x301)]['resetFontSettings'][_0x9bc6df(0x4a2)](this),this[_0x9bc6df(0x4f3)]['fontSize']=this['defaultFontSize']();},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x60d)]=function(){const _0x3929a7=_0x255dc2;return VisuMZ['EventsMoveCore'][_0x3929a7(0x61c)][_0x3929a7(0x45b)][_0x3929a7(0x4f0)];},Window_EventLabel[_0x255dc2(0x301)]['refresh']=function(){const _0x20699c=_0x255dc2;this['resizeWindow'](),this[_0x20699c(0x4f3)]['clear']();const _0x1c23da=this['_text']['split'](/[\r\n]+/);let _0x5de476=0x0;for(const _0x222b1e of _0x1c23da){const _0x52ec08=this[_0x20699c(0x1ac)](_0x222b1e),_0x44f99f=Math[_0x20699c(0x389)]((this[_0x20699c(0x60c)]-_0x52ec08[_0x20699c(0x2d3)])/0x2);this[_0x20699c(0x4f2)](_0x222b1e,_0x44f99f,_0x5de476),_0x5de476+=_0x52ec08[_0x20699c(0x1a0)];}},Window_EventLabel[_0x255dc2(0x301)]['processDrawIcon']=function(_0x481df0,_0x35df94){const _0x2facf1=_0x255dc2;if(_0x35df94[_0x2facf1(0x50a)]){if(_0x2facf1(0x305)===_0x2facf1(0x305))this[_0x2facf1(0x636)](_0x481df0,_0x35df94['x']+0x2,_0x35df94['y']);else{var _0x2abded=this['x']-this['_addedHitbox'][_0x2facf1(0x3a5)],_0x48349d=this['x']+this[_0x2facf1(0x43f)][_0x2facf1(0x5e6)],_0xc93f2b=this['y']-this[_0x2facf1(0x43f)]['up'],_0x52d75c=this['y']+this['_addedHitbox'][_0x2facf1(0x25e)];return _0x2abded<=_0x5c2d85&&_0x19d51e<=_0x48349d&&_0xc93f2b<=_0x49a295&&_0x1525cd<=_0x52d75c;}}_0x35df94['x']+=Math['min'](this['iconSize'](),ImageManager[_0x2facf1(0x210)])+0x4;},Window_EventLabel[_0x255dc2(0x301)]['drawIcon']=function(_0x220643,_0x31c281,_0x5b1034){const _0x166465=_0x255dc2,_0x29a5a4=ImageManager[_0x166465(0x575)]('IconSet'),_0x22274c=ImageManager[_0x166465(0x210)],_0x4d82a5=ImageManager['iconHeight'],_0x3e84f4=_0x220643%0x10*_0x22274c,_0x314d77=Math[_0x166465(0x389)](_0x220643/0x10)*_0x4d82a5,_0x5e7fdd=Math['min'](this[_0x166465(0x190)]()),_0x26dd1f=Math[_0x166465(0x516)](this['iconSize']());this[_0x166465(0x4f3)][_0x166465(0x5c2)](_0x29a5a4,_0x3e84f4,_0x314d77,_0x22274c,_0x4d82a5,_0x31c281,_0x5b1034,_0x5e7fdd,_0x26dd1f);},Window_EventLabel[_0x255dc2(0x301)][_0x255dc2(0x190)]=function(){const _0x255def=_0x255dc2;return VisuMZ[_0x255def(0x1ab)][_0x255def(0x61c)][_0x255def(0x45b)][_0x255def(0x1d9)];};