
import React, { useEffect, useMemo, useState } from "react";

type Workout = { name: string; focus: string; equip: string; level: string; desc?: string };
type Food = { item: string; cals: number; protein: number; carbs: number; fat: number };

const WORKOUTS: Workout[] = [
  { name: "Barbell Back Squat", focus: "legs", equip: "barbell", level: "intermediate", desc: "Feet shoulder-width, brace, sit back and down; drive up through mid-foot." },
  { name: "Front Squat", focus: "quads", equip: "barbell", level: "intermediate", desc: "Elbows high, torso tall; descend until thighs parallel; drive up." },
  { name: "Romanian Deadlift", focus: "hamstrings", equip: "barbell", level: "intermediate", desc: "Hinge at hips with soft knees; keep bar close; stand tall." },
  { name: "Conventional Deadlift", focus: "posterior chain", equip: "barbell", level: "intermediate", desc: "Set back tight; push floor away; lockout with glutes." },
  { name: "Sumo Deadlift", focus: "posterior chain", equip: "barbell", level: "intermediate", desc: "Wide stance, vertical shins; drive knees out and stand." },
  { name: "Hip Thrust", focus: "glutes", equip: "barbell", level: "intermediate", desc: "Upper back on bench; full hip extension; pause at top." },
  { name: "Walking Lunges", focus: "legs", equip: "dumbbells", level: "beginner", desc: "Step forward, drop knee under hip; keep torso upright." },
  { name: "Leg Press", focus: "legs", equip: "machines", level: "beginner", desc: "Neutral spine, full range; don’t lock knees forcefully." },
  { name: "Leg Extension", focus: "quads", equip: "machines", level: "beginner", desc: "Control up/down; squeeze quads at top." },
  { name: "Leg Curl", focus: "hamstrings", equip: "machines", level: "beginner", desc: "Keep hips down; slow eccentric." },
  { name: "Calf Raise", focus: "calves", equip: "machines", level: "beginner", desc: "Full stretch at bottom; squeeze at top." },
  { name: "Dumbbell Bench Press", focus: "chest", equip: "dumbbells", level: "beginner", desc: "Shoulder blades back; control ROM; touch DBs lightly at top." },
  { name: "Barbell Bench Press", focus: "chest", equip: "barbell", level: "intermediate", desc: "Feet planted; bar to lower chest; press back and up." },
  { name: "Incline Dumbbell Press", focus: "upper chest", equip: "dumbbells", level: "beginner", desc: "Elbows 45°; press slightly back toward shoulders." },
  { name: "Incline Barbell Press", focus: "upper chest", equip: "barbell", level: "intermediate", desc: "Set scapulae; lower to upper chest; drive evenly." },
  { name: "Push-Up", focus: "chest", equip: "bodyweight", level: "beginner", desc: "Straight line head to heels; chest to floor; press strong." },
  { name: "Cable Fly", focus: "chest", equip: "cables", level: "beginner", desc: "Soft elbows; hug motion; squeeze chest midline." },
  { name: "Pec Deck", focus: "chest", equip: "machines", level: "beginner", desc: "Seat height so elbows align with chest; controlled tempo." },
  { name: "Pull-Up", focus: "back", equip: "bodyweight", level: "intermediate", desc: "Full hang; pull chest to bar; control down." },
  { name: "Chin-Up", focus: "back", equip: "bodyweight", level: "intermediate", desc: "Supinated grip; drive elbows down and back." },
  { name: "Lat Pulldown", focus: "lats", equip: "machines", level: "beginner", desc: "Pull bar to upper chest; avoid leaning back excessively." },
  { name: "Seated Cable Row", focus: "mid-back", equip: "cables", level: "beginner", desc: "Neutral spine; pull to lower ribs; squeeze back." },
  { name: "Bent-Over Row", focus: "back", equip: "barbell", level: "intermediate", desc: "Hinge; bar to belly; keep torso steady." },
  { name: "One-Arm DB Row", focus: "back", equip: "dumbbells", level: "beginner", desc: "Pull elbow to hip; avoid twisting torso." },
  { name: "T-Bar Row", focus: "back", equip: "barbell", level: "intermediate", desc: "Hinge, neutral spine; pull handle to sternum/belly." },
  { name: "Face Pull", focus: "rear delts", equip: "cables", level: "beginner", desc: "Rope to face; elbows high; squeeze rear delts." },
  { name: "Overhead Press", focus: "shoulders", equip: "barbell", level: "intermediate", desc: "Brace; press bar overhead; head through at top." },
  { name: "Seated DB Shoulder Press", focus: "shoulders", equip: "dumbbells", level: "beginner", desc: "Elbows under wrists; controlled path." },
  { name: "Lateral Raise", focus: "shoulders", equip: "dumbbells", level: "beginner", desc: "Lead with elbows; raise to shoulder height." },
  { name: "Cable Lateral Raise", focus: "shoulders", equip: "cables", level: "beginner", desc: "Light load; smooth arc; constant tension." },
  { name: "Rear Delt Fly", focus: "rear delts", equip: "dumbbells", level: "beginner", desc: "Hinge slightly; fly out and back." },
  { name: "Arnold Press", focus: "shoulders", equip: "dumbbells", level: "intermediate", desc: "Rotate palms during press; control motion." },
  { name: "Barbell Curl", focus: "biceps", equip: "barbell", level: "beginner", desc: "No swinging; full ROM." },
  { name: "Dumbbell Curl", focus: "biceps", equip: "dumbbells", level: "beginner", desc: "Elbows tucked; supinate at top if desired." },
  { name: "Cable Curl", focus: "biceps", equip: "cables", level: "beginner", desc: "Keep shoulders down; squeeze biceps." },
  { name: "Hammer Curl", focus: "biceps", equip: "dumbbells", level: "beginner", desc: "Neutral grip; control lower." },
  { name: "Preacher Curl", focus: "biceps", equip: "machines", level: "beginner", desc: "Pad under armpits; full stretch." },
  { name: "Skullcrusher", focus: "triceps", equip: "barbell", level: "intermediate", desc: "Lower to behind head; elbows stable." },
  { name: "Triceps Pushdown", focus: "triceps", equip: "cables", level: "beginner", desc: "No shoulder swing; lockout squeeze." },
  { name: "Overhead Triceps Extension", focus: "triceps", equip: "dumbbells", level: "beginner", desc: "Elbows in; full stretch overhead." },
  { name: "Close‑Grip Bench Press", focus: "triceps", equip: "barbell", level: "intermediate", desc: "Hands just inside shoulder; keep elbows tucked." },
  { name: "Dip", focus: "chest/triceps", equip: "bodyweight", level: "intermediate", desc: "Lean slightly forward; full ROM as tolerated." },
  { name: "Plank", focus: "core", equip: "bodyweight", level: "beginner", desc: "Rigid line; brace abs and glutes." },
  { name: "Hanging Knee Raise", focus: "core", equip: "bodyweight", level: "beginner", desc: "Control swing; knees to chest." },
  { name: "Cable Crunch", focus: "core", equip: "cables", level: "beginner", desc: "Flex spine under control; exhale to brace." },
  { name: "Russian Twist", focus: "core", equip: "bodyweight", level: "beginner", desc: "Torso twist; keep ribcage down." },
  { name: "Back Extension", focus: "lower back", equip: "machines", level: "beginner", desc: "Hinge; avoid hyperextending; squeeze glutes." },
  { name: "Farmer's Carry", focus: "full body", equip: "dumbbells", level: "intermediate", desc: "Tall posture; steady steps; tight grip." },
  { name: "Kettlebell Swing", focus: "hips/glutes", equip: "dumbbells", level: "beginner", desc: "Hinge; hips drive bell; avoid squatting it." },
  { name: "Bulgarian Split Squat", focus: "quads/glutes", equip: "dumbbells", level: "intermediate", desc: "Rear foot elevated; front knee tracks toes." }
];

