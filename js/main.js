// 获取作品列表
async function fetchWorks() {
    try {
        const response = await fetch('/api/works');
        const works = await response.json();
        
        const worksGrid = document.querySelector('.works-grid');
        worksGrid.innerHTML = works.map(work => `
            <div class="work-item">
                <img src="${work.image}" alt="${work.title}">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('获取作品失败:', error);
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    fetchWorks();
}); 