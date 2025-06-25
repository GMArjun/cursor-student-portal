// Sidebar toggle for mobile
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

function openSidebar() {
  sidebar.classList.add("sidebar-open");
  sidebarBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeSidebar() {
  sidebar.classList.remove("sidebar-open");
  sidebarBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", openSidebar);
}
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", closeSidebar);
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) closeSidebar();
});

// Chat System Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Chat switching functionality
  const chatItems = document.querySelectorAll('.chat-item');
  const chatMessages = document.querySelector('.chat-messages');
  
  chatItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all chat items
      chatItems.forEach(chat => chat.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Update chat header based on selected chat
      updateChatHeader(this);
      
      // Load chat messages (in a real app, this would fetch from server)
      loadChatMessages(this.dataset.chat);
      
      // Clear unread badge
      const badge = this.querySelector('.badge');
      if (badge) {
        badge.style.display = 'none';
      }
    });
  });
  
  // File upload functionality
  const attachFileBtn = document.getElementById('attachFileBtn');
  const fileInput = document.getElementById('fileInput');
  const filePreview = document.querySelector('.file-preview');
  const removeFileBtn = document.getElementById('removeFileBtn');
  
  if (attachFileBtn && fileInput) {
    attachFileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB.');
          return;
        }
        
        // Show file preview
        const fileName = file.name;
        const previewText = filePreview.querySelector('span');
        previewText.textContent = fileName;
        filePreview.style.display = 'block';
      }
    });
    
    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', function() {
        fileInput.value = '';
        filePreview.style.display = 'none';
      });
    }
  }
  
  // Message sending functionality
  const messageInput = document.querySelector('.chat-input textarea');
  const sendButton = document.querySelector('.chat-input .btn-primary');
  
  if (messageInput && sendButton) {
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Send message on Enter (Shift+Enter for new line)
    messageInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Send message on button click
    sendButton.addEventListener('click', function(e) {
      e.preventDefault();
      sendMessage();
    });
  }
  
  // New Chat Modal functionality
  const chatTypeRadios = document.querySelectorAll('input[name="chatType"]');
  const oneToOneOptions = document.getElementById('oneToOneOptions');
  const groupOptions = document.getElementById('groupOptions');
  
  chatTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'one-to-one') {
        oneToOneOptions.style.display = 'block';
        groupOptions.style.display = 'none';
      } else {
        oneToOneOptions.style.display = 'none';
        groupOptions.style.display = 'block';
      }
    });
  });
  
  // Chat search functionality
  const chatSearch = document.querySelector('.chat-sidebar input[placeholder="Search chats..."]');
  if (chatSearch) {
    chatSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const chatList = document.querySelectorAll('.chat-item');
      
      chatList.forEach(chat => {
        const chatName = chat.querySelector('.fw-semibold').textContent.toLowerCase();
        const lastMessage = chat.querySelector('.text-muted.small').textContent.toLowerCase();
        
        if (chatName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
          chat.style.display = 'block';
        } else {
          chat.style.display = 'none';
        }
      });
    });
  }
  
  // Chat filter functionality
  const filterButtons = document.querySelectorAll('.chat-sidebar .nav-pills .nav-link');
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all filter buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter chats based on type
      const filterType = this.textContent.toLowerCase();
      const chatList = document.querySelectorAll('.chat-item');
      
      chatList.forEach(chat => {
        if (filterType === 'all') {
          chat.style.display = 'block';
        } else if (filterType === 'one-to-one' && chat.dataset.chat === 'one-to-one') {
          chat.style.display = 'block';
        } else if (filterType === 'group' && chat.dataset.chat === 'group') {
          chat.style.display = 'block';
        } else {
          chat.style.display = 'none';
        }
      });
    });
  });
});

// Helper functions
function updateChatHeader(chatItem) {
  const chatHeader = document.querySelector('.chat-header');
  if (!chatHeader) return;
  
  const chatName = chatItem.querySelector('.fw-semibold').textContent;
  const chatImage = chatItem.querySelector('img');
  const isOnline = chatItem.querySelector('.bg-success') !== null;
  
  const headerName = chatHeader.querySelector('h6');
  const headerImage = chatHeader.querySelector('img');
  const onlineStatus = chatHeader.querySelector('small');
  
  if (headerName) headerName.textContent = chatName;
  if (headerImage && chatImage) headerImage.src = chatImage.src;
  if (onlineStatus) {
    onlineStatus.textContent = isOnline ? 'Online' : 'Offline';
    onlineStatus.className = isOnline ? 'text-success' : 'text-muted';
  }
}

function loadChatMessages(chatType) {
  // In a real application, this would fetch messages from the server
  // For now, we'll just scroll to the bottom of the messages
  const messagesContainer = document.querySelector('.chat-messages');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

function sendMessage() {
  const messageInput = document.querySelector('.chat-input textarea');
  const fileInput = document.getElementById('fileInput');
  const filePreview = document.querySelector('.file-preview');
  
  if (!messageInput || !messageInput.value.trim()) return;
  
  const messageText = messageInput.value.trim();
  const hasFile = fileInput && fileInput.files.length > 0;
  
  // Create message element
  const messageElement = createMessageElement(messageText, hasFile);
  
  // Add message to chat
  const messagesContainer = document.querySelector('.chat-messages');
  if (messagesContainer) {
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Clear input and file
  messageInput.value = '';
  messageInput.style.height = 'auto';
  if (fileInput) fileInput.value = '';
  if (filePreview) filePreview.style.display = 'none';
  
  // Simulate typing indicator (remove after 2 seconds)
  setTimeout(() => {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.closest('.message').remove();
    }
  }, 2000);
}

function createMessageElement(messageText, hasFile = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message outgoing mb-3';
  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="d-flex gap-2 justify-content-end">
      <div class="message-content text-end">
        <div class="message-bubble bg-primary text-white rounded-3 p-3 shadow-sm" style="max-width: 70%;">
          <p class="mb-0">${messageText}</p>
          ${hasFile ? '<div class="message-image rounded-2 overflow-hidden mb-2"><img src="https://placehold.co/400x300/4CAF50/white?text=Uploaded+Image" alt="Uploaded Image" class="w-100"></div>' : ''}
        </div>
        <small class="text-muted mt-1 d-block">${currentTime}</small>
      </div>
      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Kate" class="rounded-circle" width="32" height="32">
    </div>
  `;
  
  return messageDiv;
}