const FOODS: Food[] = [
  { item: "Oats (1/2 cup)", cals: 150, protein: 5, carbs: 27, fat: 3 },
  { item: "Greek Yogurt (170g)", cals: 100, protein: 17, carbs: 6, fat: 0 },
  { item: "Chicken Breast (4oz)", cals: 187, protein: 35, carbs: 0, fat: 4 },
  { item: "Turkey Breast (4oz)", cals: 160, protein: 32, carbs: 0, fat: 2 },
  { item: "Lean Ground Beef 93% (4oz)", cals: 170, protein: 24, carbs: 0, fat: 8 },
  { item: "Salmon (4oz)", cals: 233, protein: 23, carbs: 0, fat: 15 },
  { item: "Tuna (3oz, water)", cals: 100, protein: 22, carbs: 0, fat: 1 },
  { item: "Eggs (2 large)", cals: 140, protein: 12, carbs: 1, fat: 10 },
  { item: "Egg Whites (1 cup)", cals: 126, protein: 26, carbs: 2, fat: 0 },
  { item: "Cottage Cheese (1/2 cup)", cals: 110, protein: 14, carbs: 5, fat: 4 },
  { item: "Brown Rice (1 cup)", cals: 216, protein: 5, carbs: 45, fat: 2 },
  { item: "White Rice (1 cup)", cals: 205, protein: 4, carbs: 45, fat: 0 },
  { item: "Quinoa (1 cup)", cals: 222, protein: 8, carbs: 39, fat: 4 },
  { item: "Sweet Potato (200g)", cals: 180, protein: 4, carbs: 41, fat: 0 },
  { item: "Russet Potato (200g)", cals: 168, protein: 4, carbs: 38, fat: 0 },
  { item: "Whole‑Wheat Bread (2 slices)", cals: 180, protein: 8, carbs: 34, fat: 2 },
  { item: "Tortilla (flour, 1 medium)", cals: 140, protein: 4, carbs: 24, fat: 4 },
  { item: "Pasta (1 cup cooked)", cals: 200, protein: 7, carbs: 40, fat: 1 },
  { item: "Black Beans (1/2 cup)", cals: 114, protein: 8, carbs: 20, fat: 0 },
  { item: "Chickpeas (1/2 cup)", cals: 135, protein: 7, carbs: 22, fat: 2 },
  { item: "Lentils (1/2 cup)", cals: 115, protein: 9, carbs: 20, fat: 0 },
  { item: "Edamame (1/2 cup)", cals: 95, protein: 9, carbs: 8, fat: 3 },
  { item: "Tofu (4oz)", cals: 94, protein: 10, carbs: 2, fat: 6 },
  { item: "Tempeh (4oz)", cals: 195, protein: 18, carbs: 12, fat: 9 },
  { item: "Avocado (1/2)", cals: 120, protein: 2, carbs: 6, fat: 10 },
  { item: "Almonds (1 oz)", cals: 164, protein: 6, carbs: 6, fat: 14 },
  { item: "Peanut Butter (2 tbsp)", cals: 190, protein: 7, carbs: 7, fat: 16 },
  { item: "Olive Oil (1 tbsp)", cals: 119, protein: 0, carbs: 0, fat: 14 },
  { item: "Banana (1 medium)", cals: 105, protein: 1, carbs: 27, fat: 0 },
  { item: "Apple (1 medium)", cals: 95, protein: 0, carbs: 25, fat: 0 },
  { item: "Blueberries (1 cup)", cals: 84, protein: 1, carbs: 21, fat: 0 },
  { item: "Strawberries (1 cup)", cals: 49, protein: 1, carbs: 12, fat: 0 },
  { item: "Orange (1 medium)", cals: 62, protein: 1, carbs: 15, fat: 0 },
  { item: "Pineapple (1 cup)", cals: 82, protein: 1, carbs: 22, fat: 0 },
  { item: "Broccoli (1 cup)", cals: 55, protein: 4, carbs: 11, fat: 0 },
  { item: "Spinach (3 cups)", cals: 21, protein: 2, carbs: 3, fat: 0 },
  { item: "Kale (2 cups)", cals: 66, protein: 5, carbs: 13, fat: 1 },
  { item: "Green Beans (1 cup)", cals: 44, protein: 2, carbs: 10, fat: 0 },
  { item: "Carrots (1 cup)", cals: 52, protein: 1, carbs: 12, fat: 0 },
  { item: "Bell Pepper (1 cup)", cals: 39, protein: 1, carbs: 9, fat: 0 },
  { item: "Onion (1 cup)", cals: 64, protein: 2, carbs: 15, fat: 0 },
  { item: "Tomato (1 cup)", cals: 32, protein: 2, carbs: 7, fat: 0 },
  { item: "Cucumber (1 cup)", cals: 16, protein: 1, carbs: 4, fat: 0 },
  { item: "Greek Pita (1)", cals: 170, protein: 6, carbs: 33, fat: 1 },
  { item: "Whole‑Wheat Wrap (1)", cals: 200, protein: 8, carbs: 34, fat: 5 },
  { item: "Skim Milk (1 cup)", cals: 83, protein: 8, carbs: 12, fat: 0 },
  { item: "2% Milk (1 cup)", cals: 122, protein: 8, carbs: 12, fat: 5 },
  { item: "Protein Whey (1 scoop)", cals: 120, protein: 24, carbs: 3, fat: 1 },
  { item: "Protein Casein (1 scoop)", cals: 120, protein: 24, carbs: 3, fat: 1 },
  { item: "Rice Cakes (2)", cals: 70, protein: 1, carbs: 14, fat: 0 },
  { item: "Hummus (2 tbsp)", cals: 70, protein: 2, carbs: 4, fat: 5 },
  { item: "Mixed Berries (1 cup)", cals: 70, protein: 1, carbs: 17, fat: 1 }
];

