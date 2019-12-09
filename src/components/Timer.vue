<script type="text/x-template" id="app-header">
  <header>
    <div class="container">
      <div class="nav">
        <div class="nav-logo">Pomodoro Clock</div>
        <button @click="toggleSidebar" class="nav-toggle">
          <svg width="22" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M1 0h20a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" fill="#FFF" fill-rule="evenodd"/></svg>
        </button>
        <app-sidebar
          v-show="isSidebarOpen"
          :init-work="initWork"
          :init-short-break="initShortBreak"
          :is-sidebar-open="isSidebarOpen"
          @change="filterChange"
          @toggle="toggleSidebar"
          @reset="$emit('reset')"
        ></app-sidebar>
      </div>
    </div>
  </header>
</script>

<script type="text/x-template" id="app-sidebar">
  <transition
    name="sidebar"
    enter-active-class="sidebar--show"
  >
    <div class="sidebar">
      <button @click="$emit('toggle')" class="sidebar-toggle">
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M5.586 7L.636 2.05A1 1 0 0 1 2.05.636L7 5.586l4.95-4.95a1 1 0 0 1 1.414 1.414L8.414 7l4.95 4.95a1 1 0 0 1-1.414 1.414L7 8.414l-4.95 4.95A1 1 0 0 1 .636 11.95L5.586 7z" fill="#333" fill-rule="evenodd"/></svg>
      </button>

      <div class="filter">
        <span class="filter__title">work</span>
        <div class="filter__time">{{ initWork }}</div>
        <input @change="handleChange" :value="initWork" data-type="work" class="filter__input" type="range" min="1" max="120">
      </div>

      <div class="filter">
        <span class="filter__title">short break</span>
        <div class="filter__time">{{ initShortBreak }}</div>
        <input @change="handleChange" :value="initShortBreak" data-type="short-break"  class="filter__input" type="range" min="1" max="120">
      </div>

      <!-- <div class="filter" v-for="filter in filters" :key="filter.id">
        <span class="filter__title">{{ filter.title }}</span>
        <div class="filter__time">{{ filter.default }}</div>
        <input @change="handleChange" :data-type="filter.title | hyphen " class="filter__input" :min="filter.min" :max="filter.max" v-model="myComputedInit" type="range"/>
      </div> -->

      <button @click="reset" class="filter__reset-btn">Reset to defaults</button>
    </div>
  </transition>
</script>

<script type="text/x-template" id="app-main">
  
  <main class="site__content">
    <div class="container">
      <div class="timer">
        <span class="timer__session js-session">{{ isBreakTime ? 'break' : 'work' }}</span>
        <span class="timer__countdown js-countdown">{{`${minutes}:${seconds}`}}</span>
      </div>
    </div>

    <app-modal v-if="isModalOpen" @close="closeModal">
      <h3 slot="header">Pomodoro</h3>
      <p slot="body">The pomodoro technique is a time management method that uses a timer to break down work into intervals separated by short breaks.</p>
    </app-modal>
    
  </main>
  
</script>

<script type="text/x-template" id="app-modal">
  <transition name="modal">
    <div class="modal">
      <div class="modal__inner flex-center">
        <div class="modal__content">
          <div class="modal-header">
            <slot name="header"></slot>
            <button @click="$emit('close')" class="modal__close">
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M5.586 7L.636 2.05A1 1 0 0 1 2.05.636L7 5.586l4.95-4.95a1 1 0 0 1 1.414 1.414L8.414 7l4.95 4.95a1 1 0 0 1-1.414 1.414L7 8.414l-4.95 4.95A1 1 0 0 1 .636 11.95L5.586 7z" fill="#333" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
        <div @click="$emit('close')" class="modal__overlay"></div>
      </div>
    </div>
  </transition>
</script>

<script type="text/x-template" id="app-footer">
  <footer>
    <div class="container">
      <div class="controls">

        <button @click="reset" title="reset" class="btn-sm">
          <svg width="16" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.023c4.398 0 8 3.556 8 7.954 0 4.397-3.602 8-8 8s-8-3.603-8-8h2.012A5.97 5.97 0 0 0 8 17.965a5.97 5.97 0 0 0 5.988-5.988A5.97 5.97 0 0 0 8 5.988v4.024L2.994 5.006 8 0v4.023z" fill="#FFF" fill-rule="nonzero"/></svg>
        </button>

        <button @click="toggleTimer" class="btn-md">
          <span v-if="isTimerActive" class="flex-center">
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M8.016.016H12v13.968H8.016V.016zM0 13.984V.016h3.984v13.968H0z" fill="#FFF" fill-rule="nonzero"/></svg>
          </span>
          <span v-else class="flex-center">
            <svg width="14" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l14 9-14 9z" fill="#FFF" fill-rule="nonzero"/></svg>
          </span>
        </button>

        <button title="info" class="btn-sm" @click="toggleModal">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.016 7V4.984h1.968V7H9.016zM10 18.016c4.406 0 8.016-3.61 8.016-8.016 0-4.406-3.61-8.016-8.016-8.016-4.406 0-8.016 3.61-8.016 8.016 0 4.406 3.61 8.016 8.016 8.016zm0-18A9.963 9.963 0 0 1 19.984 10 9.963 9.963 0 0 1 10 19.984 9.963 9.963 0 0 1 .016 10 9.963 9.963 0 0 1 10 .016zm-.984 15v-6h1.968v6H9.016z" fill="#FFF" fill-rule="nonzero"/></svg>
        </button>
      </div>
    </div>
  </footer>
