//Code qui marche parfatement bien

// "use client"


// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts'
// import { BarChart2, TrendingUp, PieChart, LineChart, Map, Bell, AlertTriangle, Loader2, Search } from 'lucide-react'
// import Button from '@/components/ui/button'
// import Card from '@/components/ui/card'
// import Input from '@/components/ui/input'
// import { cn } from '@/lib/utils'

// // Mock data
// const mockAlerts = [
//   { id: 1, email: "user1@example.com", neighborhood: "Almadies", min_price: 50000000, urgency: "high" },
//   { id: 2, email: "user2@example.com", neighborhood: "Plateau", max_price: 100000000, urgency: "medium" },
//   { id: 3, email: "user3@example.com", neighborhood: "Ngor", min_price: 75000000, max_price: 150000000, urgency: "low" },
// ]

// const mockProperties = [
//   { id: 1, title: "Appartement moderne", price: 75000000, surface_m2: 120, neighborhood: "Almadies", property_type: "Appartement" },
//   { id: 2, title: "Villa avec piscine", price: 150000000, surface_m2: 300, neighborhood: "Ngor", property_type: "Villa" },
//   { id: 3, title: "Terrain constructible", price: 50000000, surface_m2: 500, neighborhood: "Yoff", property_type: "Terrain" },
//   { id: 4, title: "Maison familiale", price: 90000000, surface_m2: 200, neighborhood: "Ouakam", property_type: "Maison" },
//   { id: 5, title: "Studio centre-ville", price: 40000000, surface_m2: 45, neighborhood: "Plateau", property_type: "Appartement" },
// ]

// const mockChartData = [
//   { property_type: "Appartement", count: 120 },
//   { property_type: "Maison", count: 80 },
//   { property_type: "Villa", count: 40 },
//   { property_type: "Terrain", count: 60 },
// ]

// // Main Dashboard Component
// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto py-10">
//         <DashboardHeader />
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <OverviewButtons />
//           <AlertsPanel />
//           <PredictionModel />
//           <MarketInsights />
//           <InteractiveMap />
//           <PropertyList />
//         </div>
//       </div>
//     </div>
//   )
// }

// function DashboardHeader() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex items-center justify-between px-2 mb-8"
//     >
//       <div className="grid gap-1">
//         <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//           Tableau de Bord du Marché Immobilier Dakar
//         </h1>
//         <p className="text-lg text-gray-600">
//           Analyse en temps réel et prédictions pour faciliter vos décisions d'investissement.
//         </p>
//       </div>
//     </motion.div>
//   )
// }

// function OverviewButtons() {
//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//     tap: { scale: 0.95 }
//   }

//   return (
//     <Card className="col-span-4 p-6">
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
//         {[
//           { icon: BarChart2, label: "Analyse", color: "from-blue-500 to-blue-700" },
//           { icon: TrendingUp, label: "Tendances", color: "from-green-500 to-green-700" },
//           { icon: PieChart, label: "Statistiques", color: "from-yellow-500 to-yellow-700" },
//           { icon: LineChart, label: "Prédictions", color: "from-purple-500 to-purple-700" },
//           { icon: Map, label: "Carte Terrains", color: "from-red-500 to-red-700" },
//           { icon: Map, label: "Carte Logements", color: "from-indigo-500 to-indigo-700" },
//         ].map(({ icon: Icon, label, color }, index) => (
//           <motion.div key={index} variants={buttonVariants} whileHover="hover" whileTap="tap">
//             <Button className={cn(`h-24 w-full bg-gradient-to-r ${color} text-white`)}>
//               <div className="flex flex-col items-center justify-center">
//                 <Icon className="mb-2 h-8 w-8" />
//                 <span className="text-lg">{label}</span>
//               </div>
//             </Button>
//           </motion.div>
//         ))}
//       </div>
//     </Card>
//   )
// }

