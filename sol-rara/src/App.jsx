import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Colar Origem', category: 'Colares', price: 890, image: '/products/colares/7.jpg' },
  { id: 2, name: 'Brinco Fluir', category: 'Brincos', price: 690, image: '/products/brincos/1.jpg' },
  { id: 3, name: 'Brinco Terra', category: 'Brincos', price: 650, image: '/products/brincos/2.jpg' },
  { id: 4, name: 'Brinco Vestígio', category: 'Brincos', price: 990, image: '/products/brincos/3.jpg' },
  { id: 5, name: 'Brinco Dourado', category: 'Brincos', price: 590, image: '/products/brincos/4.jpg' },
  { id: 6, name: 'Colar Semente', category: 'Colares', price: 790, image: '/products/colares/8.jpg' },
  { id: 7, name: 'Brinco Semente', category: 'Brincos', price: 690, image: '/products/brincos/5.jpg' },
  { id: 8, name: 'Brinco Raiz', category: 'Brincos', price: 590, image: '/products/brincos/6.jpg' },
  { id: 9, name: 'Colar Essência', category: 'Colares', price: 890, image: '/products/colares/9.jpg' },
]
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const routes = ['home', 'sobre', 'produtos', 'processo', 'caderno', 'contato']
const policyRoutes = ['trocas-devolucoes','envios-prazos','cuidados','privacidade','termos']

const policyContent = {
  'trocas-devolucoes': { eyebrow: 'Atendimento', title: 'Trocas e devoluções', intro: 'Queremos que sua experiência com uma Sol Rara seja tão cuidadosa quanto a criação de cada peça.', sections: [['Prazo para solicitação','Você pode solicitar a troca ou devolução em até 7 dias corridos após o recebimento. Entre em contato informando o número do pedido e o motivo da solicitação.'],['Condições da peça','A joia deve estar sem sinais de uso, em sua embalagem original e acompanhada dos itens enviados. Peças danificadas por uso inadequado não são elegíveis.'],['Peça com avaria','Caso o pedido chegue com qualquer avaria, envie fotografias da embalagem e da peça em até 48 horas. Faremos a análise e orientaremos a substituição ou o reembolso.'],['Reembolso','Após o recebimento e a conferência da devolução, o reembolso será solicitado pelo mesmo meio de pagamento utilizado na compra. O prazo de processamento depende da instituição financeira.']] },
  'envios-prazos': { eyebrow: 'Atendimento', title: 'Envios e prazos', intro: 'Cada pedido é preparado individualmente para chegar até você com segurança e cuidado.', sections: [['Preparação do pedido','Por serem artesanais, as peças podem demandar até 7 dias úteis de preparação antes do envio.'],['Prazo de entrega','O prazo é calculado no carrinho conforme o CEP e começa após a postagem. Finais de semana e feriados não são considerados dias úteis.'],['Acompanhamento','Assim que o pedido for enviado, você receberá o código de rastreamento no e-mail cadastrado.'],['Endereço e recebimento','Confira os dados antes de concluir a compra. Em caso de retorno por endereço incorreto ou ausência de recebedor, um novo frete poderá ser necessário.']] },
  'cuidados': { eyebrow: 'Atendimento', title: 'Cuidados com a peça', intro: 'A cerâmica atravessa o fogo, mas pede delicadeza no uso cotidiano.', sections: [['Ao vestir','Evite impactos, quedas e pressão excessiva. Coloque a joia após perfumes, cremes e produtos de beleza.'],['Limpeza','Use apenas um tecido macio e seco. Não utilize álcool, abrasivos, produtos químicos ou limpeza por imersão.'],['Armazenamento','Guarde cada peça separadamente, em local seco e protegido da luz direta, evitando contato com outras joias.'],['Acabamentos dourados','O contato frequente com água, suor, cosméticos e maresia pode alterar gradualmente o acabamento. Retire a peça antes do banho, praia ou atividade física.']] },
  'privacidade': { eyebrow: 'Institucional', title: 'Política de privacidade', intro: 'Tratamos seus dados pessoais com transparência, cuidado e apenas para finalidades relacionadas à sua experiência com a Sol Rara.', sections: [['Dados coletados','Podemos coletar dados de identificação, contato, entrega, pagamento e navegação fornecidos durante o cadastro, a compra ou o atendimento.'],['Como utilizamos','Usamos os dados para processar pedidos, realizar entregas, prestar atendimento, prevenir fraudes e, mediante autorização, enviar comunicações da marca.'],['Compartilhamento','As informações podem ser compartilhadas somente com parceiros necessários à operação, como meios de pagamento, transportadoras e serviços tecnológicos.'],['Seus direitos','Você pode solicitar acesso, correção, portabilidade ou exclusão de dados, além de revogar consentimentos, por meio da página de contato.'],['Segurança e retenção','Adotamos medidas razoáveis de proteção e mantemos as informações somente pelo período necessário ao cumprimento das finalidades e obrigações legais.']] },
  'termos': { eyebrow: 'Institucional', title: 'Termos e condições', intro: 'Ao navegar e comprar neste site, você concorda com as condições apresentadas a seguir.', sections: [['Produtos artesanais','Variações sutis de cor, textura, desenho e dimensão fazem parte do processo manual e não caracterizam defeito. As imagens representam as peças com a maior fidelidade possível.'],['Preços e pagamento','Preços, condições e disponibilidade podem ser alterados sem aviso prévio. O pedido é confirmado após a aprovação do pagamento.'],['Propriedade intelectual','Textos, imagens, marca, desenhos e demais conteúdos pertencem à Sol Rara e não podem ser reproduzidos sem autorização.'],['Responsabilidades','A Sol Rara não se responsabiliza por danos decorrentes do uso inadequado, armazenamento incorreto ou descumprimento das orientações de cuidado.'],['Atualizações','Estes termos podem ser atualizados para refletir mudanças operacionais ou legais. A versão vigente estará sempre disponível nesta página.']] },
}

