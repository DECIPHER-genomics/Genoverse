
const dompurifyAllowed = { 
    USE_PROFILES: { html: true } ,
    FORCE_BODY: true,
    ADD_TAGS: ['modal', 'btn', 'template' , 'slot'],
  // Whitelist layout attributes
    ADD_ATTR: [
        'v-model', 
        'append-to-body', 
        'backdrop', 
        'ok-text', 
        'cancel-text', 
        'title',
        'slot',
        'modal-info-type',
        'modal-class'
    ]

};


export default dompurifyAllowed;