function localPlan({ goal, days, equipment, experience }: any) {
  const split = days >= 5 ? ["Upper","Lower","Push","Pull","Legs"] : (days === 4 ? ["Upper","Lower","Push","Pull"] : ["Full Body","Full Body","Full Body"]);
  const intensity = goal === "strength" ? "Heavy (RPE 8–9)" : goal === "hypertrophy" ? "Moderate (RPE 7–8)" : goal === "fatloss" ? "Moderate + conditioning" : "Mixed";
  const pools: Record<string,string[]> = {
    Upper: ["Barbell Bench Press","Incline Dumbbell Press","Seated Cable Row","Lat Pulldown","Lateral Raise","Triceps Pushdown","Dumbbell Curl"],
    Lower: ["Barbell Back Squat","Romanian Deadlift","Leg Press","Leg Curl","Calf Raise","Hip Thrust"],
    Push: ["Barbell Bench Press","Incline Barbell Press","Overhead Press","Cable Fly","Triceps Pushdown"],
    Pull: ["Bent-Over Row","T-Bar Row","Pull-Up","Face Pull","Hammer Curl"],
    Legs: ["Front Squat","Bulgarian Split Squat","Romanian Deadlift","Leg Extension","Leg Curl","Calf Raise"],
    "Full Body": ["Front Squat","Dumbbell Bench Press","Seated Cable Row","Hip Thrust","Lateral Raise","Plank"]
  };
  const pick = (arr:string[], n:number) => arr.slice(0, n);
  const equipOK = (name:string) => {
    const w = WORKOUTS.find(x => x.name === name);
    if (!w) return true;
    return equipment?.includes(w.equip) || w.equip === "bodyweight";
  };
  return {
    meta: { split, intensity, conditioning: goal === "fatloss" ? "LISS 2x + HIIT 1x" : "LISS 1–2x" },
    days: split.map((label, i) => {
      const base = (pools[label] || pools["Full Body"]).filter(equipOK);
      const main = pick(base, 1);
      const secondary = pick(base.slice(1), 2);
      const accessories = pick(base.slice(3), 2);
      return {
        day: i+1, label,
        exercises: [
          ...main.map(n => ({ name:n, sets: experience==="beginner"?3:5, reps: goal==="strength"?"3–5":"6–10" })),
          ...secondary.map(n => ({ name:n, sets: 3, reps: goal==="hypertrophy"?"8–12":"6–10" })),
          ...accessories.map(n => ({ name:n, sets: 2, reps: "12–15" }))
        ]
      };
    })
  };
}

