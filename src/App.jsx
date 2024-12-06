import React, { useState, useEffect } from "react";
import "./App.css";

const cultivos = {
  cafe: {
    nombre: "Café",
    montoMin: 7000000,
    montoMax: 9000000,
    plazo: 18,
    modalidades: ["Semestral", "Mensual"],
  },
  papa: {
    nombre: "Papa",
    montoMin: 6000000,
    montoMax: 10000000,
    plazo: 12,
    modalidades: ["Bimensual", "Mensual"],
  },
  arroz: {
    nombre: "Arroz",
    montoMin: 8000000,
    montoMax: 15000000,
    plazo: 12,
    modalidades: ["Bimensual", "Cuatrimestral", "Semestral", "Mensual"],
  },
  platano: {
    nombre: "Plátano",
    montoMin: 2000000,
    montoMax: 6000000,
    plazo: 12,
    modalidades: ["Mensual", "Bimensual", "Trimestral"],
  },
  banano: {
    nombre: "Banano",
    montoMin: 2000000,
    montoMax: 6000000,
    plazo: 12,
    modalidades: ["Mensual", "Bimensual", "Trimestral"],
  },
  ganaderia: {
    nombre: "Ganadería",
    montoMin: 5000000,
    montoMax: 15000000,
    plazo: 24,
    modalidades: ["Mensual", "Trimestral", "Semestral"],
  },
  avicultura: {
    nombre: "Avicultura",
    montoMin: 3000000,
    montoMax: 12000000,
    plazo: 18,
    modalidades: ["Mensual", "Bimensual", "Trimestral"],
  },
};

const fngComisionMenor32500000 = {
  2: 0.0042,
  3: 0.0063,
  4: 0.0083,
  5: 0.0104,
  6: 0.0125,
  7: 0.0146,
  8: 0.0167,
  9: 0.0188,
  10: 0.0208,
  11: 0.0229,
  12: 0.025,
  13: 0.0252,
  14: 0.0256,
  15: 0.0263,
  16: 0.0271,
  17: 0.0281,
  18: 0.0292,
  19: 0.0304,
  20: 0.0317,
  21: 0.0331,
  22: 0.0346,
  23: 0.0361,
  24: 0.0376,
  25: 0.0382,
  26: 0.0389,
  27: 0.0397,
  28: 0.0406,
  29: 0.0416,
  30: 0.0426,
  31: 0.0438,
  32: 0.0449,
  33: 0.0462,
  34: 0.0475,
  35: 0.0488,
  36: 0.0502,
  37: 0.0509,
  38: 0.0517,
  39: 0.0526,
  40: 0.0535,
  41: 0.0545,
  42: 0.0555,
  43: 0.0566,
  44: 0.0577,
  45: 0.0589,
  46: 0.0601,
  47: 0.0613,
  48: 0.0626,
  49: 0.0634,
  50: 0.0642,
  51: 0.0651,
  52: 0.066,
  53: 0.067,
  54: 0.068,
  55: 0.0691,
  56: 0.0701,
  57: 0.0713,
  58: 0.0724,
  59: 0.0736,
  60: 0.0748,
};

const fngComisionMayor32500000 = {
  2: 0.0046,
  3: 0.0069,
  4: 0.0092,
  5: 0.0115,
  6: 0.0138,
  7: 0.016,
  8: 0.0183,
  9: 0.0189,
  10: 0.0229,
  11: 0.0252,
  12: 0.0275,
  13: 0.0277,
  14: 0.0282,
  15: 0.0289,
  16: 0.0298,
  17: 0.0309,
  18: 0.0321,
  19: 0.0335,
  20: 0.0349,
  21: 0.0364,
  22: 0.038,
  23: 0.0397,
  24: 0.0414,
  25: 0.042,
  26: 0.0428,
  27: 0.0437,
  28: 0.0447,
  29: 0.0457,
  30: 0.0469,
  31: 0.0481,
  32: 0.0494,
  33: 0.0508,
  34: 0.0522,
  35: 0.0537,
  36: 0.0552,
  37: 0.056,
  38: 0.0569,
  39: 0.0578,
  40: 0.0588,
  41: 0.0599,
  42: 0.061,
  43: 0.0622,
  44: 0.0635,
  45: 0.0648,
  46: 0.0661,
  47: 0.0674,
  48: 0.0688,
  49: 0.0697,
  50: 0.0706,
  51: 0.0716,
  52: 0.0726,
  53: 0.0737,
  54: 0.0748,
  55: 0.076,
  56: 0.0772,
  57: 0.0784,
  58: 0.0796,
  59: 0.0809,
  60: 0.0822,
};