// function AlertsPanel() {
//   return (
//     <Card className="col-span-4 lg:col-span-2">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Alertes</h2>
//         <Bell className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4">
//         <div className="flex space-x-2 mb-4">
//           <Input type="email" placeholder="Votre email" className="flex-grow" />
//           <Button className={cn("bg-blue-500 text-white hover:bg-blue-600")}>Créer une alerte</Button>
//         </div>
//         <div className="space-y-4 max-h-[300px] overflow-y-auto">
//           {mockAlerts.map((alert) => (
//             <div key={alert.id} className="flex items-start space-x-2">
//               <AlertTriangle className={cn(`h-5 w-5`, {
//                 'text-red-500': alert.urgency === 'high',
//                 'text-yellow-500': alert.urgency === 'medium',
//                 'text-green-500': alert.urgency === 'low'
//               })} />
//               <div>
//                 <p className="text-sm font-medium">
//                   Alerte pour {alert.email}
//                   <Button className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
//                     Supprimer
//                   </Button>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {alert.neighborhood && `Quartier: ${alert.neighborhood}`}
//                   {alert.min_price && ` | Prix min: ${alert.min_price.toLocaleString()} FCFA`}
//                   {alert.max_price && ` | Prix max: ${alert.max_price.toLocaleString()} FCFA`}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Card>
//   )
// }

// function PredictionModel() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [prediction, setPrediction] = useState<number | null>(null)

//   const handlePrediction = () => {
//     setIsLoading(true)
//     setTimeout(() => {
//       setPrediction(Math.floor(Math.random() * 100000000) + 50000000)
//       setIsLoading(false)
//     }, 2000)
//   }

//   return (
//     <Card className="col-span-4 lg:col-span-2">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Modèle de Prédiction</h2>
//         <LineChart className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4 space-y-4">
//         <select className="w-full p-2 border rounded">
//           <option>Sélectionnez un modèle</option>
//           <option>Modèle Linéaire</option>
//           <option>Modèle Random Forest</option>
//           <option>Modèle XGBoost</option>
//         </select>
//         <Input type="number" placeholder="Surface (m²)" />
//         <select className="w-full p-2 border rounded">
//           <option>Sélectionnez un quartier</option>
//           <option>Almadies</option>
//           <option>Plateau</option>
//           <option>Ngor</option>
//           <option>Ouakam</option>
//         </select>
//         <Button
//           className={cn("w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white")}
//           onClick={handlePrediction}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Chargement...
//             </>
//           ) : (
//             "Lancer la prédiction"
//           )}
//         </Button>
//         {prediction && (
//           <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-md">
//             <p className="font-semibold text-center">
//               Prédiction : {prediction.toLocaleString()} FCFA
//             </p>
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }

// function MarketInsights() {
//   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]

//   return (
//     <Card className="col-span-4">
//       <div className="p-4 border-b">
//         <h2 className="text-2xl font-bold">Aperçu du Marché</h2>
//         <p className="text-gray-600">Analyse des prix et de la distribution des propriétés</p>
//       </div>
//       <div className="p-4">
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
//           {[
//             { label: "Prix Moyen", value: "75,000,000 FCFA", color: "text-blue-600" },
//             { label: "Prix Médian", value: "65,000,000 FCFA", color: "text-green-600" },
//             { label: "Prix au m² Moyen", value: "450,000 FCFA/m²", color: "text-yellow-600" },
//             { label: "Fourchette de Prix", value: "20M - 200M FCFA", color: "text-purple-600" },
//           ].map(({ label, value, color }, index) => (
//             <div key={index} className="space-y-2">
//               <p className="text-sm font-medium text-gray-600">{label}</p>
//               <p className={cn("text-2xl font-bold", color)}>{value}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Distribution des Types de Propriété</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={mockChartData}>
//               <XAxis dataKey="property_type" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count">
//                 {mockChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Card>
//   )
// }

// function InteractiveMap() {
//   const [activeMap, setActiveMap] = useState<'terrains' | 'logements' | null>(null)

//   const maps = {
//     terrains: "/static/carte_terrains_dakar_luxe.html",
//     logements: "/static/carte_logements.dakar.html"
//   }

//   return (
//     <Card className="col-span-4">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Carte Interactive</h2>
//         <Map className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4">
//         <div className="flex justify-center space-x-4 mb-4">
//           <Button
//             onClick={() => setActiveMap('terrains')}
//             className={cn(activeMap === 'terrains' ? 'bg-blue-500 text-white' : 'bg-gray-200')}
//           >
//             Carte des Terrains
//           </Button>
//           <Button
//             onClick={() => setActiveMap('logements')}
//             className={cn(activeMap === 'logements' ? 'bg-blue-500 text-white' : 'bg-gray-200')}
//           >
//             Carte des Logements
//           </Button>
//         </div>
//         {activeMap && (
//           <div className="w-full h-[500px] border rounded-md overflow-hidden">
//             <iframe
//               src={maps[activeMap]}
//               width="100%"
//               height="100%"
//               frameBorder="0"
//               scrolling="no"
//             />
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }

// function PropertyList() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null)

//   const filteredProperties = mockProperties.filter(property =>
//     property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.property_type.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const sortedProperties = [...filteredProperties].sort((a, b) => {
//     if (!sortConfig) return 0
//     const { key, direction } = sortConfig
//     if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
//       return direction === 'ascending' ? -1 : 1
//     }
//     if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
//       return direction === 'ascending' ? 1 : -1
//     }
//     return 0
//   })

//   const requestSort = (key: string) => {
//     let direction: 'ascending' | 'descending' = 'ascending'
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending'
//     }
//     setSortConfig({ key, direction })
//   }

//   return (
//     <Card className="col-span-4">
//       <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-lg">
//         <h2 className="text-2xl font-bold text-white">Liste des Propriétés</h2>
//         <p className="text-gray-100">Dernières propriétés ajoutées à notre base de données</p>
//       </div>
//       <div className="p-4">
//         <div className="flex items-center space-x-2 mb-4">
//           <Search className="text-gray-400" />
//           <Input
//             type="text"
//             placeholder="Rechercher une propriété..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow"
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Titre', 'Prix (FCFA)', 'Surface (m²)', 'Quartier', 'Type'].map((header, index) => (
//                   <th
//                     key={index}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort(header.toLowerCase())}
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sortedProperties.map((property) => (
//                 <tr key={property.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.price.toLocaleString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.surface_m2}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.neighborhood}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.property_type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-4 flex justify-center">
//           <Button className={cn("bg-gray-200 text-gray-700 hover:bg-gray-300")}>Charger plus</Button>
//         </div>
//       </div>
//     </Card>
//   )
// }
//phase test d'integration qui ne marche pas toujours
// "use client"

// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts'
// import { BarChart2, TrendingUp, PieChart, LineChart, Map, Bell, AlertTriangle, Loader2, Search } from 'lucide-react'
// import Button from '@/components/ui/button'
// import Card from '@/components/ui/card'
// import Input from '@/components/ui/input'
// import { cn } from '@/lib/utils'

// // Interfaces
// interface Property {
//   id: number
//   title: string
//   price: number
//   surface_m2: number
//   neighborhood: string
//   property_type: string
//   location: string
//   price_per_m2: number
// }

// interface MarketInsight {
//   price_metrics: {
//     average: number
//     median: number
//     min: number
//     max: number
//     price_per_m2: number
//   }
//   neighborhood_analysis: Array<{
//     neighborhood: string
//     total_properties: number
//     avg_price: number
//     avg_price_m2: number
//   }>
//   property_distribution: Array<{
//     property_type: string
//     count: number
//   }>
// }

// interface Alert {
//   id: number
//   email: string
//   min_price?: number
//   max_price?: number
//   min_surface?: number
//   max_surface?: number
//   neighborhood?: string
//   property_type?: string
// }

// interface AlertData {
//   email: string
//   min_price?: number
//   max_price?: number
//   min_surface?: number
//   max_surface?: number
//   neighborhood?: string
//   property_type?: string
// }

// // Service API
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// const api = {
//   async getProperties(): Promise<Property[]> {
//     const response = await fetch(`${API_URL}/properties/`)
//     return response.json()
//   },

//   async getMarketInsights(): Promise<MarketInsight> {
//     const response = await fetch(`${API_URL}/market-insights`)
//     return response.json()
//   },

//   async getPrediction(data: {
//     surface: number
//     neighborhood: string
//     model_type: "optimized" | "randomforest"
//   }) {
//     const response = await fetch(`${API_URL}/predict`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     return response.json()
//   },

//   async createAlert(alertData: AlertData): Promise<Alert> {
//     const response = await fetch(`${API_URL}/alerts/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(alertData)
//     })
//     return response.json()
//   },

//   async getQuartiers(): Promise<{ neighborhoods: string[] }> {
//     const response = await fetch(`${API_URL}/available-neighborhoods`)
//     return response.json()
//   }
// }

// // Composants manquants
// function OverviewButtons({ insights }: { insights: MarketInsight | null }) {
//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//     tap: { scale: 0.95 }
//   }

//   return (
//     <Card className="col-span-4 p-6">
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
//         {[
//           { icon: BarChart2, label: "Analyse", color: "from-blue-500 to-blue-700" },
//           { icon: TrendingUp, label: "Tendances", color: "from-green-500 to-green-700" },
//           { icon: PieChart, label: "Statistiques", color: "from-yellow-500 to-yellow-700" },
//           { icon: LineChart, label: "Prédictions", color: "from-purple-500 to-purple-700" },
//           { icon: Map, label: "Carte Terrains", color: "from-red-500 to-red-700" },
//           { icon: Map, label: "Carte Logements", color: "from-indigo-500 to-indigo-700" },
//         ].map(({ icon: Icon, label, color }, index) => (
//           <motion.div key={index} variants={buttonVariants} whileHover="hover" whileTap="tap">
//             <Button className={cn(`h-24 w-full bg-gradient-to-r ${color} text-white`)}>
//               <div className="flex flex-col items-center justify-center">
//                 <Icon className="mb-2 h-8 w-8" />
//                 <span className="text-lg">{label}</span>
//               </div>
//             </Button>
//           </motion.div>
//         ))}
//       </div>
//     </Card>
//   )
// }

// function AlertsPanel({
//   onCreateAlert
// }: {
//   onCreateAlert: (alertData: AlertData) => Promise<void>
// }) {
//   const [email, setEmail] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email) return

//     await onCreateAlert({ email })
//     setEmail('')
//   }

//   return (
//     <Card className="col-span-4 lg:col-span-2">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Alertes</h2>
//         <Bell className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4">
//         <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
//           <Input
//             type="email"
//             placeholder="Votre email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-grow"
//           />
//           <Button
//             type="submit"
//             className={cn("bg-blue-500 text-white hover:bg-blue-600")}
//           >
//             Créer une alerte
//           </Button>
//         </form>
//       </div>
//     </Card>
//   )
// }

// function PredictionModel({ quartiers }: { quartiers: string[] }) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [prediction, setPrediction] = useState<number | null>(null)
//   const [surface, setSurface] = useState('')
//   const [neighborhood, setNeighborhood] = useState('')
//   const [modelType, setModelType] = useState<'optimized' | 'randomforest'>('optimized')

//   const handlePrediction = async () => {
//     if (!surface || !neighborhood) return

//     setIsLoading(true)
//     try {
//       const result = await api.getPrediction({
//         surface: parseFloat(surface),
//         neighborhood,
//         model_type: modelType
//       })
//       setPrediction(result.prediction)
//     } catch (error) {
//       console.error('Erreur:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="col-span-4 lg:col-span-2">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Modèle de Prédiction</h2>
//         <LineChart className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4 space-y-4">
//         <select
//           value={modelType}
//           onChange={(e) => setModelType(e.target.value as 'optimized' | 'randomforest')}
//           className="w-full p-2 border rounded"
//         >
//           <option value="optimized">Modèle Optimisé</option>
//           <option value="randomforest">Random Forest</option>
//         </select>

//         <Input
//           type="number"
//           placeholder="Surface (m²)"
//           value={surface}
//           onChange={(e) => setSurface(e.target.value)}
//         />

//         <select
//           value={neighborhood}
//           onChange={(e) => setNeighborhood(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Sélectionnez un quartier</option>
//           {quartiers.map((quartier) => (
//             <option key={quartier} value={quartier}>
//               {quartier}
//             </option>
//           ))}
//         </select>

//         <Button
//           className={cn("w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white")}
//           onClick={handlePrediction}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Chargement...
//             </>
//           ) : (
//             "Lancer la prédiction"
//           )}
//         </Button>

//         {prediction && (
//           <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-md">
//             <p className="font-semibold text-center">
//               Prédiction : {prediction.toLocaleString()} FCFA
//             </p>
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }

// function MarketInsights({ data }: { data: MarketInsight | null }) {
//   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]

//   if (!data) return null

//   return (
//     <Card className="col-span-4">
//       <div className="p-4 border-b">
//         <h2 className="text-2xl font-bold">Aperçu du Marché</h2>
//         <p className="text-gray-600">Analyse des prix et de la distribution des propriétés</p>
//       </div>
//       <div className="p-4">
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
//           {[
//             {
//               label: "Prix Moyen",
//               value: `${data.price_metrics.average.toLocaleString()} FCFA`,
//               color: "text-blue-600"
//             },
//             {
//               label: "Prix Médian",
//               value: `${data.price_metrics.median.toLocaleString()} FCFA`,
//               color: "text-green-600"
//             },
//             {
//               label: "Prix au m² Moyen",
//               value: `${data.price_metrics.price_per_m2.toLocaleString()} FCFA/m²`,
//               color: "text-yellow-600"
//             },
//             {
//               label: "Fourchette de Prix",
//               value: `${data.price_metrics.min.toLocaleString()} - ${data.price_metrics.max.toLocaleString()} FCFA`,
//               color: "text-purple-600"
//             },
//           ].map(({ label, value, color }, index) => (
//             <div key={index} className="space-y-2">
//               <p className="text-sm font-medium text-gray-600">{label}</p>
//               <p className={cn("text-2xl font-bold", color)}>{value}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Distribution des Types de Propriété</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.property_distribution}>
//               <XAxis dataKey="property_type" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count">
//                 {data.property_distribution.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Card>
//   )
// }

// function InteractiveMap() {
//   const [activeMap, setActiveMap] = useState<'terrains' | 'logements' | null>(null)

//   const maps = {
//     terrains: "/static/carte_terrains_dakar_luxe.html",
//     logements: "/static/carte_logements.dakar.html"
//   }

//   return (
//     <Card className="col-span-4">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-bold">Carte Interactive</h2>
//         <Map className="h-5 w-5 text-gray-500" />
//       </div>
//       <div className="p-4">
//         <div className="flex justify-center space-x-4 mb-4">
//           <Button
//             onClick={() => setActiveMap('terrains')}
//             className={cn(activeMap === 'terrains' ? 'bg-blue-500 text-white' : 'bg-gray-200')}
//           >
//             Carte des Terrains
//           </Button>
//           <Button
//             onClick={() => setActiveMap('logements')}
//             className={cn(activeMap === 'logements' ? 'bg-blue-500 text-white' : 'bg-gray-200')}
//           >
//             Carte des Logements
//           </Button>
//         </div>
//         {activeMap && (
//           <div className="w-full h-[500px] border rounded-md overflow-hidden">
//             <iframe
//               src={maps[activeMap]}
//               width="100%"
//               height="100%"
//               frameBorder="0"
//               scrolling="no"
//             />
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }

