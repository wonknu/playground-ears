/**
 * Creates an instance of App.
 * this is the main application file, which one that init project bind event, etc...
 * Copyright (C) 2013 - Adfab - nicolas labbé 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * constante used by the application
 * never call those variable except for NS which
 * handle the application namespace
 */
var Adfab = Adfab || {},
    
    NS = {},

    _plgd_settings = _plgd_settings || {},
    
    pl_config = {
        debug: true,
        url: 'localhost/Dropbox/work/playground/',
        ns: 'Adfab.playground'
    };