const tasasInteresRural = [
  { min: 1000000, max: 3000000, ea: 0.69, nmv: 0.5364, mv: 0.0447 },
  { min: 3000001, max: 5000000, ea: 0.68, nmv: 0.5302, mv: 0.0442 },
  { min: 5000001, max: 7800000, ea: 0.68, nmv: 0.5302, mv: 0.0442 },
  { min: 7800001, max: 15600000, ea: 0.2478, nmv: 0.2234, mv: 0.0186 },
  { min: 15600001, max: 32500000, ea: 0.2478, nmv: 0.2234, mv: 0.0186 },
  { min: 32500001, max: 156000000, ea: 0.3998, nmv: 0.3411, mv: 0.0284 },
];

const tasasInteresUrbano = [
  // Copy of tasasInteresRural, to be updated later
  { min: 1000000, max: 3000000, ea: 0.73, nmv: 0.5608, mv: 0.0467 },
  { min: 3000001, max: 5000000, ea: 0.7, nmv: 0.5425, mv: 0.0452 },
  { min: 5000001, max: 7800000, ea: 0.7, nmv: 0.5425, mv: 0.0452 },
  { min: 7800001, max: 15600000, ea: 0.534, nmv: 0.4356, mv: 0.0363 },
  { min: 15600001, max: 32500000, ea: 0.534, nmv: 0.4356, mv: 0.0363 },
  { min: 32500001, max: 156000000, ea: 0.3998, nmv: 0.3411, mv: 0.0284 },
];
const leyMipyme = [
  { min: 1000000, max: 15600000, comision: 0.075 },
  { min: 15600001, max: 32500000, comision: 0.045 },
];

