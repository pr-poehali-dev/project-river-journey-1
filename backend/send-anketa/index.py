import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет анкету клиента на почту менеджера YALT REC."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    name = body.get('name', '—')
    email = body.get('email', '—')
    phone = body.get('phone', '—')
    genre = body.get('genre', '—')
    vision = body.get('vision', '—')
    budget = body.get('budget', '—')
    bandlink = body.get('bandlink', '—')

    budget_map = {
        'up-30': 'До 30 000 ₽',
        '30-100': '30 000 — 100 000 ₽',
        '100-300': '100 000 — 300 000 ₽',
        '300plus': 'От 300 000 ₽',
    }
    budget_label = budget_map.get(budget, budget)

    html = f"""
    <h2 style="color:#7c4a03;font-family:Arial,sans-serif;">Новая заявка — YALT REC</h2>
    <table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:180px;">Артист / группа</td><td style="padding:8px 12px;">{name}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Почта</td><td style="padding:8px 12px;">{email}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Телефон</td><td style="padding:8px 12px;">{phone}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Жанр / стиль</td><td style="padding:8px 12px;">{genre}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">О проекте</td><td style="padding:8px 12px;">{vision}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Бюджет</td><td style="padding:8px 12px;">{budget_label}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Bandlink</td><td style="padding:8px 12px;">{bandlink}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — YALT REC'
    msg['From'] = 'yaltmanager@mail.ru'
    msg['To'] = 'yaltmanager@mail.ru'
    msg.attach(MIMEText(html, 'html'))

    smtp = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    smtp.login('yaltmanager@mail.ru', os.environ['SMTP_PASSWORD'])
    smtp.sendmail('yaltmanager@mail.ru', 'yaltmanager@mail.ru', msg.as_string())
    smtp.quit()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
