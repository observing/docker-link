'use strict';

/**
 * Constructor for Docker Link helper module.
 *
 * @Constructor
 * @param {Object} options
 * @api public
 */
function Link(options) {
  if (!this) return new Link(options);
  if ('string' === typeof options) options = { prefix: options };

  options = options || {};

  //
  // Prepare empty data object and set prefix.
  //
  this.prefix = (options.prefix || 'OBS_').toUpperCase().trim();
  this.data = {};

  this.read();
}

/**
 * Read prefixed environment variables and parse. This will result in a hash
 * stored in `this.data` per link alias (without the prefix).
 *
 * @returns {Link} Fluent interface
 * @api public
 */
Link.prototype.read = function read() {
  for (var key in process.env) {
    if (~key.indexOf(this.prefix)) this.parse(key, process.env[key]);
  }

  return this;
};

/**
 * Parse all the known environment variables created by Docker.
 *
 * @param {String} key Enviroment variable name
 * @param {Mixed} value Environment variable value
 * @returns {Link} Fluent interface
 * @api private
 */
Link.prototype.parse = function parse(key, value) {
  var keys = key.substring(this.prefix.length).split('_')
    , directive = keys.slice(1);

  //
  // Only allow a specific subset of keys.
  //
  if (!/^NAME$|^PORT$|^PORT_\d+_TCP(_ADDR|_PORT|_PROTO)?$/.test(
    directive.join('_')
  )) return this;

  //
  // Prepare the alias group.
  //
  if (!(keys[0] in this.data)) this.data[keys[0]] = {};

  //
  // Store the value without the port as that is usally variable
  // and hard to reference properly from scripts.
  //
  directive.splice(1, 1);
  this.data[keys[0]][directive.join('_').toLowerCase()] = value;

  return this;
};

/**
 * Get the hash from the stored data.
 *
 * @param {String} key Docker alias without the prefix.
 * @return {Object} Hash with environment values.
 * @api public
 */
Link.prototype.get = function get(key) {
  return this.data[key.toUpperCase()] || {};
};

//
// Expose the constructor
//
module.exports = Link;