const App = () => {
  const [montoError, setMontoError] = useState("");
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [modalidadPago, setModalidadPago] = useState("");
  const [amortizacion, setAmortizacion] = useState([]);
  const [error, setError] = useState("");
  const [plazoMaximo, setPlazoMaximo] = useState(0);
  const [hectareas, setHectareas] = useState("0.00");
  const [hectareasMaximas, setHectareasMaximas] = useState(0); // Nuevo estado
  const [fngRate, setFngRate] = useState(0);
  const [mipymeRate, setMipymeRate] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [modalidadCredito, setModalidadCredito] = useState("Micro");
  const [tipologia, setTipologia] = useState("Rural");
  const [fngPaymentOption, setFngPaymentOption] = useState("Diferido"); // Opciones: "Diferido", "Anticipado"
  const [mipymePaymentOption, setMipymePaymentOption] = useState("Diferido"); // Opciones: "Diferido", "Anticipado"

  useEffect(() => {
    if (cultivoSeleccionado && modalidadPago) {
      const cultivo = cultivos[cultivoSeleccionado];
      const frecuenciaPago = {
        Mensual: 1,
        Bimensual: 2,
        Trimestral: 3,
        Cuatrimestral: 4,
        Semestral: 6,
      };
      const maxPeriodos = cultivo.plazo / frecuenciaPago[modalidadPago];
      setPlazoMaximo(maxPeriodos);
      setPlazo(Math.min(plazo, maxPeriodos));
    }
  }, [cultivoSeleccionado, modalidadPago]);

  useEffect(() => {
    if (monto && plazo && modalidadPago) {
      const montoNum = parseFloat(monto);
      const frecuenciaPago = {
        Mensual: 1,
        Bimensual: 2,
        Trimestral: 3,
        Cuatrimestral: 4,
        Semestral: 6,
      };
      const mesesPorPeriodo = frecuenciaPago[modalidadPago];
      const plazoMeses = plazo * mesesPorPeriodo; // Cálculo total de meses
      setFngRate(calcularFNG(montoNum, plazoMeses));
      setMipymeRate(calcularMipyme(montoNum));
      setInterestRate(calcularTasaInteres(montoNum));
    }
  }, [monto, plazo, modalidadPago, tipologia]);

  const calcularFNG = (monto, plazoMeses) => {
    if (monto <= 32500000) {
      return fngComisionMenor32500000[plazoMeses] || 0;
    } else {
      return fngComisionMayor32500000[plazoMeses] || 0;
    }
  };

  const calcularMipyme = (monto) => {
    for (const rango of leyMipyme) {
      if (monto >= rango.min && monto <= rango.max) {
        return rango.comision;
      }
    }
    return 0;
  };

  const calcularTasaInteres = (monto) => {
    const tasasInteres =
      tipologia === "Rural" ? tasasInteresRural : tasasInteresUrbano;
    for (const rango of tasasInteres) {
      if (monto >= rango.min && monto <= rango.max) {
        return rango.mv;
      }
    }
    return 0;
  };

  const limpiarTablaAmortizacion = () => {
    setAmortizacion([]);
  };

  const ajustarTasaInteresPorPeriodicidad = (tasaMensual, modalidad) => {
    const frecuenciaPago = {
      Mensual: 1,
      Bimensual: 2,
      Trimestral: 3,
      Cuatrimestral: 4,
      Semestral: 6,
    };

    // Calculamos la tasa para el período específico
    return Math.pow(1 + tasaMensual, frecuenciaPago[modalidad]) - 1;
  };

  const calcularAmortizacion = (
    capital,
    tasaMensual,
    plazoPeriodos,
    modalidad,
    fngTotal, // Monto total del FNG calculado previamente
    mipymeRate,
    fngPaymentOption,
    mipymePaymentOption
  ) => {
    const frecuenciaPago = {
      Mensual: 1,
      Bimensual: 2,
      Trimestral: 3,
      Cuatrimestral: 4,
      Semestral: 6,
    };

    const mesesPorPeriodo = frecuenciaPago[modalidad];
    const plazoMeses = plazoPeriodos * mesesPorPeriodo;
    const tasaPeriodica = ajustarTasaInteresPorPeriodicidad(
      tasaMensual,
      modalidad
    );

    const cuotaConstante =
      (capital * tasaPeriodica) /
      (1 - Math.pow(1 + tasaPeriodica, -plazoPeriodos));

    let leyMipymeCuota = 0;

    let amortizacion = [];
    let saldo = capital;
    let mesesTranscurridos = 0;

    for (let i = 1; i <= plazoPeriodos; i++) {
      // Recalcular Ley Mipyme al inicio de cada año
      if (mesesTranscurridos % 12 === 0) {
        const leyMipymeAnual = saldo * mipymeRate;
        const periodosPorAno = Math.ceil(12 / mesesPorPeriodo);

        if (mipymePaymentOption === "Anticipado") {
          // Ley Mipyme cargada a la primera cuota del año
          leyMipymeCuota = leyMipymeAnual + leyMipymeAnual * 0.19; // Incluye IVA
        } else {
          // Diferido
          // Ley Mipyme distribuida en las cuotas del año
          leyMipymeCuota =
            (leyMipymeAnual + leyMipymeAnual * 0.19) / periodosPorAno;
        }
      }

      let interesCuota = saldo * tasaPeriodica;
      let capitalCuota = cuotaConstante - interesCuota;

      let mipymeCuota = 0;
      if (
        mipymePaymentOption === "Anticipado" &&
        mesesTranscurridos % 12 === 0
      ) {
        mipymeCuota = leyMipymeCuota; // Cargado a la primera cuota del año
      } else if (mipymePaymentOption === "Diferido") {
        mipymeCuota = leyMipymeCuota;
      }

      // Ajustar el FNG según la opción seleccionada
      let fngActual = 0;
      if (fngPaymentOption === "Anticipado" && i === 1) {
        fngActual = fngTotal * 1.19; // Cargado a la primera cuota con IVA
      } else if (fngPaymentOption === "Diferido") {
        // Distribuir el FNG proporcionalmente al número de meses por periodo
        fngActual = (fngTotal / plazoMeses) * mesesPorPeriodo * 1.19;
      }

      let cuotaTotal = cuotaConstante + fngActual + mipymeCuota;

      saldo -= capitalCuota;
      mesesTranscurridos += mesesPorPeriodo;

      amortizacion.push({
        cuota: i,
        cuotaConstante: cuotaConstante.toFixed(2),
        capitalCuota: capitalCuota.toFixed(2),
        interesCuota: interesCuota.toFixed(2),
        fngCuota: fngActual.toFixed(2),
        mipymeCuota: mipymeCuota.toFixed(2),
        cuotaTotal: cuotaTotal.toFixed(2),
        saldoRestante: saldo.toFixed(2),
      });
    }

    return amortizacion;
  };

  const handleCultivoChange = (event) => {
    const cultivoKey = event.target.value;
    const cultivo = cultivos[cultivoKey];

    if (cultivo) {
      setCultivoSeleccionado(cultivoKey);
      setMonto("");
      setPlazo(cultivo.plazo);
      setModalidadPago(cultivo.modalidades[0]);
      setAmortizacion([]);
      setHectareas("0.00"); // Reiniciar hectáreas al cambiar cultivo

      // Calcular hectáreas máximas usando montoMax sin Math.floor
      const maxHectareas = 15600000 / cultivo.montoMax;
      setHectareasMaximas(maxHectareas);

      setError(
        `⚠️ El monto máximo permitido es de 15.600.000 COP. Para este cultivo, se pueden financiar hasta ${maxHectareas.toFixed(
          2
        )} hectáreas.`
      );
    } else {
      setCultivoSeleccionado("");
      setMonto("");
      setPlazo("");
      setModalidadPago("");
      setAmortizacion([]);
      setError("");
      setHectareasMaximas(0);
      setHectareas("0.00");
    }
  };

  const validateMonto = (valor, hectareasVal = parseFloat(hectareas)) => {
    if (valor < 1000000) {
      setMontoError("❌ El monto mínimo es de 1 millón de COP.");
      limpiarTablaAmortizacion();
      return false;
    }

    if (valor > 15600000) {
      setMontoError("❌ El monto máximo permitido es de 15.600.000 COP.");
      limpiarTablaAmortizacion();
      return false;
    }

    if (cultivoSeleccionado && hectareasVal) {
      const montoMaximo = cultivos[cultivoSeleccionado].montoMax * hectareasVal;
      if (valor > montoMaximo) {
        setMontoError(
          `❌ El monto máximo para ${hectareasVal.toFixed(
            2
          )} hectáreas es de ${montoMaximo.toLocaleString("es-CO")} COP.`
        );
        limpiarTablaAmortizacion();
        return false;
      }
    }

    setMontoError("");
    return true;
  };

  const handleMontoChange = (event) => {
    const valor = parseFloat(event.target.value);
    setMonto(valor);
    if (!validateMonto(valor)) {
      limpiarTablaAmortizacion();
    }
  };

  const handlePlazoChange = (event) => {
    const valor = parseInt(event.target.value, 10);
    if (valor > plazoMaximo) {
      setError(
        `⚠️ El plazo máximo para esta modalidad es de ${plazoMaximo} periodos.`
      );
    } else {
      setError("");
      setPlazo(valor);
    }
  };

  const handleModalidadPago = (event) => {
    setModalidadPago(event.target.value);
    setPlazo("");
  };

  const handleModalidadCreditoChange = (event) => {
    setModalidadCredito(event.target.value);
  };

  const handleTipologiaChange = (event) => {
    setTipologia(event.target.value);
  };

  const handleHectareasChange = (event) => {
    const inputValue = event.target.value;

    // Permitir entrada vacía para permitir borrar el campo
    if (inputValue === "") {
      setHectareas("");
      setError(
        `⚠️ Recuerda ingresar la cantidad de hectáreas, máximo  ${hectareasMaximas.toFixed(
          2
        )}.`
      );
      return;
    }

    const valor = parseFloat(inputValue);
    if (!isNaN(valor) && valor >= 0) {
      if (valor > hectareasMaximas) {
        //setHectareas(hectareasMaximas.toFixed(2));
        setError(
          `⚠️ El número máximo de hectáreas para este cultivo es ${hectareasMaximas.toFixed(
            2
          )}.`
        );
      } else {
        // Redondear a dos decimales
        const valorRedondeado = Math.round(valor * 100) / 100;
        setHectareas(valorRedondeado); //.toFixed(2)
        setError("");
      }

      if (monto) {
        if (!validateMonto(parseFloat(monto), valor)) {
          // Pasar hectareas a validateMonto
          limpiarTablaAmortizacion();
        }
      }
    }
  };

  const handleCalcular = () => {
    if (
      !cultivoSeleccionado ||
      !monto ||
      !plazo ||
      !modalidadPago ||
      parseFloat(hectareas) === 0
    ) {
      setError("❗ Por favor completa todos los campos.");
      limpiarTablaAmortizacion();
      return;
    }
    if (!validateMonto(monto)) {
      setError("❗ Por favor corrige el monto antes de calcular.");
      limpiarTablaAmortizacion();
      return;
    }
    const capital = parseFloat(monto);
    const frecuenciaPago = {
      Mensual: 1,
      Bimensual: 2,
      Trimestral: 3,
      Cuatrimestral: 4,
      Semestral: 6,
    };
    const plazoPeriodos = plazo;
    const mesesPorPeriodo = frecuenciaPago[modalidadPago];
    const plazoMeses = plazoPeriodos * mesesPorPeriodo; // Cálculo total de meses
    const fngRateAjustado = calcularFNG(capital, plazoMeses);
    const fngTotal = fngRateAjustado * capital; // Cálculo correcto del FNG Total
    const tasaMensual = interestRate;

    const amort = calcularAmortizacion(
      capital,
      tasaMensual,
      plazoPeriodos,
      modalidadPago,
      fngTotal, // Pasar el monto total del FNG basado en meses
      mipymeRate,
      fngPaymentOption, // Opciones de pago FNG
      mipymePaymentOption // Opciones de pago Ley Mipyme
    );
    setAmortizacion(amort);
    setError("");
  };

  const handleReiniciar = () => {
    setCultivoSeleccionado("");
    setMonto("");
    setPlazo("");
    setModalidadPago("");
    setAmortizacion([]);
    setError("");
    setHectareas("0.00");
    setHectareasMaximas(0);
    setFngRate(0);
    setMipymeRate(0);
    setInterestRate(0);
    setModalidadCredito("Micro");
    setTipologia("Rural");
    setMontoError("");
    setFngPaymentOption("Diferido"); // Restablecer a "Diferido"
    setMipymePaymentOption("Diferido"); // Restablecer a "Diferido"
  };

  return (
    <div className="chat-container">
      <div className="chat-message">
        <p>
          👋 ¡Bienvenido al Simulador de Créditos Agro! Para comenzar,
          selecciona el cultivo que deseas financiar.
        </p>
        <label>Selecciona el cultivo:</label>
        <select value={cultivoSeleccionado} onChange={handleCultivoChange}>
          <option value="">-- Selecciona un cultivo --</option>
          {Object.entries(cultivos).map(([key, cultivo]) => (
            <option key={key} value={key}>
              {cultivo.nombre}
            </option>
          ))}
        </select>
      </div>

      {cultivoSeleccionado && (
        <div className="chat-message">
          <p>✅ Cultivo seleccionado: {cultivos[cultivoSeleccionado].nombre}</p>
          <p>
            Recuerda que el monto a financiar por hectárea es de:{" "}
            {cultivos[cultivoSeleccionado].montoMin.toLocaleString("es-CO")} a{" "}
            {cultivos[cultivoSeleccionado].montoMax.toLocaleString("es-CO")}{" "}
            COP.
          </p>
          <label>Número de hectáreas:</label>
          <input
            type="number"
            value={hectareas}
            onChange={handleHectareasChange}
            min="0"
            step="0.01"
          />
          {hectareas && (
            <p>
              Monto financiable estimado:{" "}
              {(
                parseFloat(hectareas) * cultivos[cultivoSeleccionado].montoMin
              ).toLocaleString("es-CO", { maximumFractionDigits: 0 })}{" "}
              a{" "}
              {(
                parseFloat(hectareas) * cultivos[cultivoSeleccionado].montoMax
              ).toLocaleString("es-CO", { maximumFractionDigits: 0 })}{" "}
              COP
            </p>
          )}
          {parseFloat(hectareas) === hectareasMaximas && (
            <p className="info">
              📌 Has alcanzado el número máximo de hectáreas permitidas para
              este cultivo.
            </p>
          )}
          <p>💵 Ingresa el monto a solicitar en COP (mínimo 1.000.000):</p>
          <input
            type="number"
            value={monto}
            onChange={handleMontoChange}
            min="1000000"
            step="1000"
            max={
              cultivoSeleccionado
                ? cultivos[cultivoSeleccionado].montoMax * hectareasMaximas
                : 15600000
            }
          />
          {montoError && <p className="error">{montoError}</p>}
          <p>
            🕒 Ingresa el número de periodos (máximo {plazoMaximo}{" "}
            {modalidadPago.toLowerCase()}):
          </p>
          <input
            type="number"
            value={plazo}
            onChange={handlePlazoChange}
            min="1"
            max={plazoMaximo}
          />
          <p>📅 Elige la modalidad de pago que prefieras:</p>
          <select value={modalidadPago} onChange={handleModalidadPago}>
            {cultivos[cultivoSeleccionado].modalidades.map(
              (modalidad, index) => (
                <option key={index} value={modalidad}>
                  {modalidad}
                </option>
              )
            )}
          </select>

          {/* Nuevos selectores para opciones de pago de FNG y Ley Mipyme */}
          <div>
            <p>Forma de Pago para FNG:</p>
            <select
              value={fngPaymentOption}
              onChange={(e) => setFngPaymentOption(e.target.value)}
            >
              <option value="Diferido">Diferido</option>
              <option value="Anticipado">Anticipado</option>
            </select>
          </div>
          <div>
            <p>Forma de Pago para Ley Mipyme:</p>
            <select
              value={mipymePaymentOption}
              onChange={(e) => setMipymePaymentOption(e.target.value)}
            >
              <option value="Diferido">Diferido</option>
              <option value="Anticipado">Anticipado</option>
            </select>
          </div>

          <div>
            <p>Modalidad de crédito:</p>
            <select
              value={modalidadCredito}
              onChange={handleModalidadCreditoChange}
            >
              <option value="Comercial">Comercial</option>
              <option value="Micro">Micro</option>
            </select>
          </div>
          <div>
            <p>Tipología:</p>
            <select value={tipologia} onChange={handleTipologiaChange}>
              <option value="Rural">Rural</option>
              <option value="Urbano">Urbano</option>
            </select>
          </div>
          <div>
            <p>Tasa FNG: {(fngRate * 100).toFixed(2)}%</p>
            <input
              type="number"
              value={fngRate}
              onChange={() => {}} // Remover la posibilidad de cambiar la tasa manualmente
              step="0.0001"
              min="0"
              max="1"
              disabled // Deshabilitar el campo de entrada
            />
          </div>
          <div>
            <p>Tasa Ley Mipyme: {(mipymeRate * 100).toFixed(2)}%</p>
            <input
              type="number"
              value={mipymeRate}
              onChange={(e) => setMipymeRate(parseFloat(e.target.value))}
              step="0.0001"
              min="0"
              max="1"
            />
          </div>
          <div>
            <p>Tasa de Interés (M.V.): {(interestRate * 100).toFixed(2)}%</p>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              step="0.0001"
              min="0"
              max="1"
            />
          </div>
          <button onClick={handleCalcular}>Calcular Amortización</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {amortizacion.length > 0 && (
        <div className="chat-message">
          <h2>📊 Tabla de Amortización</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Cuota</th>
                <th>Cuota Constante</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>FNG</th>
                <th>Ley Mipyme</th>
                <th>Cuota Total</th>
                <th>Saldo Restante</th>
              </tr>
            </thead>
            <tbody>
              {amortizacion.map((cuota, index) => (
                <tr key={index}>
                  <td>{cuota.cuota}</td>
                  <td>
                    {parseFloat(cuota.cuotaConstante).toLocaleString("es-CO")}
                  </td>
                  <td>
                    {parseFloat(cuota.capitalCuota).toLocaleString("es-CO")}
                  </td>
                  <td>
                    {parseFloat(cuota.interesCuota).toLocaleString("es-CO")}
                  </td>
                  <td>{parseFloat(cuota.fngCuota).toLocaleString("es-CO")}</td>
                  <td>
                    {parseFloat(cuota.mipymeCuota).toLocaleString("es-CO")}
                  </td>
                  <td>
                    {parseFloat(cuota.cuotaTotal).toLocaleString("es-CO")}
                  </td>
                  <td>
                    {parseFloat(cuota.saldoRestante).toLocaleString("es-CO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={handleCalcular}>Recalcular</button>
            <button onClick={handleReiniciar}>Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
