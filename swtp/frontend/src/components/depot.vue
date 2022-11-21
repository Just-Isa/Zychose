// DROPZONE MY BELOVED


<div class="dropzone">
    <div
      v-for="tile in tiles"
      :key="tile"
      class="tile-el"
      draggable="true"
      id="Dragme"
      @dragstart="startDrag($event, tile)"
    >
      {{ tile.id }}
    </div>
  </div>

    
    
    


<div class="dropzoneTest">
        <div
          v-for="tile in tiles"
          :key="tile"
          class="tile-el"
          draggable="true"
          id="Dragme"
          @dragstart="startDrag($event, tile)"
        >
          {{ tile.id }}
        </div>
      </div>
  
  


  const tiles = ref([
  { id: 1, title: "kreuzung"},
  { id: 2, title: "straß"},
  { id: 3, title: "sackgasse"},
  { id: 4, title: "kurva"},
])




////// TILES ALS KOMPONENTNEN


<div class="dropzone">
      <div
        class="tile-el"
        draggable="true"
        id="Dragme"
        @dragstart="startDrag($event, tile)"
      >
        <Tile :name=2 :typeid="1"/>
        <Tile :name=3 :typeid="2"/>
        <Tile :name=7 :typeid="3"/>
      </div>
    </div>
