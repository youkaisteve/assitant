'use strict';
module.exports = (pandora) => {
    pandora.fork('assitant', require.resolve('midway/server'));

    /* Custom the number of workers
  pandora
    .process('worker')
    // Change the `worker` process numbers to 2.
    .scale(2);

    // By the way, The default process number is defined as `pandora.dev ? 1 : 'auto'`.
    // Which means if it is in development mode, pandora.js will not launch applications in cluster mode,
    // otherwise it launches applications in cluster mode.
  */
};