const journalArticles = [
  { slug:'onde-o-tempo-corre-diferente', category:'Do sítio', title:'A história do sítio onde a Sol Rara criou raízes', excerpt:'Antes de existir um ateliê, havia um terreno atravessado por um rio, árvores antigas e a sensação de que aquele lugar guardava outro ritmo.', image:'/about/tour-rio.png', date:'Julho de 2026', body:[['Antes do ateliê','O sítio foi encontrado em um momento de busca por mais silêncio e proximidade com a natureza. Entre árvores antigas e caminhos ainda pouco marcados, um rio corria nos fundos do terreno. Foi essa água em movimento que fez Sol perceber que ali poderia construir não apenas um espaço de trabalho, mas uma nova maneira de viver e criar.'],['Uma construção feita aos poucos','O ateliê nasceu de uma pequena construção voltada para o verde. As aberturas foram preservadas para receber a luz natural, e a bancada foi posicionada de modo que o som do rio atravessasse os dias. Aos poucos chegaram o forno, as ferramentas, as primeiras argilas e as folhas recolhidas nos arredores.'],['O sítio dentro de cada peça','Com o tempo, pássaros, animais, sementes, cascas e mudanças de estação passaram a participar do repertório da marca. O sítio deixou de ser apenas o endereço do ateliê: tornou-se parte da linguagem da Sol Rara e permanece, de alguma forma, em cada textura e contorno.']] },
  { slug:'a-natureza-como-molde', category:'Coleções e símbolos', title:'Coleção Águas de Origem: onde o rio guarda memórias', excerpt:'Uma coleção imaginada a partir da água que passa atrás do ateliê e das marcas delicadas que o rio deixa em tudo o que toca.', image:'/banner/conheca-mais-v2.jpg', date:'Julho de 2026', body:[['A origem da coleção','Águas de Origem nasceu durante um período de chuvas no sítio. O rio atrás do ateliê mudou de volume, revelou novas margens e deixou sobre pedras e folhas pequenos mapas de passagem. Sol começou a desenhar formas que não representavam a água, mas carregavam seu movimento.'],['Formas, cores e símbolos','As peças da coleção combinam curvas irregulares, superfícies azuladas, tons minerais e linhas de ouro líquido. O azul evoca profundidade; o dourado aparece como reflexo de luz; e cada contorno preserva a ideia de que nada vivo permanece completamente imóvel.'],['Uma joia como lembrança','Águas de Origem foi imaginada para marcar travessias: mudanças, recomeços e momentos em que seguir adiante exige confiar no próprio fluxo. Cada joia funciona como um pequeno símbolo de continuidade — rara não porque permanece intacta, mas porque transforma sua história em presença.']] },
  { slug:'da-cura-nasceu-uma-linguagem', category:'Caderno da Sol', title:'Aquilo que as mãos já sabem', excerpt:'Entre argila, símbolos e ciclos naturais, Sol reconhece na criação uma memória que parece anterior ao próprio gesto.', image:'/about/sol-artista.jpg', date:'Julho de 2026', body:[['O que a natureza me ensinou','Quando eu era criança, aprendi a observar antes de tentar compreender. Os animais me mostravam quando era hora de se aproximar e quando era preciso respeitar a distância. As árvores mudavam sem deixar de ser quem eram, e o rio seguia seu caminho sem pedir licença à pressa. Foi ali que entendi que a natureza nunca está em silêncio: ela conversa por movimentos, ciclos, texturas e ausências. Hoje, quando encosto as mãos na argila, reconheço essa mesma linguagem. Não crio uma forma para dominar a matéria, mas para escutá-la. Talvez por isso cada peça guarde algo de ancestral — uma memória que não aprendi em palavras, mas que meu corpo sempre soube.'],['O fazer como ritual','Há uma dimensão ritual em preparar a matéria, esperar a secagem e confiar a peça à transformação do forno. Cada etapa pede atenção e entrega. Folhas, sementes, água, terra e ouro aparecem como elementos de uma mesma linguagem — silenciosa, sensorial e precisa.'],['Símbolos para o corpo','Quando uma joia deixa o ateliê, leva consigo mais do que sua forma. Texturas naturais, marcas do gesto e pequenas variações tornam-se símbolos íntimos para quem a veste. É nesse encontro entre ancestralidade e presença que a Sol Rara encontra sua ideia de luxo: algo raro porque guarda significado.']] },
]

function Icon({ type }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></>,
    user: <><circle cx="12" cy="7" r="3.5"/><path d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6"/></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M8.5 9V6.5a3.5 3.5 0 0 1 7 0V9"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>
}

function ProductCard({ product, add, navigate }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => navigate(`produto-${product.id}`)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name}/><span>Conhecer a peça</span></button>
    <div className="product-meta"><button className="product-name" onClick={() => navigate(`produto-${product.id}`)}>{product.name}</button><span>{product.category}</span></div><div className="product-price"><p>{money.format(product.price)}</p><button onClick={() => add(product)}>+ Sacola</button></div>
  </article>
}

