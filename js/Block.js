CBrowse.Track.Block = CBrowse.Track.extend({
  defaults: {
    height : 10,
    bump   : false
  },
  
  positionData: function (data, edges, func) {
    var feature, start, end, x, y, width, bounds, bump, j, k, noLabel;
    var labels   = this.forceLabels || (data.length && data[0].label && this.cBrowse.length < 1e7) ? 1 : 0;
    var height   = this.height;
    var scale    = this.scale > 1 ? this.scale : 1;
    var seen     = {};
    var features = {};
    
    this.colorOrder = [];
    
    for (var i = 0; i < data.length; i++) {
      feature = data[i];
      
      if (seen[feature.id]) {
        continue;
      }
      
      seen[feature.id] = 1;
      
      start   = feature.scaledStart - edges.start;
      end     = feature.scaledEnd   - edges.start;
      x       = feature.scaledStart;
      y       = feature.y || 0;
      bounds  = feature.bounds;
      width   = start > end ? 1 : (end - start) || scale;
      noLabel = !feature.label || (scale > 1 && start < 0);
      
      if (!bounds) {
        bounds = [{ x: x, y: y, w: width, h: this.featureHeight + (2 * labels) }];
        
        if (labels) {
          bounds.push({ x: x, y: y + bounds[0].h, w: Math.ceil(this.context.measureText(feature.label).width) + 1, h: this.fontHeight + 2 });
        }
        
        if (this.bump) {
          do {
            bump = false;
            j    = bounds.length;
            
            while (j--) {
              if ((this.rtree.search(bounds[j])[0] || feature).id !== feature.id) {
                k = bounds.length;
                
                while (k--) {
                  bounds[k].y += bounds[j].h;
                }
                
                bump = true;
              }
            }
          } while (bump);
        }
      }
      
      if (!features[feature.color]) {
        features[feature.color] = [];
        
        if (feature.order) {
          this.colorOrder[feature.order] = feature.color;
        }
      }
      
      this.rtree.insert(bounds[0], feature);
      
      if (scale > 1) {
        start = Math.max(start, 0);
        end   = Math.min(end, this.cBrowse.fullWidth);
        width = end - start;
      }
      
      features[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
      
      if (labels) {
        bounds[1].h += 2;
        this.rtree.insert(bounds[1], feature);
        
        if (!noLabel) {
          features[feature.color].push([ 'fillText', [ feature.label, start, bounds[1].y ] ]);
        }
      }
      
      height = Math.max(bounds[labels].y + bounds[labels].h, height);
      
      if (
        (feature.scaledStart + Math.max(width, labels ? bounds[1].w : 0) > edges.end) ||
        (feature.scaledStart < edges.start)
      ) {
        this.overlaps[func]($.extend({}, feature, { bounds: bounds }));
      }
    }
    
    this.fullHeight = height;
    
    return features;
  }
});