</script>

<div id="app" class="site" :class="{'site--break': isBreakTime}">

  <app-header
    :init-work="initWork"
    :init-short-break="initShortBreak"
    @reset="resetSettings"
    @change="handleChange($event)"
  ></app-header>

  <app-main
    :is-modal-open="isModalOpen"
    :is-break-time="isBreakTime"
    :minutes="minutes"
    :seconds="seconds"
    @close-modal="toggleModal"
  ></app-main>

  <app-footer
    :is-timer-active="isTimerActive"
    @reset="resetUI"
    @toggle-timer="toggleTimer"
    @toggle-modal="toggleModal"
  ></app-footer>
  
</div> <!-- /#app -->
<script>
  

Vue.component('app-header', {
  props: [
    'initWork',
    'initShortBreak',
    'initLongBreak',
    'initRound',
  ],
  data() {
    return {
      isSidebarOpen: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    filterChange(data) {
      this.$emit('change', data);
    }
  },
  template: '#app-header',
  components: {
    'app-sidebar': {
      props: [
        'initWork',
        'initShortBreak',
        'isSidebarOpen',
      ],
      methods: {
        reset() {
          this.$emit('reset');
        },
        handleChange(event) {
          let data = event.target.dataset.type || e.srcElement.dataset.type;
          let value = Number(event.target.value) || Number(event.srcElement.value);

          this.$emit('change', { data: data, value: value });
        }
      },
      template: '#app-sidebar'
    }
  }
});

Vue.component('app-main', {
  props: [
    'isModalOpen',
    'isBreakTime',
    'minutes',
    'seconds',
  ],
  methods: {
    closeModal: function() {
      this.$emit('close-modal');
    }
  },
  components: {
    'app-modal': {
      template: '#app-modal'
    }
  },
  template: '#app-main'
});

Vue.component('app-footer', {
  props: [
    'isTimerActive',
  ],
  methods: {
    toggleTimer() {
      this.$emit('toggle-timer');
    },
    reset() {
      this.$emit('reset');
    },
    toggleModal() {
      this.$emit('toggle-modal');
    }
  },
  template: '#app-footer'
});

let vm = new Vue({
  el: '#app',
  data: {
    // Settings
    initWork: 25,
    initShortBreak: 5,

    // App state
    isBreakTime: false,
    isTimerActive: false,
    minutes: 25,
    seconds: '00',
    timer: null,
    round: 0,

    // UI
    isModalOpen: false,
  },
  methods: {

    toggleModal: function() {
      this.isModalOpen = !this.isModalOpen;
    },

    resetSettings() {
      this.initWork= 25;
      this.initShortBreak= 5;
      this.isBreakTime ? this.minutes = this.initShortBreak : this.minutes = this.initWork;
    },

    resetUI() {
      this.isBreakTime = false;
      this.isTimerActive = false;
      this.minutes = this.initWork;
      this.seconds = '00';
      clearInterval(this.timer);
    },

    toggleTimer: function() {
      let self = this;

      function countDown() {

        let seconds = Number(self.$data.seconds);
        let minutes = self.minutes;
        let isBreak = self.isBreakTime;

        if (seconds === 0) {
          if (minutes === 0) { // End of cycle => switch to break / work
            isBreak ? self.minutes = self.initWork : self.minutes = self.initShortBreak;
            self.isBreakTime = !self.isBreakTime;

          } else { // Remove minute + start counting down from 60 seconds again
            self.minutes--;
            self.seconds = '59';
          }
        } else { // Remove seconds + if less than 10 prepend 0
          seconds <= 10 ? self.seconds = `0${self.seconds - 1}` : self.seconds = `${self.seconds - 1}`;
        }
      }

      // toggle timer
      self.isTimerActive ? clearInterval(self.timer) : self.timer = setInterval(countDown, 1000);
      self.isTimerActive = !self.isTimerActive;
    },

    handleChange: function(obj) {

      let data = obj.data;
      let value = obj.value;

      switch(data) {
        case "work":
          this.initWork = value;

          if (!this.isBreakTime) {
            this.minutes = value;
            this.seconds = '00';
          }

          break;
        case "short-break":
          this.initShortBreak = value;

          if (this.isBreakTime) {
            this.minutes = value;
            this.seconds = '00';
          }

          break;
      }
    },
  },
});
</script>


<style scoped>
$primary: #d9534f;
$secondary: #3eab45;
$white: #fff;
$text: #333;

@import url('https://fonts.googleapis.com/css?family=Pacifico');

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Avenir Next', -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}

// helper 
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

// Layout
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: $primary;
  transition: background-color .15s ease;
}

