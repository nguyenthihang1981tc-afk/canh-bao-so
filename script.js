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

const voiceInputButton = $('#voiceInputButton');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!voiceInputButton) {
  console.warn('Không tìm thấy nút nhập bằng giọng nói.');
} else if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    voiceInputButton.classList.add('is-listening');
    voiceInputButton.setAttribute('aria-pressed', 'true');
    voiceInputButton.innerHTML = '<span aria-hidden="true">●</span> Đang nghe…';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    if (!transcript) return;
    story.value = story.value.trim()
      ? `${story.value.trim()} ${transcript}`
      : transcript;
    story.dispatchEvent(new Event('input', { bubbles: true }));
  };

  recognition.onerror = (event) => {
    const messages = {
      'not-allowed': 'Bạn chưa cấp quyền micro. Hãy cho phép micro rồi thử lại.',
      'audio-capture': 'Chưa tìm thấy micro. Hãy kiểm tra thiết bị rồi thử lại.',
      'no-speech': 'Mình chưa nghe rõ. Bạn hãy nói lại chậm hơn.'
    };
    if (event.error !== 'aborted') notice(messages[event.error] || 'Không thể nhận diện giọng nói lúc này.');
  };

  recognition.onend = () => {
    voiceInputButton.classList.remove('is-listening');
    voiceInputButton.setAttribute('aria-pressed', 'false');
    voiceInputButton.innerHTML = '<span aria-hidden="true">●</span> Nói để nhập';
  };

  voiceInputButton.addEventListener('click', () => {
    if (voiceInputButton.getAttribute('aria-pressed') === 'true') {
      recognition.stop();
      return;
    }
    recognition.start();
  });
} else {
  voiceInputButton.addEventListener('click', () => {
    notice('Trình duyệt này chưa hỗ trợ nhập bằng giọng nói. Bạn có thể dùng Chrome hoặc Edge phiên bản mới.');
  });
}

const linkForm = $('#linkForm');
const linkInput = $('#linkInput');
const linkResult = $('#linkResult');

const recognizedDomains = {
  'youtube.com': 'YouTube',
  'youtu.be': 'YouTube',
  'google.com': 'Google',
  'facebook.com': 'Facebook',
  'messenger.com': 'Messenger',
  'zalo.me': 'Zalo'
};

function getRecognizedService(hostname) {
  return Object.entries(recognizedDomains).find(([domain]) => (
    hostname === domain.trim() || hostname.endsWith(`.${domain.trim()}`)
  ))?.[1] || '';
}