// function PropertyList({ properties }: { properties: Property[] }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof Property;
//     direction: 'ascending' | 'descending';
//   } | null>(null)

//   const filteredProperties = properties.filter(property =>
//     property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.property_type.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const sortedProperties = [...filteredProperties].sort((a, b) => {
//     if (!sortConfig) return 0

//     const { key, direction } = sortConfig
//     if (a[key] < b[key]) {
//       return direction === 'ascending' ? -1 : 1
//     }
//     if (a[key] > b[key]) {
//       return direction === 'ascending' ? 1 : -1
//     }
//     return 0
//   })

//   const requestSort = (key: keyof Property) => {
//     let direction: 'ascending' | 'descending' = 'ascending'
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending'
//     }
//     setSortConfig({ key, direction })
//   }

//   return (
//     <Card className="col-span-4">
//       <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-lg">
//         <h2 className="text-2xl font-bold text-white">Liste des Propriétés</h2>
//         <p className="text-gray-100">Dernières propriétés ajoutées à notre base de données</p>
//       </div>
//       <div className="p-4">
//         <div className="flex items-center space-x-2 mb-4">
//           <Search className="text-gray-400" />
//           <Input
//             type="text"
//             placeholder="Rechercher une propriété..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow"
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['title', 'price', 'surface_m2', 'neighborhood', 'property_type'].map((key) => (
//                   <th
//                     key={key}
//                     onClick={() => requestSort(key as keyof Property)}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   >
//                     {key === 'title' ? 'Titre' :
//                       key === 'price' ? 'Prix (FCFA)' :
//                         key === 'surface_m2' ? 'Surface (m²)' :
//                           key === 'neighborhood' ? 'Quartier' :
//                             'Type'}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sortedProperties.map((property) => (
//                 <tr key={property.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.price.toLocaleString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.surface_m2}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.neighborhood}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{property.property_type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-4 flex justify-center">
//           <Button className={cn("bg-gray-200 text-gray-700 hover:bg-gray-300")}>
//             Charger plus
//           </Button>
//         </div>
//       </div>
//     </Card>
//   )
// }
import Dashboard from '@/components/Dashboard'

export default function Page() {
  return <Dashboard />
}