// Main Genoverse configuration
var genoverseConfig = {
  container      : '#genoverse',
  width          : 800,
  chromosomeSize : 249250621, // chromosome 1, human
  chr            : 1,
  start          : 145507100,
  end            : 145508000,
  plugins        : [ 'controlPanel', 'trackControls', 'resizer', 'tooltips' ],
  tracks         : defaultTracks,
  tracksLibrary  : tracksLibrary,
};