function HomeLegacy({ navigate, add }) {
  const [slide, setSlide] = useState(0)
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('recent')
  const homeProducts = useMemo(() => {
    const filtered = products.filter(p => category === 'Todos' || p.category === category)
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    return filtered
  }, [category, sort])
  useEffect(() => {
    if (slide === 0) {
      const timer = window.setTimeout(() => setSlide(1), 3000)
      return () => window.clearTimeout(timer)
    }
  }, [slide])
  return <div className="home-original">
    <section className="hero"><img className="hero-media banner-photo" src="/banner/hero.png" alt="Joia de cerâmica com detalhes em ouro"/>{slide === 1 && <video className="hero-media banner-video" src="/banner/segundo-banner.mp4" poster="/banner/hero.png" autoPlay muted playsInline preload="auto" onEnded={() => setSlide(0)}/>}<div className="hero-copy"><h1>Vista a natureza.<br/>Sinta o ritual.</h1><div className="hero-details"><h2>Cerâmicas autorais</h2><p>Peças únicas, feitas à mão<br/>e que carregam a beleza do tempo.</p><button className="primary-button explore-button" onClick={() => document.getElementById('home-products')?.scrollIntoView({ behavior: 'smooth' })}>Explorar produtos <span>↓</span></button></div></div><div className="banner-picker" role="group" aria-label="Escolher destaque do banner"><button className={slide === 0 ? 'active' : ''} onClick={() => setSlide(0)} aria-label="Ver primeiro destaque" aria-pressed={slide === 0}/><button className={slide === 1 ? 'active' : ''} onClick={() => setSlide(1)} aria-label="Assistir ao vídeo" aria-pressed={slide === 1}/></div></section>
    <section className="collection section" id="home-products"><div className="section-heading"><h2>Produtos</h2><span>{products.length} peças</span></div><div className="product-tools"><div className="categories"><button className="selected">Todos</button><button>Colares</button><button>Chockers</button><button>Brincos</button><button>Anéis</button></div><label className="sort-control">Ordenar por <select defaultValue="recent"><option value="recent">Mais recentes</option><option>Mais relevantes</option><option>Menor preço</option><option>Maior preço</option></select></label></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} add={add} navigate={navigate}/>)}</div></section>
    <section className="story"><div className="story-copy"><img className="story-logo" src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png" alt="Sol Rara Cerâmicas Autorais"/><i/><p>Peças cerâmicas autorais que<br/>transformam matéria<br/>em significado.</p><button onClick={() => navigate('sobre')}>Conhecer mais <b>→</b></button></div><img src="/banner/conheca-mais-v2.jpg" alt="Joias de cerâmica azul no ateliê Sol Rara"/></section>
    <section className="social section">{[['Instagram',['/instagram/IMG_2003.jpg(1).jpeg','/instagram/IMG_2004.jpg.jpeg','/instagram/IMG_2005.jpg(1).jpeg']],['TikTok',['/tiktok/IMG_2006.jpg.jpeg','/tiktok/IMG_2007.jpg(1).jpeg','/tiktok/IMG_2009.jpg(1).jpeg']]].map(([name,images])=><section className="social-group" key={name}><div className="social-title"><span>{name}</span></div><div className="social-images">{images.map((x,i)=><img key={x} src={x} alt={`${name} Sol Rara ${i+1}`}/>)}</div><div className="social-bottom"><span>@solrara.ceramicas</span><span>Ver mais →</span></div></section>)}</section>
  </div>
}

