// utils/countryDialToISO.ts

const countryDialToISOMap: Record<string, string[]> = {
    '+1': ['us'],
    '+44': ['gb'],
    '+358': ['fi'],
    '+262': ['re'],
    '+61': ['au'],
    '+91': ['in'],
    '+93': ['af'],
    '+355': ['al'],
    '+213': ['dz'],
    '+1684': ['as'],
    '+376': ['ad'],
    '+244': ['ao'],
    '+1264': ['ai'],
    '+672': ['aq'],
    '+1268': ['ag'],
    '+54': ['ar'],
    '+374': ['am'],
    '+297': ['aw'],
    '+43': ['at'],
    '+994': ['az'],
    '+1242': ['bs'],
    '+973': ['bh'],
    '+880': ['bd'],
    '+1246': ['bb'],
    '+375': ['by'],
    '+32': ['be'],
    '+501': ['bz'],
    '+229': ['bj'],
    '+975': ['bt'],
    '+591': ['bo'],
    '+387': ['ba'],
    '+267': ['bw'],
    '+55': ['br'],
    '+359': ['bg'],
    '+226': ['bf'],
    '+257': ['bi'],
    '+855': ['kh'],
    '+237': ['cm'],
    '+238': ['cv'],
    '+236': ['cf'],
    '+235': ['td'],
    '+56': ['cl'],
    '+86': ['cn'],
    '+57': ['co'],
    '+269': ['km'],
    '+242': ['cg'],
    '+243': ['cd'],
    '+682': ['ck'],
    '+506': ['cr'],
    '+225': ['ci'],
    '+385': ['hr'],
    '+53': ['cu'],
    '+357': ['cy'],
    '+420': ['cz'],
    '+45': ['dk'],
    '+253': ['dj'],
    '+1767': ['dm'],
    '+1809': ['do'],
    '+593': ['ec'],
    '+20': ['eg'],
    '+503': ['sv'],
    '+240': ['gq'],
    '+291': ['er'],
    '+372': ['ee'],
    '+251': ['et'],
    '+679': ['fj'],
    '+35818': ['ax'],
    '+33': ['fr'],
    '+594': ['gf'],
    '+689': ['pf'],
    '+241': ['ga'],
    '+220': ['gm'],
    '+995': ['ge'],
    '+49': ['de'],
    '+233': ['gh'],
    '+350': ['gi'],
    '+30': ['gr'],
    '+299': ['gl'],
    '+1473': ['gd'],
    '+590': ['gp'],
    '+1671': ['gu'],
    '+502': ['gt'],
    '+224': ['gn'],
    '+245': ['gw'],
    '+592': ['gy'],
    '+509': ['ht'],
    '+504': ['hn'],
    '+852': ['hk'],
    '+36': ['hu'],
    '+354': ['is'],
    '+62': ['id'],
    '+98': ['ir'],
    '+964': ['iq'],
    '+353': ['ie'],
    '+972': ['il'],
    '+39': ['it'],
    '+1876': ['jm'],
    '+81': ['jp'],
    '+962': ['jo'],
    '+7': ['ru', 'kz'],
    '+254': ['ke'],
    '+686': ['ki'],
    '+850': ['kp'],
    '+82': ['kr'],
    '+965': ['kw'],
    '+996': ['kg'],
    '+856': ['la'],
    '+371': ['lv'],
    '+961': ['lb'],
    '+266': ['ls'],
    '+231': ['lr'],
    '+218': ['ly'],
    '+423': ['li'],
    '+370': ['lt'],
    '+352': ['lu'],
    '+853': ['mo'],
    '+389': ['mk'],
    '+261': ['mg'],
    '+265': ['mw'],
    '+60': ['my'],
    '+960': ['mv'],
    '+223': ['ml'],
    '+356': ['mt'],
    '+692': ['mh'],
    '+596': ['mq'],
    '+222': ['mr'],
    '+230': ['mu'],
    '+52': ['mx'],
    '+373': ['md'],
    '+377': ['mc'],
    '+976': ['mn'],
    '+382': ['me'],
    '+212': ['ma'],
    '+258': ['mz'],
    '+95': ['mm'],
    '+264': ['na'],
    '+674': ['nr'],
    '+977': ['np'],
    '+31': ['nl'],
    '+687': ['nc'],
    '+64': ['nz'],
    '+505': ['ni'],
    '+227': ['ne'],
    '+234': ['ng'],
    '+683': ['nu'],
    '+47': ['no'],
    '+968': ['om'],
    '+92': ['pk'],
    '+680': ['pw'],
    '+507': ['pa'],
    '+675': ['pg'],
    '+595': ['py'],
    '+51': ['pe'],
    '+63': ['ph'],
    '+48': ['pl'],
    '+351': ['pt'],
    '+974': ['qa'],
    '+40': ['ro'],
    '+250': ['rw'],
    '+290': ['sh'],
    '+508': ['pm'],
    '+685': ['ws'],
    '+378': ['sm'],
    '+239': ['st'],
    '+966': ['sa'],
    '+221': ['sn'],
    '+381': ['rs'],
    '+248': ['sc'],
    '+232': ['sl'],
    '+65': ['sg'],
    '+421': ['sk'],
    '+386': ['si'],
    '+677': ['sb'],
    '+252': ['so'],
    '+27': ['za'],
    '+34': ['es'],
    '+94': ['lk'],
    '+249': ['sd'],
    '+597': ['sr'],
    '+268': ['sz'],
    '+46': ['se'],
    '+41': ['ch'],
    '+963': ['sy'],
    '+886': ['tw'],
    '+992': ['tj'],
    '+255': ['tz'],
    '+66': ['th'],
    '+228': ['tg'],
    '+676': ['to'],
    '+216': ['tn'],
    '+90': ['tr'],
    '+993': ['tm'],
    '+688': ['tv'],
    '+256': ['ug'],
    '+380': ['ua'],
    '+971': ['ae'],
    '+598': ['uy'],
    '+998': ['uz'],
    '+678': ['vu'],
    '+58': ['ve'],
    '+84': ['vn'],
    '+967': ['ye'],
    '+260': ['zm'],
    '+263': ['zw']
  };
  
  export function getCountryISOsFromDialCode(dialCode: string): string[] | null {
    const cleaned = dialCode.trim().replace(/\s+/g, '');
    return countryDialToISOMap[cleaned] || null;
  }
  
  export function getPrimaryISOFromDialCode(dialCode: string): string | null {
    const isos = getCountryISOsFromDialCode(dialCode);
    return isos ? isos[0] : null;
  }