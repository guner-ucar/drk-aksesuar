import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ChevronDown,
  Database,
  Target,
  TrendingUp,
} from "lucide-react";
import { TECHNICAL_METHODS, TECHNICAL_NOTE } from "../../technicalMethodology";

const LAYER_ICONS = [BarChart3, TrendingUp, Boxes, Target, Database];

const UI = {
  tr: {
    purpose: "Bu model neyi çözer?",
    formulas: "Nasıl ölçüyoruz?",
    formulasHint: "Kararların dayandığı temel hesaplar ve ticari anlamları.",
    decisions: "Hangi durumda ne yapıyoruz?",
    decisionsHint: "Sinyal, doğrudan sorumlu ekibin uygulayabileceği aksiyona çevrilir.",
    condition: "Gözlenen durum",
    action: "Operasyon kararı",
    sources: "Veri kaynakları",
    classifications: "Operasyon sınıfları",
    example: "Gerçek operasyon okuması",
    caveat: "Model notu",
    output: "Üretilen çıktı",
    evidence: "İzlenen sinyaller ve veri kaynakları",
    evidenceHint: "Detaylı kontrol kapsamını görüntüle",
    expand: "Teknik metodolojiyi aç",
    collapse: "Teknik metodolojiyi kapat",
    noteExpand: "Sell-in / sell-out metodolojisini aç",
    evaluatedWith: "Birlikte değerlendirilen sinyaller",
    loopEyebrow: "ÇALIŞMA MANTIĞI",
    loopTitle: "Her veri noktası, açıklanabilir bir ticari karara bağlanır.",
    loopText: "Bu bölüm DRK'nın yalnızca sonuç raporlamadığını; sorunun kaynağını nasıl bulduğunu, nasıl hesapladığını ve operasyonda kimin ne yapacağını nasıl belirlediğini gösterir.",
    loopSteps: [
      ["Sinyali birleştir", "Kanal, ürün, müşteri ve finans verisini aynı görünümde toplarız."],
      ["Sapmayı ölç", "Sonucu ortak formüller ve kategoriye uygun eşiklerle karşılaştırırız."],
      ["Nedeni ayır", "Talep, fiyat, dönüşüm, stok veya operasyon sorununu sınıflandırırız."],
      ["Aksiyonu sahiplen", "Öncelik, sorumlu ekip, tarih ve beklenen ticari çıktıyı tanımlarız."],
    ],
  },
  en: {
    purpose: "What does this model solve?",
    formulas: "How do we measure it?",
    formulasHint: "The core calculations behind each decision and their commercial meaning.",
    decisions: "What action follows each signal?",
    decisionsHint: "Every signal is translated into an action that an accountable team can execute.",
    condition: "Observed condition",
    action: "Operating decision",
    sources: "Data sources",
    classifications: "Operating classes",
    example: "Real operating interpretation",
    caveat: "Model note",
    output: "Produced output",
    evidence: "Signals monitored and data sources",
    evidenceHint: "View the detailed control scope",
    expand: "Open technical methodology",
    collapse: "Close technical methodology",
    noteExpand: "Open sell-in / sell-out methodology",
    evaluatedWith: "Signals evaluated together",
    loopEyebrow: "HOW THE MODEL WORKS",
    loopTitle: "Every data point is connected to an explainable commercial decision.",
    loopText: "This section shows that DRK does more than report outcomes: it identifies the root cause, applies a consistent calculation and assigns the next operating action to a clear owner.",
    loopSteps: [
      ["Unify the signal", "Bring channel, product, customer and finance data into one view."],
      ["Measure deviation", "Compare the result with shared formulas and category-specific thresholds."],
      ["Isolate the cause", "Classify demand, price, conversion, inventory or operating issues."],
      ["Own the action", "Define priority, accountable team, timing and expected commercial output."],
    ],
  },
};

function DetailSectionHeading({ number, title, text }) {
  return (
    <header className="technical-detail__heading">
      <span>{number}</span>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </header>
  );
}

