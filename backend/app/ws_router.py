import json
import base64
from .audio_processor import AudioProcessor
from .model_loader import model # Assuming your model is exported here

processor = AudioProcessor()

async def handle_twilio_websocket(websocket):
    while True:
        message = await websocket.receive_text()
        data = json.loads(message)
        
        if data['event'] == "media":
            payload = data['media']['payload']
            # Process the chunk
            chunk_tensor = processor.process_twilio_stream(payload)
            
            # Here you would buffer chunks and run:
            # prediction = model(chunk_tensor)
            # print(f"Detection: {prediction}")
            
        elif data['event'] == "stop":
            break