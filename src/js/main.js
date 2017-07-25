window.$ = window.jQuery = require('jquery');

import SongsService from './SongsService.js';
import UIManager from './UIManager.js';
import SongsListManager from './SongsListManager.js';
import SongFormManager from './SongFormManager';

const songsService = new SongsService('/songs');
const songListUIManager = new UIManager('.songs-list');

const songsListManager = new SongsListManager(songsService, songListUIManager);
songsListManager.init();
 
const songFormManager = new SongFormManager('.song-form', songsService);
songFormManager.init();