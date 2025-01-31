<template>
  <div class="d-flex flex-column h-100 bg-light rounded shadow">
    <!-- Chat Header -->
    <div class="bg-primary text-white p-3 rounded-top">
      <h2 class="h5 mb-0">AI Doctor Assistant</h2>
      <p class="small mb-0 opacity-90">How can I help you today?</p>
    </div>

    <!-- Chat Messages Container -->
    <div class="flex-grow-1 overflow-auto p-3" ref="chatContainer">
      <!-- Bot Message -->
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="d-flex"
        :class="
          message.sender === 'user'
            ? 'justify-content-end'
            : 'justify-content-start'
        "
      >
        <div
          :class="
            message.sender === 'user'
              ? 'bg-white text-dark border border-light'
              : 'bg-light text-dark'
          "
          class="w-75 rounded p-3 shadow-sm mb-3"
        >
          <p class="small mb-1">{{ message.text }}</p>
          <span class="text-muted small">{{ message.timestamp }}</span>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="d-flex align-items-center">
        <div class="bg-light rounded-circle p-2">
          <div class="d-flex gap-1">
            <div class="dot bg-primary rounded-circle"></div>
            <div class="dot bg-primary rounded-circle delay-100"></div>
            <div class="dot bg-primary rounded-circle delay-200"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input Area -->
    <div class="border-top p-3 bg-white">
      <div class="d-flex gap-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message here..."
          class="form-control flex-grow-1 rounded"
        />
        <button @click="sendMessage" class="btn btn-primary px-4">Send</button>

        <!-- X-ray Upload Button (for future integration) -->
        <button class="btn btn-success px-3" title="Upload X-ray">
          <i class="fas fa-upload"></i>
        </button>
      </div>

      <!-- Disclaimer -->
      <p class="text-muted small mt-2 mb-0">
        Note: This AI assistant provides general health information only. Always
        consult a doctor.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const messages = ref([
  {
    text: "Hello! I'm your AI Doctor Assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date().toLocaleTimeString(),
  },
]);

const newMessage = ref("");
const isTyping = ref(false);
const chatContainer = ref(null);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  // Add user message
  messages.value.push({
    text: newMessage.value,
    sender: "user",
    timestamp: new Date().toLocaleTimeString(),
  });

  // Simulate bot response
  isTyping.value = true;
  newMessage.value = "";

  // Scroll to bottom
  await nextTick();
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;

  // Simulate API call delay
  setTimeout(async () => {
    messages.value.push({
      text: "Thank you for your message. I'm processing your request...",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    });

    isTyping.value = false;
    await nextTick();
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }, 1500);
};

// Auto-scroll to bottom when messages change
onMounted(() => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
});
</script>

<style scoped>
.dot {
  width: 8px;
  height: 8px;
  animation: bounce 1s infinite;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
