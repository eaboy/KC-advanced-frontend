window.$ = window.jQuery = require('jquery');

import SongsService from './SongsService.js';
import UIManager from './UIManager.js';
import SongsListManager from './SongsListManager.js';

const songsService = new SongsService('/songs');
const songListUIManager = new UIManager('.songs-list');

const songsListManager = new SongsListManager(songsService, songListUIManager);
songsListManager.init();
 