function renderLinkResult(type, title, content) {
  linkResult.hidden = false;
  linkResult.className = `link-result ${type}`;
  linkResult.innerHTML = `<strong>${title}</strong>${content}`;
  linkResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

linkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = linkInput.value.trim();
  if (!raw) {
    linkInput.focus();
    notice('Bạn hãy dán một đường link để kiểm tra.');
    return;
  }

  const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url;
  try {
    url = new URL(normalized);
  } catch {
    renderLinkResult('link-danger', 'Link chưa đúng định dạng.', '<p>Hãy nhập tên miền, ví dụ: example.com hoặc https://example.com.</p>');
    return;
  }

  const hostname = url.hostname.toLowerCase();
  if (!hostname || !hostname.includes('.') || hostname.startsWith('.') || hostname.endsWith('.')) {
    renderLinkResult('link-danger', 'Chưa nhận diện được tên miền.', '<p>Hãy kiểm tra lại đường link trước khi tiếp tục.</p>');
    return;
  }

  const signals = [];
  const service = getRecognizedService(hostname);
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  const isShortened = /(^|\.)((bit\.ly)|(tinyurl\.com)|(t\.co)|(goo\.gl)|(shorturl\.at))$/i.test(hostname);

  if (url.protocol !== 'https:') signals.push('Đường link không dùng HTTPS.');
  if (url.username || url.password) signals.push('Link chứa thông tin đăng nhập ngay trước tên miền.');
  if (hostname.includes('xn--')) signals.push('Tên miền dùng mã hoá ký tự, có thể gây nhầm với tên miền quen thuộc.');
  if (hostname.split('.').length > 3 && !service) signals.push('Tên miền có nhiều lớp, cần kiểm tra kỹ phần tên miền chính.');
  if (isIpAddress) signals.push('Link dùng địa chỉ IP thay vì tên miền của một tổ chức.');
  if (isShortened) signals.push('Đây là link rút gọn nên chưa nhìn được đích đến thật.');

  const technicalSummary = `<p class="link-meta">Tên miền: <b>${hostname}</b>${url.port ? ` · Cổng: ${url.port}` : ''}</p>`;
  if (signals.length > 0) {
    renderLinkResult('link-danger', 'Nên dừng lại và kiểm tra thêm.', `${technicalSummary}<ul>${signals.map((signal) => `<li>${signal}</li>`).join('')}</ul><p>Không nhập OTP, mật khẩu hoặc thông tin thẻ. Nếu được, hãy tự mở ứng dụng hoặc website chính thức thay vì dùng link trong tin nhắn.</p>`);
    return;
  }

  if (service) {
    const serviceNote = service === 'YouTube'
      ? 'Đường link có dạng của YouTube; phần tham số dài sau dấu “?” thường dùng để mở video hoặc danh sách phát.'
      : `Đường link có dạng tên miền của ${service}.`;
    renderLinkResult('link-recognized', `Đã nhận diện tên miền ${service}.`, `${technicalSummary}<p>${serviceNote}</p><p>Tên miền đúng không có nghĩa là video, bài đăng, tài khoản hoặc lời mời bên trong chắc chắn an toàn. Vẫn không đăng nhập, chuyển tiền hay cung cấp mã xác minh theo yêu cầu bất ngờ.</p>`);
    return;
  }

  renderLinkResult('link-safe', 'Chưa thấy dấu hiệu kỹ thuật rõ ràng.', `${technicalSummary}<p>Đây chỉ là kết quả kiểm tra hình thức, không phải xác nhận an toàn. Hãy đối chiếu tên miền với website chính thức trước khi đăng nhập hoặc thanh toán.</p>`);
});

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
    notice('Trình duyệt chưa hỗ trợ đọc tiếng Việt.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith('vi')) || null;
  window.speechSynthesis.speak(utterance);
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

$('#saveResult').addEventListener('click', () => {
  const evidence = [
    'CHECKLIST BẰNG CHỨNG - CẢNH BÁO SỐ',
    '',
    `Đánh giá sơ bộ: ${$('#riskTitle').textContent}`,
    `Mức cảnh giác: ${$('#riskScore').textContent}`,
    '',
    'Dấu hiệu đáng chú ý:',
    ...[...$('#signals').querySelectorAll('li')].map((item, index) => `${index + 1}. ${item.textContent}`),
    '',
    'Việc nên làm:',
    ...[...$('#actions').querySelectorAll('li')].map((item, index) => `${index + 1}. ${item.textContent}`),
    '',
    'Bằng chứng cần lưu:',
    '- Ảnh chụp màn hình tin nhắn, trang web hoặc cuộc gọi.',
    '- Số điện thoại, tên tài khoản, đường link và thời gian liên hệ.',
    '- Biên lai hoặc lịch sử giao dịch nếu đã chuyển tiền.',
    '',
    'Lưu ý: Không gửi OTP, mật khẩu hoặc thông tin nhạy cảm vào tệp này.'
  ].join('\n');
  const blob = new Blob([evidence], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'checklist-canh-bao-so.txt';
  link.click();
  URL.revokeObjectURL(link.href);
  notice('Checklist đã được tải xuống. Hãy lưu cùng các ảnh chụp bằng chứng.');
});

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

const openPanic = () => $('#panic').showModal();
$('#panicButton').addEventListener('click', openPanic);
$('#quickPanic').addEventListener('click', openPanic);
$('#panicClose').addEventListener('click', () => $('#panic').close());
