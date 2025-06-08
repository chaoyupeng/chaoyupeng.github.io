// Category switching functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get all category items and content containers
  const categoryItems = document.querySelectorAll('.category-item');
  const contentContainers = document.querySelectorAll('.category-content');
  
  // Function to set active category
  function setActiveCategory(categoryId) {
    // Remove active class from all category items
    categoryItems.forEach(item => {
      item.classList.remove('active');
      item.classList.remove('border-blue-500');
      item.classList.add('border-transparent');
      
      if (item.id === categoryId) {
        // Add active class to clicked category
        item.classList.add('active');
        item.classList.remove('border-transparent');
        item.classList.add('border-blue-500');
        item.classList.remove('bg-gray-200');
        item.classList.add('bg-white');
        item.classList.remove('dark:bg-gray-700');
        item.classList.add('dark:bg-gray-800');
      } else if (!item.classList.contains('active')) {
        // Style inactive items
        item.classList.add('bg-gray-200');
        item.classList.remove('bg-white');
        item.classList.add('dark:bg-gray-700');
        item.classList.remove('dark:bg-gray-800');
      }
    });
    
    // Hide all content containers
    contentContainers.forEach(container => {
      container.classList.add('hidden');
    });
    
    // Show the selected content container
    const contentId = categoryId.replace('category', 'content');
    document.getElementById(contentId).classList.remove('hidden');
  }
  
  // Add click event listener to each category item
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      setActiveCategory(item.id);
    });
  });
  
  // Set the initial active category
  setActiveCategory('category-me');
}); 