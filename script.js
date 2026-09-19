const $ = (selector) => document.querySelector(selector);
const story = $('#story');
const result = $('#result');
const menuButton = $('#menuButton');
const siteNav = $('#siteNav');

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const profiles = [
  {
    keys: ['otp', 'ngân hàng', 'link', 'tài khoản', 'đăng nhập'],
    title: 'Nguy cơ cao: giả danh ngân hàng',
    summary: 'Tình huống có dấu hiệu giả mạo ngân hàng để lấy thông tin đăng nhập hoặc mã OTP.',
    signals: [
      'Yêu cầu bấm vào đường link không rõ nguồn gốc.',
      'Đòi OTP/mật khẩu — thông tin ngân hàng không bao giờ được yêu cầu qua cuộc gọi hay tin nhắn.',
      'Dùng lý do “tài khoản lỗi” để tạo áp lực.'
    ],
    actions: [
      'Không bấm link, không cung cấp OTP hoặc mật khẩu.',
      'Tự tìm số tổng đài chính thức trên website/app ngân hàng và gọi xác minh.',
      'Nếu đã nhập thông tin, gọi ngân hàng ngay để khoá tài khoản.'
    ],
    risk: 92,
    badge: 'MỨC ĐỘ: CAO'
  },
  {
    keys: ['công an', 'cơ quan', 'vụ án', 'xác minh', 'chuyển tiền'],
    title: 'Nguy cơ cao: giả danh cơ quan',
    summary: 'Đây là thủ đoạn gây sợ hãi để nạn nhân chuyển tiền “xác minh”.',
    signals: [
      'Tạo áp lực bằng câu chuyện liên quan đến pháp luật.',
      'Yêu cầu chuyển tiền hoặc cài phần mềm lạ.',
      'Làm việc qua điện thoại thay vì giấy mời/kênh chính thức.'
    ],
    actions: [
      'Dừng cuộc gọi và không chuyển tiền.',
      'Không cài bất kỳ ứng dụng nào từ người gọi.',
      'Tự liên hệ cơ quan công an địa phương qua số chính thức nếu cần xác minh.'
    ],
    risk: 95,
    badge: 'MỨC ĐỘ: RẤT CAO'
  },
  {
    keys: ['việc', 'nhiệm vụ', 'hoa hồng', 'nạp tiền', 'cộng tác'],
    title: 'Nguy cơ cao: lừa đảo việc làm',
    summary: '“Làm nhiệm vụ” và nạp tiền để nhận hoa hồng là dấu hiệu rất thường gặp của lừa đảo.',
    signals: [
      'Hứa thu nhập cao, việc đơn giản.',
      'Bắt nạp tiền/đặt cọc để bắt đầu hoặc rút tiền.',
      'Kẻ lừa đảo dùng thành tích giả để tạo lòng tin.'
    ],
    actions: [
      'Không nạp tiền, kể cả khi họ cho rút một khoản nhỏ ban đầu.',
      'Không cung cấp CCCD, tài khoản ngân hàng hoặc ảnh khuôn mặt.',
      'Lưu lại nội dung để cảnh báo người thân.'
    ],
    risk: 88,
    badge: 'MỨC ĐỘ: CAO'
  },
  {
    keys: ['người thân', 'mẹ', 'con', 'gấp', 'giọng'],
    title: 'Nguy cơ cao: giả người thân',
    summary: 'Giọng nói, hình ảnh và tài khoản mạng xã hội đều có thể bị giả để nhờ chuyển tiền.',
    signals: [
      'Yêu cầu chuyển tiền khẩn cấp.',
      'Liên hệ bằng số/tài khoản lạ.',
      'Không thể xác minh bằng một cuộc gọi video độc lập.'
    ],
    actions: [
      'Gọi lại số cũ hoặc gọi video trực tiếp cho người thân.',
      'Dùng câu hỏi bí mật chỉ gia đình biết.',
      'Không chuyển tiền trước khi xác minh qua kênh khác.'
    ],
    risk: 90,
    badge: 'MỨC ĐỘ: CAO'
  }
];

