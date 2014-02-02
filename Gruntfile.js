var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var isLinux32 = /^linux/.test(process.platform);
var isLinux64 = /^linux64/.test(process.platform);

var os = "unknown";

if (isWin)
    os = "win";
if (isMac)
    os = "mac";
if (isLinux32)
    os = "linux32";
if (isLinux64)
    os = "linux64";

var nwVer = '0.8.4';

var nwExec = "cd cache/" + os + "/" + nwVer + " && nw ../../../src";
console.log(nwExec);
console.log("OS: " + os);

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        less: {
            './public/css/app.css': ['./src/css/app.less']
        },
        nodewebkit: {
            options: {
                version: nwVer,
                build_dir: './',
                mac: isMac,
                win: isWin,
                linux32: isLinux32,
                linux64: isLinux64,
                keep_nw: false,
                zip: false
            },
            src: ['./src/**/*']
        },
        clean: ["./releases/**/*"],
        shell: {
            install: {
                command: function() {
                    return 'bower install && cd src && npm install';
                },
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true
                }
            },
            run: {
                command: function() {
                    return nwExec;
                },
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true
                }

            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['less', 'shell:run']);
    grunt.registerTask('run', ['default']);
    grunt.registerTask('install', ['shell:install', 'nodewebkit']);
    grunt.registerTask('build', ['less', 'nodewebkit']);


};