function TechnicalFlow({ title, items }) {
  return (
    <div className="technical-flow" role="img" aria-label={`${title}: ${items.join(" → ")}`}>
      <small>{title}</small>
      <div>
        {items.map((item, index) => (
          <span className="technical-flow__step" key={item}>
            <b>{item}</b>
            {index < items.length - 1 ? <ArrowRight size={16} aria-hidden="true" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechnicalMethodologyDetail({ layer, lang }) {
  const ui = UI[lang];

  return (
    <div className="technical-detail">
      <section className="technical-detail__purpose">
        <small>{ui.purpose}</small>
        <p>{layer.methodology}</p>
      </section>

      <section className="technical-detail__section">
        <DetailSectionHeading number="01" title={ui.formulas} text={ui.formulasHint} />
        <div className="technical-formulas">
          {layer.formulas.map((formula) => (
            <article key={formula.label}>
              <small>{formula.label}</small>
              <code>{formula.expression}</code>
              <p>{formula.note}</p>
            </article>
          ))}
        </div>
      </section>

      {layer.flow ? <TechnicalFlow title={layer.flowTitle} items={layer.flow} /> : null}

      <section className="technical-detail__section">
        <DetailSectionHeading number="02" title={ui.decisions} text={ui.decisionsHint} />
        <div className="technical-decisions" role="table" aria-label={ui.decisions}>
          <div className="technical-decisions__head" role="row">
            <span role="columnheader">{ui.condition}</span>
            <span role="columnheader">{ui.action}</span>
          </div>
          {layer.decisions.map((decision) => (
            <article role="row" key={`${decision.condition}-${decision.action}`}>
              <code role="cell">{decision.condition}</code>
              <ArrowRight size={16} aria-hidden="true" />
              <strong role="cell">{decision.action}</strong>
            </article>
          ))}
        </div>
      </section>

      {layer.classifications ? (
        <section className="technical-detail__section technical-detail__classes-section">
          <h4>{ui.classifications}</h4>
          <div className="technical-classes">
            {layer.classifications.map((item) => (
              <article key={item.title}><strong>{item.title}</strong><span>{item.text}</span></article>
            ))}
          </div>
        </section>
      ) : null}

      <details className="technical-evidence">
        <summary>
          <span><strong>{ui.evidence}</strong><small>{ui.evidenceHint}</small></span>
          <ChevronDown size={19} aria-hidden="true" />
        </summary>
        <div className="technical-evidence__body">
          <section>
            <h4>{layer.trackedTitle}</h4>
            <div className="technical-tags">
              {layer.tracked.map((signal) => <span key={signal}>{signal}</span>)}
            </div>
          </section>
          <section>
            <h4>{ui.sources}</h4>
            <div className="technical-sources">
              {layer.sources.map((source) => <span key={source}>{source}</span>)}
            </div>
          </section>
        </div>
      </details>

      <div className="technical-detail__insights">
        <article><small>{ui.example}</small><p>{layer.example}</p></article>
        {layer.caveat ? <article className="technical-detail__caveat"><small>{ui.caveat}</small><p>{layer.caveat}</p></article> : null}
      </div>

      <div className="technical-output">
        <span>{ui.output}</span>
        <code>{layer.output}</code>
      </div>
    </div>
  );
}

function TechnicalOperatingLoop({ lang }) {
  const ui = UI[lang];

  return (
    <section className="technical-loop" aria-labelledby={`technical-loop-title-${lang}`}>
      <div className="technical-loop__intro">
        <small>{ui.loopEyebrow}</small>
        <h3 id={`technical-loop-title-${lang}`}>{ui.loopTitle}</h3>
        <p>{ui.loopText}</p>
      </div>
      <ol className="technical-loop__steps">
        {ui.loopSteps.map(([title, text], index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{title}</strong><p>{text}</p></div>
            {index < ui.loopSteps.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function TechnicalAccordion({ lang }) {
  const [openNumber, setOpenNumber] = useState("01");
  const ui = UI[lang];

  return (
    <div className="technical-accordion">
      {TECHNICAL_METHODS[lang].map((layer, index) => {
        const Icon = LAYER_ICONS[index];
        const isOpen = openNumber === layer.number;
        const panelId = `technical-panel-${lang}-${layer.number}`;

        return (
          <article className="technical-accordion__item" data-open={isOpen} key={layer.number}>
            <button
              type="button"
              className="technical-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenNumber(isOpen ? null : layer.number)}
            >
              <span className="technical-accordion__icon"><Icon size={22} /></span>
              <small>{layer.number}</small>
              <span className="technical-accordion__copy">
                <strong>{layer.title}</strong>
                <span>{layer.summary}</span>
              </span>
              <span className="technical-accordion__signals" aria-hidden="true">
                {layer.signals.map((signal) => <i key={signal}>{signal}</i>)}
              </span>
              <span className="technical-accordion__toggle">
                <span className="sr-only">{isOpen ? ui.collapse : ui.expand}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </span>
            </button>
            <div className="technical-accordion__body" id={panelId} data-open={isOpen} aria-hidden={!isOpen}>
              <div><TechnicalMethodologyDetail layer={layer} lang={lang} /></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function TechnicalSellInNote({ lang }) {
  const note = TECHNICAL_NOTE[lang];
  const ui = UI[lang];

  return (
    <details className="about-technical__note">
      <summary>
        <span className="about-technical__note-icon"><Database size={22} /></span>
        <span><strong>{note.title}</strong><small>{ui.noteExpand}</small></span>
        <ChevronDown size={20} aria-hidden="true" />
      </summary>
      <div className="about-technical__note-body">
        <p>{note.intro}</p>
        <div className="technical-note__definitions">
          {note.definitions.map(([title, text]) => <article key={title}><strong>{title}</strong><span>{text}</span></article>)}
        </div>
        <code className="technical-note__formula">{note.formula}</code>
        <div className="technical-note__example">
          {note.example.map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}
        </div>
        <div className="technical-note__factors"><small>{ui.evaluatedWith}</small><div>{note.factors.map((factor) => <span key={factor}>{factor}</span>)}</div></div>
        <p className="technical-note__conclusion">{note.conclusion}</p>
      </div>
    </details>
  );
}

export default function TechnicalMethodology({ lang }) {
  return (
    <>
      <TechnicalOperatingLoop lang={lang} />
      <TechnicalAccordion lang={lang} />
      <TechnicalSellInNote lang={lang} />
    </>
  );
}