export default function App() {
  const [tab, setTab] = useState<"dashboard"|"planner"|"workouts"|"nutrition"|"progress"|"about">("dashboard");
  const [profile, setProfile] = useState({ goal:"hypertrophy", days:4, equipment:["dumbbells","bodyweight"], experience:"beginner", calories:2500, protein:160, weight:78 });
  const [aiPlan, setAiPlan] = useState<any|null>(null);
  const [wq, setwq] = useState("");
  const [fq, setfq] = useState("");
  const [foodLog, setFoodLog] = useState<{item:string; qty:number; cals:number; protein:number; carbs:number; fat:number;}[]>([]);
  const [logs, setLogs] = useState<{date:string; weight:number;}[]>([{date:"2025-10-27", weight: 76.9}]);

  // SW register for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const reg = () => navigator.serviceWorker.register('/sw.js').catch(()=>{});
      if (document.readyState === 'complete') reg(); else window.addEventListener('load', reg, { once: true });
    }
  }, []);

  const filteredWorkouts = useMemo(() => {
    const q = wq.toLowerCase();
    if (!q) return WORKOUTS;
    return WORKOUTS.filter(w => [w.name,w.focus,w.equip,w.level].some(s => s.toLowerCase().includes(q)));
  }, [wq]);

  const filteredFoods = useMemo(() => {
    const q = fq.toLowerCase();
    if (!q) return FOODS;
    return FOODS.filter(f => f.item.toLowerCase().includes(q));
  }, [fq]);

  const totals = useMemo(() => {
    return foodLog.reduce((a,f)=>({ 
      cals: a.cals + f.cals*f.qty, protein: a.protein + f.protein*f.qty, carbs: a.carbs + f.carbs*f.qty, fat: a.fat + f.fat*f.qty 
    }), {cals:0,protein:0,carbs:0,fat:0});
  }, [foodLog]);

  function addFood(f:Food){
    setFoodLog(prev => {
      const i = prev.findIndex(p => p.item === f.item);
      if (i>=0) {
        const copy = [...prev]; copy[i].qty += 1; return copy;
      }
      return [...prev, { item: f.item, qty:1, cals:f.cals, protein:f.protein, carbs:f.carbs, fat:f.fat }];
    });
  }
  function setQty(item:string, qty:number){
    setFoodLog(prev => prev.map(p => p.item===item? {...p, qty: Math.max(0, Math.floor(qty)||0)} : p).filter(p => p.qty>0));
  }

  function runAI(){ setAiPlan(localPlan(profile)); setTab("planner"); }
  function addWeight(){ 
    const last = logs[logs.length-1];
    const d = new Date(last? last.date : Date.now()); d.setDate(d.getDate()+7);
    const iso = d.toISOString().slice(0,10);
    setLogs([...logs, { date: iso, weight: profile.weight }]);
  }

  return (
    <div>
      <header className="header">
        <div className="brand container">
          <img src="/logo.png" alt="All In Fitness" />
          <div>
            <div className="title">ALL IN FITNESS</div>
            <div className="subtitle">AI‑Integrated Planning • Progress • Nutrition</div>
          </div>
        </div>
        <div className="container tabs">
          {["dashboard","planner","workouts","nutrition","progress","about"].map(v => (
            <button key={v} className={"tab "+(tab===v?"active":"")} onClick={()=>setTab(v as any)}>{v[0].toUpperCase()+v.slice(1)}</button>
          ))}
        </div>
      </header>

      <main className="container" style={{paddingTop:12, paddingBottom:40}}>
        {tab==="dashboard" && (
          <div className="grid grid-3">
            <div className="card">
              <div className="h1">AI Snapshot</div>
              <div className="muted">Goal <span className="pill" style={{marginLeft:6}}>{profile.goal}</span></div>
              <div className="muted">Days/Week <span className="pill" style={{marginLeft:6}}>{profile.days}</span></div>
              <div className="muted">Experience {profile.experience}</div>
              <div style={{marginTop:10}}><button className="btn primary" onClick={runAI}>Generate Plan</button></div>
            </div>
            <div className="card">
              <div className="h1">This Week</div>
              <div className="muted">Target Calories: {profile.calories}</div>
              <div className="muted">Target Protein: {profile.protein} g</div>
              <div className="row" style={{marginTop:10, gap:8}}>
                <input type="number" value={profile.weight} onChange={e=>setProfile({...profile, weight:Number(e.target.value)})} placeholder="Weight (kg)"/>
                <button className="btn" onClick={addWeight}>Log Weight</button>
              </div>
            </div>
            <div className="card">
              <div className="h1">Quick Tips</div>
              <ul>
                <li className="muted">30–45 min after training: protein + carbs.</li>
                <li className="muted">Aim 7–9k daily steps for recovery.</li>
                <li className="muted">Sleep 7–9 hours; keep a consistent schedule.</li>
              </ul>
            </div>

            {aiPlan && (
              <div className="card" style={{gridColumn:"1 / -1"}}>
                <div className="h1">Your AI Plan Overview</div>
                <div className="muted">Split: {Array.isArray(aiPlan.meta.split) ? aiPlan.meta.split.join(" • ") : String(aiPlan.meta.split)}</div>
                <div className="muted">Intensity: {aiPlan.meta.intensity} • Cardio: {aiPlan.meta.conditioning}</div>
                <div className="grid grid-3" style={{marginTop:12}}>
                  {aiPlan.days.slice(0,3).map((d:any)=>(
                    <div key={d.day} className="card" style={{padding:12}}>
                      <div className="h2">Day {d.day}: {d.label}</div>
                      <ul className="clean" style={{marginTop:6}}>
                        {d.exercises.slice(0,4).map((e:any,i:number)=>(
                          <li key={i} className="row" style={{justifyContent:"space-between"}}>
                            <span>{e.name}</span><span className="muted">{e.sets}×{e.reps}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="planner" && (
          <div className="card">
            <div className="h1">AI Plan Builder</div>
            <div className="grid grid-3" style={{marginTop:12}}>
              <div className="col">
                <div className="h2">Your Basics</div>
                <label className="muted">Goal</label>
                <select value={profile.goal} onChange={e=>setProfile({...profile, goal:e.target.value})}>
                  <option value="hypertrophy">Build Muscle</option>
                  <option value="strength">Get Stronger</option>
                  <option value="fatloss">Lose Fat</option>
                  <option value="endurance">Endurance</option>
                </select>
                <label className="muted">Experience</label>
                <select value={profile.experience} onChange={e=>setProfile({...profile, experience:e.target.value})}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <label className="muted">Days/Week</label>
                <input type="number" min={2} max={6} value={profile.days} onChange={e=>setProfile({...profile, days:Math.max(2, Math.min(6, Number(e.target.value)))})}/>
              </div>
              <div className="col">
                <div className="h2">Equipment Access</div>
                {["bodyweight","dumbbells","barbell","machines","cables"].map(id => (
                  <label key={id} className="row">
                    <input
                      type="checkbox"
                      checked={profile.equipment.includes(id)}
                      onChange={(e)=>{
                        const checked = e.target.checked;
                        setProfile(p=>({...p, equipment: checked ? Array.from(new Set([...p.equipment, id])) : p.equipment.filter(x=>x!==id)}));
                      }}
                    />
                    <span style={{textTransform:"capitalize"}}>{id}</span>
                  </label>
                ))}
                <div className="h2" style={{marginTop:6}}>Targets</div>
                <label className="muted">Daily Calories</label>
                <input type="number" value={profile.calories} onChange={e=>setProfile({...profile, calories:Number(e.target.value)})}/>
                <label className="muted">Daily Protein (g)</label>
                <input type="number" value={profile.protein} onChange={e=>setProfile({...profile, protein:Number(e.target.value)})}/>
              </div>
              <div className="col">
                <div className="h2">Actions</div>
                <button className="btn primary" onClick={runAI}>Generate AI Plan</button>
                {aiPlan && (
                  <div style={{marginTop:10}}>
                    <div className="muted">Plan generated. Switch to Dashboard to see a quick overview.</div>
                  </div>
                )}
              </div>
            </div>

            {aiPlan && (
              <div style={{marginTop:16}}>
                <div className="h2">Weekly Plan</div>
                <div className="grid grid-2" style={{marginTop:8}}>
                  {aiPlan.days.map((d:any)=>(
                    <div key={d.day} className="card">
                      <div className="h2">Day {d.day}: {d.label}</div>
                      <ul className="clean" style={{marginTop:6}}>
                        {d.exercises.map((e:any,i:number)=>(
                          <li key={i} style={{marginBottom:6}}>
                            <div className="row" style={{justifyContent:"space-between"}}>
                              <strong>{e.name}</strong><span className="muted">{e.sets}×{e.reps}</span>
                            </div>
                            <div className="muted">{(WORKOUTS.find(w=>w.name===e.name)?.desc)||"—"}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="workouts" and (
          <div className="card">
            <div className="h1">Search Workouts</div>
            <input placeholder="Search by name, muscle, equipment…" value={wq} onChange={e=>setwq(e.target.value)} style={{marginTop:8}}/>
            <div className="grid grid-2" style={{marginTop:12}}>
              {filteredWorkouts.map((w,i)=>(
                <div key={i} className="card">
                  <div className="h2">{w.name}</div>
                  <div className="muted">{w.focus} • {w.equip} • {w.level}</div>
                  <details style={{marginTop:6}}>
                    <summary className="link">How to do it</summary>
                    <div className="muted" style={{marginTop:4}}>{w.desc||"—"}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="nutrition" && (
          <div className="card">
            <div className="h1">Nutrition & Diet</div>
            <div className="grid grid-2" style={{marginTop:12}}>
              <div>
                <div className="h2">Search Foods</div>
                <input placeholder="e.g., chicken, oats, rice" value={fq} onChange={e=>setfq(e.target.value)} />
                <div style={{marginTop:12}} className="grid grid-2">
                  {filteredFoods.map((f,i)=>(
                    <div key={i} className="card">
                      <div className="h2">{f.item}</div>
                      <div className="muted">{f.cals} kcal • P {f.protein}g • C {f.carbs}g • F {f.fat}g</div>
                      <button className="btn" style={{marginTop:8}} onClick={()=>addFood(f)}>Add</button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h2">Food Calculator</div>
                <table className="table" style={{marginTop:8}}>
                  <thead><tr><th>Food</th><th>Qty</th><th>kcal</th><th>P</th><th>C</th><th>F</th></tr></thead>
                  <tbody>
                    {foodLog.map((f,i)=>(
                      <tr key={i}>
                        <td>{f.item}</td>
                        <td><input type="number" min={0} value={f.qty} onChange={e=>setQty(f.item, Number(e.target.value))} style={{width:64}}/></td>
                        <td>{f.cals*f.qty}</td>
                        <td>{f.protein*f.qty}</td>
                        <td>{f.carbs*f.qty}</td>
                        <td>{f.fat*f.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><th>Total</th><th></th><th>{totals.cals}</th><th>{totals.protein}</th><th>{totals.carbs}</th><th>{totals.fat}</th></tr>
                  </tfoot>
                </table>
                <div className="muted" style={{marginTop:8}}>Targets — Calories: {profile.calories} • Protein: {profile.protein}g</div>
              </div>
            </div>
          </div>
        )}

        {tab==="progress" && (
          <div className="card">
            <div className="h1">Progress</div>
            <div className="row" style={{gap:8, marginTop:8}}>
              <input type="number" placeholder="Current weight (kg)" value={profile.weight} onChange={e=>setProfile({...profile, weight:Number(e.target.value)})}/>
              <button className="btn" onClick={addWeight}>Add Weekly Entry</button>
            </div>
            <table className="table" style={{marginTop:12}}>
              <thead><tr><th>Date</th><th>Weight (kg)</th></tr></thead>
              <tbody>
                {logs.map((l,i)=>(<tr key={i}><td>{l.date}</td><td>{l.weight}</td></tr>))}
              </tbody>
            </table>
          </div>
        )}

        {tab==="about" && (
          <div className="card">
            <div className="h1">About</div>
            <p className="muted" style={{marginTop:6}}>
              This app provides general fitness/nutrition guidance. It is not medical advice. 
              Consult a qualified professional before starting any program.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
