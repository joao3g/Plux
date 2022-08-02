import "./dashboard.css";

import WidgetPonto from '../../../components/WidgetPonto';
import Chart from "../../../components/chart";


export default function Home() {
  return (
    <div className="home">
      <div className="homeWidgets">
        <WidgetPonto />
      </div>
      <div className="homeWidgets">
        <Chart title="Meus últimos pontos" aspect={4 / 1} />
      </div>
      
    </div>
  );
} 