function evaluate(text) {
  const lower = text.toLowerCase();

  return profiles.find((profile) => profile.keys.some((key) => lower.includes(key))) || {
    title: 'Cần thận trọng và kiểm tra thêm',
    summary: 'Chưa đủ dấu hiệu để kết luận, nhưng tình huống lạ cần được xác minh độc lập trước khi bạn làm bất kỳ việc gì.',
    signals: [
      'Người lạ đang chủ động liên hệ.',
      'Có yêu cầu khiến bạn cần quyết định ngay.',
      'Bạn chưa thể kiểm tra danh tính qua kênh chính thức.'
    ],
    actions: [
      'Tạm dừng: không bấm link, cài app hoặc chuyển tiền.',
      'Tự gọi số chính thức của đơn vị/người liên quan để xác minh.',
      'Hỏi một người thân tin cậy trước khi ra quyết định.'
    ],
    risk: 64,
    badge: 'MỨC ĐỘ: VỪA PHẢI'
  };
}

function updateRiskMeter(risk, badge) {
  const fill = $('#riskFill');
  const score = $('#riskScore');
  const riskBadge = $('#riskBadge');

  fill.style.width = `${risk}%`;
  fill.style.background = risk >= 85 ? '#df5356' : risk >= 65 ? '#f5a623' : '#4a9d4a';
  score.textContent = `${risk}/100`;
  riskBadge.textContent = badge;
}

function diagnose() {
  const text = story.value.trim();
  if (!text) {
    story.focus();
    story.setAttribute('aria-invalid', 'true');
    notice('Hãy kể lại tình huống trước khi kiểm tra.');
    return;
  }
  story.removeAttribute('aria-invalid');

  const profile = evaluate(text);

  $('#riskTitle').textContent = profile.title;
  $('#summary').textContent = profile.summary;
  $('#signals').innerHTML = profile.signals.map((signal) => `<li>${signal}</li>`).join('');
  $('#actions').innerHTML = profile.actions.map((action) => `<li>${action}</li>`).join('');

  updateRiskMeter(profile.risk, profile.badge);

  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

$('#diagnose').addEventListener('click', diagnose);

const storyButtons = document.querySelectorAll('[data-story]');
storyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    story.value = button.dataset.story;
    story.focus();
  });
});

$('#fontButton').addEventListener('click', (event) => {
  document.body.classList.toggle('large');
  event.target.textContent = document.body.classList.contains('large') ? 'A− Chữ thường' : 'A+ Chữ lớn';
});

const toast = $('#toast');

const speak = () => {
  const text = `${$('#riskTitle').textContent}. ${$('#summary').textContent}. ${[...$('#actions').querySelectorAll('li')].map((item) => item.textContent).join('. ')}`;
  if (!('speechSynthesis' in window)) {
    notice('Trình duyệt này chưa hỗ trợ đọc kết quả.');
    return;
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
};

const copy = async () => {
  const text = `CẢNH BÁO TỪ PHÒNG KHÁM SỐ\n${$('#riskTitle').textContent}\n${$('#summary').textContent}\nViệc cần làm: ${[...$('#actions').querySelectorAll('li')].map((item) => item.textContent).join('; ')}`;

  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
    notice('Đã sao chép hướng dẫn — bạn có thể gửi cho người thân.');
  } catch (error) {
    console.warn('Không thể sao chép hướng dẫn:', error);
    notice('Hãy chọn và sao chép nội dung kết quả để gửi người thân.');
  }
};

function notice(text) {
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
}

$('#readResult').addEventListener('click', speak);
$('#copyResult').addEventListener('click', copy);

const phrases = ['Cây bàng trước ngõ', 'Bữa cơm chủ nhật', 'Chiếc áo màu xanh', 'Mật mã con mèo', 'Chuyến đi Đà Lạt'];
const saved = localStorage.getItem('family-code');
if (saved) $('#familyCode').textContent = 'Câu xác minh: ' + saved;

$('#createCode').addEventListener('click', () => {
  const code = phrases[Math.floor(Math.random() * phrases.length)];
  localStorage.setItem('family-code', code);
  $('#familyCode').textContent = 'Câu xác minh: ' + code;
  notice('Đã tạo câu xác minh. Hãy ghi nhớ và chỉ chia sẻ với gia đình.');
});

if (localStorage.getItem('safety-pledge')) $('#pledgeState').textContent = '✓ Đã hoàn thành';

$('#pledgeButton').addEventListener('click', () => {
  localStorage.setItem('safety-pledge', 'true');
  $('#pledgeState').textContent = '✓ Đã hoàn thành';
  notice('Tốt lắm! Hãy nhắc lại ba quy tắc này cho người thân.');
});

$('#panicButton').addEventListener('click', () => $('#panic').showModal());
$('#panicClose').addEventListener('click', () => $('#panic').close());
