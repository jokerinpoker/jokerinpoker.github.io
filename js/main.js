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
                <a href="${work.link}" target="_blank" class="work-link">查看项目</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('获取作品失败:', error);
    }
}

// 处理联系表单提交
async function handleContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert('消息已发送！');
            event.target.reset();
        } else {
            alert('发送失败，请稍后重试。');
        }
    } catch (error) {
        console.error('提交表单失败:', error);
        alert('发送失败，请稍后重试。');
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    fetchWorks();
    
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}); 