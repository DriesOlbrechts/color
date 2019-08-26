const { Plugin } = require('powercord/entities');

const getPrefix = () => powercord.api.commands.prefix;

module.exports = class Color extends Plugin {
    startPlugin () {
        this.registerCommand(
          'color',
          [],
          'Get information on a color',
          '{c} [ Color code ]',
          (args) => {
              let hexCode = isHex(args[0])
              let rgbCode = isRGB(args[0])
              
              
              if(hexCode){
                
                let rgb = hexToRgb(args[0])
                let rgbInt = parseInt(rgb.b) | (parseInt(rgb.g) << 8) | (parseInt(rgb.r) << 16);
                rgbInt = rgbInt.toString(10);
                return {
                    send: false,
                    result: {
                      type: 'rich',
                      title: 'Info about this color',
                      fields:[ 
                        {name: 'RGB value',value: rgb.r + ',' + rgb.g + ',' + rgb.b,inline:false},
                        {name: 'hex value',value: args[0],inline:false},
                        {name: 'RGB int value',value: rgbInt,inline:false}
                    
                    ],
                    color: parseInt(args[0].replace(/^#/, ''), 16)
                    }
                  };
              }
              else if(rgbCode){
                
                let RGBArray = args[0].split(',')
                let RGB = RGBArray.map(v => parseInt(v))
                let rgbInt = parseInt(RGB[2]) | (parseInt(RGB[1]) << 8) | (parseInt(RGB[0]) << 16);
                rgbInt = rgbInt.toString(10);
                return {
                    send: false,
                    result: {
                      type: 'rich',
                      title: 'Info about this color',
                      fields:[ 
                        {name: 'RGB value',value: args[0],inline:false},
                        {name: 'hex value',value: rgbToHex(RGB[0],RGB[1],RGB[2]),inline:false},
                        {name: 'RGB int value',value:rgbInt ,inline:false}
                    
                    ],
                    color:parseInt(rgbToHex(RGB[0],RGB[1],RGB[2]).replace(/^#/, ''), 16)
                      
                    }
                  };
              }
              else if(!isNaN(args[0])){
                let hexInt = parseInt(args[0])
                
                let hex = ''
                if(hexInt.toString(16).length === 5){
                 hex = '0' + hexInt.toString(16)
                }
                else if(hexInt.toString(16).length > 5){
                 hex = hexInt.toString(16)
                }
                console.log(hex)
                
                let rgb = hexToRgb(hex)
                return {
                  send: false,
                  result: {
                    type: 'rich',
                    title: 'Info about this color',
                    fields:[ 
                      {name: 'RGB value',value: rgb.r + ',' + rgb.g + ',' + rgb.b,inline:false},
                      {name: 'hex value',value: '#' + hex,inline:false},
                      {name: 'RGB int value',value: args[0],inline:false}
                  
                  ],
                  color: parseInt(hex.replace(/^#/, ''), 16)
                  }
                };
              }
            
            
          }
        );
      }
    
    }
    function isHex(color){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
    }
    function isRGB(color){
        return(/((\d+),\s*(\d+),\s*(\d+)$)/i.test(color))
    }
    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    function hexToRgb(hex) {
      
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      
        result = {
        r: parseInt(result[1], 16).toString(),
        g: parseInt(result[2], 16).toString(),
        b: parseInt(result[3], 16).toString()
      }
      console.log(result)
      return result
    }