.site--break {
  background-color: $secondary;
}

.site__content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  padding: 0 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

// Header
.nav {
  display: flex;
  height: 3.625rem;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: "Pacifico", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1.5rem;
}

.nav-toggle {
  height: 100%;
}

// Sidebar
.sidebar {
  padding: 77px 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 256px;
  height: 100vh;
  background-color: #fff;
  color: #333;
  will-change: transform;
  overflow-y: auto;
  z-index: 4;
  transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
}


.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);

}

.sidebar-enter,
.sidebar-leave-to {
  transform: translateX(100%);
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 5px;
  right: 16px;
  padding: 0;
  width: 48px;
  height: 48px;
}

.filter {
  margin-bottom: 24px;
}

.filter__title {
  color: #333;
}

.filter__time {
  color: #474747;
}

.filter__reset-btn {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
}

/* input[type=range] reset */
input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}
/* input[type=range] custom
 * THUMB
 */

/* Special styling for WebKit/Blink */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #d9534f;
  cursor: pointer;
  margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  border: 0;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #d9534f;
  cursor: pointer;
}

/* All the same stuff for IE */
input[type=range]::-ms-thumb {
  border: 0;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #d9534f;
  cursor: pointer;
}

/* input[type=range] custom
 * TRACK
 */

 input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: #E1E1E1;
  border: 0;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #E1E1E1;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: #E1E1E1;
  border: 0;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #E1E1E1;
  border: 0;
}
input[type=range]:focus::-ms-fill-lower {
  background: #E1E1E1;
}
input[type=range]::-ms-fill-upper {
  background: #E1E1E1;
  border: 0;
  border-radius: 0;
  box-shadow: 0;
}
input[type=range]:focus::-ms-fill-upper {
  background: #E1E1E1;
}

// Main
.timer {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  max-width: 224px;
  height: 224px;
  border: 4px solid $white;
  border-radius: 50%;
  
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  &::before {
    width: 120%;
    height: 120%;
  }
  
  &::after {
    width: 80%;
    height: 80%;
  }
}

.timer__session {
  font-weight: 500;
}

.timer__countdown {
  font-size: 2.5rem;
}

// Footer
button {
  padding: 0;
  color: $white;
  font-family: inherit;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  outline: 0;
  user-select: none;
  transition: border-color .15s ease;
  
  &:not(:disabled) {
    cursor: pointer;
  }
}

.controls {
  padding-bottom: 24px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.btn-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: calc(3rem + 4px);
  height: calc(3rem + 4px);
  line-height: 3rem;
  border: 2px solid rgba(255, 255, 255, .25);
  border-radius: 50%;
}

.btn-md {
  margin: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: calc(4rem + 4px);
  height: calc(4rem + 4px);
  line-height: 3rem;
  border: 2px solid rgba(255, 255, 255, .25);
  border-radius: 50%;
}

.btn-sm:hover,
.btn-md:hover {
  border-color: #fff;
}

// Modal

.modal {
  position: fixed;
  display: block;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 1050;
  transition: all .3s ease;
}

.modal__inner {
  position: relative;
  top: 0;
  right: 0;
  width: auto;
  height: calc(100vh - 3em);
  max-width: 768px;
  margin: 1.5em auto;
  padding: 0 1em;
}

.modal__content {
  padding: 1rem 0;
  position: relative;
  width: 100%;
  background-color: $white;
  color: #333;
  border-radius: 4px;
  transition: all .3s ease;
  z-index: 1050;
}

.modal-header,
.modal-body,
.modal-footer {
  padding: 1em;
}

.modal-header > h3,
.modal-body > h3,
.modal-footer > h3 {
  margin: 0;
}

.modal__close {
  position: absolute;
  padding: 1em;
  top: 0;
  right: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  user-select: none;
}

.modal-body {
  text-align: left;
}

.modal__overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  opacity: .64;
  transition: opacity .3s ease;
  z-index: 1040;
}

.modal-enter,
.modal-enter .modal__overlay,
.modal-leave-active .modal__overlay {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__content,
.modal-leave-active .modal__content {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
</style>