function Home({ navigate, add }) {
  const [slide, setSlide] = useState(0)
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('recent')
  const shown = useMemo(() => {
    const filtered = products.filter(p => category === 'Todos' || p.category === category)
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    return filtered
  }, [category, sort])
  useEffect(() => {
    if (slide !== 0) return
    const timer = window.setTimeout(() => setSlide(1), 3000)
    return () => window.clearTimeout(timer)
  }, [slide])
  return <div className="home-original">
    <section className="hero"><img className="hero-media banner-photo" src="/banner/hero.png" alt="Joia de cerâmica com detalhes em ouro"/>{slide === 1 && <video className="hero-media banner-video" src="/banner/segundo-banner.mp4" poster="/banner/hero.png" autoPlay muted playsInline preload="auto" onEnded={() => setSlide(0)}/>}<div className="hero-copy"><h1>Vista a natureza.<br/>Sinta o ritual.</h1><div className="hero-details"><h2>Cerâmicas autorais</h2><p>Peças únicas, feitas à mão<br/>e que carregam a beleza do tempo.</p><button className="primary-button explore-button" onClick={() => document.getElementById('home-products')?.scrollIntoView({ behavior: 'smooth' })}>Explorar produtos <span>↓</span></button></div></div><div className="banner-picker" role="group" aria-label="Escolher destaque do banner"><button className={slide === 0 ? 'active' : ''} onClick={() => setSlide(0)} aria-label="Ver primeiro destaque"/><button className={slide === 1 ? 'active' : ''} onClick={() => setSlide(1)} aria-label="Assistir ao vídeo"/></div></section>
    <section className="collection section" id="home-products"><div className="section-heading"><h2>Produtos</h2><span>{shown.length} peças</span></div><div className="product-tools"><div className="categories">{['Todos','Colares','Brincos'].map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="sort-control"><span>Ordenar por</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Mais recentes</option><option value="name">Nome</option><option value="low">Menor preço</option><option value="high">Maior preço</option></select></label></div><div className="product-grid">{shown.map(p => <ProductCard key={p.id} product={p} add={add} navigate={navigate}/>)}</div></section>
    <section className="story"><div className="story-copy"><img className="story-logo" src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png" alt="Sol Rara Cerâmicas Autorais"/><i/><p>Peças cerâmicas autorais que<br/>transformam matéria<br/>em significado.</p><button onClick={() => navigate('sobre')}>Conhecer mais <b>→</b></button></div><img src="/banner/conheca-mais-v2.jpg" alt="Joias de cerâmica azul no ateliê Sol Rara"/></section>
    <section className="social section"><section className="social-group"><a className="social-title" href="https://www.instagram.com/solrarajoias/" target="_blank" rel="noreferrer">Instagram</a><div className="social-images">{['/instagram/IMG_2003.jpg(1).jpeg','/instagram/IMG_2004.jpg.jpeg','/instagram/IMG_2005.jpg(1).jpeg'].map((x,i) => <a key={x} href="https://www.instagram.com/solrarajoias/" target="_blank" rel="noreferrer"><img src={x} alt={`Instagram Sol Rara ${i+1}`}/></a>)}</div><div className="social-bottom"><a href="https://www.instagram.com/solrarajoias/" target="_blank" rel="noreferrer">@solrarajoias</a><a href="https://www.instagram.com/solrarajoias/" target="_blank" rel="noreferrer">Ver mais →</a></div></section><section className="social-group"><div className="social-title"><span>TikTok</span></div><div className="social-images">{['/tiktok/IMG_2006.jpg.jpeg','/tiktok/IMG_2007.jpg(1).jpeg','/tiktok/IMG_2009.jpg(1).jpeg'].map((x,i) => <img key={x} src={x} alt={`TikTok Sol Rara ${i+1}`}/>)}</div><div className="social-bottom"><span>@solrara.ceramicas</span><span>Ver mais →</span></div></section></section>
  </div>
}

function Products({ add, navigate }) {
  const [category, setCategory] = useState('Todos')
  const shown = products.filter(p => category === 'Todos' || p.category === category)
  return <div className="page"><PageIntro eyebrow="Coleção" title="Joias que carregam a terra" text="Formas orgânicas, texturas vivas e pequenos vestígios de ouro. Escolha a peça que encontra a sua história."/><div className="section"><div className="filters">{['Todos','Colares','Brincos'].map(c => <button className={category === c ? 'selected' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><div className="product-grid">{shown.map(p => <ProductCard key={p.id} product={p} add={add} navigate={navigate}/>)}</div></div></div>
}

function ProductDetail({ product, add, navigate }) {
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
  return <div className="page product-detail"><section className="product-view"><div className="product-gallery"><img src={product.image} alt={product.name}/></div><div className="product-info"><button className="back-link" onClick={() => navigate('produtos')}>← Voltar à coleção</button><span className="eyebrow">{product.category} · Peça autoral</span><h1>{product.name}</h1><p className="detail-price">{money.format(product.price)}</p><p className="detail-lead">Uma joia-escultura modelada à mão, inspirada nas formas que a natureza desenha sem pressa. Cada unidade carrega pequenas variações de cor e textura — sua assinatura de autenticidade.</p><button className="dark-button wide" onClick={() => add(product)}>Adicionar à sacola</button><p className="shipping-note">Produção e envio em até 7 dias úteis · Frete calculado no carrinho</p><div className="accordions"><details open><summary>Características</summary><ul><li>Cerâmica de alta temperatura</li><li>Detalhes com acabamento dourado</li><li>Ferragens antialérgicas banhadas</li><li>Peça leve e confortável</li></ul></details><details><summary>Dimensões</summary><p>{product.category === 'Colares' ? 'Pingente aproximado de 4 × 5 cm; corrente regulável.' : 'Aproximadamente 4 × 3 cm; peso médio de 8 g por par.'} Por ser artesanal, pode haver pequenas variações.</p></details><details><summary>Cuidados</summary><p>Evite quedas, contato com perfumes, cremes e água. Guarde separadamente e limpe com tecido macio e seco.</p></details><details><summary>Feito à mão</summary><p>Do molde ao ouro, esta peça atravessa sucessivas etapas de secagem e queima no ateliê Sol Rara. Nenhuma é exatamente igual à outra.</p></details></div></div></section><section className="product-story"><span className="eyebrow">A história da peça</span><h2>Uma forma para lembrar<br/>que tudo está em movimento.</h2><p>{product.name} nasce do encontro entre matéria bruta e gesto delicado. Seus relevos preservam sinais do processo manual, enquanto a luz do dourado percorre a superfície como um vestígio precioso.</p></section><section className="section"><div className="section-heading"><div><span className="eyebrow">Você também pode gostar</span><h2>Outras peças raras</h2></div></div><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} add={add} navigate={navigate}/>)}</div></section></div>
}

function PageIntro({ eyebrow, title, text }) { return <header className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header> }

function Process({ navigate }) {
  const steps = [
    ['01','Inspiração','Tudo começa na observação: sementes, cascas, ciclos, paisagens e memórias dão origem aos primeiros desenhos.'],
    ['02','Modelagem','A argila é moldada à mão, peça por peça. É quando cada forma ganha identidade e aceita suas pequenas diferenças.'],
    ['03','Secagem','Sem pressa, a água deixa a matéria. O tempo prepara a peça e reduz tensões antes do encontro com o fogo.'],
    ['04','Primeira queima','No forno, a argila se transforma em cerâmica. A temperatura consolida a forma e revela novos tons e texturas.'],
    ['05','Esmaltação','Camadas de cor e acabamento são aplicadas à mão, respeitando a superfície e o desenho singular de cada joia.'],
    ['06','Ouro e detalhes','O ouro é aplicado como um gesto de luz. Pequenos traços destacam relevos, bordas e movimentos naturais.'],
    ['07','Queima final','Uma nova passagem pelo fogo fixa o acabamento. O resultado nunca é totalmente previsível — e aí mora sua raridade.'],
    ['08','Montagem e cuidado','Cada peça é revisada, montada e embalada com cuidado, pronta para acompanhar novos rituais.'],
  ]
  return <div className="page process-page"><PageIntro eyebrow="Nosso processo" title="Da matéria ao significado" text="Um percurso conduzido pelas mãos, pelo tempo e pelo fogo. Conheça cada etapa da criação de uma Sol Rara."/><section className="process-feature"><img src="/process/abertura-processo.png" alt="Artesã diante do forno, no encontro entre a mão, a argila e o fogo"/><blockquote>“A mão propõe.<br/>O fogo responde.”</blockquote></section><section className="steps">{steps.map((s) => <article className="step" key={s[0]}><span>{s[0]}</span><div><h2>{s[1]}</h2><p>{s[2]}</p></div><img src={`/process/etapa-${s[0]}.png`} alt={`Etapa ${s[0]}: ${s[1]}`}/></article>)}</section><section className="process-cta"><span className="eyebrow">O ritual continua</span><p>Conheça as peças que nasceram desse processo.</p><button className="dark-button" onClick={() => navigate('produtos')}>Ver as peças</button></section></div>
}

function About({ navigate }) { return <div className="page about-page"><PageIntro eyebrow="Sobre a Sol Rara" title="Uma marca feita de presença" text="Entre o silêncio do ateliê e a intensidade do fogo, Sol transforma matéria em símbolos para vestir."/><section className="about-hero"><img src="/about/sol-artista.jpg" alt="Sol criando uma peça artesanal"/><div><span className="eyebrow">Sol, fundadora e artista</span><h2>A intuição encontrou<br/>a cerâmica.</h2><p>A Sol Rara nasceu do desejo de criar com as próprias mãos e de devolver presença aos objetos que escolhemos usar. Sol encontrou na argila uma linguagem sensível e viva.</p><p>No ateliê, cada coleção começa como uma conversa íntima com a natureza. Uma textura percebida numa caminhada, a forma de uma semente, a luz atravessando uma folha. Essas lembranças passam pelo desenho e chegam à bancada.</p></div></section><section className="atelier"><div><span className="eyebrow">O ateliê</span><h2>Onde o tempo tem<br/>outro ritmo.</h2><p>Aqui, nenhuma peça atravessa o processo com pressa. Modelar, esperar, queimar, esmaltar, observar e recomeçar fazem parte do mesmo ritual. O ateliê é laboratório e refúgio — um lugar onde controle e acaso trabalham juntos.</p></div><div className="atelier-gallery"><img src="/tiktok/IMG_2007.jpg(1).jpeg" alt="Bastidores do ateliê Sol Rara"/><img src="/products/colares/11.jpg" alt="Peça finalizada no ateliê"/></div></section><section className="about-closing"><p>Sol Rara é um convite para vestir a natureza e carregar algo que não se repete.</p><button className="dark-button" onClick={() => navigate('produtos')}>Ver as peças</button></section></div> }

function ProcessEnhanced({ navigate }) {
  const steps = [
    ['01','Inspiração','Tudo começa na observação: sementes, cascas, ciclos, paisagens e memórias dão origem aos primeiros desenhos.'],
    ['02','Modelagem','A argila é moldada à mão, peça por peça. É quando cada forma ganha identidade e aceita suas pequenas diferenças.'],
    ['03','Secagem','Sem pressa, a água deixa a matéria. O tempo prepara a peça e reduz tensões antes da transformação.'],
    ['04','Primeira queima','No forno, a argila se transforma em cerâmica. A temperatura consolida a forma e revela novos tons e texturas.'],
    ['05','Esmaltação','Camadas de cor e acabamento são aplicadas à mão, respeitando a superfície e o desenho singular de cada joia.'],
    ['06','Ouro e detalhes','O ouro líquido é aplicado como um gesto de luz, destacando relevos, bordas e movimentos naturais.'],
    ['07','Queima final','Uma nova passagem pelo forno fixa o acabamento. O resultado nunca é totalmente previsível — e aí mora sua raridade.'],
    ['08','Montagem e cuidado','Cada peça é revisada, montada e embalada com cuidado, pronta para acompanhar novos rituais.'],
  ]
  const highlights = [
    ['01','Cerâmica de alta temperatura','Uma matéria leve e resistente, transformada por sucessivas etapas de secagem e queima.','/process/diferencial-01.png'],
    ['02','Detalhes em ouro líquido','Aplicado à mão sobre a cerâmica, o ouro acompanha relevos e contornos com luminosidade singular.','/process/diferencial-02.png'],
    ['03','Metais banhados a ouro','Ferragens selecionadas completam a peça com acabamento refinado e unidade visual.','/process/diferencial-03.png'],
    ['04','Leveza para vestir','Mesmo com presença escultórica, as formas são pensadas para acompanhar o corpo com conforto.','/process/diferencial-04.png'],
    ['05','Texturas irrepetíveis','A impressão de folhas, sementes e cascas preserva marcas naturais que não se repetem.','/process/diferencial-05.png'],
    ['06','Singularidade','Cada peça carrega variações próprias de forma, textura e cor. Nenhuma joia é exatamente igual à outra.','/process/diferencial-06.png'],
  ]
  return <div className="page process-page"><PageIntro eyebrow="Nosso processo" title="Da matéria ao significado" text="Um percurso conduzido pelas mãos, pelo tempo e pela transformação. Conheça cada etapa da criação de uma Sol Rara."/><section className="process-feature"><img src="/process/abertura-processo.png" alt="Artesã diante do forno, no encontro entre a mão e a argila"/><blockquote>“A mão propõe.<br/>O fogo responde.”</blockquote></section><section className="steps">{steps.map(s => <article className="step" key={s[0]}><span>{s[0]}</span><div><h2>{s[1]}</h2><p>{s[2]}</p></div><img src={`/process/etapa-${s[0]}.png`} alt={`Etapa ${s[0]}: ${s[1]}`}/></article>)}</section><section className="process-result"><header><span className="eyebrow">Do gesto à joia</span><h2>O processo permanece<br/>em cada detalhe.</h2><p>Cada diferencial abaixo nasce diretamente das etapas que você acabou de conhecer: da escolha da matéria à montagem final.</p></header><div className="result-highlights">{highlights.map(item => <article key={item[0]}><img src={item[3]} alt={item[1]}/><div><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}</div></section><section className="process-cta"><p>Conheça as peças que nasceram desse processo.</p><button className="dark-button" onClick={() => navigate('produtos')}>Ver as peças</button></section></div>
}

function AboutEditorial({ navigate }) {
  return <div className="page about-page editorial-about">
    <PageIntro eyebrow="Sobre a Sol Rara" title="Uma marca feita de presença" text="Entre o silêncio do ateliê e a intensidade da transformação, Sol transforma matéria em símbolos para vestir."/>
    <section className="about-hero"><img src="/about/sol-artista.jpg" alt="Sol criando uma peça artesanal"/><div><span className="eyebrow">Sol, fundadora e artista</span><h2>A intuição encontrou<br/>a cerâmica.</h2><p>A Sol Rara nasceu do desejo de criar com as próprias mãos e de devolver presença aos objetos que escolhemos usar. Sol encontrou na argila uma linguagem sensível e viva.</p><p>No ateliê, cada coleção nasce do contato direto com a natureza. Folhas, sementes, cascas e outras formas naturais tornam-se moldes, imprimindo na argila suas texturas e contornos.</p><button className="editorial-link" onClick={() => document.getElementById('historia-sol')?.scrollIntoView({ behavior: 'smooth' })}>Conhecer a artista <span>↓</span></button></div></section>
    <section className="artist-story" id="historia-sol"><div className="artist-story-heading"><span className="eyebrow">A artista</span><h2>Da cura nasceu<br/>uma linguagem.</h2><p>Sol trilhou um caminho único que une arte e cura. Sua jornada com a cerâmica começou como um processo terapêutico, um encontro que transformou não apenas a cerâmica, mas sua própria essência.</p></div><video className="artist-story-image artist-story-video" src="/about/sol-artista-video.mp4" autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={event => { event.currentTarget.playbackRate = .62 }} aria-label="Sol em seu ambiente de criação"/><div className="artist-story-copy"><p>Com o tempo, o que era refúgio tornou-se linguagem expressiva, e o que era terapia converteu-se em arte. O design formal se entrelaça com saberes ancestrais transmitidos por gerações de ceramistas e com processos intuitivos que respeitam a voz da própria matéria.</p><p>Cada peça nasce do gesto manual, do toque direto que estabelece um diálogo íntimo com a matéria-prima. O tempo não é inimigo, mas aliado essencial, permitindo a maturação das formas e das ideias.</p><button className="editorial-link light" onClick={() => document.getElementById('tour-atelie')?.scrollIntoView({ behavior: 'smooth' })}>Entrar no ateliê <span>↓</span></button></div></section>
    <section className="atelier-tour"><header><span className="eyebrow">O sítio</span><h2>Um ateliê dentro<br/>da natureza.</h2><p>É no sítio, entre árvores maduras e com um rio passando logo atrás, que a Sol Rara encontra seu ritmo. O som da água, o canto dos pássaros e a presença dos animais fazem parte do cotidiano de criação.</p></header><div className="tour-grid"><article><img src="/about/tour-arvores.png" alt="Ateliê Sol Rara cercado por árvores no sítio"/><span>01</span><h3>Entre as árvores</h3><p>O ateliê está imerso no verde. Luz, sombra, folhas e ciclos naturais atravessam o espaço de trabalho.</p></article><article><img src="/about/tour-rio.png" alt="Rio passando atrás do ateliê no sítio"/><span>02</span><h3>O rio ao fundo</h3><p>Logo atrás do ateliê, o rio acompanha os dias com seu movimento contínuo e estabelece outro tempo para criar.</p></article><article><img src="/about/tour-natureza.png" alt="Pássaros e animais ao redor do ateliê Sol Rara"/><span>03</span><h3>Natureza viva</h3><p>Pássaros, animais e sons do sítio tornam o ambiente uma presença ativa — não apenas cenário, mas origem da obra.</p></article></div></section>
    <section className="atelier" id="tour-atelie"><div><span className="eyebrow">O ateliê</span><h2>Onde o tempo tem<br/>outro ritmo.</h2><p>O ateliê vive em meio à natureza: cercado por animais, pelo canto dos pássaros, pelo movimento do rio e por uma paisagem que muda a cada instante. É nesse ambiente vivo e inspirador que Sol observa, cria e transforma formas naturais em peças singulares.</p></div><div className="atelier-video"><video src="/about/atelie.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Bastidores do ateliê Sol Rara"/></div></section>
    <section className="about-closing"><p>SolRara é a joia que nasce da natureza e se transforma em arte rara.</p><button className="dark-button" onClick={() => navigate('produtos')}>Ver as peças</button></section>
  </div>
}

function Contact() {
  const [sent, setSent] = useState(false)
  return <div className="page contact-page"><PageIntro eyebrow="Contato" title="Vamos conversar" text="Dúvidas sobre uma peça, encomendas ou parcerias? Escolha o canal que fizer mais sentido para você."/><section className="contact-grid"><div className="contact-cards"><a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer"><span>WhatsApp</span><h2>Atendimento direto</h2><p>Converse com a gente de segunda a sexta, das 9h às 18h.</p><b>Iniciar conversa →</b></a><a href="mailto:contato@solrara.com.br"><span>E-mail</span><h2>contato@solrara.com.br</h2><p>Respondemos em até dois dias úteis.</p><b>Enviar e-mail →</b></a></div><form onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Nome<input required name="name" placeholder="Como podemos te chamar?"/></label><label>E-mail<input required type="email" name="email" placeholder="seuemail@exemplo.com"/></label><label>Assunto<select name="subject"><option>Dúvida sobre produto</option><option>Encomenda</option><option>Parceria</option><option>Outro assunto</option></select></label><label>Mensagem<textarea required rows="5" placeholder="Conte um pouco sobre o que você precisa"/></label><button className="dark-button">Enviar mensagem</button>{sent && <p className="success">Mensagem preparada com sucesso. Em uma versão publicada, ela será enviada ao atendimento.</p>}</form></section></div>
}

function SearchPanel({ close, add }) {
  const [query, setQuery] = useState('')
  const results = products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="overlay"><div className="panel search-panel"><button className="close" onClick={close}><Icon type="close"/></button><span className="eyebrow">Busca</span><h2>O que você procura?</h2><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Digite o nome ou categoria"/><div className="search-results">{query && results.map(p => <div key={p.id}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{money.format(p.price)}</small></span><button onClick={() => add(p)}>Adicionar</button></div>)}{query && !results.length && <p>Nenhuma peça encontrada.</p>}</div></div></div>
}

function AccountPanel({ close }) {
  const [done, setDone] = useState(false)
  return <div className="overlay"><div className="panel"><button className="close" onClick={close}><Icon type="close"/></button><span className="eyebrow">Minha conta</span><h2>{done ? 'Cadastro recebido' : 'Crie seu cadastro'}</h2>{done ? <p>Seu perfil foi preparado. A autenticação definitiva será conectada quando a loja for publicada.</p> : <form onSubmit={e => {e.preventDefault(); setDone(true)}}><label>Nome completo<input required/></label><label>E-mail<input type="email" required/></label><label>Telefone<input type="tel" required/></label><label>Senha<input type="password" minLength="6" required/></label><button className="dark-button">Criar conta</button><small>Ao continuar, você concorda com os termos e a política de privacidade.</small></form>}</div></div>
}

function CartPanel({ items, setItems, close }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const change = (id, delta) => setItems(items.map(i => i.id === id ? {...i, qty: i.qty + delta} : i).filter(i => i.qty > 0))
  return <div className="overlay"><div className="panel cart-panel"><button className="close" onClick={close}><Icon type="close"/></button><span className="eyebrow">Sua sacola</span><h2>{items.length ? `${items.reduce((s,i)=>s+i.qty,0)} peça(s)` : 'Sua sacola está vazia'}</h2><div className="cart-items">{items.map(i => <div className="cart-item" key={i.id}><img src={i.image} alt={i.name}/><div><b>{i.name}</b><small>{money.format(i.price)}</small><div className="quantity"><button onClick={() => change(i.id,-1)}>−</button><span>{i.qty}</span><button onClick={() => change(i.id,1)}>+</button></div></div></div>)}</div>{items.length > 0 && <><div className="cart-total"><span>Total</span><b>{money.format(total)}</b></div><button className="dark-button wide">Finalizar pedido</button><small>Frete calculado na próxima etapa.</small></>}</div></div>
}

function ProductsDirect({ add, navigate }) {
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('recent')
  const shown = useMemo(() => {
    const filtered = products.filter(p => category === 'Todos' || p.category === category)
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [category, sort])
  return <div className="page products-direct"><div className="section"><div className="section-heading"><h2>Peças Sol Rara</h2><span>{shown.length} peças</span></div><div className="product-tools"><div className="filters">{['Todos','Colares','Brincos'].map(c => <button className={category === c ? 'selected' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><label className="sort-control"><span>Ordenar por</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Mais recentes</option><option value="low">Menor preço</option><option value="high">Maior preço</option></select></label></div><div className="product-grid">{shown.map(p => <ProductCard key={p.id} product={p} add={add} navigate={navigate}/>)}</div></div></div>
}

function AboutVideo({ navigate }) {
  return <div className="page about-page"><PageIntro eyebrow="Sobre a Sol Rara" title="Uma marca feita de presença" text="Entre o silêncio do ateliê e a intensidade do fogo, Sol transforma matéria em símbolos para vestir."/><section className="about-hero"><img src="/about/sol-artista.jpg" alt="Sol criando uma peça artesanal"/><div><span className="eyebrow">Sol, fundadora e artista</span><h2>A intuição encontrou<br/>a cerâmica.</h2><p>A Sol Rara nasceu do desejo de criar com as próprias mãos e de devolver presença aos objetos que escolhemos usar. Sol encontrou na argila uma linguagem sensível e viva.</p><p>No ateliê, cada coleção começa como uma conversa íntima com a natureza. Uma textura percebida numa caminhada, a forma de uma semente, a luz atravessando uma folha. Essas lembranças passam pelo desenho e chegam à bancada.</p></div></section><section className="atelier"><div><span className="eyebrow">O ateliê</span><h2>Onde o tempo tem<br/>outro ritmo.</h2><p>Aqui, nenhuma peça atravessa o processo com pressa. Modelar, esperar, queimar, esmaltar, observar e recomeçar fazem parte do mesmo ritual. O ateliê é laboratório e refúgio — um lugar onde controle e acaso trabalham juntos.</p></div><div className="atelier-video"><video src="/about/atelie.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Bastidores do ateliê Sol Rara"/></div></section><section className="about-closing"><p>Sol Rara é um convite para vestir a natureza e carregar algo que não se repete.</p><button className="dark-button" onClick={() => navigate('produtos')}>Ver as peças</button></section></div>
}

function Journal({ navigate }) {
  return <div className="page journal-page"><header className="journal-hero"><span className="eyebrow">Caderno Sol Rara</span><h1>Histórias sobre matéria,<br/>natureza e presença.</h1><p>Um espaço para observar com mais tempo aquilo que dá origem à Sol Rara.</p></header><section className="journal-grid">{journalArticles.map((article,index) => <article className={index === 0 ? 'featured' : ''} key={article.slug}><button onClick={() => navigate(`caderno-${article.slug}`)}><img src={article.image} alt=""/><div><span>{article.category} · {article.date}</span><h2>{article.title}</h2><p>{article.excerpt}</p><b>Ler a matéria →</b></div></button></article>)}</section></div>
}

function JournalArticle({ article, navigate }) {
  const related = journalArticles.filter(item => item.slug !== article.slug)
  return <div className="page journal-article"><header><button className="back-link" onClick={() => navigate('caderno')}>← Voltar ao Caderno</button><span>{article.category} · {article.date}</span><h1>{article.title}</h1><p>{article.excerpt}</p></header><img className="article-hero" src={article.image} alt={article.title}/><div className="article-body">{article.body.map(([title,text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<aside><span>Continue explorando</span><button className="text-link" onClick={() => navigate('sobre')}>Conhecer a história da Sol Rara →</button></aside></div><section className="related-journal"><div className="related-heading"><span>Caderno Sol Rara</span><h2>Outras histórias para ler com tempo</h2></div><div className="related-grid">{related.map(item => <article key={item.slug}><button onClick={() => navigate(`caderno-${item.slug}`)}><img src={item.image} alt=""/><span>{item.category}</span><h3>{item.title}</h3><b>Ler a matéria →</b></button></article>)}</div></section></div>
}

function AmbientControl() {
  const [active, setActive] = useState(false)
  const audio = useRef(null)
  const stop = () => {
    if (!audio.current) return
    audio.current.pause(); audio.current.currentTime = 0; audio.current = null
  }
  const toggle = () => {
    if (active) { stop(); setActive(false); return }
    const track = new Audio('/about/atelie.mp4')
    track.loop = true; track.volume = .08
    track.play().then(() => { audio.current = track; setActive(true) }).catch(() => setActive(false))
  }
  useEffect(() => () => stop(), [])
  return <button className={`ambient-button ${active ? 'playing' : ''}`} onClick={toggle} aria-label={active ? 'Pausar som ambiente' : 'Ativar som ambiente'} title={active ? 'Pausar som ambiente' : 'Ativar som ambiente'} aria-pressed={active}>♫</button>
}

function PolicyPage({ type, navigate }) {
  const content = policyContent[type]
  return <div className="page policy-page"><header className="policy-hero"><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p></header><section className="policy-body"><button className="back-link" onClick={() => navigate('home')}>← Voltar ao site</button><div className="policy-sections">{content.sections.map(([title,text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div><aside><p>Última atualização: 15 de julho de 2026.</p><button className="text-link" onClick={() => navigate('contato')}>Falar com o atendimento →</button></aside></section></div>
}

export default function App() {
  const [route, setRoute] = useState(() => routes.includes(location.hash.slice(1)) || /^produto-\d+$/.test(location.hash.slice(1)) ? location.hash.slice(1) : 'home')
  const [opening, setOpening] = useState('enter')
  const [menu, setMenu] = useState(false)
  const [panel, setPanel] = useState(null)
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('solrara-cart') || '[]'))
  useEffect(() => { localStorage.setItem('solrara-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOpening('done'); return }
    const leave = window.setTimeout(() => setOpening('leave'), 1750)
    const done = window.setTimeout(() => setOpening('done'), 2300)
    return () => { window.clearTimeout(leave); window.clearTimeout(done) }
  }, [])
  useEffect(() => { const fn = () => { const next = location.hash.slice(1); setRoute(routes.includes(next) || policyRoutes.includes(next) || /^produto-\d+$/.test(next) || next.startsWith('caderno-') ? next : 'home'); window.scrollTo(0,0) }; addEventListener('hashchange', fn); return () => removeEventListener('hashchange', fn) }, [])
  useEffect(() => {
    const items = document.querySelectorAll('main > .home-original > section, main > .page > header, main > .page > section, main > .page > img, main > .page > .article-body')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) { items.forEach(item => item.classList.add('motion-visible')); return }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    items.forEach(item => { item.classList.remove('motion-visible'); item.classList.add('motion-reveal'); observer.observe(item) })
    return () => observer.disconnect()
  }, [route])
  useEffect(() => {
    const updateParallax = () => document.documentElement.style.setProperty('--hero-parallax', `${-Math.min(window.scrollY * .07, 22)}px`)
    updateParallax(); addEventListener('scroll', updateParallax, { passive: true })
    return () => removeEventListener('scroll', updateParallax)
  }, [])
  const navigate = next => { location.hash = next; setMenu(false) }
  const add = product => { setCart(items => items.some(i => i.id === product.id) ? items.map(i => i.id === product.id ? {...i,qty:i.qty+1}:i) : [...items,{...product,qty:1}]); setPanel('cart') }
  const detailProduct = route.startsWith('produto-') ? products.find(p => p.id === Number(route.split('-')[1])) : null
  const journalArticle = route.startsWith('caderno-') ? journalArticles.find(a => `caderno-${a.slug}` === route) : null
  const page = useMemo(() => detailProduct ? <ProductDetail product={detailProduct} add={add} navigate={navigate}/> : journalArticle ? <JournalArticle article={journalArticle} navigate={navigate}/> : policyRoutes.includes(route) ? <PolicyPage type={route} navigate={navigate}/> : ({home:<Home navigate={navigate} add={add}/>,sobre:<AboutEditorial navigate={navigate}/>,caderno:<Journal navigate={navigate}/>,produtos:<ProductsDirect add={add} navigate={navigate}/>,processo:<ProcessEnhanced navigate={navigate}/>,contato:<Contact/>})[route], [route, detailProduct, journalArticle])
  return <div className="site-shell">
    {opening !== 'done' && <div className={`opening-screen ${opening}`} aria-hidden="true"><span>SOL RARA</span><i/><b>↓</b><i/></div>}
    <aside className="sidebar"><button className="logo-link" onClick={() => navigate('home')}><img src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png" alt="Sol Rara Joias"/></button><nav>{routes.map(r => <button key={r} className={route === r ? 'active' : ''} onClick={() => navigate(r)}>{r === 'processo' ? 'Processo' : r}</button>)}</nav></aside>
    <main><header className={`topbar ${route !== 'home' ? 'dark' : ''}`}><button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button><button className="mobile-logo" onClick={() => navigate('home')}><img src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png" alt="Sol Rara"/></button><div className="top-actions"><AmbientControl/><button onClick={() => setPanel('search')} aria-label="Pesquisar"><Icon type="search"/></button><button onClick={() => setPanel('account')} aria-label="Minha conta"><Icon type="user"/></button><button className="bag-button" onClick={() => setPanel('cart')} aria-label="Sacola"><Icon type="bag"/>{cart.length > 0 && <em>{cart.reduce((s,i)=>s+i.qty,0)}</em>}</button></div></header>{menu && <nav className="mobile-nav">{routes.map(r => <button key={r} onClick={() => navigate(r)}>{r}</button>)}</nav>}{page}<Footer navigate={navigate}/></main>
    {panel === 'search' && <SearchPanel close={() => setPanel(null)} add={add}/>} {panel === 'account' && <AccountPanel close={() => setPanel(null)}/>} {panel === 'cart' && <CartPanel items={cart} setItems={setCart} close={() => setPanel(null)}/>} 
  </div>
}

function Footer({ navigate }) { return <footer className="institutional-footer"><div className="footer-brand"><button className="footer-logo" onClick={() => navigate('home')}><img src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png" alt="Sol Rara"/></button><p>Joias que revelam o essencial.</p></div><div className="footer-columns"><div><strong>Sol Rara</strong><button onClick={() => navigate('sobre')}>Sobre a marca</button><button onClick={() => navigate('processo')}>Processo artesanal</button><button onClick={() => navigate('contato')}>Contato</button></div><div><strong>Atendimento</strong><button onClick={() => navigate('trocas-devolucoes')}>Trocas e devoluções</button><button onClick={() => navigate('envios-prazos')}>Envios e prazos</button><button onClick={() => navigate('cuidados')}>Cuidados com a peça</button></div><div><strong>Institucional</strong><button onClick={() => navigate('privacidade')}>Política de privacidade</button><button onClick={() => navigate('termos')}>Termos e condições</button><button onClick={() => navigate('cookies')}>Política de cookies</button></div></div><div className="footer-bottom"><span>© 2026 Sol Rara. Todos os direitos reservados.</span><span>Feito à mão no Brasil.</span></div></footer> }
