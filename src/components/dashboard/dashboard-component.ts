import Navigation from '../nav/index.vue'

const people = [
  {
    name: 'The Event Title',
    location: 'The Location of the Event',
    date: '17th May 2020 at 3:00PM',
    tickets: '20',
    description: 'Some very long or short Event description for the purposes of explaining the event in more detail',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export default {  
  data() {
    return {

    };
  },
  components: {
    Navigation
  },
  setup() {
    return {
      people
    }
  },
  methods: {
  }
};
