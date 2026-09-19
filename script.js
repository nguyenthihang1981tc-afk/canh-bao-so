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
    title: 'Cần cảnh giác: có thể là giả danh ngân hàng',
    summary: 'Tình huống này có những dấu hiệu thường thấy ở việc mạo danh ngân hàng để lấy thông tin đăng nhập hoặc mã OTP.',
    signals: [
      'Bạn được hướng dẫn bấm vào một đường link chưa rõ nguồn gốc.',
      'Người lạ hỏi OTP hoặc mật khẩu — ngân hàng không yêu cầu những thông tin này qua cuộc gọi hay tin nhắn.',
      'Lý do “tài khoản gặp lỗi” được dùng để khiến bạn vội vàng.'
    ],
    actions: [
      'Bạn hãy tạm dừng, không bấm link và không chia sẻ OTP hoặc mật khẩu.',
      'Tự tìm số tổng đài trên website hoặc ứng dụng chính thức của ngân hàng để xác minh.',
      'Nếu đã lỡ nhập thông tin, hãy liên hệ ngân hàng ngay để được hỗ trợ bảo vệ tài khoản.'
    ],
    risk: 92,
    badge: 'MỨC ĐỘ: CAO'
  },
  {
    keys: ['công an', 'cơ quan', 'vụ án', 'xác minh', 'chuyển tiền'],
    title: 'Cần cảnh giác: có thể là giả danh cơ quan',
    summary: 'Cách liên hệ này có dấu hiệu tạo sợ hãi để thúc giục bạn chuyển tiền với lý do “xác minh”.',
    signals: [
      'Câu chuyện liên quan đến pháp luật được dùng để tạo áp lực.',
      'Bạn được yêu cầu chuyển tiền hoặc cài một phần mềm không rõ nguồn gốc.',
      'Người gọi làm việc qua điện thoại thay vì hướng dẫn bạn đến kênh chính thức.'
    ],
    actions: [
      'Bạn hãy bình tĩnh kết thúc cuộc gọi và chưa chuyển tiền.',
      'Không cài ứng dụng theo hướng dẫn của người gọi.',
      'Nếu cần, hãy tự liên hệ Công an địa phương qua số được công bố chính thức.'
    ],
    risk: 95,
    badge: 'MỨC ĐỘ: RẤT CAO'
  },
  {
    keys: ['việc', 'nhiệm vụ', 'hoa hồng', 'nạp tiền', 'cộng tác'],
    title: 'Cần cảnh giác: lời mời việc làm có dấu hiệu bất thường',
    summary: 'Việc yêu cầu “làm nhiệm vụ” và nạp tiền trước để nhận hoa hồng là dấu hiệu thường gặp của lừa đảo.',
    signals: [
      'Công việc được giới thiệu là đơn giản nhưng thu nhập lại quá hấp dẫn.',
      'Bạn bị yêu cầu nạp tiền hoặc đặt cọc để bắt đầu hay rút tiền.',
      'Những kết quả hoặc lời chứng thực được đưa ra có thể chỉ nhằm tạo lòng tin.'
    ],
    actions: [
      'Bạn đừng nạp tiền, kể cả khi ban đầu họ cho rút một khoản nhỏ.',
      'Không gửi CCCD, thông tin ngân hàng hoặc ảnh khuôn mặt cho người chưa xác minh.',
      'Lưu lại nội dung trao đổi và chia sẻ cảnh báo với người thân nếu cần.'
    ],
    risk: 88,
    badge: 'MỨC ĐỘ: CAO'
  },
  {
    keys: ['người thân', 'mẹ', 'con', 'gấp', 'giọng'],
    title: 'Cần cảnh giác: có thể là mạo danh người thân',
    summary: 'Giọng nói, hình ảnh và tài khoản mạng xã hội đều có thể bị làm giả để tạo lòng tin và nhờ chuyển tiền.',
    signals: [
      'Bạn được nhờ chuyển tiền trong thời gian rất gấp.',
      'Người liên hệ dùng số điện thoại hoặc tài khoản khác thường.',
      'Danh tính chưa được xác minh bằng một cuộc gọi độc lập.'
    ],
    actions: [
      'Gọi lại số điện thoại cũ hoặc gọi video trực tiếp cho người thân.',
      'Dùng một câu hỏi riêng mà chỉ gia đình bạn biết.',
      'Chỉ thực hiện giao dịch sau khi đã xác minh qua một kênh khác.'
    ],
    risk: 90,
    badge: 'MỨC ĐỘ: CAO'
  }
];

function evaluate(text) {
  const lower = text.toLowerCase();

  return profiles.find((profile) => profile.keys.some((key) => lower.includes(key))) || {
    title: 'Mình khuyên bạn nên kiểm tra thêm',
    summary: 'Chưa đủ thông tin để kết luận, nhưng đây vẫn là một tình huống nên được xác minh độc lập trước khi bạn làm bất kỳ điều gì.',
    signals: [
      'Một người hoặc đơn vị chưa được xác minh đang chủ động liên hệ.',
      'Bạn được đề nghị đưa ra quyết định ngay lập tức.',
      'Danh tính và thông tin chưa được đối chiếu qua kênh chính thức.'
    ],
    actions: [
      'Bạn hãy tạm dừng, chưa bấm link, cài ứng dụng hay chuyển tiền.',
      'Tự tìm và gọi số chính thức của đơn vị hoặc người liên quan để xác minh.',
      'Chia sẻ tình huống với một người thân đáng tin trước khi quyết định.'
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
    notice('Bạn hãy kể lại tình huống, mình sẽ cùng bạn xem xét.');
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
  const text = `GỢI Ý AN TOÀN TỪ CẢNH BÁO SỐ\n${$('#riskTitle').textContent}\n${$('#summary').textContent}\nBạn có thể làm: ${[...$('#actions').querySelectorAll('li')].map((item) => item.textContent).join('; ')}`;

  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
    notice('Mình đã sao chép gợi ý. Bạn có thể gửi cho người thân để cùng xem xét.');
  } catch (error) {
    console.warn('Không thể sao chép hướng dẫn:', error);
    notice('Bạn có thể chọn và sao chép phần kết quả để gửi cho người thân.');
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
  notice('Câu xác minh đã được tạo. Hãy ghi nhớ và chỉ chia sẻ với những người trong gia đình.');
});

if (localStorage.getItem('safety-pledge')) $('#pledgeState').textContent = '✓ Đã hoàn thành';

$('#pledgeButton').addEventListener('click', () => {
  localStorage.setItem('safety-pledge', 'true');
  $('#pledgeState').textContent = '✓ Đã hoàn thành';
  notice('Rất tốt. Bạn có thể nhắc lại ba quy tắc này để cả gia đình cùng ghi nhớ.');
});

$('#panicButton').addEventListener('click', () => $('#panic').showModal());
$('#panicClose').addEventListener('click', () => $('#panic').close());
